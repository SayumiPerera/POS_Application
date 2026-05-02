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


