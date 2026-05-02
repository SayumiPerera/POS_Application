class Order {
    #id
    #customerName;
    #itemList;
    #qty;
    #totalPrice;
    #date;


    constructor(id, customerName, itemList, qty, totalPrice, date) {
        this.#id = id;
        this.#customerName = customerName;
        this.#itemList = itemList;
        this.#qty = qty;
        this.#totalPrice = totalPrice;
        this.#date = date;

    }


    get id(){
        return this.#id;
    }

    get customerName(){
        return this.#customerName;
    }

    get itemList() {
        return this.#itemList;
    }

    get qty() {
        return this.#qty;
    }

    get totalPrice() {
        return this.#totalPrice;
    }

    get date() {
        return this.#date;
    }


    set id(id) {
        this.#id = id;
    }

    set customerName(customerName) {
        this.#customerName = customerName;
    }

    set itemList(itemList) {
        this.#itemList = itemList;
    }

    set qty(qty) {
        this.#qty = qty;
    }

    set totalPrice(totalPrice) {
        this.#totalPrice = totalPrice;
    }

    set date(date) {
        this.#date = date;
    }

}

