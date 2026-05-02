import { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByIndex, getCustomerDataById } from '../model/CustomerModel.js';
import { check_contact } from '../utils/regex_utils.js';


//------------------------- Load Customer Table ------------------------------
const loadCustomerTbl = () => {
    $('#customer_tbody').empty();
    let customers = getCustomerData();

    customers.map((item, index) => {
        let new_row = `<tr data-index="${index}">
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.contact}</td>
            <td>${item.address}</td>
        </tr>`;
        $('#customer_tbody').append(new_row);
    });
}


//------------------------- Clean Customer Form ------------------------------
const cleanCustomerForm = () => {
    $('#customer_reset_btn').click();
}


//------------------------- Click on Customer Row ------------------------------
$('#customer_tbody').on('click', 'tr', function () {
    let customer_obj = getCustomerDataByIndex($(this).index());

    $('#customer_id_input').val(customer_obj.id);
    $('#customer_name_input').val(customer_obj.name);
    $('#customer_contact_input').val(customer_obj.contact);
    $('#customer_address_input').val(customer_obj.address);
})


//------------------------- Start: Customer Save ------------------------------
$('#customer_save_btn').on('click', function () {
    let id      = $('#customer_id_input').val();
    let name    = $('#customer_name_input').val();
    let contact = $('#customer_contact_input').val();
    let address = $('#customer_address_input').val();

    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
        (getCustomerDataById(id)) ? Swal.fire({ icon: "error", title: "Id already exists!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!" }) :
                (!check_contact(contact)) ? Swal.fire({ icon: "error", title: "Invalid Contact!" }) :
                    (address === "") ? Swal.fire({ icon: "error", title: "Invalid Address!" }) :
                        (() => {
                            addCustomerData(id, name, contact, address);
                            cleanCustomerForm();
                            Swal.fire({ icon: "success", title: "Customer saved successfully!" });
                            loadCustomerTbl();
                        })();
})
//------------------------- End: Customer Save ------------------------------


//------------------------- Start: Customer Update ------------------------------
$('#customer_update_btn').on('click', function () {
    let id      = $('#customer_id_input').val();
    let name    = $('#customer_name_input').val();
    let contact = $('#customer_contact_input').val();
    let address = $('#customer_address_input').val();

    (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
        (!(getCustomerDataById(id))) ? Swal.fire({ icon: "error", title: "Customer not found!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!" }) :
                (!check_contact(contact)) ? Swal.fire({ icon: "error", title: "Invalid Contact!" }) :
                    (address === "") ? Swal.fire({ icon: "error", title: "Invalid Address!" }) :
                        (() => {
                            updateCustomerData(id, name, contact, address);
                            cleanCustomerForm();
                            Swal.fire({ icon: "success", title: "Customer updated successfully!" });
                            loadCustomerTbl();
                        })();
})
//------------------------- End: Customer Update ------------------------------


//------------------------- Start: Customer Delete ------------------------------
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
            (id === "") ? Swal.fire({ icon: "error", title: "Invalid Id!" }) :
                (!(getCustomerDataById(id))) ? Swal.fire({ icon: "error", title: "Customer not found!" }) :
                    (() => {
                        deleteCustomerData(id);
                        cleanCustomerForm();
                        Swal.fire({ icon: "success", title: "Customer deleted successfully!" });
                        loadCustomerTbl();
                    })();
        }
    });
})
//------------------------- End: Customer Delete ------------------------------