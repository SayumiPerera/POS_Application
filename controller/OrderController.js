import { addOrderData, deleteOrderData, getOrderData, getOrderDataByIndex, getOrderDataById, searchOrdersByCustomer } from '../model/OrderModel.js';
import { getCustomerData } from '../model/CustomerModel.js';
import { getItemData, getItemDataByCode } from '../model/ItemModel.js';


// ---- Cart (temp storage for current order items) ----
let cart = [];


// ---- Generate unique Order ID ----
function generateOrderId() {
    return 'ORD-' + Date.now();
}


// ---- Auto-fill Order ID on load ----
const setOrderId = () => {
    $('#order_id_input').val(generateOrderId());
}
setOrderId(); // run immediately when module loads


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
    let code  = $('#order_item_select').val();
    let name  = $('#order_item_select').find(':selected').text().split('(')[0].trim();
    let price = parseFloat($('#order_unitPrice_display').val());
    let qty   = parseInt($('#order_item_qty').val());
    let stock = parseInt($('#order_item_select').find(':selected').data('qty'));

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

    let existing = cart.find(c => c.code === code);
    if (existing) {
        if (existing.qty + qty > stock) {
            Swal.fire({ icon: 'error', title: `Only ${stock} in stock!` });
            return;
        }
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


// ---- Render Cart Table + calculate Grand Total ----
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
    let index  = parseInt($(this).data('index'));
    let newQty = parseInt($(this).val());
    if (newQty < 1 || isNaN(newQty)) return;
    cart[index].qty      = newQty;
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
    setOrderId(); // generate fresh order ID
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


// ---- Load Order History Table ----
const loadOrderHistoryTbl = () => {
    $('#order_history_tbody').empty();
    let orders = getOrderData();

    if (orders.length === 0) {
        $('#order_history_tbody').append('<tr><td colspan="6" class="text-center text-muted">No order history yet</td></tr>');
        return;
    }

    [...orders].reverse().forEach(order => {
        let itemNames = order.itemList.map(i => i.name).join(', ');
        let totalQty  = order.itemList.reduce((sum, i) => sum + i.qty, 0);
        $('#order_history_tbody').append(`
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${itemNames}</td>
                <td>${totalQty}</td>
                <td>${parseFloat(order.totalPrice).toFixed(2)}</td>
                <td>${order.date}</td>
            </tr>
        `);
    });
}


// ---- Place Order (Save) ----
$('#order_save_btn').on('click', function () {
    let orderId      = $('#order_id_input').val();
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

    let totalQty = cart.reduce((a, b) => a + b.qty, 0);

    addOrderData(orderId, customerName, [...cart], totalQty, totalPrice, date);

    Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        html: `
            <b>Order ID:</b> ${orderId}<br>
            <b>Customer:</b> ${customerName}<br>
            <b>Total:</b> $${parseFloat(totalPrice).toFixed(2)}<br>
            <b>Date:</b> ${date}
        `
    });

    cleanOrderForm();
    loadOrderTbl();
    loadOrderHistoryTbl(); // update history immediately
})


// ---- Delete Order ----
$('#order_delete_btn').on('click', function () {
    let id = $('#order_id_input').val();

    if (!id || !getOrderDataById(id)) {
        Swal.fire({ icon: 'error', title: 'Select an existing order from the table first!' });
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
            loadOrderHistoryTbl();
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
    if (!order_obj) return;
    $('#order_id_input').val(order_obj.id);
    $('#order_date_input').val(order_obj.date);
    $('#order_totalPrice_input').val(order_obj.totalPrice);
})


// ---- Order History: Search ----
$('#order_history_search_btn').on('click', function () {
    let query   = $('#order_history_search_input').val().trim();
    let results = searchOrdersByCustomer(query);

    $('#order_history_tbody').empty();

    if (results.length === 0) {
        $('#order_history_tbody').append('<tr><td colspan="6" class="text-center text-muted">No results found</td></tr>');
        return;
    }

    results.forEach(order => {
        let itemNames = order.itemList.map(i => i.name).join(', ');
        let totalQty  = order.itemList.reduce((sum, i) => sum + i.qty, 0);
        $('#order_history_tbody').append(`
            <tr>
                <td>${order.id}</td>
                <td>${order.customerName}</td>
                <td>${itemNames}</td>
                <td>${totalQty}</td>
                <td>${parseFloat(order.totalPrice).toFixed(2)}</td>
                <td>${order.date}</td>
            </tr>
        `);
    });
})


// ---- Order History: Clear search ----
$('#order_history_clear_btn').on('click', function () {
    $('#order_history_search_input').val('');
    loadOrderHistoryTbl();
})


// ---- Register on window so non-module SidebarController can call these ----
window._loadCustomerDropdown = loadCustomerDropdown;
window._loadItemDropdown     = loadItemDropdown;
window._loadOrderHistoryTbl  = loadOrderHistoryTbl;

export { loadCustomerDropdown, loadItemDropdown, loadOrderTbl, loadOrderHistoryTbl };
