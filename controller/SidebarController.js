

// ---- Hide all content sections ----
const hideAllContent = () => {
    $('.content').removeClass('active');
}

// ---- Set active sidebar item ----
const setSidebarActive = (el) => {
    $('.sidebar-item').removeClass('active');
    $(el).addClass('active');
}

// ---- Dashboard ----
$('#dashboard_sidebar_tab').on('click', function () {
    hideAllContent();
    $('#dashboard_content').addClass('active');
    $('#page-icon').attr('class', 'bi bi-house-door');
    $('#page-title').text('Dashboard');
    setSidebarActive(this);
    if (typeof window._loadDashboard === 'function') window._loadDashboard();
});

// ---- Customer ----
$('#customer_sidebar_tab').on('click', function () {
    hideAllContent();
    $('#customer_content').addClass('active');
    $('#page-icon').attr('class', 'bi bi-person');
    $('#page-title').text('Customer Management');
    setSidebarActive(this);
});

// ---- Item Tab ----
$('#item_sidebar_tab').on('click', function () {
    hideAllContent();
    $('#item_content').addClass('active');
    $('#page-icon').attr('class', 'bi bi-box-seam');
    $('#page-title').text('Item Management');
    setSidebarActive(this);
});

// ---- Order----
$('#order_sidebar_tab').on('click', function () {
    hideAllContent();
    $('#order_content').addClass('active');
    $('#page-icon').attr('class', 'bi bi-receipt');
    $('#page-title').text('Order Management');
    setSidebarActive(this);


    if (typeof window._loadCustomerDropdown === 'function') window._loadCustomerDropdown();
    if (typeof window._loadItemDropdown === 'function')     window._loadItemDropdown();
});

// ---- Order History ----
$('#order_history_sidebar_tab').on('click', function () {
    hideAllContent();
    $('#order_history_content').addClass('active');
    $('#page-icon').attr('class', 'bi bi-clock-history');
    $('#page-title').text('Order History');
    setSidebarActive(this);
    if (typeof window._loadOrderHistoryTbl === 'function') window._loadOrderHistoryTbl();
});

// ---- Logout ----
$('#logout_sidebar_tab').on('click', function () {
    Swal.fire({
        title: "Are you sure you want to logout?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, logout!"
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'login.html';
        }
    });
});

// ---- Mobile hamburger ----
$('#menu_btn').on('click', function () {
    $('#sidebar').toggleClass('open');
});
