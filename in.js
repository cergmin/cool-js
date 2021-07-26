function proxify(object) {
    return new Proxy(object, {
        has(target, property) {
            return target.hasOwnProperty(property);
        },
    });
}

module.exports = proxify;
