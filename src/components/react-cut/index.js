import React, { useState, forwardRef, useImperativeHandle, useRef, memo } from 'react';

const MoveablePointer = memo(({ parentNode, currentPosition }) => {
  const [position, setPosition] = useState(currentPosition);

  const mouseMoveEvent = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = (e.pageX - left);
    const y = (e.pageY - top);

    setPosition({ x, y });
  }

  const mouseLeave = (e) => {
    parentNode.removeEventListener('mousemove', mouseMoveEvent);
  }


  return (
    <div
      onMouseDown={() => {
        parentNode.addEventListener('mousemove', mouseMoveEvent);
        parentNode.addEventListener('mouseleave', mouseLeave)
        parentNode.addEventListener('mouseup', mouseLeave)
      }}

      style={{
        background: '#800808',
        position: 'absolute',
        width: '6px',
        height: '6px',
        borderRadius: '10px',

        left: position.x,
        top: position.y
      }} />
  );
});

const ReactCut = forwardRef(({ children, onCutFinish }, ref) => {
  const [points, setPoints] = useState([]);
  const [active, setActive] = useState(false);
  const containerRef = useRef();

  const handleOnMouseMove = (e) => {
    if (active) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect()

      const x = (e.pageX - left);
      const y = (e.pageY - top);
      const percX = x * 100 / width;
      const percY = y * 100 / height;

      setPoints([...points, { x, y, percX, percY }]);
    }
  }

  const handleOnCutFinish = () => {
    setActive(false)
    onCutFinish(points.map(point => `${point.percX}% ${point.percY}%`).toString());
  }

  useImperativeHandle(ref, () => ({
    addPoint: () => {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const x = width / 2;
      const y = height / 2;

      setPoints([...points, { x, y }]);
    },

    resetPoints: () => {
      setPoints([]);
      onCutFinish('');
    }
  }), [onCutFinish])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative' }}
      onMouseDown={() => setActive(true)}
      onMouseLeave={handleOnCutFinish}
      onMouseUp={handleOnCutFinish}
      onMouseMove={handleOnMouseMove}
    >
      {
        points.map(point => (
          <MoveablePointer
            parentNode={containerRef.current}
            currentPosition={{
              x: point.x,
              y: point.y
            }}
          />
        ))
      }
      {children}
    </div >
  )
})

export { ReactCut }

/* `clientX: ${e.clientX}, clientY: ${e.clientY}\nscreenX: ${e.screenX}, screenY: ${e.screenY}\npageX: ${e.pageX}, pageY: ${e.pageY}`, e */

/* onMouseLeave={() => {
      setActive(false)
      onCutFinish(points.map(point => `${point.x}% ${point.y}%`).toString());
    }}
    onMouseUp={() => {
      setActive(false)
      onCutFinish(points.map(point => `${point.x}% ${point.y}%`).toString());
    }}
    onMouseMove={(e) => {
      if (active) {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()

        const x = (e.pageX - left);
        const y = (e.pageY - top);
        const percX = x * 100 / width;
        const percY = y * 100 / height;

        setPoints([...points, { x, y, percX, percY }]);
      }
    }} */