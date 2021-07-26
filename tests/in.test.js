const proxify = require("../in");

describe("in", () => {
    let proto, object, symbol;

    beforeEach(() => {
        proto = { value: 42 };
        object = Object.create(proto);

        Object.defineProperty(object, "year", {
            value: 2021,
            writable: true,
            configurable: true,
            enumerable: false,
        });

        symbol = Symbol("bazzinga");
        object[symbol] = 42;
    });

    describe("Без proxy", () => {
        test('"value" in object', () => {
            expect("value" in object).toBeTruthy();
        });

        test('"year" in object', () => {
            expect("year" in object).toBeTruthy();
        });

        test("symbol in object", () => {
            expect(symbol in object).toBeTruthy();
        });
    });

    describe("С proxy", () => {
        let proxy;

        beforeEach(() => {
            proxy = proxify(object);
        });

        test('"value" in proxy', () => {
            expect("value" in proxy).toBeFalsy();
        });

        test('"year" in proxy', () => {
            expect("year" in proxy).toBeTruthy();
        });

        test("symbol in proxy", () => {
            expect(symbol in proxy).toBeTruthy();
        });
    });
});
