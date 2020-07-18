export default class Color {
    r: number;
    g: number;
    b: number;
    alpha: number;
    public static BLACK = new Color(0, 0, 0, 1);
    public static WHITE = new Color(250, 250, 250, 1);

    constructor(r: number, g: number, b: number, alpha?: number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha !== undefined ? alpha : 1;
    }

    public opaque(alpha: number): Color {
        return new Color(this.r, this.g, this.b, alpha);
    }

    public darken(alpha: number) {
        return new Color(this.r, this.g, this.b, this.alpha + alpha);
    }

    getRgbaString(): string {
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`;
    }

}