import {customer_db} from '../db/db.js';


//------------------------- Load customer Tbl ------------------------------
const loadCustomerTbl = () => {
    $('#customer_tbody').empty();

    customer_db.map((item, index) => {
        let new_row = `<tr data-index="${index}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.address}</td> <td>${item.contact}</td> </tr>`;
        $('#customer_tbody').append(new_row);
    });
}


//------------------------- Clean customer Form ------------------------------
const cleanCustomerForm = () => {
    $('#customer_reset_btn').click();
}



//------------------------- Click on customer Row ------------------------------
$('#customer_tbody').on('click', 'tr', function () {
    let customer_obj = customer_db[$(this).index()];

    $('#customer_id_input').val(customer_obj.id);
    $('#customer_name_input').val(customer_obj.name);
    $('#customer_address_input').val(customer_obj.address);
    $('#customer_contact_input').val(customer_obj.contact);
})
