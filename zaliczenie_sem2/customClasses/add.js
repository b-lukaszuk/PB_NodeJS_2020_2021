"use strict";
class Add {

    /**
     * @param {number} id - private - set by the system (see adds.js in routes)
     * @param {string} title
     * @param {string} description
     * @param {string} category
     * @param {string[]} tags
     * @param {number} price
     */
    constructor(id, title, description, author, category, tags, price) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.author = author;
        this.category = category;
        this.tags = tags;
        this.price = price;
    }

    /**
     * returns value of a field of Add
     * @param {string} key - name of the field
     */
    getField(key) {
        return this[key];
    }

    /**
     * sets field to a value
     * @param {string} key - name of the field
     * @param {any} value - new value of a field (no check for corectness)
     */
    setField(key, value) {
        if (key === "id") {
            throw Error("Cannot set id. " +
                "Id is set authomatically only during object creation");
        } else {
            this[key] = value;
        }
    }
}

module.exports = { Add: Add };
