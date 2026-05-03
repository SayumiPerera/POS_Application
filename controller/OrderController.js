
 
import { addOrderData, deleteOrderData, getOrderData, getOrderDataByIndex, getOrderDataById, searchOrdersByCustomer } from '../model/OrderModel.js';
import { getCustomerData } from '../model/CustomerModel.js';
import { getItemData, getItemDataByCode } from '../model/ItemModel.js';


// ---- Cart (temp storage for current order items) ----
let cart = [];


// ---- Generate unique Order ID ----
function generateOrderId() {
    return 'ORD-' + Date.now();
}


// ---- Populate Customer Dropdown ----
const loadCustomerDropdown = () => {
    $('#order_customer_select').empty().append('<option value="">-- Select Customer --</option>');
    getCustomerData().forEach(c => {
        $('#order_customer_select').append(`<option value="${c.id}">${c.name}</option>`);
    });
}


// ---- Populate Item Dropdown ----
const loadItemDropdown = () => {
    $('#order_item_select').empty().append('<option value="">-- Select Item --</option>');
    getItemData().forEach(item => {
        $('#order_item_select').append(
            `<option value="${item.code}" data-price="${item.unitPrice}" data-qty="${item.qty}">
                ${item.name} (Stock: ${item.qty})
            </option>`
        );
    });
}


// ---- Show unit price when item selected ----
$('#order_item_select').on('change', function () {
    let selected = $(this).find(':selected');
    let price = selected.data('price') || '';
    $('#order_unitPrice_display').val(price);
    $('#order_item_qty').val(1);
})


// ---- Add item to cart ----
$('#order_add_item_btn').on('click', function () {
    let code     = $('#order_item_select').val();
    let name     = $('#order_item_select').find(':selected').text().split('(')[0].trim();
    let price    = parseFloat($('#order_unitPrice_display').val());
    let qty      = parseInt($('#order_item_qty').val());
    let stock    = parseInt($('#order_item_select').find(':selected').data('qty'));

    if (!code) {
        Swal.fire({ icon: 'error', title: 'Please select an item!' });
        return;
    }
    if (!qty || qty < 1) {
        Swal.fire({ icon: 'error', title: 'Invalid Quantity!' });
        return;
    }
    if (qty > stock) {
        Swal.fire({ icon: 'error', title: `Only ${stock} in stock!` });
        return;
    }

    // Check if item already in cart — update qty instead
    let existing = cart.find(c => c.code === code);
    if (existing) {
        existing.qty += qty;
        existing.subtotal = existing.qty * existing.price;
    } else {
        cart.push({ code, name, price, qty, subtotal: price * qty });
    }

    renderCart();
    $('#order_item_select').val('');
    $('#order_unitPrice_display').val('');
    $('#order_item_qty').val(1);
})


// ---- Render Cart Table ----
const renderCart = () => {
    $('#order_cart_tbody').empty();

    if (cart.length === 0) {
        $('#order_cart_tbody').append(
            '<tr id="cart_empty_row"><td colspan="5" class="text-center text-muted">No items added</td></tr>'
        );
        $('#order_totalPrice_input').val('');
        return;
    }

    let grandTotal = 0;
    cart.forEach((item, index) => {
        grandTotal += item.subtotal;
        $('#order_cart_tbody').append(`
            <tr>
                <td>${item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                    <input type="number" class="form-control form-control-sm cart-qty-input"
                           value="${item.qty}" min="1" data-index="${index}"
                           style="width:65px; background:#fde8e8; border:none; border-bottom:1px solid #ccc">
                </td>
                <td>${item.subtotal.toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-danger cart-remove-btn" data-index="${index}">✕</button>
                </td>
            </tr>
        `);
    });

    $('#order_totalPrice_input').val(grandTotal.toFixed(2));
}


// ---- Dynamically update qty in cart ----
$(document).on('input', '.cart-qty-input', function () {
    let index = parseInt($(this).data('index'));
    let newQty = parseInt($(this).val());
    if (newQty < 1 || isNaN(newQty)) return;
    cart[index].qty = newQty;
    cart[index].subtotal = cart[index].price * newQty;
    renderCart();
})


// ---- Remove item from cart ----
$(document).on('click', '.cart-remove-btn', function () {
    let index = parseInt($(this).data('index'));
    cart.splice(index, 1);
    renderCart();
})


// ---- Clean Order Form ----
const cleanOrderForm = () => {
    cart = [];
    renderCart();
    $('#order_customer_select').val('');
    $('#order_item_select').val('');
    $('#order_unitPrice_display').val('');
    $('#order_item_qty').val(1);
    $('#order_date_input').val('');
    $('#order_totalPrice_input').val('');
    $('#order_id_input').val('');
}


// ---- Load Order Table ----
const loadOrderTbl = () => {
    $('#order_tbody').empty();
    let orders = getOrderData();

    if (orders.length === 0) {
        $('#order_tbody').append('<tr><td colspan="5" class="text-center text-muted">No orders yet</td></tr>');
        return;
    }

    orders.forEach((order, index) => {
        let itemSummary = order.itemList.map(i => `${i.name} x${i.qty}`).join(', ');
        $('#order_tbody').append(`
            <tr data-index="${index}">
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${itemSummary}</td>
                <td>${parseFloat(order.totalPrice).toFixed(2)}</td>
                <td>${order.date}</td>
            </tr>
        `);
    });
}


// ---- Place Order (Save) ----
$('#order_save_btn').on('click', function () {
    let customerId   = $('#order_customer_select').val();
    let customerName = $('#order_customer_select').find(':selected').text();
    let date         = $('#order_date_input').val();
    let totalPrice   = $('#order_totalPrice_input').val();

    if (!customerId) {
        Swal.fire({ icon: 'error', title: 'Please select a customer!' });
        return;
    }
    if (cart.length === 0) {
        Swal.fire({ icon: 'error', title: 'Please add at least one item!' });
        return;
    }
    if (!date) {
        Swal.fire({ icon: 'error', title: 'Please select a date!' });
        return;
    }

    let orderId = generateOrderId();

    addOrderData(orderId, customerName, cart, cart.reduce((a,b) => a + b.qty, 0), totalPrice, date);

    Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        html: `
            <b>Order ID:</b> ${orderId}<br>
            <b>Customer:</b> ${customerName}<br>
            <b>Total:</b> ${parseFloat(totalPrice).toFixed(2)}<br>
            <b>Date:</b> ${date}
        `
    });

    cleanOrderForm();
    loadOrderTbl();
})


// ---- Delete Order ----
$('#order_delete_btn').on('click', function () {
    let id = $('#order_id_input').val();

    if (!id) {
        Swal.fire({ icon: 'error', title: 'Select an order from the table first!' });
        return;
    }

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            deleteOrderData(id);
            cleanOrderForm();
            Swal.fire({ icon: 'success', title: 'Order deleted successfully!' });
            loadOrderTbl();
        }
    });
})


// ---- Reset ----
$('#order_reset_btn').on('click', function () {
    cleanOrderForm();
})


// ---- Click on order row ----
$('#order_tbody').on('click', 'tr', function () {
    let order_obj = getOrderDataByIndex($(this).index());
    $('#order_id_input').val(order_obj.id);
    $('#order_date_input').val(order_obj.date);
    $('#order_totalPrice_input').val(order_obj.totalPrice);
})


// ---- Load dropdowns when order tab is clicked ----
// Call this from SidebarController when order tab is clicked:
// loadCustomerDropdown(); loadItemDropdown();
export { loadCustomerDropdown, loadItemDropdown, loadOrderTbl };

