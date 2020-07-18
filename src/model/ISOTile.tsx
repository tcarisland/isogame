import ISOGridConfig from "../model/ISOGridConfig";
import Color from "../interfaces/Color";
import grass0002 from "../resources/images/tiles/grass0002.png";
import grass0003 from "../resources/images/tiles/grass0003.png";
import grass0004 from "../resources/images/tiles/grass0004.png";

export interface ISOTileVertex {
    x: number,
    y: number
}

export class ISOTileVertices {
    nw: ISOTileVertex;
    ne: ISOTileVertex;
    se: ISOTileVertex;
    sw: ISOTileVertex;
    tileWidth: number;
    tileHeight: number;

    constructor(row: number, column: number, tileWidth: number, tileHeight: number) {
        this.nw = {x: column * tileWidth, y: row * tileHeight};
        this.ne = {x: (column * tileWidth) + tileWidth, y: row * tileHeight};
        this.se = {x: (column * tileWidth) + tileWidth, y: (row * tileHeight) + tileHeight};
        this.sw = {x: column * tileWidth, y: (row * tileHeight) + tileHeight};
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }

    public getVertices(): ISOTileVertex[] {
        return [ this.nw, this.ne, this.se, this.sw ];
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
            {x: minX, y: minY},
            {x: maxX, y: minY},
            {x: maxX, y: maxY},
            {x: minX, y: maxY}    
        ]
    }
}

export default class ISOTile {
    row: number;
    column: number;
    color: Color;
    zoom: number = 2;
    offsetX = 0.5;
    offsetY = 0.75;

    constructor(row: number, column: number, color?: Color) {
        this.row = row;
        this.column = column;
        this.color = color !== undefined ? color : Color.WHITE;
    }

    public getColor(): Color {
        if((this.row % 2 === 0 && this.column % 2 === 0) || (this.row % 2 === 1 && this.column % 2 === 1)) {
            return this.color.opaque(0.2);
        } else {
            return this.color.opaque(0.1);
        }
    }

    public create2DVertices(gridConfig: ISOGridConfig): ISOTileVertices {
        return new ISOTileVertices(this.row, this.column, gridConfig.getTileWidth(), gridConfig.getTileHeight());
    }

    public render2D(ctx: CanvasRenderingContext2D, gridConfig: ISOGridConfig, color: Color) {
        ctx.beginPath();
        let v = this.create2DVertices(gridConfig);
        let vertices = v.getIsoVertices();
        for(let _i = 0; _i < vertices.length; _i++) {
            let vertex = vertices[_i];
            ctx.lineTo(
                ((vertex.x) / this.zoom) + (gridConfig.width * this.offsetX),
                ((vertex.y) / this.zoom) + (gridConfig.height * (this.offsetY / 2))
                );
        }
        ctx.fillStyle = color.getRgbaString();
        ctx.fill();
    }

    public isoXToWorldSpace(x: number, gridConfig: ISOGridConfig) {
        return (x / this.zoom) + (gridConfig.width * this.offsetX);
    }

    public isoYToWorldSpace(y: number, gridConfig: ISOGridConfig) {
        return (y / this.zoom) + (gridConfig.height * (this.offsetY / 2));
    }

    public drawImage(ctx: CanvasRenderingContext2D, gridConfig: ISOGridConfig) {
        let vertices = this.create2DVertices(gridConfig).getEnclosingBox();

        let rectWidth = this.isoXToWorldSpace(vertices[1].x, gridConfig) - this.isoXToWorldSpace(vertices[0].x, gridConfig);

        let img = new Image();
        if((this.row % 2 === 0 && this.column % 2 === 0) || (this.row % 2 === 1 && this.column % 2 === 1)) {
            img.src = grass0002;
        } else {
            img.src = grass0003;
        }
        ctx.drawImage(img,
            this.isoXToWorldSpace(vertices[0].x, gridConfig),
            this.isoYToWorldSpace(vertices[0].y, gridConfig),
            rectWidth,
            rectWidth
            );
    }

    public drawUpwardSprite(ctx: CanvasRenderingContext2D, gridConfig: ISOGridConfig) {
        let vertices = this.create2DVertices(gridConfig).getEnclosingBox();

        let rectWidth = this.isoXToWorldSpace(vertices[1].x, gridConfig) - this.isoXToWorldSpace(vertices[0].x, gridConfig);
        let rectHeight = this.isoYToWorldSpace(vertices[3].y, gridConfig) - this.isoYToWorldSpace(vertices[0].y, gridConfig);

        let img = new Image();
        img.src = grass0004;
        ctx.drawImage(img,
            this.isoXToWorldSpace(vertices[0].x, gridConfig),
            this.isoYToWorldSpace(vertices[0].y, gridConfig) - rectHeight,
            rectWidth,
            rectWidth
            );
    }

    public renderEnclosingBox(ctx: CanvasRenderingContext2D, gridConfig: ISOGridConfig) {
        let vertices = this.create2DVertices(gridConfig).getEnclosingBox();
        ctx.beginPath();
        let vertex = vertices[vertices.length - 1];
        ctx.moveTo(
            this.isoXToWorldSpace(vertex.x, gridConfig),
            this.isoYToWorldSpace(vertex.y, gridConfig)
            );
        for(let _i = 0; _i < vertices.length; _i++) {
            vertex = vertices[_i];
            ctx.lineTo(
                this.isoXToWorldSpace(vertex.x, gridConfig),
                this.isoYToWorldSpace(vertex.y, gridConfig)
                );
        }
        ctx.strokeStyle = new Color(64, 64, 255, 1).getRgbaString();
        ctx.stroke();
    }

}