import ISOGridConfig from './ISOGridConfig';
import ISOTile from './ISOTile';

export default class ISOGrid {

    config: ISOGridConfig;
    tiles: ISOTile[][];

    constructor(config: ISOGridConfig) {
        this.config = config;
        this.tiles = []; 
    }

    drawGrid(ctx: CanvasRenderingContext2D) {
        let img1 = new Image();
        img1.src = require("../resources/images/tiles/grass0002.png");
        let img2 = new Image();
        img2.src = require("../resources/images/tiles/grass0003.png");
        let images: HTMLImageElement[] = [];
        let current = this;
        img1.onload = function() {
            images[images.length] = img1;
            if(images.length === 2) {
                current.onDrawReady(ctx, images);
            }
        }
        img2.onload = function() {
            images[images.length] = img2;
            if(images.length === 2) {
                current.onDrawReady(ctx, images);
            }
        }
    }

    onDrawReady(ctx: CanvasRenderingContext2D, img: HTMLImageElement[]) {
        for(let a = 0; a < this.config.columns; a++) {
            this.tiles[a] = [];
            for(let b = 0; b < this.config.rows; b++) {
                this.tiles[a][b] = new ISOTile(a, b);
                this.tiles[a][b].drawImage(ctx, this.config, img);
            }
        }
    }
}