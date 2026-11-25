'use strict';
/* =====================================================================
   Coach Anglais — PWA hors ligne, données stockées sur l'appareil.
   ===================================================================== */

/* ---------- Référentiel ---------- */
const LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'];
const LEVEL_INFO = {
  A0: { name: 'Grand débutant', can: 'Vous débutez : on pose les bases (mots essentiels, phrases simples).' },
  A1: { name: 'Découverte', can: 'Vous comprenez des expressions familières et pouvez vous présenter simplement.' },
  A2: { name: 'Élémentaire', can: 'Vous échangez sur des sujets simples et habituels : achats, travail, famille, trajets.' },
  B1: { name: 'Seuil', can: 'Vous vous débrouillez en voyage et comprenez l’essentiel quand on parle clairement.' },
  B2: { name: 'Avancé', can: 'Vous discutez avec aisance, suivez une réunion et la plupart des séries avec sous-titres anglais.' },
  C1: { name: 'Autonome', can: 'Vous vous exprimez couramment et avec précision, y compris dans un contexte professionnel exigeant.' },
};
// Heures d'apprentissage guidé (ordre de grandeur CECRL) pour passer de LEVELS[i] à LEVELS[i+1]
const HOURS = [70, 100, 180, 200, 220];
const SKILLS = {
  grammar: 'Grammaire', vocab: 'Vocabulaire', listening: 'Compréhension orale',
  speaking: 'Prononciation', reading: 'Lecture',
};
const FOCUS = {
  grammar: { icon: '📘', label: 'Leçon de grammaire' },
  vocab: { icon: '🧠', label: 'Quiz de vocabulaire' },
  listening: { icon: '🎧', label: 'Dictée audio' },
  speaking: { icon: '🎤', label: 'Prononciation' },
  reading: { icon: '📖', label: 'Lecture' },
};
const GOALS = {
  travel: { label: 'Voyager', desc: 'Se débrouiller à l’étranger, échanger avec les gens' },
  work: { label: 'Travail', desc: 'Réunions, e-mails, appels en anglais' },
  talk: { label: 'Converser', desc: 'Parler avec aisance, comprendre les natifs' },
  culture: { label: 'Séries, films, livres', desc: 'Profiter de la VO sans sous-titres français' },
  exam: { label: 'Examen', desc: 'TOEIC, IELTS, Cambridge…' },
};
const GOAL_BIAS = { // abaisse le score perçu d'une compétence => elle revient plus souvent
  travel: { speaking: -.15, listening: -.1 },
  talk: { speaking: -.15, listening: -.1 },
  work: { listening: -.1, grammar: -.05, reading: -.05 },
  culture: { listening: -.15, reading: -.1 },
  exam: { grammar: -.1, reading: -.1, listening: -.1 },
};
const DAYSETS = { 3: [1, 3, 5], 4: [1, 2, 4, 5], 5: [1, 2, 3, 4, 5], 6: [1, 2, 3, 4, 5, 6], 7: [1, 2, 3, 4, 5, 6, 0] };
const DAYNAMES = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const BOX_DAYS = [0, 1, 2, 4, 8, 16, 35, 75]; // répétition espacée (boîtes de Leitner)
const TIPS = [
  'Passez votre téléphone en anglais : des dizaines de mots du quotidien appris sans effort.',
  'Regardez vos séries en VO avec les sous-titres <b>anglais</b>, pas français : l’oreille et l’orthographe progressent ensemble.',
  'Parlez tout seul en anglais 2 minutes par jour : décrivez ce que vous faites. Ça paraît bizarre, ça marche.',
  'Mieux vaut 15 minutes tous les jours qu’1h30 le dimanche : la régularité bat l’intensité.',
  'Quand un mot vous manque, contournez-le (« the thing you use to… ») : c’est une vraie compétence.',
  'Écoutez un podcast pour apprenants (ex. BBC « 6 Minute English ») pendant vos trajets.',
  'Notez les phrases entières, pas les mots isolés : on retient mieux en contexte.',
  'Les erreurs sont normales : un natif vous comprendra même avec des fautes. Osez parler.',
  'Imitez (« shadowing ») : écoutez une phrase et répétez-la immédiatement avec la même mélodie.',
  'Changez une habitude : lisez l’actu du jour en anglais plutôt qu’en français.',
];

/* ---------- Stockage ---------- */
const KEY = 'coach-anglais-v1';
const defaults = () => ({
  profile: null, assessment: null, assessHistory: [], srs: {}, lessons: {}, readings: {}, sent: {},
  scores: {}, log: {}, settings: { accent: 'en-GB', rate: 0.9 },
});
let S = load();
function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return Object.assign(defaults(), JSON.parse(raw));
  } catch (e) { /* stockage indisponible */ }
  return defaults();
}
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { toast('Impossible d’enregistrer la progression'); }
}
if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(() => {});

/* ---------- Utilitaires ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const dkey = (d = new Date()) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseK = k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (k, n) => { const x = parseK(k); x.setDate(x.getDate() + n); return dkey(x); };
const daysBetween = (a, b) => Math.round((parseK(b) - parseK(a)) / 864e5);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
const pct = v => Math.round(v * 100);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fmtDate = k => parseK(k).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
const fmtMonth = k => parseK(k).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
const fmtH = h => h < 1 ? `${Math.round(h * 60)} min` : `${Math.round(h * 10) / 10} h`;
const today = () => dkey();
const hasData = () => typeof VOCAB !== 'undefined' && typeof PLACEMENT !== 'undefined';

function toast(msg) {
  const t = $('#toast'); t.innerHTML = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2800);
}
function dayLog(k = today()) { return S.log[k] || (S.log[k] = { min: 0, extra: 0, done: [] }); }

/* ---------- Voix : synthèse et reconnaissance ---------- */
let voices = [];
function loadVoices() { if ('speechSynthesis' in window) voices = speechSynthesis.getVoices().filter(v => /^en[-_]/i.test(v.lang)); }
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
function pickVoice() {
  const acc = S.settings.accent; const norm = v => v.lang.replace('_', '-');
  return voices.find(v => norm(v) === acc && /google|natural|enhanced|premium/i.test(v.name))
    || voices.find(v => norm(v) === acc) || voices.find(v => /^en/i.test(v.lang));
}
function speak(text, rate) {
  if (!('speechSynthesis' in window)) return toast('La synthèse vocale n’est pas disponible sur ce navigateur');
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = S.settings.accent; const v = pickVoice(); if (v) u.voice = v;
  u.rate = rate || S.settings.rate;
  speechSynthesis.speak(u);
}
const sayBtn = text => `<button class="say" data-act="say" data-text="${esc(text)}" aria-label="Écouter">🔊</button>`;
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;

/* ---------- Comparaison de phrases (dictée / prononciation) ---------- */
const CONTRACTIONS = [
  [/\bwon't\b/g, 'will not'], [/\bcan't\b/g, 'can not'], [/\bcannot\b/g, 'can not'], [/\bshan't\b/g, 'shall not'],
  [/\blet's\b/g, 'let us'], [/n't\b/g, ' not'], [/'re\b/g, ' are'], [/'m\b/g, ' am'], [/'ll\b/g, ' will'],
  [/'ve\b/g, ' have'], [/'d\b/g, ' would'], [/\b(it|that|what|there|here|he|she|who|where|how)'s\b/g, '$1 is'],
];
function normToken(t) { return t.toLowerCase().replace(/[’‘`]/g, "'").replace(/[^a-z0-9']/g, ''); }
function expand(t) {
  let s = normToken(t);
  for (const [re, rep] of CONTRACTIONS) s = s.replace(re, rep);
  return s.split(/\s+/).map(x => x.replace(/'/g, '')).filter(Boolean);
}
function compare(expected, given) {
  const orig = expected.split(/\s+/).filter(Boolean);
  const exp = []; orig.forEach((w, i) => expand(w).forEach(t => exp.push({ t, i })));
  const giv = given.split(/\s+/).flatMap(expand);
  // plus longue sous-séquence commune
  const n = exp.length, m = giv.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--)
    dp[i][j] = exp[i].t === giv[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const matched = new Set(); let i = 0, j = 0;
  while (i < n && j < m) {
    if (exp[i].t === giv[j]) { matched.add(i); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) i++; else j++;
  }
  const okWord = orig.map((_, k) => exp.every((e, idx) => e.i !== k || matched.has(idx)));
  const precision = m ? matched.size / m : 0;
  const recall = n ? matched.size / n : 0;
  const score = n ? Math.min(recall, (precision + recall) / 2 + 0.1) : 0;
  const html = orig.map((w, k) => `<span class="w ${okWord[k] ? 'ok' : 'miss'}">${esc(w)}</span>`).join(' ');
  return { score: clamp(score, 0, 1), html };
}

/* ---------- Navigation & rendu ---------- */
let route = 'today';
let RET = 'today';
let H = {};
let deferredPrompt = null;
const GLOBAL_H = {
  nav: d => go(d.r),
  say: d => speak(d.text),
  install: async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt(); await deferredPrompt.userChoice.catch(() => {}); deferredPrompt = null; render();
  },
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  const f = H[el.dataset.act]; if (f) { e.preventDefault(); f(el.dataset, el); }
});
function view(html, handlers, { nav = true } = {}) {
  const app = $('#app');
  app.innerHTML = html; app.classList.toggle('no-nav', !nav);
  H = Object.assign({}, GLOBAL_H, handlers || {});
  const navEl = $('#nav'); navEl.hidden = !nav;
  navEl.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.r === route));
}
function go(r) { route = r; if ('speechSynthesis' in window) speechSynthesis.cancel(); render(); window.scrollTo(0, 0); }
function render() {
  if (!hasData()) return view('<p class="loading">Contenu introuvable : vérifiez que le dossier « data » est bien présent.</p>', {}, { nav: false });
  if (!S.profile) return renderOnboarding();
  if (!S.assessment || route === 'retest') return renderTestIntro();
  const screens = { today: renderToday, plan: renderPlan, practice: renderPractice, progress: renderProgress };
  (screens[route] || renderToday)();
}
const topbar = (p = null) => `<div class="topbar"><button class="icon-btn" data-act="quit" aria-label="Quitter">✕</button>${p == null ? '<span class="spacer"></span>' : `<div class="bar"><i style="width:${pct(p)}%"></i></div>`}</div>`;
const quitH = () => ({ quit: () => { if (confirm('Quitter cette activité ? La progression de l’exercice en cours sera perdue.')) go(RET); } });

/* =====================================================================
   1. Accueil / profil
   ===================================================================== */
let OB = { step: 0 };
function renderOnboarding() {
  const next = () => { OB.step++; render(); };
  if (OB.step === 0) return view(`
    <section class="hero">
      <img src="icons/icon-192.png" class="hero-logo" alt="">
      <h1>Votre coach d’anglais</h1>
      <p class="lead">Un test de niveau, un planning réaliste et une séance quotidienne qui s’adapte à vos points faibles.</p>
      <p class="muted small">Gratuit, sans compte, sans pub. Vos données restent sur votre téléphone.</p>
      <button class="btn primary big" data-act="next">C’est parti</button>
    </section>`, { next }, { nav: false });

  const screens = [
    null,
    { key: 'goal', title: 'Pourquoi voulez-vous apprendre l’anglais ?', sub: 'Les séances mettront l’accent sur ce qui compte pour vous.',
      options: Object.entries(GOALS).map(([v, g]) => ({ v, label: g.label, desc: g.desc })) },
    { key: 'target', title: 'Quel niveau visez-vous ?', sub: 'Échelle européenne (CECRL). Pour la plupart des besoins, B2 est un très bon objectif.',
      options: ['A2', 'B1', 'B2', 'C1'].map(v => ({ v, label: `${v} · ${LEVEL_INFO[v].name}`, desc: LEVEL_INFO[v].can })) },
    { key: 'minutes', title: 'Combien de temps par jour ?', sub: 'Soyez réaliste : 15 minutes tenues valent mieux qu’une heure abandonnée.', grid: true,
      options: [10, 15, 20, 30, 45, 60].map(v => ({ v, label: `${v} min` })) },
    { key: 'days', title: 'Combien de jours par semaine ?', sub: 'Vous pourrez changer ces réglages à tout moment.', grid: true,
      options: [3, 4, 5, 6, 7].map(v => ({ v, label: `${v} jours` })) },
  ];
  if (OB.step >= screens.length) {
    S.profile = { goal: OB.goal, target: OB.target, minutes: OB.minutes, days: OB.days, created: today() };
    save(); return render();
  }
  const sc = screens[OB.step];
  view(`<section>
    <div class="stepno">Étape ${OB.step}/4</div>
    <h1>${sc.title}</h1><p class="muted">${sc.sub}</p>
    <div class="choices ${sc.grid ? 'grid3' : ''}">
      ${sc.options.map(o => `<button class="choice ${OB[sc.key] == o.v ? 'sel' : ''}" data-act="pick" data-v="${o.v}"><b>${esc(o.label)}</b>${o.desc ? `<span>${esc(o.desc)}</span>` : ''}</button>`).join('')}
    </div>
    <button class="btn ghost" data-act="back">← Retour</button>
  </section>`, {
    pick: d => { OB[sc.key] = isNaN(d.v) ? d.v : Number(d.v); next(); },
    back: () => { OB.step--; render(); },
  }, { nav: false });
}

/* =====================================================================
   2. Test de niveau adaptatif
   ===================================================================== */
let T = null;
function renderTestIntro() {
  const retest = !!S.assessment;
  view(`<section>
    <h1>${retest ? 'Refaire le test de niveau' : 'Test de niveau'}</h1>
    <p>Environ 10 à 15 minutes, 30 questions maximum. Le test est <b>adaptatif</b> : il commence facile et s’arrête quand les questions deviennent trop difficiles pour vous.</p>
    <div class="card tight"><ul class="checks">
      <li>Grammaire et vocabulaire</li><li>Compréhension écrite</li><li>Compréhension orale : montez le son 🔊</li>
    </ul></div>
    <p class="muted">Répondez « Je ne sais pas » plutôt que de deviner : le résultat sera plus juste et votre planning plus adapté.</p>
    <div class="bottom-actions">
      <button class="btn primary big" data-act="start">Commencer le test</button>
      ${retest ? '<button class="btn ghost" data-act="cancel">Annuler</button>' : '<button class="btn ghost" data-act="skip">Je n’ai jamais fait d’anglais : passer le test</button>'}
    </div>
  </section>`, {
    start: startTest,
    skip: () => finishTest(null),
    cancel: () => go('progress'),
  }, { nav: false });
}
function startTest() {
  const byLevel = LEVELS.slice(1).map(l => PLACEMENT.filter(q => q.level === l)).filter(g => g.length);
  T = { byLevel, li: 0, qi: 0, res: [], levelScores: [] };
  speak(' '); // débloque l'audio sur mobile (geste utilisateur)
  renderTestQ();
}
function renderTestQ() {
  const q = T.byLevel[T.li][T.qi];
  const done = T.byLevel.slice(0, T.li).reduce((a, g) => a + g.length, 0) + T.qi;
  const total = T.byLevel.reduce((a, g) => a + g.length, 0);
  view(`<section>
    ${topbar(done / total)}
    <div class="tag">${SKILLS[q.skill] || q.skill} · Question ${done + 1}</div>
    ${q.passage ? `<div class="passage">${esc(q.passage)}</div>` : ''}
    ${q.audio ? `<div class="audio-row"><button class="btn primary" data-act="play">🔊 Écouter</button><button class="btn" data-act="slow">🐢 Plus lentement</button></div>` : ''}
    <h2 class="q">${esc(q.q).replace(/_{2,}/g, '<span class="blank">___</span>')}</h2>
    <div class="options">
      ${q.options.map((o, i) => `<button class="opt" data-act="ans" data-i="${i}">${esc(o)}</button>`).join('')}
      <button class="opt idk" data-act="ans" data-i="-1">Je ne sais pas</button>
    </div>
  </section>`, {
    play: () => speak(q.audio), slow: () => speak(q.audio, 0.7),
    ans: d => answerTest(Number(d.i)),
    quit: () => { if (confirm('Abandonner le test ?')) { T = null; S.assessment ? go('progress') : render(); } },
  }, { nav: false });
  if (q.audio) setTimeout(() => speak(q.audio), 350);
}
function answerTest(i) {
  const q = T.byLevel[T.li][T.qi];
  T.res.push({ level: q.level, skill: q.skill, ok: i === q.answer });
  T.qi++;
  if (T.qi >= T.byLevel[T.li].length) {
    const lv = T.res.filter(r => r.level === q.level);
    const sc = lv.filter(r => r.ok).length / lv.length;
    T.levelScores.push(sc); T.li++; T.qi = 0;
    const last2 = T.levelScores.slice(-2);
    if (T.li >= T.byLevel.length || sc < 0.5 || (last2.length === 2 && last2.every(s => s < 0.67))) return finishTest(T);
  }
  renderTestQ();
}
function finishTest(t) {
  let level = 'A0', progress = 0; const skills = {};
  if (t) {
    let passed = 0;
    for (const s of t.levelScores) { if (s >= 0.67) passed++; else break; }
    level = LEVELS[passed];
    if (passed < t.levelScores.length) progress = clamp((t.levelScores[passed] - 0.17) / 0.5, 0, 0.9);
    for (const k of ['grammar', 'vocab', 'reading', 'listening']) {
      const r = t.res.filter(x => x.skill === k);
      if (r.length) skills[k] = r.filter(x => x.ok).length / r.length;
    }
  }
  const a = { date: today(), level, progress, skills, answered: t ? t.res.length : 0 };
  if (S.assessment) S.assessHistory.push(S.assessment);
  S.assessment = a;
  let bumped = false;
  if (LEVELS.indexOf(S.profile.target) <= LEVELS.indexOf(level)) {
    S.profile.target = LEVELS[Math.min(LEVELS.indexOf(level) + 1, 5)]; bumped = true;
  }
  save(); T = null; route = 'today';
  renderTestResult(a, bumped);
}
function renderTestResult(a, bumped) {
  const L = LEVELS.indexOf(a.level);
  const nextL = LEVELS[Math.min(L + 1, 5)];
  view(`<section class="center">
    <div class="tag">Votre niveau estimé</div>
    <div class="big-level">${a.level}</div>
    <h2>${LEVEL_INFO[a.level].name}</h2>
    <p>${LEVEL_INFO[a.level].can}</p>
    ${L < 5 ? `<div class="card tight"><div class="row small"><span>En route vers ${nextL}</span><span class="spacer"></span><b>${pct(a.progress)} %</b></div><div class="bar"><i style="width:${pct(a.progress)}%"></i></div></div>` : ''}
  </section>
  ${Object.keys(a.skills).length ? `<div class="card"><h2>Détail par compétence</h2>${skillBars(a.skills)}
    <p class="muted small">Les compétences les plus faibles reviendront plus souvent dans vos séances.</p></div>` : ''}
  ${bumped ? `<p class="tip">Bonne nouvelle : vous avez déjà atteint votre objectif ! Il passe à <b>${S.profile.target}</b> (modifiable dans Progrès › Réglages).</p>` : ''}
  <div class="bottom-actions"><button class="btn primary big" data-act="plan">Voir mon planning</button></div>`,
  { plan: () => go('plan') }, { nav: false });
}
function skillBars(sk) {
  return Object.entries(SKILLS).filter(([k]) => sk[k] != null)
    .map(([k, label]) => `<div class="skill"><span>${label}</span><div class="bar"><i style="width:${pct(sk[k])}%"></i></div><b>${pct(sk[k])}%</b></div>`).join('');
}

/* =====================================================================
   3. Planning
   ===================================================================== */
function hoursStudied(since) {
  let m = 0;
  for (const [k, v] of Object.entries(S.log)) if (!since || k >= since) m += (v.min || 0) + (v.extra || 0);
  return m / 60;
}
function planInfo() {
  const p = S.profile, a = S.assessment;
  const L = LEVELS.indexOf(a.level), Tg = LEVELS.indexOf(p.target);
  const weekly = p.minutes * p.days / 60;
  const done = hoursStudied(a.date);
  const ms = []; let cum = 0;
  for (let i = L; i < Tg; i++) { cum += HOURS[i] * (i === L ? 1 - a.progress : 1); ms.push({ level: LEVELS[i + 1], hours: cum }); }
  const remaining = Math.max(0, cum - done);
  const weeks = remaining / weekly, weeksBoost = remaining / (weekly + 2);
  ms.forEach(m => { m.reached = done >= m.hours; m.date = addDays(today(), Math.ceil(Math.max(0, m.hours - done) / weekly * 7)); });
  return { L, Tg, weekly, done, total: cum, remaining, weeks, weeksBoost, ms,
    end: addDays(today(), Math.ceil(weeks * 7)), endBoost: addDays(today(), Math.ceil(weeksBoost * 7)) };
}
function skillEstimates() {
  const a = S.assessment.skills, out = {};
  for (const k of Object.keys(SKILLS)) {
    const base = a[k] ?? (k === 'speaking' ? (a.listening ?? 0.5) : 0.5);
    const recent = (S.scores[k] || []).slice(-10);
    out[k] = recent.length ? base * 0.4 + avg(recent) * 0.6 : base;
  }
  return out;
}
function focusOrder() {
  const s = skillEstimates(), b = GOAL_BIAS[S.profile.goal] || {};
  return Object.keys(SKILLS).sort((x, y) => (s[x] + (b[x] || 0)) - (s[y] + (b[y] || 0)));
}
function weekSchedule() {
  const o = focusOrder();
  const seq = [o[0], o[1], o[2], o[0], o[3], o[4], o[1]];
  return (DAYSETS[S.profile.days] || DAYSETS[5]).map((day, i) => ({ day, focus: seq[i] }));
}
function todayFocus() {
  const wd = new Date().getDay();
  const e = weekSchedule().find(x => x.day === wd);
  return { focus: e ? e.focus : focusOrder()[0], rest: !e };
}

function renderPlan() {
  const p = S.profile, a = S.assessment, P = planInfo();
  const wd = new Date().getDay();
  const sched = weekSchedule();
  const m = p.minutes, fm = Math.max(5, Math.round(m * 0.5));
  const reached = P.Tg <= P.L || P.remaining <= 0;
  view(`
    <h1>Mon planning</h1>
    <div class="card">
      <div class="row"><span class="chip">${a.level}</span><span>→</span><span class="chip warm">Objectif ${p.target}</span></div>
      ${reached ? `<h2 style="margin-top:12px">Objectif atteint 🎉</h2><p>Refaites le test de niveau pour le confirmer, puis visez plus haut dans les réglages.</p>` : `
      <p style="margin-top:12px">À raison de <b>${m} min × ${p.days} jours</b> (${fmtH(P.weekly)}/semaine), vous pouvez viser le niveau <b>${p.target}</b> vers <b>${fmtMonth(P.end)}</b>.</p>
      <div class="kpis">
        <div class="kpi"><b>${Math.round(P.total)} h</b><span>de travail estimé</span></div>
        <div class="kpi"><b>${fmtH(P.done)}</b><span>déjà faites</span></div>
        <div class="kpi"><b>${Math.ceil(P.weeks)}</b><span>semaines restantes</span></div>
      </div>
      <p class="tip small" style="margin-top:12px">⚡ Avec <b>2 h d’immersion en plus par semaine</b> (série en VO, podcast…), l’objectif passe à <b>${fmtMonth(P.endBoost)}</b>. Notez-les dans Progrès : elles comptent !</p>`}
    </div>

    ${P.ms.length ? `<div class="card"><h2>Étapes</h2><ul class="timeline">
      <li class="reached"><b>${a.level}</b> — aujourd’hui <span class="muted small">(test du ${fmtDate(a.date)})</span></li>
      ${P.ms.map(x => `<li class="${x.reached ? 'reached' : ''}"><b>${x.level}</b> · ${LEVEL_INFO[x.level].name} — ${x.reached ? 'atteint (à confirmer par un test)' : `vers ${fmtMonth(x.date)}`}<br><span class="muted small">${LEVEL_INFO[x.level].can}</span></li>`).join('')}
    </ul><p class="muted small">Estimations basées sur les heures d’apprentissage usuelles du CECRL. Elles se recalculent avec votre pratique réelle.</p></div>` : ''}

    <div class="card"><h2>Ma semaine type</h2>
      <div class="week">
        ${[1, 2, 3, 4, 5, 6, 0].map(d => {
          const s = sched.find(x => x.day === d);
          return `<div class="d ${d === wd ? 'today' : ''} ${s ? '' : 'rest'}"><b>${DAYNAMES[d]}</b>${s ? `<span>${FOCUS[s.focus].icon} ${FOCUS[s.focus].label}</span>` : '<span>Repos (ou immersion libre)</span>'}</div>`;
        }).join('')}
      </div>
      <p class="muted small" style="margin-top:10px">Chaque séance : révisions espacées (~${Math.round(m * .3)} min) + activité du jour (~${fmtm(fm)}) + nouveaux mots. Les points faibles reviennent deux fois par semaine.</p>
    </div>

    <div class="card"><h2>Ressources gratuites pour l’immersion</h2>
      ${resources(p.goal, a.level)}
    </div>`, {});
}
const fmtm = n => `${n} min`;
function resources(goal, level) {
  const L = LEVELS.indexOf(level);
  const list = [
    ['BBC Learning English', '« 6 Minute English » : podcasts courts avec transcription.', 'https://www.bbc.co.uk/learningenglish'],
    ['Breaking News English', 'L’actualité réécrite à plusieurs niveaux, avec audio.', 'https://breakingnewsenglish.com'],
  ];
  const extra = {
    travel: ['Mise en situation', 'Avant un voyage, entraînez-vous à commander, demander son chemin, réserver : dites les phrases à voix haute.'],
    work: ['Au travail', 'Lisez la doc technique ou les articles de votre métier en anglais, et rédigez vos notes perso en anglais.'],
    talk: ['Échanges', 'Les « language exchange » (cafés linguistiques, applis d’échange gratuites) : 30 min en français contre 30 min en anglais.'],
    culture: ['Séries & films', L <= 2 ? 'Commencez par des séries que vous avez déjà vues en français, sous-titres anglais.' : 'Sous-titres anglais, puis sans sous-titres sur les épisodes que vous connaissez.'],
    exam: ['Examen', 'Faites un examen blanc officiel gratuit (sites ETS pour le TOEIC, Cambridge/IELTS) tous les 2 mois.'],
  }[goal];
  return `<ul class="checks">${list.map(([t, d, u]) => `<li><a href="${u}" target="_blank" rel="noopener">${t}</a> — ${d}</li>`).join('')}
    ${extra ? `<li><b>${extra[0]}</b> — ${extra[1]}</li>` : ''}
    <li><b>Shadowing</b> — répétez une phrase de podcast juste après l’avoir entendue, avec la même intonation.</li></ul>`;
}

/* =====================================================================
   4. Sélection du contenu
   ===================================================================== */
function studyLevel() { const L = LEVELS.indexOf(S.assessment.level); return LEVELS[Math.min(L + 1, 5)]; }
function levelOrder() {
  const sl = LEVELS.indexOf(studyLevel()); const out = [sl];
  for (let i = sl - 1; i >= 1; i--) out.push(i);
  for (let i = sl + 1; i <= 5; i++) out.push(i);
  return out.map(i => LEVELS[i]);
}
const vocabById = id => VOCAB.find(v => v.id === id);
function dueCards(limit = 999) {
  const t = today();
  return Object.entries(S.srs).filter(([, s]) => s.due <= t).sort((a, b) => a[1].due.localeCompare(b[1].due))
    .map(([id]) => vocabById(id)).filter(Boolean).slice(0, limit);
}
function nextNewWords(n) {
  const out = [];
  for (const lv of levelOrder()) {
    for (const v of VOCAB) if (v.level === lv && !S.srs[v.id]) { out.push(v); if (out.length >= n) return out; }
  }
  return out;
}
function nextLesson() {
  const t = today();
  for (const lv of levelOrder()) {
    const l = GRAMMAR.find(g => g.level === lv && (!S.lessons[g.id] || (S.lessons[g.id].score < 0.7 && S.lessons[g.id].date !== t)));
    if (l) return l;
  }
  return GRAMMAR.slice().sort((a, b) => (S.lessons[a.id].date).localeCompare(S.lessons[b.id].date))[0];
}
function nextReading() {
  for (const lv of levelOrder()) { const r = READINGS.find(x => x.level === lv && !S.readings[x.id]); if (r) return r; }
  return READINGS.slice().sort((a, b) => (S.readings[a.id]?.date || '').localeCompare(S.readings[b.id]?.date || ''))[0];
}
function pickSentences(n) {
  const sl = studyLevel(), cur = S.assessment.level;
  let pool = SENTENCES.filter(s => s.level === sl || s.level === cur);
  if (pool.length < n) pool = SENTENCES.slice();
  return shuffle(pool).sort((a, b) => (S.sent[a.id]?.d || '').localeCompare(S.sent[b.id]?.d || '')).slice(0, n);
}

/* ---------- Mesure du temps & scores ---------- */
function startSession(skill) {
  const t0 = Date.now();
  return {
    end(score) {
      const min = clamp(Math.round((Date.now() - t0) / 60000), 1, 45);
      dayLog().min += min;
      if (skill && score != null) { const a = S.scores[skill] || (S.scores[skill] = []); a.push(Math.round(score * 100) / 100); S.scores[skill] = a.slice(-20); }
      save(); return min;
    },
  };
}
function markStep(id) { const L = dayLog(); if (!L.done.includes(id)) L.done.push(id); save(); }
function renderEnd({ title, score, lines = [], min, again }) {
  const msg = score == null ? 'Bien joué !' : score >= .85 ? 'Excellent ! 🎉' : score >= .6 ? 'Bon travail 👍' : 'On continue, ça rentre 💪';
  view(`<section class="center" style="padding-top:6vh">
    <div class="tag">${esc(title)}</div>
    ${score != null ? `<div class="score-ring">${pct(score)} %</div>` : '<div class="score-ring">✓</div>'}
    <h1>${msg}</h1>
    ${lines.map(l => `<p class="muted">${l}</p>`).join('')}
    ${min ? `<p class="muted small">+ ${min} min de pratique aujourd’hui</p>` : ''}
    <div class="bottom-actions">
      <button class="btn primary big" data-act="back">Continuer</button>
      ${again ? '<button class="btn ghost" data-act="again">Recommencer</button>' : ''}
    </div>
  </section>`, { back: () => go(RET), again: () => again && again() }, { nav: false });
}

/* =====================================================================
   5. Activités
   ===================================================================== */

/* --- 5.1 Cartes mémoire (répétition espacée) --- */
function runCards(cards, title, done) {
  if (!cards.length) { toast(title === 'Révisions' ? 'Aucune carte à réviser 🎉' : 'Plus de nouveaux mots disponibles'); done && done(); return go(RET); }
  speak(' ');
  const ses = startSession('vocab');
  const queue = cards.map(c => ({ c, mode: S.srs[c.id] ? 'test' : 'new', tries: 0 }));
  let i = 0, flipped = false, firstOk = 0, firstTotal = 0;
  const setSrs = (id, box, days) => { S.srs[id] = { box, due: addDays(today(), days) }; };
  const show = () => {
    if (i >= queue.length) {
      save();
      const sc = firstTotal ? firstOk / firstTotal : null;
      const min = ses.end(sc); done && done();
      return renderEnd({ title, score: sc, min, lines: [`${cards.length} mot(s) travaillé(s)`, `${Object.values(S.srs).filter(s => s.box >= 3).length} mots mémorisés au total`] });
    }
    const q = queue[i], c = q.c, st = S.srs[c.id];
    const reverse = q.mode === 'test' && st && st.box >= 2 && (c.id.charCodeAt(c.id.length - 1) + i) % 2 === 0;
    const front = reverse ? `<span>${esc(c.fr)}</span>` : `<span>${esc(c.en)}</span>${sayBtn(c.en)}`;
    const back = `<div class="trans">${reverse ? `${esc(c.en)} ${sayBtn(c.en)}` : esc(c.fr)}</div><div class="ex">${esc(c.ex)} ${sayBtn(c.ex)}</div>`;
    let actions;
    if (q.mode === 'new') {
      actions = `<div class="bottom-actions"><button class="btn primary big" data-act="learn">Je l’apprends</button><button class="btn" data-act="knew">Je le connaissais déjà</button></div>`;
    } else if (!flipped) {
      actions = `<div class="bottom-actions"><button class="btn primary big" data-act="flip">Voir la réponse</button></div>`;
    } else {
      actions = `<div class="rate">
        <button class="btn again" data-act="rate" data-r="0">Raté<small>revoir</small></button>
        <button class="btn" data-act="rate" data-r="1">Difficile<small>bientôt</small></button>
        <button class="btn good" data-act="rate" data-r="2">Su !<small>plus tard</small></button></div>`;
    }
    view(`<section>
      ${topbar(i / queue.length)}
      <div class="card flash">
        <div class="tag">${q.mode === 'new' ? '✨ Nouveau mot' : reverse ? 'Comment dit-on en anglais ?' : 'Que signifie ?'} · ${c.level}${c.theme ? ' · ' + esc(c.theme) : ''}</div>
        <div class="word">${front}</div>
        ${q.mode === 'new' || flipped ? back : ''}
      </div>
      ${actions}
    </section>`, {
      ...quitH(),
      flip: () => { flipped = true; show(); if (reverse) speak(c.en); },
      knew: () => { setSrs(c.id, 4, BOX_DAYS[4]); firstOk++; firstTotal++; i++; flipped = false; show(); },
      learn: () => { setSrs(c.id, 1, 1); firstTotal++; queue.push({ c, mode: 'test', tries: 0, learning: true }); i++; flipped = false; show(); },
      rate: d => {
        const r = Number(d.r), cur = S.srs[c.id] || { box: 1 };
        if (!q.learning && q.tries === 0 && title === 'Révisions') { firstTotal++; if (r === 2) firstOk++; }
        if (q.learning && q.tries === 0 && r === 2) firstOk++;
        if (r === 0) { setSrs(c.id, 1, 1); if (q.tries < 2) queue.push({ c, mode: 'test', tries: q.tries + 1, learning: true }); }
        else if (r === 1) setSrs(c.id, Math.max(1, cur.box), Math.max(1, Math.floor(BOX_DAYS[Math.max(1, cur.box)] / 2)));
        else if (!q.learning) { const b = Math.min(cur.box + 1, BOX_DAYS.length - 1); setSrs(c.id, b, BOX_DAYS[b]); }
        i++; flipped = false; show();
      },
    }, { nav: false });
    if (!reverse && !flipped) setTimeout(() => speak(c.en), 250);
  };
  show();
}

/* --- 5.2 Quiz de vocabulaire --- */
function runVocabQuiz(n, done) {
  const seen = VOCAB.filter(v => S.srs[v.id]);
  let pool = seen.length >= n ? shuffle(seen).slice(0, n) : [...shuffle(seen), ...nextNewWords(n - seen.length)];
  if (!pool.length) pool = shuffle(VOCAB).slice(0, n);
  const ses = startSession('vocab');
  let i = 0, ok = 0;
  const show = () => {
    if (i >= pool.length) { save(); const sc = ok / pool.length; const min = ses.end(sc); done && done(); return renderEnd({ title: 'Quiz de vocabulaire', score: sc, min, lines: [`${ok} bonne(s) réponse(s) sur ${pool.length}`] }); }
    const c = pool[i], toFr = i % 2 === 0;
    const sameLv = VOCAB.filter(v => v.id !== c.id && v.level === c.level);
    const opts = shuffle([c, ...shuffle(sameLv).slice(0, 3)]);
    view(`<section>
      ${topbar(i / pool.length)}
      <div class="tag">${toFr ? 'Que signifie ?' : 'Comment dit-on en anglais ?'} · ${c.level}</div>
      <h2 class="q" style="font-size:1.6rem">${toFr ? `${esc(c.en)} ${sayBtn(c.en)}` : esc(c.fr)}</h2>
      <div class="options">${opts.map(o => `<button class="opt" data-act="ans" data-id="${o.id}">${esc(toFr ? o.fr : o.en)}</button>`).join('')}</div>
      <div id="fb"></div>
    </section>`, {
      ...quitH(),
      ans: (d, el) => {
        document.querySelectorAll('.opt').forEach(b => { b.disabled = true; if (b.dataset.id === c.id) b.classList.add('right'); });
        const right = d.id === c.id;
        if (right) ok++; else { el.classList.add('wrong'); if (S.srs[c.id]) S.srs[c.id] = { box: 1, due: addDays(today(), 1) }; }
        speak(c.en);
        $('#fb').innerHTML = `<div class="feedback ${right ? 'ok' : 'ko'}"><b>${right ? 'Correct !' : `${esc(c.en)} = ${esc(c.fr)}`}</b><span class="muted">${esc(c.ex)}</span></div>
          <button class="btn primary big" data-act="next">Suivant</button>`;
      },
      next: () => { i++; show(); },
    }, { nav: false });
    if (toFr) setTimeout(() => speak(c.en), 250);
  };
  show();
}

/* --- 5.3 Leçon de grammaire --- */
function runGrammar(lesson, done) {
  if (!lesson) { toast('Aucune leçon disponible'); return go(RET); }
  const ses = startSession('grammar');
  let i = -1, ok = 0;
  const show = () => {
    if (i === -1) {
      return view(`<section>
        ${topbar()}
        <div class="tag">Grammaire · ${lesson.level}</div>
        <h1>${esc(lesson.title)}</h1>
        <div class="card explain">${lesson.explain}</div>
        <button class="btn primary big" data-act="start">Passer aux exercices (${lesson.exercises.length})</button>
      </section>`, { ...quitH(), start: () => { i = 0; show(); } }, { nav: false });
    }
    if (i >= lesson.exercises.length) {
      const sc = ok / lesson.exercises.length;
      S.lessons[lesson.id] = { score: sc, date: today() }; const min = ses.end(sc); done && done();
      return renderEnd({ title: lesson.title, score: sc, min,
        lines: [sc < 0.7 ? 'Cette leçon reviendra dans une prochaine séance pour consolider.' : 'Leçon validée ✓'],
        again: () => runGrammar(lesson) });
    }
    const ex = lesson.exercises[i];
    const qHtml = esc(ex.q).replace(/_{2,}/g, '<span class="blank">___</span>');
    view(`<section>
      ${topbar(i / lesson.exercises.length)}
      <div class="tag">${esc(lesson.title)} · ${i + 1}/${lesson.exercises.length}</div>
      <h2 class="q">${qHtml}</h2>
      ${ex.type === 'mcq'
        ? `<div class="options">${ex.options.map((o, k) => `<button class="opt" data-act="mcq" data-k="${k}">${esc(o)}</button>`).join('')}</div>`
        : `<form data-form="fill"><input type="text" id="fill" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Votre réponse"><div class="bottom-actions"><button class="btn primary big" data-act="check">Vérifier</button></div></form>`}
      <div id="fb"></div>
    </section>`, {
      ...quitH(),
      mcq: (d, el) => {
        const k = Number(d.k), right = k === ex.answer;
        document.querySelectorAll('.opt').forEach((b, idx) => { b.disabled = true; if (idx === ex.answer) b.classList.add('right'); });
        if (!right) el.classList.add('wrong');
        feedback(right, ex.options[ex.answer]);
      },
      check: () => {
        const inp = $('#fill'); if (!inp || inp.disabled) return;
        const v = inp.value.trim(); if (!v) return inp.focus();
        const norm = s => s.toLowerCase().replace(/[’‘]/g, "'").replace(/[.!?]/g, '').replace(/\s+/g, ' ').trim();
        const answers = [].concat(ex.answer);
        const right = answers.some(a => norm(a) === norm(v));
        inp.disabled = true; $('[data-act=check]').remove();
        feedback(right, answers[0]);
      },
      next: () => { i++; show(); },
    }, { nav: false });
    const inp = $('#fill');
    if (inp) { inp.focus(); inp.closest('form').addEventListener('submit', e => { e.preventDefault(); H.check(); }); }
  };
  const feedback = (right, answer) => {
    if (right) ok++;
    $('#fb').innerHTML = `<div class="feedback ${right ? 'ok' : 'ko'}"><b>${right ? 'Correct !' : `Réponse : ${esc(answer)}`}</b>${esc(lesson.exercises[i].why || '')}</div>
      <button class="btn primary big" data-act="next">Suivant</button>`;
  };
  show();
}

/* --- 5.4 Dictée --- */
function runDictation(list, done) {
  speak(' ');
  const ses = startSession('listening');
  let i = 0; const scores = [];
  const show = () => {
    if (i >= list.length) { save(); const sc = avg(scores); const min = ses.end(sc); done && done(); return renderEnd({ title: 'Dictée audio', score: sc, min, lines: [`${list.length} phrase(s) écoutée(s)`] }); }
    const s = list[i];
    view(`<section>
      ${topbar(i / list.length)}
      <div class="tag">Dictée · ${s.level} · ${i + 1}/${list.length}</div>
      <h2>Écoutez et écrivez la phrase</h2>
      <div class="audio-row"><button class="btn primary" data-act="play">🔊 Écouter</button><button class="btn" data-act="slow">🐢 Lentement</button></div>
      <textarea id="ans" autocomplete="off" autocapitalize="sentences" autocorrect="off" spellcheck="false" placeholder="Tapez ce que vous entendez…"></textarea>
      <div class="bottom-actions" id="acts"><button class="btn primary big" data-act="check">Vérifier</button><button class="btn ghost" data-act="giveup">Je ne comprends pas</button></div>
      <div id="fb"></div>
    </section>`, {
      ...quitH(),
      play: () => speak(s.en), slow: () => speak(s.en, 0.65),
      check: () => grade($('#ans').value),
      giveup: () => grade(''),
      next: () => { i++; show(); },
    }, { nav: false });
    setTimeout(() => speak(s.en), 300);
    const grade = v => {
      const r = compare(s.en, v); scores.push(r.score);
      S.sent[s.id] = { d: today(), s: r.score };
      $('#ans').disabled = true; $('#acts').remove();
      $('#fb').innerHTML = `<div class="feedback ${r.score >= .8 ? 'ok' : 'ko'}"><b>${r.score >= .95 ? 'Parfait !' : r.score >= .8 ? 'Presque parfait' : `${pct(r.score)} % des mots`}</b>
        <div class="diff">${r.html} ${sayBtn(s.en)}</div><div class="muted small" style="margin-top:6px">🇫🇷 ${esc(s.fr)}</div></div>
        <button class="btn primary big" data-act="next">Suivant</button>`;
    };
  };
  show();
}

/* --- 5.5 Prononciation --- */
function runSpeaking(list, done) {
  speak(' ');
  const ses = startSession('speaking');
  let i = 0; const scores = []; let best = 0, rec = null;
  const show = () => {
    if (i >= list.length) { save(); const sc = avg(scores); const min = ses.end(sc); done && done(); return renderEnd({ title: 'Prononciation', score: sc, min, lines: [Recognition ? 'Score calculé à partir de la reconnaissance vocale.' : 'Auto-évaluation (reconnaissance vocale indisponible).'] }); }
    const s = list[i]; best = 0;
    view(`<section>
      ${topbar(i / list.length)}
      <div class="tag">Prononciation · ${s.level} · ${i + 1}/${list.length}</div>
      <p class="muted">Écoutez le modèle, puis lisez la phrase à voix haute.</p>
      <div class="card"><div class="sentence">${esc(s.en)}</div><div class="muted small">🇫🇷 ${esc(s.fr)}</div></div>
      <div class="audio-row"><button class="btn" data-act="play">🔊 Modèle</button><button class="btn" data-act="slow">🐢 Lentement</button></div>
      ${Recognition
        ? `<div class="center"><button class="mic" id="mic" data-act="mic" aria-label="Parler">🎤</button><p class="muted small" id="micst">Touchez le micro puis parlez</p></div>`
        : `<p class="tip small">La reconnaissance vocale n’est pas disponible ici (utilisez Chrome sur Android). Répétez la phrase puis évaluez-vous :</p>
           <div class="rate"><button class="btn again" data-act="self" data-v="0.3">À revoir</button><button class="btn" data-act="self" data-v="0.65">Moyen</button><button class="btn good" data-act="self" data-v="0.95">Bien</button></div>`}
      <div id="fb"></div>
    </section>`, {
      ...quitH(),
      play: () => speak(s.en), slow: () => speak(s.en, 0.65),
      mic: () => listen(s),
      self: d => { scores.push(Number(d.v)); i++; show(); },
      next: () => { scores.push(best); S.sent[s.id] = { d: today(), s: best }; i++; show(); },
    }, { nav: false });
  };
  const listen = s => {
    if (rec) { rec.stop(); return; }
    speechSynthesis.cancel();
    const mic = $('#mic'), st = $('#micst');
    rec = new Recognition(); rec.lang = S.settings.accent; rec.interimResults = false; rec.maxAlternatives = 5;
    mic.classList.add('on'); st.textContent = 'Je vous écoute…';
    rec.onresult = e => {
      const alts = [...e.results[0]].map(a => a.transcript);
      const res = alts.map(a => ({ a, ...compare(s.en, a) })).sort((x, y) => y.score - x.score)[0];
      best = Math.max(best, res.score);
      $('#fb').innerHTML = `<div class="feedback ${res.score >= .8 ? 'ok' : 'ko'}"><b>${res.score >= .9 ? 'Très bien !' : res.score >= .7 ? 'Pas mal !' : 'Encore un effort'} — ${pct(res.score)} %</b>
        <div class="diff">${res.html}</div><div class="muted small" style="margin-top:6px">Entendu : « ${esc(res.a)} »</div></div>
        <div class="bottom-actions"><button class="btn primary big" data-act="next">Suivant</button><button class="btn ghost" data-act="mic">🎤 Réessayer</button></div>`;
    };
    rec.onerror = e => {
      const msg = { 'not-allowed': 'Autorisez l’accès au micro pour cet exercice.', 'no-speech': 'Je n’ai rien entendu, réessayez.', network: 'La reconnaissance vocale nécessite une connexion internet.' }[e.error] || 'Erreur de reconnaissance vocale.';
      toast(msg);
    };
    rec.onend = () => { rec = null; const m = $('#mic'); if (m) { m.classList.remove('on'); $('#micst').textContent = 'Touchez le micro puis parlez'; } };
    try { rec.start(); } catch (e) { rec = null; mic.classList.remove('on'); }
  };
  show();
}

/* --- 5.6 Lecture --- */
function runReading(r, done) {
  if (!r) { toast('Aucun texte disponible'); return go(RET); }
  const ses = startSession('reading');
  const picks = {};
  view(`<section>
    ${topbar()}
    <div class="tag">Lecture · ${r.level}</div>
    <h1>${esc(r.title)}</h1>
    <div class="audio-row"><button class="btn" data-act="play">🔊 Écouter le texte</button><button class="btn" data-act="stop">⏹ Stop</button></div>
    <div class="card reading">${r.text.split(/\n\n+/).map(p => `<p>${esc(p)}</p>`).join('')}</div>
    <h2>Questions</h2>
    ${r.questions.map((q, qi) => `<div class="rq"><h3>${qi + 1}. ${esc(q.q)}</h3><div class="options">
      ${q.options.map((o, k) => `<button class="opt" data-act="pick" data-q="${qi}" data-k="${k}">${esc(o)}</button>`).join('')}</div></div>`).join('')}
    <div id="fb"></div>
    <div class="bottom-actions" id="acts"><button class="btn primary big" data-act="validate">Valider mes réponses</button></div>
  </section>`, {
    ...quitH(),
    play: () => speak(r.text.replace(/\n+/g, ' '), Math.min(S.settings.rate, 0.9)),
    stop: () => speechSynthesis.cancel(),
    pick: (d, el) => {
      if (el.disabled) return;
      picks[d.q] = Number(d.k);
      el.parentElement.querySelectorAll('.opt').forEach(b => b.classList.toggle('picked', b === el));
    },
    validate: () => {
      if (Object.keys(picks).length < r.questions.length && !confirm('Certaines questions sont sans réponse. Valider quand même ?')) return;
      let ok = 0;
      r.questions.forEach((q, qi) => {
        const btns = document.querySelectorAll(`[data-q="${qi}"]`);
        btns.forEach((b, k) => { b.disabled = true; b.classList.remove('picked'); if (k === q.answer) b.classList.add('right'); else if (k === picks[qi]) b.classList.add('wrong'); });
        if (picks[qi] === q.answer) ok++;
      });
      const sc = ok / r.questions.length;
      S.readings[r.id] = { score: sc, date: today() };
      const min = ses.end(sc); done && done();
      $('#acts').innerHTML = `<div class="feedback ${sc >= .75 ? 'ok' : 'ko'}"><b>${ok}/${r.questions.length} bonnes réponses</b>+ ${min} min de pratique</div>
        <button class="btn primary big" data-act="back">Continuer</button>`;
    },
    back: () => go(RET),
  }, { nav: false });
}

/* =====================================================================
   6. Écrans principaux
   ===================================================================== */
function sessionSpec() {
  const m = S.profile.minutes;
  return { reviewLimit: clamp(m * 2, 10, 60), newCount: clamp(Math.round(m / 3), 3, 12), fm: Math.max(5, Math.round(m * 0.5)) };
}
function launchFocus(focus, fm, done) {
  if (focus === 'grammar') runGrammar(nextLesson(), done);
  else if (focus === 'listening') runDictation(pickSentences(clamp(Math.round(fm / 1.5), 3, 10)), done);
  else if (focus === 'speaking') runSpeaking(pickSentences(clamp(fm, 3, 10)), done);
  else if (focus === 'reading') runReading(nextReading(), done);
  else runVocabQuiz(clamp(fm * 2, 8, 20), done);
}
function focusSub(focus) {
  if (focus === 'grammar') { const l = nextLesson(); return l ? `${l.level} · ${l.title}` : ''; }
  if (focus === 'reading') { const r = nextReading(); return r ? `${r.level} · ${r.title}` : ''; }
  if (focus === 'listening') return 'Écoutez et écrivez des phrases';
  if (focus === 'speaking') return 'Répétez des phrases au micro';
  return 'Testez les mots déjà vus';
}
function streak() {
  let k = today(), n = 0;
  if (!(S.log[k] && (S.log[k].min + S.log[k].extra) > 0)) k = addDays(k, -1);
  while (S.log[k] && (S.log[k].min + S.log[k].extra) > 0) { n++; k = addDays(k, -1); }
  return n;
}

function renderToday() {
  RET = 'today';
  const p = S.profile, a = S.assessment, L = dayLog();
  const { focus, rest } = todayFocus(), spec = sessionSpec();
  const due = dueCards().length;
  const steps = [];
  if (due) steps.push({ id: 'review', icon: '🔁', label: 'Révisions', sub: `${Math.min(due, spec.reviewLimit)} carte(s) à revoir` });
  steps.push({ id: 'focus', icon: FOCUS[focus].icon, label: FOCUS[focus].label, sub: focusSub(focus) });
  steps.push({ id: 'new', icon: '✨', label: 'Nouveaux mots', sub: `${spec.newCount} mots niveau ${studyLevel()}` });
  const doneSteps = steps.filter(s => L.done.includes(s.id)).length;
  const allDone = doneSteps === steps.length;
  const minToday = L.min + L.extra;
  const P = planInfo();
  const tip = TIPS[daysBetween('2024-01-01', today()) % TIPS.length];
  const nowDate = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

  view(`
    <div class="head">
      <div><h1>Hello ! 👋</h1><div class="date">${nowDate}</div></div>
      <div class="streak">🔥 ${streak()}<small>jour(s)</small></div>
    </div>
    ${deferredPrompt ? `<div class="banner"><span>Installez l’app sur votre écran d’accueil</span><span class="spacer"></span><button class="btn" data-act="install">Installer</button></div>` : ''}
    <div class="card">
      <div class="row"><h2 style="margin:0">Séance du jour</h2><span class="spacer"></span><span class="chip">${p.minutes} min</span></div>
      <p class="muted small" style="margin:4px 0 10px">${rest ? 'Jour de repos prévu… mais une petite séance ne fait jamais de mal !' : `Focus du jour : ${SKILLS[focus].toLowerCase()}`}</p>
      <div class="row small"><span>${minToday} / ${p.minutes} min</span><span class="spacer"></span><span>${doneSteps}/${steps.length} étapes</span></div>
      <div class="bar ${minToday >= p.minutes ? 'ok' : ''}" style="margin:6px 0 8px"><i style="width:${clamp(pct(minToday / p.minutes), 0, 100)}%"></i></div>
      <ul class="steps-list">
        ${steps.map(s => {
          const d = L.done.includes(s.id);
          return `<li class="step ${d ? 'done' : ''}"><div class="ico">${d ? '✅' : s.icon}</div>
            <div class="txt"><b>${esc(s.label)}</b><span>${esc(s.sub)}</span></div>
            <button class="btn small ${d ? '' : 'primary'}" data-act="go" data-id="${s.id}">${d ? 'Refaire' : 'Go'}</button></li>`;
        }).join('')}
      </ul>
      ${allDone ? `<p class="feedback ok" style="margin-bottom:0"><b>Séance terminée, bravo ! 🎉</b>Envie de plus ? L’onglet S’entraîner est à vous.</p>` : ''}
    </div>
    <div class="card tight">
      <div class="row"><span class="chip">${a.level}</span><span>→</span><span class="chip warm">${p.target}</span><span class="spacer"></span>
      <span class="small muted">${P.remaining > 0 ? `objectif ≈ ${fmtMonth(P.end)}` : 'objectif atteint 🎉'}</span></div>
      <div class="bar" style="margin-top:10px"><i style="width:${P.total ? clamp(pct(P.done / P.total), 0, 100) : 100}%"></i></div>
    </div>
    <div class="card tight tip"><b>💡 Astuce du jour</b><br>${tip}</div>
  `, {
    go: d => {
      if (d.id === 'review') return runCards(dueCards(spec.reviewLimit), 'Révisions', () => markStep('review'));
      if (d.id === 'new') return runCards(nextNewWords(spec.newCount), 'Nouveaux mots', () => markStep('new'));
      launchFocus(focus, spec.fm, () => markStep('focus'));
    },
  });
}

function renderPractice() {
  RET = 'practice';
  const spec = sessionSpec(), due = dueCards().length;
  const lvlBadge = lv => `<span class="lv">${lv}</span>`;
  const st = rec => rec ? `${rec.score >= .7 ? '✓' : '↻'} ${pct(rec.score)} %` : '';
  view(`
    <h1>S’entraîner</h1>
    <div class="tiles">
      <button class="tile" data-act="t" data-k="review"><span class="e">🔁</span><b>Révisions</b><span>${due} carte(s) à revoir</span></button>
      <button class="tile" data-act="t" data-k="new"><span class="e">✨</span><b>Nouveaux mots</b><span>Niveau ${studyLevel()}</span></button>
      <button class="tile" data-act="t" data-k="vocab"><span class="e">🧠</span><b>Quiz vocabulaire</b><span>Mots déjà vus</span></button>
      <button class="tile" data-act="t" data-k="listening"><span class="e">🎧</span><b>Dictée audio</b><span>Compréhension orale</span></button>
      <button class="tile" data-act="t" data-k="speaking"><span class="e">🎤</span><b>Prononciation</b><span>${Recognition ? 'Avec reconnaissance vocale' : 'Auto-évaluation'}</span></button>
      <button class="tile" data-act="t" data-k="reading"><span class="e">📖</span><b>Lecture</b><span>Texte suivant</span></button>
    </div>
    <details open><summary>📘 Leçons de grammaire (${Object.keys(S.lessons).length}/${GRAMMAR.length})</summary><div class="list">
      ${GRAMMAR.map(g => `<button class="li" data-act="lesson" data-id="${g.id}">${lvlBadge(g.level)}<span>${esc(g.title)}</span><span class="st">${st(S.lessons[g.id])}</span></button>`).join('')}
    </div></details>
    <details><summary>📖 Textes (${Object.keys(S.readings).length}/${READINGS.length})</summary><div class="list">
      ${READINGS.map(r => `<button class="li" data-act="read" data-id="${r.id}">${lvlBadge(r.level)}<span>${esc(r.title)}</span><span class="st">${st(S.readings[r.id])}</span></button>`).join('')}
    </div></details>
  `, {
    t: d => {
      if (d.k === 'review') return runCards(dueCards(spec.reviewLimit), 'Révisions');
      if (d.k === 'new') return runCards(nextNewWords(spec.newCount), 'Nouveaux mots');
      launchFocus(d.k, spec.fm);
    },
    lesson: d => runGrammar(GRAMMAR.find(g => g.id === d.id)),
    read: d => runReading(READINGS.find(r => r.id === d.id)),
  });
}

function renderProgress() {
  RET = 'progress';
  const p = S.profile, a = S.assessment;
  const totalH = hoursStudied();
  const learned = Object.values(S.srs).filter(s => s.box >= 3).length;
  const learning = Object.keys(S.srs).length - learned;
  const est = skillEstimates();
  // calendrier des 5 dernières semaines (lundi → dimanche)
  const t = today(); const wd = (parseK(t).getDay() + 6) % 7;
  const start = addDays(t, -wd - 28);
  const cells = [];
  for (let k = 0; k < 35; k++) {
    const d = addDays(start, k); const l = S.log[d]; const m = l ? l.min + l.extra : 0;
    const lvl = d > t ? '' : m === 0 ? '' : m < p.minutes / 2 ? 'l1' : m < p.minutes ? 'l2' : 'l3';
    cells.push(`<i class="${lvl} ${d === t ? 't' : ''}" title="${d} : ${m} min"></i>`);
  }
  const since = daysBetween(a.date, t);
  const retestHint = since >= 42 ? `<p class="tip small">Votre dernier test date de ${since} jours : refaites-le pour mesurer vos progrès et ajuster le planning.</p>` : '';
  const hist = [...S.assessHistory, a];
  const opt = (vals, cur, lab = v => v) => vals.map(v => `<option value="${v}" ${String(v) === String(cur) ? 'selected' : ''}>${lab(v)}</option>`).join('');

  view(`
    <h1>Mes progrès</h1>
    ${deferredPrompt ? `<div class="banner"><span>Installez l’app sur votre écran d’accueil</span><span class="spacer"></span><button class="btn" data-act="install">Installer</button></div>` : ''}
    <div class="kpis" style="margin-bottom:14px">
      <div class="kpi"><b>🔥 ${streak()}</b><span>jours d’affilée</span></div>
      <div class="kpi"><b>${fmtH(totalH)}</b><span>de pratique</span></div>
      <div class="kpi"><b>${learned}</b><span>mots mémorisés${learning ? ` (+${learning} en cours)` : ''}</span></div>
    </div>
    <div class="card"><h2>Régularité</h2>
      <div class="heat">${cells.join('')}</div>
      <p class="muted small" style="margin:8px 0 0">5 dernières semaines · plus c’est foncé, plus vous avez pratiqué.</p>
    </div>
    <div class="card"><h2>Compétences</h2>${skillBars(est)}
      <p class="muted small">Estimation mêlant le dernier test et vos 10 derniers exercices.</p></div>
    <div class="card"><h2>Temps d’immersion</h2>
      <p class="muted small">Série en VO, podcast, conversation, lecture… Tout compte dans votre planning !</p>
      <form class="row" data-form="extra">
        <select id="xmin" style="flex:1">${opt([10, 15, 20, 30, 45, 60, 90, 120], 30, v => `${v} min`)}</select>
        <button class="btn primary" data-act="extra">Ajouter aujourd’hui</button>
      </form>
    </div>
    <div class="card"><h2>Test de niveau</h2>
      ${hist.map(h => `<div class="row small"><span>${fmtDate(h.date)}</span><span class="spacer"></span><span class="chip">${h.level}</span></div>`).join('<div style="height:6px"></div>')}
      ${retestHint}
      <button class="btn block" style="margin-top:12px" data-act="retest">Refaire le test</button>
    </div>
    <div class="card"><h2>Réglages</h2>
      <div class="form-grid">
        <label>Objectif<select data-set="target">${opt(['A2', 'B1', 'B2', 'C1'], p.target, v => `${v} · ${LEVEL_INFO[v].name}`)}</select></label>
        <label>Motivation principale<select data-set="goal">${opt(Object.keys(GOALS), p.goal, v => GOALS[v].label)}</select></label>
        <label>Minutes par jour<select data-set="minutes">${opt([10, 15, 20, 30, 45, 60], p.minutes, v => `${v} min`)}</select></label>
        <label>Jours par semaine<select data-set="days">${opt([3, 4, 5, 6, 7], p.days)}</select></label>
        <label>Accent<select data-set="accent">${opt(['en-GB', 'en-US'], S.settings.accent, v => v === 'en-GB' ? 'Britannique 🇬🇧' : 'Américain 🇺🇸')}</select></label>
        <label>Vitesse de la voix<select data-set="rate">${opt([0.7, 0.8, 0.9, 1], S.settings.rate, v => ({ 0.7: 'Lente', 0.8: 'Posée', 0.9: 'Normale', 1: 'Naturelle' }[v]))}</select></label>
      </div>
      <button class="btn block" style="margin-top:12px" data-act="testvoice">🔊 Tester la voix</button>
    </div>
    <div class="card"><h2>Sauvegarde</h2>
      <p class="muted small">Vos données sont uniquement sur cet appareil. Exportez-les de temps en temps pour ne rien perdre (changement de téléphone…).</p>
      <div class="row"><button class="btn" data-act="export">Exporter</button><button class="btn" data-act="import">Importer</button><span class="spacer"></span><button class="btn ghost danger" data-act="reset">Tout effacer</button></div>
      <input type="file" id="file" accept="application/json,.json" hidden>
    </div>
  `, {
    extra: () => { const m = Number($('#xmin').value); dayLog().extra += m; save(); toast(`+ ${m} min d’immersion 👏`); render(); },
    retest: () => go('retest'),
    testvoice: () => speak('Hello! This is how I will sound during your English lessons.'),
    export: () => {
      const blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
      const url = URL.createObjectURL(blob); const link = document.createElement('a');
      link.href = url; link.download = `coach-anglais-${today()}.json`; document.body.appendChild(link); link.click();
      setTimeout(() => { URL.revokeObjectURL(url); link.remove(); }, 1000);
    },
    import: () => $('#file').click(),
    reset: () => {
      if (!confirm('Effacer toute votre progression ? Cette action est définitive.')) return;
      if (!confirm('Vraiment sûr ? Pensez à exporter avant.')) return;
      S = defaults(); OB = { step: 0 }; save(); route = 'today'; render();
    },
  });
  document.querySelectorAll('[data-set]').forEach(sel => sel.addEventListener('change', () => {
    const k = sel.dataset.set, v = isNaN(sel.value) ? sel.value : Number(sel.value);
    if (k === 'accent' || k === 'rate') S.settings[k] = v; else S.profile[k] = v;
    save(); toast('Réglage enregistré'); render();
  }));
  $('[data-form=extra]').addEventListener('submit', e => { e.preventDefault(); H.extra(); });
  $('#file').addEventListener('change', async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!data || typeof data !== 'object' || !data.profile) throw new Error('format');
      S = Object.assign(defaults(), data); save(); toast('Sauvegarde importée ✓'); render();
    } catch (err) { toast('Fichier invalide'); }
  });
}

/* =====================================================================
   7. Démarrage
   ===================================================================== */
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredPrompt = e; if (S.assessment && (route === 'today' || route === 'progress')) render(); });
window.addEventListener('appinstalled', () => { deferredPrompt = null; toast('App installée ✓'); });
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}
render();
