import { addOrderData, updateOrderData, deleteOrderData, getOrderData, getOrderDataByIndex, getOrderDataById } from '../model/OrderModel.js';


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


