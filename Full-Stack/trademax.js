// script.js
let trades = [];
let tradeId = 1;

const submitButton = document.getElementById('submitTrade');
const buyButton = document.getElementById('buyButton');
const sellButton = document.getElementById('sellButton');
const tradeTable = document.getElementById('tradeTable').querySelector('tbody');

let isBuyOrder = true;

buyButton.addEventListener('click', () => {
  isBuyOrder = true;
  buyButton.style.backgroundColor = '#4caf50';
  sellButton.style.backgroundColor = '#ddd';
});

sellButton.addEventListener('click', () => {
  isBuyOrder = false;
  sellButton.style.backgroundColor = '#f44336';
  buyButton.style.backgroundColor = '#ddd';
});

submitButton.addEventListener('click', () => {
  const asset = document.getElementById('asset').value;
  const amount = document.getElementById('amount').value;
  const price = document.getElementById('price').value;

  if (asset && amount && price) {
    const trade = {
      id: tradeId++,
      asset,
      amount,
      price,
      type: isBuyOrder ? 'Buy' : 'Sell',
      status: 'Pending'
    };
    trades.push(trade);
    addToTable(trade);
    clearInputs();
  } else {
    alert('Please fill out all fields');
  }
});

function addToTable(trade) {
  const row = tradeTable.insertRow();
  row.innerHTML = `
    <td>${trade.id}</td>
    <td>${trade.asset}</td>
    <td>${trade.amount}</td>
    <td>${trade.price}</td>
    <td>${trade.type}</td>
    <td>${trade.status}</td>
  `;
}

function clearInputs() {
  document.getElementById('asset').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('price').value = '';
}
