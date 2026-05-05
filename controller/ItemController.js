import { addItemData, updateItemData, deleteItemData, getItemData, getItemDataByIndex, getItemDataByCode } from '../model/ItemModel.js';
import { check_qty, check_unitPrice } from '../utils/regex_utils.js';


//------------------------- Load Item Table ------------------------------
const loadItemTbl = () => {
    $('#item_tbody').empty();
    let items = getItemData();

    if (items.length === 0) {
        $('#item_tbody').append('<tr><td colspan="4" class="text-center text-muted">No items yet</td></tr>');
        return;
    }

    items.map((item, index) => {
        let new_row = `<tr data-index="${index}">
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td>${parseFloat(item.unitPrice).toFixed(2)}</td>
            <td>${item.qty}</td>
        </tr>`;
        $('#item_tbody').append(new_row);
    });
}


//------------------------- Search Item Table ------------------------------
$('#item_search_input').on('input', function () {
    let query = $(this).val().toLowerCase();
    $('#item_tbody tr').each(function () {
        $(this).toggle($(this).text().toLowerCase().includes(query));
    });
});


//------------------------- Clean Item Form ------------------------------
const cleanItemForm = () => {
    $('#item_reset_btn').click();
}


//------------------------- Click on Item Row ------------------------------
$('#item_tbody').on('click', 'tr', function () {
    let item_obj = getItemDataByIndex($(this).index());
    if (!item_obj) return;

    $('#item_code_input').val(item_obj.code);
    $('#item_name_input').val(item_obj.name);
    $('#item_unitPrice_input').val(item_obj.unitPrice);
    $('#item_qty_input').val(item_obj.qty);
})


//------------------------- Start: Item Save ------------------------------
$('#item_save_btn').on('click', function () {
    let code      = $('#item_code_input').val().trim();
    let name      = $('#item_name_input').val().trim();
    let unitPrice = $('#item_unitPrice_input').val().trim();
    let qty       = $('#item_qty_input').val().trim();

    (code === "") ? Swal.fire({ icon: "error", title: "Invalid Code!" }) :
        (getItemDataByCode(code)) ? Swal.fire({ icon: "error", title: "Code already exists!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!" }) :
                (!check_unitPrice(unitPrice)) ? Swal.fire({ icon: "error", title: "Invalid Unit Price!", text: "Enter a number greater than 0." }) :
                    (!check_qty(qty)) ? Swal.fire({ icon: "error", title: "Invalid Qty!", text: "Enter a whole number (1 or more)." }) :
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
    let code      = $('#item_code_input').val().trim();
    let name      = $('#item_name_input').val().trim();
    let unitPrice = $('#item_unitPrice_input').val().trim();
    let qty       = $('#item_qty_input').val().trim();

    (code === "") ? Swal.fire({ icon: "error", title: "Invalid Code!" }) :
        (!(getItemDataByCode(code))) ? Swal.fire({ icon: "error", title: "Item not found!" }) :
            (name === "") ? Swal.fire({ icon: "error", title: "Invalid Name!" }) :
                (!check_unitPrice(unitPrice)) ? Swal.fire({ icon: "error", title: "Invalid Unit Price!", text: "Enter a number greater than 0." }) :
                    (!check_qty(qty)) ? Swal.fire({ icon: "error", title: "Invalid Qty!", text: "Enter a whole number (1 or more)." }) :
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
    let code = $('#item_code_input').val().trim();

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

export { loadItemTbl };
