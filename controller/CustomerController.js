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



//------------------------- Start: Customer Save ------------------------------
const addCustomerData = (cid, cname, caddress, ccontact ) => {
    let new_customer = {
        id: cid,
        name: cname,
        address: caddress,
        contact: ccontact
    };
    customer_db.push(new_customer);
    cleanCustomerForm();

    Swal.fire({ icon: "success", title: "customer saved successfully!"});

    loadCustomerTbl();
}

$('#customer_save_btn').on('click', function () {
    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let address = $('#customer_address_input').val();
    let contact = $('#customer_contact_input').val();


    (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (customer_db.find(item => item.id==id)) ? Swal.fire({ icon: "error", title: "Id is already exist!"}) :
            (name == "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                (address == "") ? Swal.fire({ icon: "error", title: "Invalid Address!"})
                (!check_contact(contact)) ? Swal.fire({ icon: "error", title: "Invalid Contact!"}) : addCustomerData(id, name, address, contact);
})
//------------------------- End: Customer Save ------------------------------



//------------------------- Start: Customer Update ------------------------------
const updateCustomerData = (cid, cname, ccontact, caddress) => {
    let obj = customer_db.find(item => item.id == cid);

    if(obj) {
        obj.name=cname;
        obj.contact=ccontact;
        obj.address=caddress;
    }

    cleanCustomerForm();

    Swal.fire({ icon: "success", title: "Customer updated successfully!"});

    loadCustomerTbl();
}


$('#customer_update_btn').on('click', function () {
    let id = $('#customer_id_input').val();
    let name = $('#customer_name_input').val();
    let contact = $('#customer_contact_input').val();
    let address = $('#customer_address_input').val();

    (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
        (!(getCustomerDataById(id))) ? Swal.fire({ icon: "error", title: "Customer not found!"}) :
            (name == "") ? Swal.fire({ icon: "error", title: "Invalid Name!"}) :
                (!check_contact(contact)) ? Swal.fire({ icon: "error", title: "Invalid Contact!"}) :
                    (address == "") ? Swal.fire({ icon: "error", title: "Invalid Address!"}) : updateCustomerData(id, name, contact ,address );

    cleanCustomerForm();
    Swal.fire({ icon: "success", title: "Customer updated successfully!"});
    loadCustomerTbl();
})
//------------------------- End: CustomerCustomer Update ------------------------------



//------------------------- Start: Customer Delete ------------------------------
const deleteCustomerData = (sid) => {
    let index = customer_db.findIndex(item => item.id == sid); // -1

    if(index!==-1) {
        customer_db.splice(index, 1);
    }

    cleanCustomerForm();
    Swal.fire({ icon: "success", title: "Customer deleted successfully!"});
    loadCustomerTbl();
}

$('#customer_delete_btn').on('click', function () {
    let id = $('#customer_id_input').val();

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
            (id == "") ? Swal.fire({ icon: "error", title: "Invalid Id!"}) :
                (!(customer_db.find(item => item.id==id))) ? Swal.fire({ icon: "error", title: "customer not found!"}) : deleteCustomerData(id);
        };
    });
});
//------------------------- End: Customer Delete ------------------------------