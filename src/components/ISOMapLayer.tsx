import React from 'react';
import ISOLayerProps from '../props/ISOLayerProps';
import ISOTile from '../model/ISOTile';
import Color from '../interfaces/Color';
import ISOGridConfig from '../model/ISOGridConfig';
import ISOGrid from '../model/ISOGrid';

class ISOMapLayer extends React.Component<ISOLayerProps> {
    componentDidMount() {
        let width = this.props.width;
        let height = this.props.height;
        let ctx = this.props.canvasRef.current.getContext("2d");
        let active = new ISOTile(0, 1, Color.WHITE);
        let rows = this.props.rows;
        let columns = this.props.columns;
        let img = new Image();
        img.src = require("../resources/images/tiles/grass0006.png");
        let map = [
            [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [ 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
            [ 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1],
            [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
            [ 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [ 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1],
            [ 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [ 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1]
        ];
        let gridConfig = new ISOGridConfig(rows, columns, width, height);
        img.onload = function() {
            for(let row = 0; row < map.length; row++) {
                for(let col = 0; col < map[row].length; col++) {
                    if(map[row][col]) {
                        active.row = row;
                        active.column = col;
                        active.drawUpwardSprite(ctx, gridConfig, img);
                    }
                }
            }
        }
    }
    render() {
        return(<canvas
            ref={ this.props.canvasRef }
            width=  { this.props.width }
            height= { this.props.height }
            className= { "isoCanvas" }
        ></canvas>);    }
}

export default ISOMapLayer;