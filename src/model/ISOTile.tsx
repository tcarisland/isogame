import ISOGridConfig from "../model/ISOGridConfig";
import Color from "../interfaces/Color";
import ISOTileVertices from "./ISOTileVertices";

export default class ISOTile {
    row: number;
    column: number;
    color: Color;
    zoom: number = 2;
    offsetX = 0.5;
    offsetY = 0.75;
    activeImg: any;

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

    public drawImage(ctx: CanvasRenderingContext2D, gridConfig: ISOGridConfig, img: HTMLImageElement[]) {
        let vertices = this.create2DVertices(gridConfig).getEnclosingBox();
        let rectWidth = this.isoXToWorldSpace(vertices[1].x, gridConfig) - this.isoXToWorldSpace(vertices[0].x, gridConfig);
        let imgNo = 0;
        if((this.row % 2 === 0 && this.column % 2 === 0) || (this.row % 2 === 1 && this.column % 2 === 1)) {
            imgNo = 1;
        }
        let current = this;
        ctx.drawImage(img[imgNo],
            current.isoXToWorldSpace(vertices[0].x, gridConfig),
            current.isoYToWorldSpace(vertices[0].y, gridConfig),
            rectWidth,
            rectWidth
            );    
    }

    public drawUpwardSprite(ctx: CanvasRenderingContext2D, gridConfig: ISOGridConfig, img: HTMLImageElement) {
        let vertices = this.create2DVertices(gridConfig).getEnclosingBox();

        let rectWidth = this.isoXToWorldSpace(vertices[1].x, gridConfig) - this.isoXToWorldSpace(vertices[0].x, gridConfig);
        let rectHeight = this.isoYToWorldSpace(vertices[3].y, gridConfig) - this.isoYToWorldSpace(vertices[0].y, gridConfig);

        let current = this;
        ctx.drawImage(img,
            current.isoXToWorldSpace(vertices[0].x, gridConfig),
            current.isoYToWorldSpace(vertices[0].y, gridConfig) - rectHeight,
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