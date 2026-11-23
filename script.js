const temperature = document.getElementById('temperature');
const result = document.getElementById('result');
const weather = document.getElementById('weather');

let fromUnit = 'C';
let toUnit = 'F';

function convertTemperature() {
  if (temperature.value.trim() === '') {
    result.textContent = '—';
    weather.textContent = 'Enter a temperature';
    return;
  }

  const value = Number(temperature.value);
  if (!Number.isFinite(value)) {
    result.textContent = 'Invalid';
    weather.textContent = 'Enter a valid number';
    return;
  }

  const celsius = fromUnit === 'C' ? value :
    fromUnit === 'F' ? (value - 32) * 5 / 9 : value - 273.15;

  if (celsius < -273.15 - 1e-9) {
    result.textContent = 'Invalid';
    weather.textContent = 'Below absolute zero';
    return;
  }

  const converted = toUnit === 'C' ? celsius :
    toUnit === 'F' ? celsius * 9 / 5 + 32 : celsius + 273.15;

  const symbol = toUnit === 'K' ? ' K' : ' °' + toUnit;
  result.textContent = (Math.abs(converted) < 0.005 ? 0 : converted).toFixed(2) + symbol;

  if (celsius <= 0) weather.textContent = 'Freezing cold ❄️';
  else if (celsius < 18) weather.textContent = 'Chilly weather 🧥';
  else if (celsius < 30) weather.textContent = 'Pleasant weather ☀️';
  else weather.textContent = 'Hot weather 🔥';
}

function updateButtons() {
  for (const [id, selected] of [['fromUnits', fromUnit], ['toUnits', toUnit]]) {
    document.querySelectorAll(`#${id} .unit`).forEach(button => {
      const active = button.dataset.unit === selected;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
  }
}

function selectUnit(containerId, type) {
  document.querySelectorAll(`#${containerId} .unit`).forEach(button => {
    button.addEventListener('click', () => {
      if (type === 'from') fromUnit = button.dataset.unit;
      else toUnit = button.dataset.unit;
      updateButtons();
      convertTemperature();
    });
  });
}

temperature.addEventListener('input', convertTemperature);
selectUnit('fromUnits', 'from');
selectUnit('toUnits', 'to');

document.getElementById('swap').addEventListener('click', () => {
  [fromUnit, toUnit] = [toUnit, fromUnit];
  updateButtons();
  convertTemperature();
});

document.getElementById('reset').addEventListener('click', () => {
  temperature.value = '25';
  fromUnit = 'C';
  toUnit = 'F';
  updateButtons();
  convertTemperature();
});

updateButtons();
convertTemperature();
