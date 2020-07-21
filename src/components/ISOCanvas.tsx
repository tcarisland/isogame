import React from 'react';
import ISOPlayerLayer from './ISOPlayerLayer';
import ISOBackgroundLayer from './ISOBackgroundLayer';

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
                <ISOBackgroundLayer
                    canvasRef= { React.createRef() }
                    width=  { this.getWorldWidth() }
                    height= { this.getCanvasHeight() }
                    tileHeight= {this.props.tileHeight }
                    tileWidth= {this.props.tileWidth }
                    rows= { this.props.rows }
                    columns= { this.props.columns }>
                </ISOBackgroundLayer>
                <ISOPlayerLayer
                    canvasRef= { React.createRef() }
                    width=  { this.getWorldWidth() }
                    height= { this.getCanvasHeight() }
                    tileHeight= {this.props.tileHeight }
                    tileWidth= {this.props.tileWidth }
                    rows= { this.props.rows }
                    columns= { this.props.columns }>
                </ISOPlayerLayer>
            </div>
        );
    }
};

export default ISOCanvas;