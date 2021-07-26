const MySet = require("../MySet");

describe("MySet", () => {
    let set;

    beforeEach(() => {
        set = new MySet([4, 8, 15, 15, 16, 23, 42]);
    });

    test("хранит только уникальные значения", () => {
        expect([...set]).toStrictEqual([4, 8, 15, 16, 23, 42]);
    });

    test("есть свойство size", () => {
        expect(set).toHaveProperty("size");
    });

    test("в свойстве size хранится размер", () => {
        expect(set.size).toBe(6);
    });

    test("есть метод keys", () => {
        expect(set).toHaveProperty("keys");
    });

    test("есть метод values", () => {
        expect(set).toHaveProperty("values");
    });

    test("есть метод entries", () => {
        expect(set).toHaveProperty("entries");
    });

    test("есть метод clear", () => {
        expect(set).toHaveProperty("clear");
    });

    test("метод clear очищает множество", () => {
        // Проверяем, что множество инициализировано
        expect(set.size).toBeGreaterThan(0);

        set.clear();
        expect(set.size).toBe(0);
    });

    test("есть метод add", () => {
        expect(set).toHaveProperty("add");
    });

    test("метод add добавляет уникальное значение", () => {
        const initSize = set.size;
        set.add(0);
        expect(set.size).toBeGreaterThan(initSize);
    });

    test("метод add не добавляет повторяющееся значение", () => {
        let initSize = set.size;
        set.add(4);
        expect(set.size).toBe(initSize);
    });

    test("есть метод delete", () => {
        expect(set).toHaveProperty("delete");
    });

    test("метод delete удаляет искомое значение, если он есть в множестве", () => {
        const initSize = set.size;
        set.delete(4);
        expect(set.size).toBeLessThan(initSize);
    });

    test("метод delete не меняет множество, если в нём нет искомого значения", () => {
        const initSize = set.size;
        set.delete(0);
        expect(set.size).toBe(initSize);
    });

    test("есть метод has", () => {
        expect(set).toHaveProperty("has");
    });

    test("метод has проверяет, есть ли искомое значение в множестве", () => {
        expect(set.has(4)).toBeTruthy();
        expect(set.has(0)).toBeFalsy();
    });

    test("разные объекты могут быть разными ключами", () => {
        const object = {
            getValue() {
                return this.value;
            },
        };

        const data = {
            value: 42,
        };

        expect(set.has({})).toBeFalsy();
        expect(set.has(object)).toBeFalsy();
        expect(set.has(data)).toBeFalsy();

        set.add(object);
        set.add(data);

        expect(set.has({})).toBeFalsy();
        expect(set.has(object)).toBeTruthy();
        expect(set.has(data)).toBeTruthy();

        set.delete(data);

        expect(set.has({})).toBeFalsy();
        expect(set.has(object)).toBeTruthy();
        expect(set.has(data)).toBeFalsy();
    });

    test("set === set.valueOf()", () => {
        expect(set === set.valueOf()).toBeTruthy();
    });

    test("String(set) === '[object MySet]'", () => {
        expect(String(set)).toBe("[object MySet]");
    });

    test("Object.prototype.toString.call(set) === '[object MySet]'", () => {
        expect(Object.prototype.toString.call(set)).toBe("[object MySet]");
    });

    test("есть forEach", () => {
        expect(set).toHaveProperty("forEach");
    });

    test("есть forEach, который делает какие-то странные вещи...", () => {
        set.clear();

        const object = {
            getValue() {
                return this.value;
            },
        };

        const data = {
            value: 42,
        };

        set.add(object);

        let flag = undefined;
        set.forEach(function (item) {
            flag = item.getValue.call(this);
        }, data);
        expect(flag).toBe(42);
    });
});
