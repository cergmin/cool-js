const allKeysAndSymbols = require("../allKeysAndSymbols");

const objectKeysAndSymbols = [
    "constructor",
    "__defineGetter__",
    "__defineSetter__",
    "hasOwnProperty",
    "__lookupGetter__",
    "__lookupSetter__",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toString",
    "valueOf",
    "toLocaleString",
    "__proto__",
];

describe("allKeysAndSymbols", () => {
    test("Пустой объект", () => {
        const object = {};

        const expectedKeys = [...objectKeysAndSymbols].sort();
        const outputKeys = allKeysAndSymbols(object).sort();
        expect(outputKeys).toEqual(expectedKeys);
    });

    test("Объект с нестандартным прототипом", () => {
        const prototype = { question: 42 };

        const object = {};
        Object.setPrototypeOf(object, prototype);

        const expectedKeys = ["question", ...objectKeysAndSymbols].sort();
        const outputKeys = allKeysAndSymbols(object).sort();
        expect(outputKeys).toEqual(expectedKeys);
    });

    test("Объект с 2-мя поколениями нестандартных прототипов", () => {
        const prototypeGen1 = { generationA: 1 };

        const prototypeGen2 = { generationB: 2 };
        Object.setPrototypeOf(prototypeGen2, prototypeGen1);

        const object = {};
        Object.setPrototypeOf(object, prototypeGen2);

        const expectedKeys = [
            "generationA",
            "generationB",
            ...objectKeysAndSymbols,
        ].sort();
        const outputKeys = allKeysAndSymbols(object).sort();
        expect(outputKeys).toEqual(expectedKeys);
    });

    test("Объект с 3-мя поколениями нестандартных прототипов", () => {
        const prototypeGen1 = { generationA: 1 };

        const prototypeGen2 = { generationB: 2 };
        Object.setPrototypeOf(prototypeGen2, prototypeGen1);

        const prototypeGen3 = { generationC: 3 };
        Object.setPrototypeOf(prototypeGen3, prototypeGen2);

        const object = {};
        Object.setPrototypeOf(object, prototypeGen3);

        const expectedKeys = [
            "generationA",
            "generationB",
            "generationC",
            ...objectKeysAndSymbols,
        ].sort();
        const outputKeys = allKeysAndSymbols(object).sort();
        expect(outputKeys).toEqual(expectedKeys);
    });

    test("Объект с 3-мя поколениями прототипов, у которых одинаковые поля", () => {
        const prototypeGen1 = { question: 41 };

        const prototypeGen2 = { question: 42 };
        Object.setPrototypeOf(prototypeGen2, prototypeGen1);

        const prototypeGen3 = { question: 43 };
        Object.setPrototypeOf(prototypeGen3, prototypeGen2);

        const object = {};
        Object.setPrototypeOf(object, prototypeGen3);

        const expectedKeys = ["question", ...objectKeysAndSymbols].sort();
        const outputKeys = allKeysAndSymbols(object).sort();
        expect(outputKeys).toEqual(expectedKeys);
    });
});
