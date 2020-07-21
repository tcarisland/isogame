import ISOTileVertex from "./ISOTileVertex";

class ISOTileVertices {
    nw: ISOTileVertex;
    ne: ISOTileVertex;
    se: ISOTileVertex;
    sw: ISOTileVertex;
    tileWidth: number;
    tileHeight: number;

    constructor(row: number, column: number, tileWidth: number, tileHeight: number) {
        this.nw = { x: column * tileWidth, y: row * tileHeight };
        this.ne = { x: (column * tileWidth) + tileWidth, y: row * tileHeight };
        this.se = { x: (column * tileWidth) + tileWidth, y: (row * tileHeight) + tileHeight };
        this.sw = { x: column * tileWidth, y: (row * tileHeight) + tileHeight };
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }


    public getVertices(): ISOTileVertex[] {
        return [this.nw, this.ne, this.se, this.sw];
    }


    public getIsoVertices(): ISOTileVertex[] {
        return [
            { x: this.isoX(this.nw.x, this.nw.y), y: this.isoY(this.nw.x, this.nw.y) },
            { x: this.isoX(this.ne.x, this.ne.y), y: this.isoY(this.ne.x, this.ne.y) },
            { x: this.isoX(this.se.x, this.se.y), y: this.isoY(this.se.x, this.se.y) },
            { x: this.isoX(this.sw.x, this.sw.y), y: this.isoY(this.sw.x, this.sw.y) }
        ];
    }


    private isoX(xc: number, yc: number) {
        return xc - yc;
    };
    private isoY(xc: number, yc: number) {
        return (xc + yc) / 2;
    }


    public getEnclosingBox(): ISOTileVertex[] {
        let minX = this.isoX(this.sw.x, this.sw.y);
        let minY = this.isoY(this.nw.x, this.nw.y);
        let maxX = this.isoX(this.ne.x, this.ne.y);
        let maxY = this.isoY(this.se.x, this.se.y);
        return [
            { x: minX, y: minY },
            { x: maxX, y: minY },
            { x: maxX, y: maxY },
            { x: minX, y: maxY }
        ];
    }
}

export default ISOTileVertices;