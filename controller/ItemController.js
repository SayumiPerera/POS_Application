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