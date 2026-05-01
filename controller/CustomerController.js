import {customer_db} from '../db/db.js';


//------------------------- Load customer Tbl ------------------------------
const loadCustomerTbl = () => {
    $('#customer_tbody').empty();

    customer_db.map((item, index) => {
        let new_row = `<tr data-index="${index}"> <td>${item.id}</td> <td>${item.name}</td> <td>${item.address}</td> <td>${item.contact}</td> </tr>`;
        $('#customer_tbody').append(new_row);
    });
}
