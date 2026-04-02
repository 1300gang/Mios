// ==========================================
// STATE.JS — État global partagé
// Masque de Fayçal · E1-S1
// ==========================================

const STATE_KEY = 'masque_fayçal_state';

const DEFAULT_STATE = {
  layer_red_done: false,
  layer_blue_done: false,
  layer_green_done: false,
  green_collected_letters: [],
};

// ── Lecture ──────────────────────────────
function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch (e) {
    console.warn('⚠️ state.js — impossible de lire localStorage:', e);
    return { ...DEFAULT_STATE };
  }
}

// ── Écriture ─────────────────────────────
function saveState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('⚠️ state.js — impossible d\'écrire localStorage:', e);
  }
}

// ── Marquer une couche comme terminée ────
// color : 'red' | 'blue' | 'green'
function markLayerDone(color) {
  const state = loadState();
  const key = `layer_${color}_done`;
  if (!state[key]) {
    state[key] = true;
    saveState(state);
    console.log(`✅ Couche ${color} validée !`);
  }
  return state;
}

// ── Toutes les couches complétées ? ──────
function isAllDone() {
  const state = loadState();
  return state.layer_red_done && state.layer_blue_done && state.layer_green_done;
}

// ── Reset complet ─────────────────────────
function resetState() {
  try {
    localStorage.removeItem(STATE_KEY);
    console.log('🔄 État remis à zéro');
  } catch (e) {
    console.warn('⚠️ state.js — impossible de reset:', e);
  }
}

// ── Lettres collectées (mini-jeu vert) ───
function addGreenLetter(letter) {
  const state = loadState();
  const l = letter.toUpperCase();
  if (!state.green_collected_letters.includes(l)) {
    state.green_collected_letters.push(l);
    saveState(state);
  }
  return state.green_collected_letters;
}

function getGreenLetters() {
  return loadState().green_collected_letters;
}
