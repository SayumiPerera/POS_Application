// =================== DashboardController.js ===================
import { getCustomerData } from '../model/CustomerModel.js';
import { getItemData }     from '../model/ItemModel.js';
import { getOrderData }    from '../model/OrderModel.js';

//  Cards
function getTotalCustomers() {
    $('#dash_customers').text(getCustomerData().length);
}

function getTotalItems() {
    $('#dash_items').text(getItemData().length);
}

function getTotalOrders() {
    $('#dash_orders').text(getOrderData().length);
}

function getTotalRevenue() {
    // FIX: use order.totalPrice (not order.total)
    let total = getOrderData().reduce((sum, order) => sum + parseFloat(order.totalPrice || 0), 0);
    $('#dash_revenue').text('$' + total.toFixed(2));
}

// Recent Orders
function getRecentOrders() {
    $('#dash_recent_tbody').empty();
    let orders = getOrderData();

    if (orders.length === 0) {
        $('#dash_recent_tbody').html('<tr><td colspan="4" class="text-center text-muted">No orders yet</td></tr>');
        return;
    }

    [...orders].reverse().slice(0, 5).map(order => {
        let new_row = `<tr>
            <td>${order.id}</td>
            <td>${order.customerName}</td>
            <td>$${parseFloat(order.totalPrice).toFixed(2)}</td>
            <td>${order.date}</td>
        </tr>`;
        $('#dash_recent_tbody').append(new_row);
    });
}

// Load All
function loadDashboard() {
    getTotalCustomers();
    getTotalItems();
    getTotalOrders();
    getTotalRevenue();
    getRecentOrders();
}


loadDashboard();


window._loadDashboard = loadDashboard;

// =================== DashboardController.js ===================