/**
 * Client-side currency display using hardcoded INR exchange rates.
 * Original amounts are read from [data-price-inr]; selection persists in localStorage.
 */
(function () {
  var STORAGE_KEY = 'travellrr-currency';
  var DEFAULT = 'INR';

  // INR per 1 unit of foreign currency (hardcoded, no API)
  var INR_PER_UNIT = {
    USD: 84,
    EUR: 91,
    GBP: 106,
    AED: 22.9,
    JPY: 0.56
  };

  var SYMBOLS = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    AED: '',
    JPY: '¥'
  };

  var LABELS = {
    INR: 'INR',
    USD: 'USD',
    EUR: 'EUR',
    GBP: 'GBP',
    AED: 'AED',
    JPY: 'JPY'
  };

  function getCode() {
    var stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch (e) { /* ignore */ }
    if (stored && LABELS[stored]) return stored;
    return DEFAULT;
  }

  function setCode(code) {
    if (!LABELS[code]) return;
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch (e) { /* ignore */ }
  }

  function convertInrToAmount(inr, code) {
    if (code === 'INR' || !INR_PER_UNIT[code]) return inr;
    return inr / INR_PER_UNIT[code];
  }

  function formatNumber(amount, code) {
    var isJpy = code === 'JPY';
    var opts = {
      minimumFractionDigits: isJpy ? 0 : 2,
      maximumFractionDigits: isJpy ? 0 : 2
    };
    if (code === 'INR') {
      return amount.toLocaleString('en-IN', opts);
    }
    if (code === 'AED') {
      return amount.toLocaleString('en-IN', opts) + ' AED';
    }
    if (isJpy) {
      return amount.toLocaleString('en-IN', opts);
    }
    return amount.toLocaleString('en-US', opts);
  }

  function formatInrToDisplay(inr, code) {
    if (isNaN(inr)) return '—';
    var amt = convertInrToAmount(inr, code);
    var sym = SYMBOLS[code];
    if (code === 'INR') {
      return sym + formatNumber(amt, code);
    }
    if (code === 'AED') {
      return formatNumber(amt, code);
    }
    return sym + formatNumber(amt, code);
  }

  function applyCurrency() {
    var code = getCode();
    var sel = document.getElementById('header-currency');
    if (sel) sel.value = code;

    document.querySelectorAll('[data-price-inr]').forEach(function (el) {
      var raw = el.getAttribute('data-price-inr');
      if (raw === null || raw === '') return;
      var inr = parseFloat(String(raw).replace(/,/g, ''), 10);
      if (isNaN(inr)) return;
      el.textContent = formatInrToDisplay(inr, code);
    });
  }

  function init() {
    applyCurrency();

    var select = document.getElementById('header-currency');
    if (select) {
      select.addEventListener('change', function () {
        setCode(select.value);
        applyCurrency();
        try {
          document.dispatchEvent(
            new CustomEvent('travellrr:currency', { detail: { code: select.value } })
          );
        } catch (e) { /* old browsers */ }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.formatTravellrrInr = formatInrToDisplay;
  window.getTravellrrCurrency = getCode;
  window.reapplyTravellrrCurrency = applyCurrency;
})();
