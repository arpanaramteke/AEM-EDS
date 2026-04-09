export default function decorate(block) {
  const stocks = {};

  // 1. Read authorable table data
  const rows = [...block.querySelectorAll('tr')];

  rows.slice(1).forEach((row) => {
    const cols = row.querySelectorAll('td');
    const symbol = cols[0]?.textContent.trim();
    const price = parseFloat(cols[1]?.textContent.trim());
    const change = parseFloat(cols[2]?.textContent.trim());

    if (symbol) {
      stocks[symbol] = {
        price: price || 0,
        change: change || 0,
        isUp: change >= 0
      };
    }
  });

  // 2. Clear block AFTER reading content
  block.textContent = '';

  // 3. Create ticker container
  const tickerTrack = document.createElement('div');
  tickerTrack.className = 'ticker-track';

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

  function initializeTicker() {
    tickerTrack.innerHTML = '';

    Object.keys(stocks).forEach(symbol => {
      tickerTrack.appendChild(createStockNode(symbol, stocks[symbol]));
    });

    // duplicate for smooth scroll
    Object.keys(stocks).forEach(symbol => {
      tickerTrack.appendChild(createStockNode(symbol, stocks[symbol]));
    });
  }

  function updateStockPrice(symbol, newPrice) {
    if (!stocks[symbol]) return;

    const oldPrice = stocks[symbol].price;
    const diff = newPrice - oldPrice;

    stocks[symbol].price = newPrice;
    stocks[symbol].change += diff;
    stocks[symbol].isUp = stocks[symbol].change >= 0;

    const nodes = block.querySelectorAll(`[data-symbol="${symbol}"]`);

    nodes.forEach(node => {
      const priceEl = node.querySelector('.stock-price');
      const changeEl = node.querySelector('.stock-change');

      priceEl.textContent = `₹${newPrice.toFixed(2)}`;
      changeEl.textContent =
        `${stocks[symbol].isUp ? '▲' : '▼'} ${stocks[symbol].isUp ? '+' : ''}${stocks[symbol].change.toFixed(2)}`;

      changeEl.className = `stock-change ${stocks[symbol].isUp ? 'up' : 'down'}`;
    });
  }

  // 4. Append UI
  block.appendChild(tickerTrack);
  initializeTicker();

  // 5. Simulation (optional)
  setInterval(() => {
    const symbols = Object.keys(stocks);
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
    const volatility = (Math.random() * 4) - 2;
    const newPrice = stocks[randomSymbol].price + volatility;
    updateStockPrice(randomSymbol, newPrice);
  }, 1000);
}