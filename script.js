(function () {
  'use strict';

  const CAL_BASE = 'https://calendar.google.com/calendar/embed';
  const COMMON_PARAMS = {
    ctz: 'Europe/Rome',
    wkst: '2',
    mode: 'MONTH',
    showTitle: '0',
    showPrint: '0',
    showTabs: '0',
    showCalendars: '0',
    showTz: '0'
  };
  const COLORS = {
    chiesa: '#2B4F8C',
    arci:   '#B8593B'
  };

  const frame   = document.querySelector('.calendar-frame');
  const iframe  = document.getElementById('cal-iframe');
  const empty   = document.querySelector('.cal-empty');
  const buttons = document.querySelectorAll('.legend-card');

  if (!frame || !iframe) return;

  const ids = {
    chiesa: frame.dataset.calChiesa,
    arci:   frame.dataset.calArci
  };

  const state = { chiesa: true, arci: true };

  function buildUrl() {
    const params = new URLSearchParams();
    Object.entries(COMMON_PARAMS).forEach(([k, v]) => params.append(k, v));

    ['chiesa', 'arci'].forEach((key) => {
      if (!state[key]) return;
      params.append('src', ids[key]);
      params.append('color', COLORS[key]);
    });

    return CAL_BASE + '?' + params.toString();
  }

  function update() {
    const anyOn = state.chiesa || state.arci;
    iframe.hidden = !anyOn;
    if (empty) empty.hidden = anyOn;
    if (anyOn) iframe.src = buildUrl();
  }

  buttons.forEach((btn) => {
    const key = btn.dataset.cal;
    if (!key) return;

    btn.addEventListener('click', () => {
      state[key] = !state[key];
      btn.classList.toggle('is-active', state[key]);
      btn.setAttribute('aria-pressed', String(state[key]));
      update();
    });
  });

  update();
})();
