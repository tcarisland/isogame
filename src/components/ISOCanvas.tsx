import React from 'react';
import ISOGridConfig from '../model/ISOGridConfig';
import ISOGrid from '../model/ISOGrid';
import ISOPlayerLayer from './ISOPlayerLayer';

export interface ISOCanvasProps {
    canvasRef: any,
    rows: number,
    columns: number,
    tileWidth: number,
    tileHeight: number
}

class ISOCanvas extends React.Component<ISOCanvasProps> {

    public static zeroPad(num: number, places: number): string { 
        return String(num).padStart(places, '0')
    }
    public static VELOCITY = 0.3;

    componentDidMount() {
        let width = this.getWorldWidth();
        let height = this.getWorldHeight();
        let grid = new ISOGrid(new ISOGridConfig(this.props.rows, this.props.columns, width, height));
        let ctx = this.props.canvasRef.current.getContext("2d");
        grid.drawGrid(ctx);
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
            <div className={"isoCanvasWrapper"}>
                <canvas ref= { this.props.canvasRef }
                    width=  { this.getWorldWidth() }
                    height= { this.getCanvasHeight() }
                    className= { "isoCanvas" }>
                </canvas>
                <ISOPlayerLayer
                    canvasRef= { React.createRef() }
                    width=  { this.getWorldWidth() }
                    height= { this.getCanvasHeight() }
                    tileHeight= {this.props.tileHeight }
                    tileWidth= {this.props.tileWidth }
                    rows= { this.props.rows }
                    columns= { this.props.columns }
                >
                </ISOPlayerLayer>
            </div>
        );
    }
};

export default ISOCanvas;