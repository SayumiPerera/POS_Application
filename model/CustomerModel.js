// ---- Database ----
// let customer_db = [];
import {customer_db} from '../db/db.js';

class Customer {
    #id;
    #name;
    #contact;
    #address;

    constructor(id, name, contact, address) {
        this.#id = id;
        this.#name = name;
        this.#contact = contact;
        this.#address = address;
    }

    get id()      {
        return this.#id;
    }
    get name()    {
        return this.#name;
    }
    get contact() {
        return this.#contact;
    }
    get address() {
        return this.#address;
    }

    set id(id)           {
        this.#id = id;
    }
    set name(name)       {
        this.#name = name;
    }
    set contact(contact) {
        this.#contact = contact;
    }
    set address(address) {
        this.#address = address;
    }

}


// --------------------------- Add Customer ---------------------------
const addCustomerData = (cid, cname, ccontact, caddress) => {
    let new_customer = new Customer(cid, cname, ccontact, caddress);
    customer_db.push(new_customer);
}

// --------------------------- Update Customer ---------------------------
const updateCustomerData = (cid, cname, ccontact, caddress) => {
    let obj = customer_db.find(item => item.id == cid);
    if (obj) {
        obj.name = cname;
        obj.contact = ccontact;
        obj.address = caddress;
    }
}

// --------------------------- Delete Customer ---------------------------
const deleteCustomerData = (cid) => {
    let index = customer_db.findIndex(item => item.id == cid);
    if (index !== -1) {
        customer_db.splice(index, 1);
    }
}

// --------------------------- Get All Customers ---------------------------
const getCustomerData = () => {
    return customer_db;
}

// --------------------------- Get Customer by Index ---------------------------
const getCustomerDataByIndex = (index) => {
    return customer_db[index];
}

// --------------------------- Get Customer by ID ---------------------------
const getCustomerDataById = (id) => {
    return customer_db.find(item => item.id == id);
}

export { addCustomerData, updateCustomerData, deleteCustomerData, getCustomerData, getCustomerDataByIndex, getCustomerDataById };