import React, { useLayoutEffect, useRef } from "react";

const Animate = () => {
  const ref = useRef(null);
  useLayoutEffect(() => {
    ref.current.style.left = '100px';
    ref.current.style.position = 'relative';
  }, []);
  return (
    <div className='animate'>
      <div ref={ref} className="square">use Layout Effect</div>
    </div>
  );
};

export default Animate;