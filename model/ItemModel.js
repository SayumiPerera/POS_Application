class Item {
    #code
    #name;
    #unitPrice;
    #qty;


    constructor(code, name, unitPrice, qty) {
        this.#code = code;
        this.#name = name;
        this.#unitPrice = unitPrice;
        this.#qty = qty;
    }


    get code(){
        return this.#code;
    }

    get name(){
        return this.#name;
    }

    get unitPrice() {
        return this.#unitPrice;
    }

    get qty() {
        return this.#qty;
    }


    set code(code) {
        this.#code = code;
    }

    set name(name) {
        this.#name = name;
    }

    set unitPrice(unitPrice) {
        this.#unitPrice = unitPrice;
    }

    set qty(qty) {
        this.#qty = qty;
    }

}