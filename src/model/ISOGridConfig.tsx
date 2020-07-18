export default class ISOGridConfig {

    rows: number;
    columns: number;
    width: number;
    height: number;

    constructor(rows: number, columns: number, width: number, height: number) {
        this.rows = rows;
        this.columns = columns;
        this.width = width;
        this.height = height;
    }

    public getTileWidth(): number {
        return this.width / this.columns;
    }

    public getTileHeight(): number {
        return this.height / this.rows;
    }

}