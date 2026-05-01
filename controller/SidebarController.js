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

$('#item_content').css('display', 'none');

$('#customer_sidebar_tab').on('click', function () {
    $('#item_content').css('display', 'none');
    $('#customer_content').css('display', 'block');
    $('#order_content').css('display', 'none');
})

$('#item_sidebar_tab').on('click', function () {
    $('#item_content').css('display', 'block');
    $('#customer_content').css('display', 'none');
    $('#order_content').css('display', 'none');

})

$('#order_sidebar_tab').on('click', function () {
    $('#item_content').css('display', 'block');
    $('#customer_content').css('display', 'none');
    $('#order_content').css('display', 'none');
})
// ------------------------ Sidebar Handler --------------------------