function allKeysAndSymbols(object) {
    let keysAndSymbols = [];

    if (object) {
        keysAndSymbols = [
            ...Object.getOwnPropertyNames(object),
            ...Object.getOwnPropertySymbols(object),
            ...allKeysAndSymbols(Object.getPrototypeOf(object)),
        ];
    }

    keysAndSymbols = Array.from(new Set(keysAndSymbols));

    return keysAndSymbols;
}

module.exports = allKeysAndSymbols;