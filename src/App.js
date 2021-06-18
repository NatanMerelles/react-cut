import logo from './logo.svg';
import './App.css';
import { useState, useRef, useEffect } from 'react';
import { ReactCut } from './components';

function App() {
  const [path, setPath] = useState('')
  const childRef = useRef();

  useEffect(() => {
    console.log(childRef)
  }, [childRef])


  return (
    <div className="App">
      <header className="App-header">
        <ReactCut ref={childRef} onCutFinish={(value) => setPath(value)}>
          <img draggable="false" src="/download.jpg" style={{ clipPath: `polygon(${path})` }} />
        </ReactCut>
      </header>
    </div>
  );
}

export default App;
