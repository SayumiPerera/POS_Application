import { addOrderData, updateOrderData, deleteOrderData, getOrderData, getOrderDataByIndex, getOrderDataById , searchOrdersByCustomer} from '../model/OrderModel.js';


//------------------------- Load Order Table ------------------------------
const loadOrderTbl = () => {
    $('#order_tbody').empty();
    let orders = getOrderData();

    orders.map((item, index) => {
        let new_row = `<tr data-index="${index}">
            <td>${item.id}</td>
            <td>${item.customerName}</td>
            <td>${item.itemList}</td>
            <td>${item.qty}</td>
            <td>${item.totalPrice}</td>
            <td>${item.date}</td>
        </tr>`;
        $('#order_tbody').append(new_row);
    });
}


//------------------------- Clean Order Form ------------------------------
const cleanOrderForm = () => {
    $('#order_reset_btn').click();
}


//------------------------- Click on Order Row ------------------------------
$('#order_tbody').on('click', 'tr', function () {
    let order_obj = getOrderDataByIndex($(this).index());

    $('#order_id_input').val(order_obj.id);
    $('#order_customerName_input').val(order_obj.customerName);
    $('#order_itemList_input').val(order_obj.itemList);
    $('#order_qty_input').val(order_obj.qty);
    $('#order_totalPrice_input').val(order_obj.totalPrice);
    $('#order_date_input').val(order_obj.date);
})


//------------------------- Start: Order Save ------------------------------
$('#order_save_btn').on('click', function () {
    let id           = $('#order_id_input').val();
    let customerName = $('#order_customerName_input').val();
    let itemList     = $('#order_itemList_input').val();
    let qty          = $('#order_qty_input').val();
    let totalPrice   = $('#order_totalPrice_input').val();
    let date         = $('#order_date_input').val();

    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
        (getOrderDataById(id)) ? Swal.fire({ icon: "error", title: "Id already exists!" }) :
            (customerName === "") ? Swal.fire({ icon: "error", title: "Invalid Customer Name!" }) :
                (itemList === "") ? Swal.fire({ icon: "error", title: "Invalid Item List!" }) :
                    (qty === "") ? Swal.fire({ icon: "error", title: "Invalid Qty!" }) :
                        (totalPrice === "") ? Swal.fire({ icon: "error", title: "Invalid Total Price!" }) :
                            (date === "") ? Swal.fire({ icon: "error", title: "Invalid Date!" }) :
                                (() => {
                                    addOrderData(id, customerName, itemList, qty, totalPrice, date);
                                    cleanOrderForm();
                                    Swal.fire({ icon: "success", title: "Order saved successfully!" });
                                    loadOrderTbl();
                                })();
})
//------------------------- End: Order Save ------------------------------


//------------------------- Start: Order Update ------------------------------
$('#order_update_btn').on('click', function () {
    let id           = $('#order_id_input').val();
    let customerName = $('#order_customerName_input').val();
    let itemList     = $('#order_itemList_input').val();
    let qty          = $('#order_qty_input').val();
    let totalPrice   = $('#order_totalPrice_input').val();
    let date         = $('#order_date_input').val();

    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
        (!(getOrderDataById(id))) ? Swal.fire({ icon: "error", title: "Order not found!" }) :
            (customerName === "") ? Swal.fire({ icon: "error", title: "Invalid Customer Name!" }) :
                (itemList === "") ? Swal.fire({ icon: "error", title: "Invalid Item List!" }) :
                    (qty === "") ? Swal.fire({ icon: "error", title: "Invalid Qty!" }) :
                        (totalPrice === "") ? Swal.fire({ icon: "error", title: "Invalid Total Price!" }) :
                            (date === "") ? Swal.fire({ icon: "error", title: "Invalid Date!" }) :
                                (() => {
                                    updateOrderData(id, customerName, itemList, qty, totalPrice, date);
                                    cleanOrderForm();
                                    Swal.fire({ icon: "success", title: "Order updated successfully!" });
                                    loadOrderTbl();
                                })();
})
//------------------------- End: Order Update ------------------------------


//------------------------- Start: Order Delete ------------------------------
$('#order_delete_btn').on('click', function () {
    let id = $('#order_id_input').val();

    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
                (!(getOrderDataById(id))) ? Swal.fire({ icon: "error", title: "Order not found!" }) :
                    (() => {
                        deleteOrderData(id);
                        cleanOrderForm();
                        Swal.fire({ icon: "success", title: "Order deleted successfully!" });
                        loadOrderTbl();
                    })();
        }
    });
})
//------------------------- End: Order Delete ------------------------------


//------------------------- Load Order History Table ------------------------------

const loadOrderHistoryTbl = (orders = getOrderData()) => {
    $('#order_history_tbody').empty();

    if (orders.length === 0) {
        $('#order_history_tbody').append(
            `<tr><td colspan="6" class="text-center">No orders found</td></tr>`
        );
        return;
    }

    orders.map((item, index) => {
        let new_row = `<tr data-index="${index}">
            <td>${item.id}</td>
            <td>${item.customerName}</td>
            <td>${item.itemList}</td>
            <td>${item.qty}</td>
            <td>${item.totalPrice}</td>
            <td>${item.date}</td>
        </tr>`;
        $('#order_history_tbody').append(new_row);
    });
}