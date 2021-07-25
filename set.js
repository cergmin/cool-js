class MySet {
    #items;

    constructor(iterable) {
        this.#items = [];

        for (const item of iterable) {
            this.add(item);
        }
    }

    [Symbol.iterator]() {
        return this.#items.values();
    }

    get [Symbol.toStringTag]() {
        return "MySet";
    }

    get size() {
        return this.#items.length;
    }

    has(item) {
        return this.#items.includes(item);
    }

    add(item) {
        if (!this.has(item)) {
            this.#items.push(item);
        }
    }

    delete(item) {
        const itemIndex = this.#items.indexOf(item);

        if (itemIndex !== -1) {
            this.#items.splice(itemIndex, 1);
        }
    }

    clear() {
        this.#items = [];
    }

    keys() {
        return this.#items.values();
    }

    values() {
        return this.#items.values();
    }

    *entries() {
        for (let i = 0; i < this.#items.length; i++) {
            const value = this.#items[i];
            yield [value, value];
        }
    }

    forEach(callback, thisArg) {
        const self = this;

        this.#items.forEach((value) => {
            callback.call(thisArg, value, value, self);
        });
    }
}

module.exports = MySet;
