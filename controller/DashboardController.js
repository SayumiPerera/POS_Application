// =================== DashboardController.js ===================
import { getCustomerData } from '../model/CustomerModel.js';
import { getItemData }     from '../model/ItemModel.js';
import { getOrderData }    from '../model/OrderModel.js';

// ---- Cards ----
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
    let total = getOrderData().reduce((sum, order) => sum + order.total, 0);
    $('#dash_revenue').text('$' + total.toFixed(2));
}

// ---- Recent Orders (last 5) ----
function getRecentOrders() {
    $('#dash_recent_tbody').empty();
    let orders = getOrderData();

    if (orders.length === 0) {
        $('#dash_recent_tbody').html('<tr><td colspan="4" class="text-center text-muted">No orders yet</td></tr>');
        return;
    }

    [...orders].reverse().slice(0, 5).map(order => {
        let new_row = `<tr>
            <td>${order.order_id}</td>
            <td>${order.customer_name}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td>${order.date}</td>
        </tr>`;
        $('#dash_recent_tbody').append(new_row);
    });
}

// ---- Low Stock Alert (qty <= 5) ----
function getLowStockItems() {
    let low_stock = getItemData().filter(item => item.qty <= 5);

    if (low_stock.length > 0) {
        let item_names = low_stock.map(i => `<b>${i.name}</b> (Qty: ${i.qty})`).join(', ');
        Swal.fire({
            icon: "warning",
            title: "Low Stock Alert!",
            html: `These items are running low: ${item_names}`,
            confirmButtonColor: "#e8900a"
        });
    }
}

// ---- Load All ----
export function loadDashboard() {
    getTotalCustomers();
    getTotalItems();
    getTotalOrders();
    getTotalRevenue();
    getRecentOrders();
    getLowStockItems();
}

loadDashboard();

// =================== DashboardController.js ===================