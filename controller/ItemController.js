import { addItemData, updateItemData, deleteItemData, getItemData, getItemDataByIndex, getItemDataByCode } from '../model/ItemModel.js';
import { check_qty, check_unitPrice } from '../util/regex_utils.js';


//------------------------- Load Item Table ------------------------------
const loadItemTbl = () => {
    $('#item_tbody').empty();
    let items = getItemData();

    items.map((item, index) => {
        let new_row = `<tr data-index="${index}">
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${item.unitPrice}</td>
            <td>${item.qty}</td>
        </tr>`;
        $('#item_tbody').append(new_row);
    });
}


//------------------------- Clean Item Form ------------------------------
const cleanItemForm = () => {
    $('#item_reset_btn').click();
}


//------------------------- Click on Item Row ------------------------------
$('#item_tbody').on('click', 'tr', function () {
    let item_obj = getItemDataByIndex($(this).index());

    $('#item_code_input').val(item_obj.code);
    $('#item_name_input').val(item_obj.name);
    $('#item_unitPrice_input').val(item_obj.unitPrice);
    $('#item_qty_input').val(item_obj.qty);
})


//------------------------- Start: Item Save ------------------------------
$('#item_save_btn').on('click', function () {
    let code      = $('#item_code_input').val();
    let name      = $('#item_name_input').val();
    let unitPrice = $('#item_unitPrice_input').val();
    let qty       = $('#item_qty_input').val();

    (code === "") ? Swal.fire({ icon: "error", title: "Invalid Code!" }) :
        (getItemDataByCode(code)) ? Swal.fire({ icon: "error", title: "Code already exists!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!" }) :
                (!check_unitPrice(unitPrice)) ? Swal.fire({ icon: "error", title: "Invalid Unit Price!" }) :
                    (!check_qty(qty)) ? Swal.fire({ icon: "error", title: "Invalid Qty!" }) :
                        (() => {
                            addItemData(code, name, unitPrice, qty);
                            cleanItemForm();
                            Swal.fire({ icon: "success", title: "Item saved successfully!" });
                            loadItemTbl();
                        })();
})
//------------------------- End: Item Save ------------------------------


//------------------------- Start: Item Update ------------------------------
$('#item_update_btn').on('click', function () {
    let code      = $('#item_code_input').val();
    let name      = $('#item_name_input').val();
    let unitPrice = $('#item_unitPrice_input').val();
    let qty       = $('#item_qty_input').val();

    (code === "") ? Swal.fire({ icon: "error", title: "Invalid Code!" }) :
        (!(getItemDataByCode(code))) ? Swal.fire({ icon: "error", title: "Item not found!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!" }) :
                (!check_unitPrice(unitPrice)) ? Swal.fire({ icon: "error", title: "Invalid Unit Price!" }) :
                    (!check_qty(qty)) ? Swal.fire({ icon: "error", title: "Invalid Qty!" }) :
                        (() => {
                            updateItemData(code, name, unitPrice, qty);
                            cleanItemForm();
                            Swal.fire({ icon: "success", title: "Item updated successfully!" });
                            loadItemTbl();
                        })();
})
//------------------------- End: Item Update ------------------------------


//------------------------- Start: Item Delete ------------------------------
$('#item_delete_btn').on('click', function () {
    let code = $('#item_code_input').val();

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
            (code === "") ? Swal.fire({ icon: "error", title: "Invalid Code!" }) :
                (!(getItemDataByCode(code))) ? Swal.fire({ icon: "error", title: "Item not found!" }) :
                    (() => {
                        deleteItemData(code);
                        cleanItemForm();
                        Swal.fire({ icon: "success", title: "Item deleted successfully!" });
                        loadItemTbl();
                    })();
        }
    });
})
//------------------------- End: Item Delete ------------------------------