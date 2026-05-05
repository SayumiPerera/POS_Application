// Contact Regex

const contact_regex = new RegExp("^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$");

const check_contact = (contact) => {
    return contact_regex.test(contact);
}

// Unit Price Regex

const unitPrice_regex = new RegExp("^[0-9]+(\\.[0-9]{1,2})?$");

const check_unitPrice = (unitPrice) => {
    return unitPrice_regex.test(String(unitPrice)) && parseFloat(unitPrice) > 0;
}

//  Qty Regex

const qty_regex = new RegExp("^[1-9][0-9]*$");

const check_qty = (qty) => {
    return qty_regex.test(String(qty));
}

export { check_contact, check_unitPrice, check_qty };
