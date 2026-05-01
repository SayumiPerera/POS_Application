import {item_db} from '../db/db.js';


//------------------------- Load Item Tbl ------------------------------
const loadItemTbl = () => {
    $('#item_tbody').empty();
    let item_db = getItemData();

    item_db.map((item, index) => {
        let new_row = `<tr data-index="${index}"> <td>${item.code}</td> <td>${item.name}</td> <td>${item.unitPrice}</td> <td>${item.qty}</td> </tr>`;
        $('#item_tbody').append(new_row);
    });
}


//------------------------- Clean Item Form ------------------------------
const cleanItemForm = () => {
    $('#item_reset_btn').click();
}



//------------------------- Click on Item Row ------------------------------
$('#item_tbody').on('click', 'tr', function () {
    let Item_obj = getItemDataByIndex($(this).index());

    $('#item_code_input').val(item_obj.code);
    $('#item_name_input').val(item_obj.name);
    $('#item_unitPrice_input').val(item_obj.unitPrice);
    $('#item_qty_input').val(item_obj.qty);
})

