import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { ReactCut } from './components';

function App() {
  const [path, setPath] = useState('')
  const childRef = useRef({});

  const onCutFinish = (value) => setPath(value);

  return (
    <div className="App">
      <header className="App-header">
        <ReactCut ref={childRef} onCutFinish={onCutFinish}>
          <img draggable="false" src="/download.jpg" style={path ? { clipPath: `polygon(${path})` } : {}} />
        </ReactCut>
        <button onClick={childRef.current.resetPoints}>reset</button>
      </header>
    </div>
  );
}

export default App;
