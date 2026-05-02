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


// --------------------------- Add Order ---------------------------
const addOrderData = (oid, ocustomerName, oitemList, oqty, ototalPrice, odate) => {
    let new_order = new Order(oid, ocustomerName, oitemList, oqty, ototalPrice, odate);
    order_db.push(new_order);
}

// --------------------------- Update Order ---------------------------
const updateOrderData = (oid, ocustomerName, oitemList, oqty, ototalPrice, odate) => {
    let obj = order_db.find(order => order.id === oid);
    if (obj) {
        obj.customerName = ocustomerName;
        obj.itemList = oitemList;
        obj.qty = oqty;
        obj.totalPrice = ototalPrice;
        obj.date = odate;
    }
}

// --------------------------- Delete Order ---------------------------
const deleteOrderData = (oid) => {
    let index = order_db.findIndex(order => order.id === oid);
    if (index !== -1) {
        order_db.splice(index, 1);
    }
}

// --------------------------- Get All Orders ---------------------------
const getOrderData = () => {
    return order_db;
}

// --------------------------- Get Order by Index ---------------------------
const getOrderDataByIndex = (index) => {
    return order_db[index];
}

// --------------------------- Get Order by Id ---------------------------
const getOrderDataById = (id) => {
    return order_db.find(order => order.id === id);
}

export { addOrderData, updateOrderData, deleteOrderData, getOrderData, getOrderDataByIndex, getOrderDataById };