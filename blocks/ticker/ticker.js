export default function decorate(block) {
  // 1. Initial State / Fallback Data
  const stocks = {
    RELIANCE: { price: 2971.30, change: 12.40, isUp: true },
    TCS: { price: 3945.00, change: -5.20, isUp: false },
    HDFCBANK: { price: 1528.00, change: 8.50, isUp: true },
    INFY: { price: 1452.10, change: 10.30, isUp: true },
    ICICIBANK: { price: 1084.50, change: -2.15, isUp: false },
    SBI: { price: 765.20, change: 4.10, isUp: true }
  };

  // 2. Create ticker track container
  const tickerTrack = document.createElement('div');
  tickerTrack.className = 'ticker-track';

  // 3. Helper to create a stock DOM node
  function createStockNode(symbol, data) {
    const item = document.createElement('div');
    item.className = 'stock-box';
    item.dataset.symbol = symbol;

    const symbolEl = document.createElement('span');
    symbolEl.className = 'stock-symbol';
    symbolEl.textContent = symbol;

    const priceEl = document.createElement('span');
    priceEl.className = 'stock-price';
    priceEl.textContent = `₹${data.price.toFixed(2)}`;

    const changeEl = document.createElement('span');
    changeEl.className = `stock-change ${data.isUp ? 'up' : 'down'}`;
    changeEl.textContent = `${data.isUp ? '▲' : '▼'} ${data.isUp ? '+' : ''}${data.change.toFixed(2)}`;

    item.append(symbolEl, priceEl, changeEl);
    return item;
  }

  // 4. Initialize ticker UI
  function initializeTicker() {
    tickerTrack.innerHTML = '';

    Object.keys(stocks).forEach(symbol => {
      tickerTrack.appendChild(createStockNode(symbol, stocks[symbol]));
    });

    // Duplicate for seamless scroll
    Object.keys(stocks).forEach(symbol => {
      tickerTrack.appendChild(createStockNode(symbol, stocks[symbol]));
    });
  }

  // 5. Real-time update function
  function updateStockPrice(symbol, newPrice) {
    if (!stocks[symbol]) return;

    const oldPrice = stocks[symbol].price;
    if (oldPrice === newPrice) return;

    const diff = newPrice - oldPrice;
    stocks[symbol].price = newPrice;
    stocks[symbol].change += diff;
    stocks[symbol].isUp = stocks[symbol].change >= 0;

    const nodes = block.querySelectorAll(`[data-symbol="${symbol}"]`);

    nodes.forEach(node => {
      const priceEl = node.querySelector('.stock-price');
      const changeEl = node.querySelector('.stock-change');

      priceEl.textContent = `₹${newPrice.toFixed(2)}`;
      const isUp = stocks[symbol].isUp;
      changeEl.textContent = `${isUp ? '▲' : '▼'} ${isUp ? '+' : ''}${stocks[symbol].change.toFixed(2)}`;
      changeEl.className = `stock-change ${isUp ? 'up' : 'down'}`;

      // Flash animation
      priceEl.classList.remove('flash-green', 'flash-red');
      void priceEl.offsetWidth; // reflow to restart animation
      priceEl.classList.add(diff > 0 ? 'flash-green' : 'flash-red');
    });
  }

  // 6. Clear block and append ticker
  block.textContent = '';
  block.appendChild(tickerTrack);

  // 7. Initialize
  initializeTicker();

  // 8. Simulation (replace with real WebSocket for live data)
  setInterval(() => {
    const symbols = Object.keys(stocks);
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const volatility = (Math.random() * 4) - 2; // -2 to +2
    const newPrice = stocks[randomSymbol].price + volatility;
    updateStockPrice(randomSymbol, newPrice);
  }, 1000);
}
