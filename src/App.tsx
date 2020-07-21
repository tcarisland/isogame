import React, { createRef } from 'react';
import './App.css';
import ISOCanvas from './components/ISOCanvas';
import ArrowsPreview from './components/ArrowsPreview';

const width = 65;
const height = width;
const rows = 11;
const cols = rows;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ISOCanvas
          tileWidth={width}
          tileHeight={height}
          rows={rows}
          columns={cols}
          canvasRef={createRef()}/>
        <ArrowsPreview side={130}/>
      </header>
    </div>
  );
}

export default App;
