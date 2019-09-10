// https://ivweb.io/article.html?_id=100344
// http://www.ayqy.net/blog/react-suspense/
import React from "react";
import StockTable from "./StockTable";
import './App.scss'
const stockChartPromise = import(/* webpackChunkName: 'StockChart' */ "./StockChart");// 预加载
const StockChart = React.lazy(() => stockChartPromise);// 懒加载组件
function randomValue() {
  return Math.round(1000 + Math.random() * 1000) / 10;
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

function fakeStock(name) {
  const today = randomValue();
  const yesterday = randomValue();
  const change = Math.round((1000 * (today - yesterday)) / yesterday) / 10;
  return {
    name,
    today,
    change,
    data: [
      { x: daysAgo(4), y: randomValue() },
      { x: daysAgo(3), y: randomValue() },
      { x: daysAgo(2), y: randomValue() },
      { x: daysAgo(1), y: yesterday },
      { x: daysAgo(0), y: today }
    ]
  };
}

const stocks = [
  fakeStock("Apple"),
  fakeStock("Citigroup"),
  fakeStock("General Electric"),
  fakeStock("Google"),
  fakeStock("Microsoft")
];

class App extends React.Component {
  state = {
    selectedStock: null,
    stocks: stocks
  };
  render() {
    const { selectedStock, stocks } = this.state;
    return (
      <div className="section" data-title="3 lazy loading">
        <React.Suspense fallback={<div>Loading...</div>}>
          <StockTable
            stocks={stocks}
            onSelect={selectedStock => this.setState({ selectedStock })}
          />
          {selectedStock && (
            <StockChart
              stock={selectedStock}
              onClose={() => this.setState({ selectedStock: false })}
            />
          )}
          {/* Preload <StockChart/> */}
          <React.Suspense fallback={null}>
            <div hidden={true}>
              <StockChart stock={stocks[0]} />
            </div>
          </React.Suspense>
        </React.Suspense>
      </div>
    );
  }
}

export default App;
