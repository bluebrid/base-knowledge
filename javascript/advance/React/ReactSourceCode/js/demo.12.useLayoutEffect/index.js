
const $root = document.querySelector("#root12");
// https://www.jianshu.com/p/412c874c5add
/**
 * useLayoutEffect
这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,
并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, 
useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制.
 */

 const Animate1 = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current.style.left = '100px';
    ref.current.style.position = 'relative';
  }, []);
  return (
    <div className='animate'>
      <div ref={ref} className="square">useEffect</div>
    </div>
  );
};

const Animate2 = () => {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    ref.current.style.left = '100px';
    ref.current.style.position = 'relative';
  }, []);
  return (
    <div className='animate'>
      <div ref={ref} className="square">use Layout Effect</div>
    </div>
  );
};


function App() {
  return (
    <div className="section" data-title="12 useLayoutEffect">
      <Animate1 />
      <Animate2 />
    </div>
  );
}

ReactDOM.render(<App />, $root);
