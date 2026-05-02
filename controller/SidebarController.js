// ------------------------ Sidebar Handler --------------------------
let sidebar_open = true;
$('#menu_btn').on('click', function () {
    if(sidebar_open) {
        $('#sidebar').css({display: 'none'});
        $('.content').css({marginLeft: '0px'});
        sidebar_open = false;
    } else {
        $('#sidebar').css({display: 'block'});
        $('.content').css({marginLeft: '250px'});
        sidebar_open = true;
    }
})


// ---- Default Dashboard ----
$('#customer_content').css('display', 'none');
$('#item_content').css('display', 'none');
$('#order_content').css('display', 'none');
$('#dashboard_content').css('display', 'block');


// ---- Section Switcher ----
function showSection(sectionId) {
    $('.content').css('display', 'none');
    $('#' + sectionId).css('display', 'block');
}

$('#dashboard_sidebar_tab').on('click', () => showSection('dashboard_content'));
$('#customer_sidebar_tab').on('click',  () => showSection('customer_content'));
$('#item_sidebar_tab').on('click',      () => showSection('item_content'));
$('#order_sidebar_tab').on('click',     () => showSection('order_content'));







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