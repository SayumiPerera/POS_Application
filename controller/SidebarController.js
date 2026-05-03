// ------------------------ Sidebar Handler --------------------------

// ---- Sidebar Toggle ----
let sidebar_open = true;

$('#menu_btn').on('click', function () {
    if (sidebar_open) {
        $('#sidebar').addClass('hidden');
        sidebar_open = false;
    } else {
        $('#sidebar').removeClass('hidden');
        sidebar_open = true;
    }
})


// ---- Section Switcher ----
function showSection(sectionId, title, icon) {
    $('.content').removeClass('active');           // hide all sections
    $('.sidebar-item').removeClass('active');       // remove active from all tabs
    $('#' + sectionId).addClass('active');         // show target section
    $('#page-title').text(title);                  // update topbar title
    $('#page-icon').attr('class', 'bi ' + icon);  // update topbar icon
}


// ---- Sidebar Tab Clicks ----
$('#dashboard_sidebar_tab').on('click', function () {
    $(this).addClass('active');
    showSection('dashboard_content', 'Dashboard', 'bi-house-door');
});

$('#customer_sidebar_tab').on('click', function () {
    $(this).addClass('active');
    showSection('customer_content', 'Customer Management', 'bi-person');
});

$('#item_sidebar_tab').on('click', function () {
    $(this).addClass('active');
    showSection('item_content', 'Item Management', 'bi-box-seam');
});

$('#order_sidebar_tab').on('click', function () {
    $(this).addClass('active');
    showSection('order_content', 'Order Management', 'bi-receipt');
});

$('#order_history_sidebar_tab').on('click', function () {
    $(this).addClass('active');
    showSection('order_history_content', 'Order History', 'bi-clock-history');
    loadOrderHistoryTbl();  // reload fresh data every time
});

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

// ------------------------ Sidebar Handler --------------------------





// $('#item_content').css('display', 'none');
//
// $('#customer_sidebar_tab').on('click', function () {
//     $('#item_content').css('display', 'none');
//     $('#customer_content').css('display', 'block');
//     $('#order_content').css('display', 'none');
// })
//
// $('#item_sidebar_tab').on('click', function () {
//     $('#item_content').css('display', 'block');
//     $('#customer_content').css('display', 'none');
//     $('#order_content').css('display', 'none');
//
// })
//
// $('#order_sidebar_tab').on('click', function () {
//     $('#item_content').css('display', 'none');
//     $('#customer_content').css('display', 'none');
//     $('#order_content').css('display', 'block');
// })




// ------------------------ Sidebar Handler --------------------------