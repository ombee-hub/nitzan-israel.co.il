/* ניצן ישראל — ווידג'ט נגישות + באנר עוגיות (משותף לכל הדפים) */
(function () {
  'use strict';

  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  var FEATURES = [
    { c: 'a11y-contrast', t: 'ניגודיות גבוהה', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none"/></svg>' },
    { c: 'a11y-gray', t: 'גווני אפור', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3s6 7.2 6 11.2a6 6 0 0 1-12 0C6 10.2 12 3 12 3z"/></svg>' },
    { c: 'a11y-links', t: 'הדגשת קישורים', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 14a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 10a5 5 0 0 0-7.1 0l-2 2a5 5 0 0 0 7.1 7.1l1.1-1.1"/></svg>' },
    { c: 'a11y-bigtext', t: 'טקסט גדול', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19V8a3 3 0 0 1 6 0v11M4 14h6"/><path d="M17 8v6M14 11h6"/></svg>' },
    { c: 'a11y-spacing', t: 'ריווח טקסט', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h18M7 8l-4 4 4 4M17 8l4 4-4 4"/></svg>' },
    { c: 'a11y-lineheight', t: 'גובה שורה', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 6h11M10 12h11M10 18h11M5 5v14M3 8l2-3 2 3M3 16l2 3 2-3"/></svg>' },
    { c: 'a11y-readable', t: 'פונט קריא', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19l5-14h1l5 14M6.5 13.5h6"/><path d="M17 19c2 0 3-1.2 3-3v-4"/></svg>' },
    { c: 'a11y-noanim', t: 'ביטול הנפשות', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>' },
    { c: 'a11y-noimg', t: 'הסתרת תמונות', i: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 18l6-6 4 4 2.5-2.5L21 19M4 4l16 16"/></svg>' }
  ];

  var A11Y_KEY = 'nitzan-a11y';
  var COOKIE_KEY = 'nitzan-cookies';

  function savedModes() {
    var raw = read(A11Y_KEY);
    if (!raw) return [];
    try { return JSON.parse(raw) || []; } catch (e) { return []; }
  }

  function init() {
    var root = document.documentElement;
    var body = document.body;

    /* --- הזרקת הווידג'ט --- */
    var wrap = document.createElement('div');
    var tiles = FEATURES.map(function (f) {
      return '<button type="button" class="a11y-tile" data-mode="' + f.c + '">' + f.i + '<span>' + f.t + '</span></button>';
    }).join('');

    wrap.innerHTML =
      '<button type="button" class="a11y-btn" aria-label="פתיחת תפריט נגישות" aria-haspopup="dialog">' +
        '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
          '<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>' +
          '<circle cx="12" cy="7" r="1.7" fill="currentColor"/>' +
          '<path d="M6.7 9.6c3.4 1.1 7.2 1.1 10.6 0M12 11.2v4M12 15.2l-2.7 3.9M12 15.2l2.7 3.9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>' +
        '</svg>' +
      '</button>' +
      '<div class="a11y-panel" role="dialog" aria-label="הגדרות נגישות">' +
        '<div class="a11y-head"><span>הגדרות נגישות</span>' +
          '<button type="button" class="a11y-close" aria-label="סגירת תפריט נגישות">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg>' +
          '</button>' +
        '</div>' +
        '<div class="a11y-grid">' + tiles + '</div>' +
        '<button type="button" class="btn btn-accent a11y-reset">איפוס כל הגדרות הנגישות</button>' +
        '<div class="a11y-foot"><a href="accessibility.html">הצהרת נגישות</a><a href="privacy.html">מדיניות פרטיות</a></div>' +
      '</div>' +
      '<div class="cookie-banner" role="dialog" aria-label="הודעת עוגיות">' +
        '<p><b>האתר משתמש בעוגיות.</b> הן עוזרות לנו לשפר את חוויית הגלישה ולהבין איך משתמשים באתר. אפשר לאשר או לדחות — ותמיד אפשר לשנות בהמשך. למידע נוסף: <a href="privacy.html" style="color:var(--brand);font-weight:700;text-decoration:underline;">מדיניות הפרטיות</a>.</p>' +
        '<div class="cookie-actions">' +
          '<button type="button" class="btn btn-accent cookie-accept">קבל/י</button>' +
          '<button type="button" class="btn btn-plain cookie-reject">דחייה</button>' +
        '</div>' +
      '</div>';
    body.appendChild(wrap);

    /* --- החלת הגדרות שמורות --- */
    var modes = savedModes();
    modes.forEach(function (m) { root.classList.add(m); });
    wrap.querySelectorAll('.a11y-tile').forEach(function (tile) {
      if (modes.indexOf(tile.dataset.mode) > -1) tile.classList.add('on');
    });

    /* --- פתיחה/סגירה --- */
    var openBtn = wrap.querySelector('.a11y-btn');
    openBtn.addEventListener('click', function () { body.classList.toggle('a11y-open'); });
    wrap.querySelector('.a11y-close').addEventListener('click', function () { body.classList.remove('a11y-open'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') body.classList.remove('a11y-open');
    });

    /* --- מתגים --- */
    wrap.querySelectorAll('.a11y-tile').forEach(function (tile) {
      tile.addEventListener('click', function () {
        var mode = tile.dataset.mode;
        var on = root.classList.toggle(mode);
        tile.classList.toggle('on', on);
        var current = savedModes().filter(function (m) { return m !== mode; });
        if (on) current.push(mode);
        store(A11Y_KEY, JSON.stringify(current));
      });
    });

    /* --- איפוס --- */
    wrap.querySelector('.a11y-reset').addEventListener('click', function () {
      FEATURES.forEach(function (f) { root.classList.remove(f.c); });
      wrap.querySelectorAll('.a11y-tile').forEach(function (t) { t.classList.remove('on'); });
      store(A11Y_KEY, '[]');
    });

    /* --- באנר עוגיות: מוצג בדף הראשי בלבד (אישור נשמר לתמיד; דחייה — לסשן בלבד) --- */
    function sessionRead(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } }
    function sessionStore(key, val) { try { sessionStorage.setItem(key, val); } catch (e) {} }
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var isHome = page === '' || page === 'index.html';
    if (isHome && read(COOKIE_KEY) !== 'accepted' && !sessionRead(COOKIE_KEY)) {
      body.classList.add('cookies-show');
    }
    wrap.querySelector('.cookie-accept').addEventListener('click', function () {
      store(COOKIE_KEY, 'accepted');
      body.classList.remove('cookies-show');
    });
    wrap.querySelector('.cookie-reject').addEventListener('click', function () {
      sessionStore(COOKIE_KEY, 'rejected');
      body.classList.remove('cookies-show');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
