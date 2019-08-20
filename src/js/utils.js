class Utils {
    static isCollision(data) {
        const { x1, y1, r1, x2, y2, r2 } = data;
        let a, x, y;

        a = r1 + r2;
        x = x1 - x2;
        y = y1 - y2;

        return a > Math.sqrt(x * x + y * y);
    }

    static getRandom(min, max) {
        return Math.floor(Math.random() * max) + min;
    }

    static getRandomColor() {
        return "0x" + ((Math.random() * 0xffffff) << 0).toString(16);
    }
}

export default Utils;
