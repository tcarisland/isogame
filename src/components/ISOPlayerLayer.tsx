import React from 'react';
import KeyPressEventQueue from '../events/KeyPressEventQueue';
import ISOTile from '../model/ISOTile';
import ISOGridConfig from '../model/ISOGridConfig';
import ISOCanvas from './ISOCanvas';
import KeyPressType from '../enums/KeyPressType';
import ArrowKeyPress from '../interfaces/ArrowKeyPress';
import Color from '../interfaces/Color';
import ISOLayerProps from '../props/ISOLayerProps';
import grass0001 from "../resources/images/tiles/grass0001.png";

class ISOPlayerLayer extends React.Component<ISOLayerProps> {
    componentDidMount() {
        let width = this.props.width;
        let height = this.props.height;
        let ctx = this.props.canvasRef.current.getContext("2d");
        let active = new ISOTile(0, 0, Color.WHITE);
        let source = this;
        let rows = this.props.rows;
        let columns = this.props.columns;
        let img = new Image();
        img.src = grass0001;
        img.onload = function() {
            active.drawUpwardSprite(ctx, new ISOGridConfig(rows, columns, width, height), img);
        }
        KeyPressEventQueue.getInstance().addEventListener({
            source: source,
            run: function(keyPress: ArrowKeyPress) {
                switch(keyPress.type) {
                    case KeyPressType.ARROW:
                        let direction = ISOCanvas.zeroPad(parseInt(keyPress.dir.toString(2)), 4);        
                        let rY = active.row + (-1 * parseInt(direction.substring(0, 1)) + parseInt(direction.substring(1, 2))) * ISOCanvas.VELOCITY;
                        let rX = active.column + (-1 * parseInt(direction.substring(2, 3)) + parseInt(direction.substring(3, 4))) * ISOCanvas.VELOCITY;
                        active.row = (rY < (rows - (1 - ISOCanvas.VELOCITY)) && rY >= 0) ? rY : active.row;
                        active.column = (rX < (columns - (1 - ISOCanvas.VELOCITY)) && rX >= 0) ? rX : active.column;
                        break;
                    case KeyPressType.SPACE:
                        console.log("space pressed")
                        break;
                  }
                  ctx.clearRect(0, 0, width, height);
                  active.drawUpwardSprite(ctx, new ISOGridConfig(rows, columns, width, height), img);
            }
        });
    }
    render() {
        return(<canvas
            ref={ this.props.canvasRef }
            width=  { this.props.width }
            height= { this.props.height }
            className= { "isoCanvas" }
        ></canvas>);
    }
}

export default ISOPlayerLayer;