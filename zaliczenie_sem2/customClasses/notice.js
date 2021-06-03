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

    getId() {
        return this._id;
    }

    getTitle() {
        return this.title;
    }

    setTitle(title) {
        this.title = title;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getAuthor() {
        return this.author;
    }

    setAuthor(author) {
        this.author = author;
    }

    getCategory() {
        return this.category;
    }

    setCategory(category) {
        this.category = category;
    }

    getTags() {
        return this.tags;
    }

    setTags(tags) {
        this.tags = tags;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }
}

module.exports = { Notice: Notice };
