class Customer {
    #id
    #name;
    #contact;
    #address;


    constructor(id, name, contact, address) {
        this.#id = id;
        this.#name = name;
        this.#contact = contact;
        this.#address = address;
    }


    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get contact() {
        return this.#contact;
    }

    get address() {
        return this.#address;
    }


    set id(id) {
        this.#id = id;
    }

    set name(name) {
        this.#name = name;
    }

    set contact(contact) {
        this.#contact = contact;
    }

    set address(address) {
        this.#address = address;
    }

}