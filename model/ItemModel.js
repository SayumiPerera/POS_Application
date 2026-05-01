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



    // --------------------------- Add Item ---------------------------
    const addItemData = (icode, iname, iunitPrice, iqty) => {
        let new_item = new Item(icode, iname, iunitPrice, iqty);
        item_db.push(new_item);
    }

    // --------------------------- Update Item ---------------------------
    const updateItemData = (icode, iname, iunitPrice, iqty) => {
        let obj = item_db.find(item => item.code == icode);

        if(obj) {
            obj.name=iname;
            obj.unitPrice=iunitPrice;
            obj.qty=iqty
        }
    }

// --------------------------- Delete Item ---------------------------
    const deleteItemData = (icode) => {
        let index = item_db.findIndex(item => item.code == icode);

        if(index!==-1) {
            item_db.splice(index, 1);
        }
    }

// --------------------------- Get Item ---------------------------
    const getItemData = () => {
        return item_db;
    }

// --------------------------- Get Item by Index ---------------------------
    const getItemDataByIndex = (index) => {
        return item_db[index];
    }

// --------------------------- Get Item by Id ---------------------------
    const getItemDataById = (code) => {
        return item_db.find(item => item.code==code);
    }

    export {addItemData, updateItemData, deleteItemData, getItemData, getItemDataByIndex, getItemDataById};


}