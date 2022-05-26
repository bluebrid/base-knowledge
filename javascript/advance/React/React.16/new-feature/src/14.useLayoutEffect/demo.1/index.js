import React, { useEffect, useRef } from "react";

const Animate = () => {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.style.left = '100px';
    ref.current.style.position = 'relative';
  }, []);
  return (
    <div className='animate'>
      <div ref={ref} className="square">useEffect</div>
    </div>
  );
};

export default Animate;