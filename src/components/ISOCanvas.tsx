import React from 'react';
import ISOGridConfig from '../model/ISOGridConfig';
import ISOGrid from '../model/ISOGrid';
import ISOTile from '../model/ISOTile';
import KeyPressEventQueue from '../events/KeyPressEventQueue';
import EventQueueListener from '../interfaces/EventQueueListener';
import ArrowKeyPress from '../interfaces/ArrowKeyPress';
import KeyPressType from '../enums/KeyPressType';

const zeroPad = (num: number, places: number) => String(num).padStart(places, '0');
const velocity = 0.1;

export interface ISOCanvasProps {
    canvasRef: any,
    rows: number,
    columns: number,
    tileWidth: number,
    tileHeight: number
}

class ISOCanvas extends React.Component<ISOCanvasProps> {
    componentDidMount() {
        let width = this.getWorldWidth();
        let height = this.getWorldHeight();
        let grid = new ISOGrid(new ISOGridConfig(this.props.rows, this.props.columns, width, height));
        let ctx = this.props.canvasRef.current.getContext("2d");
        grid.drawGrid(ctx);
        let active: ISOTile;
        active = grid.active;
        let source = this;
        let rows = this.props.rows;
        let columns = this.props.columns;
        KeyPressEventQueue.getInstance().addEventListener({
            source: source,
            run: function(keyPress: ArrowKeyPress) {
                switch(keyPress.type) {
                    case KeyPressType.ARROW:
                        let direction = zeroPad(parseInt(keyPress.dir.toString(2)), 4);        
                        let rY = active.row + (-1 * parseInt(direction.substring(0, 1)) + parseInt(direction.substring(1, 2))) * velocity;
                        let rX = active.column + (-1 * parseInt(direction.substring(2, 3)) + parseInt(direction.substring(3, 4))) * velocity;
                        active.row = (rY < (rows - (1 - velocity)) && rY >= 0) ? rY : active.row;
                        active.column = (rX < (columns - (1 - velocity)) && rX >= 0) ? rX : active.column;
                        break;
                    case KeyPressType.SPACE:
                        console.log("space pressed")
                        break;
                  }
                grid.active = active;
                ctx.clearRect(0, 0, width, height);
                grid.drawGrid(ctx);
                //active.renderEnclosingBox(ctx, grid.config);
            }
        });
    }
    getWorldWidth(): number {
        return this.props.tileWidth * this.props.columns;        
    }
    getWorldHeight(): number {
        return this.props.tileHeight * this.props.rows;
    }
    getCanvasHeight(): number {
        return this.getWorldHeight();
    }
    render() {
        return(
            <div>
                <canvas 
                    ref= { this.props.canvasRef }
                    width=  { this.getWorldWidth() }
                    height= { this.getCanvasHeight() }
                    style={Object.assign({backgroundColor: "rgba(255, 255, 255, 0)"}, {display: "block"})}>                
                </canvas>
            </div>
        );
    }
};

export default ISOCanvas;