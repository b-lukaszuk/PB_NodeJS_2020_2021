class Notice {

    /**
     * @param {number} id
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

    getField(key) {
        return this[key];
    }

    setField(key, value) {
        this[key] = value;
    }

}

module.exports = { Notice: Notice };
