const contact_regex = new RegExp("^[0]{1}[7]{1}[01245678]{1}[0-9]{7}$");

const check_contact = (contact) => {
    return contact_regex.test(contact);
}

export {check_contact};