import { MARATHONS, MAJOR_COURSES } from "./data/marathon-data.js";
import { RUNS as SEED } from "./data/rtw-runs.js";

const GEO_URL = "https://unpkg.com/globe.gl@2.45.3/example/datasets/ne_110m_admin_0_countries.geojson";
const ROTATE_SPEED = 0.35;
const GOAL_TARGET = 100;

const ADMIN_ALIASES = {
  "United States": "United States of America",
  "Turkey": "Turkey",
  "Vietnam": "Vietnam",
  "United Kingdom": "United Kingdom"
};

const HOME_CITIES = [
  { n: "New York", lat: 40.7128, lng: -74.006 }, { n: "Los Angeles", lat: 34.0522, lng: -118.2437 }, { n: "Chicago", lat: 41.8781, lng: -87.6298 },
  { n: "Toronto", lat: 43.6532, lng: -79.3832 }, { n: "London", lat: 51.5074, lng: -0.1278 }, { n: "Paris", lat: 48.8566, lng: 2.3522 },
  { n: "Berlin", lat: 52.52, lng: 13.405 }, { n: "Amsterdam", lat: 52.3676, lng: 4.9041 }, { n: "Sydney", lat: -33.8688, lng: 151.2093 },
  { n: "Tokyo", lat: 35.6762, lng: 139.6503 }, { n: "Singapore", lat: 1.3521, lng: 103.8198 }, { n: "Cape Town", lat: -33.9249, lng: 18.4241 },
  { n: "Mumbai", lat: 19.076, lng: 72.8777 }, { n: "Sao Paulo", lat: -23.5505, lng: -46.6333 }, { n: "Nairobi", lat: -1.2921, lng: 36.8219 }
];

const MONTH_SEASON = { January: "Winter", February: "Winter", March: "Spring", April: "Spring", May: "Spring", June: "Summer", July: "Summer", August: "Summer", September: "Fall", October: "Fall", November: "Fall", December: "Winter" };
const SOUTHERN = ["Australia", "New Zealand", "South Africa"];
const GOAL_WEIGHTS = {
  bq: { speed: 35, weather: 10, cost: 15, entry: 10, qualifying: 30 },
  pb: { speed: 35, weather: 20, cost: 15, entry: 15, qualifying: 15 },
  bucket: { speed: 10, weather: 25, cost: 30, entry: 25, qualifying: 10 },
  first: { speed: 10, weather: 20, cost: 25, entry: 35, qualifying: 10 }
};
const MAJOR_NAMES = ["Tokyo", "Boston", "London", "Berlin", "Chicago", "New York City", "Sydney"];

const ISO_BY_ADMIN = {
  "Afghanistan": "AF", "Albania": "AL", "Algeria": "DZ", "Angola": "AO", "Argentina": "AR", "Armenia": "AM", "Australia": "AU", "Austria": "AT", "Azerbaijan": "AZ",
  "Bahrain": "BH", "Bangladesh": "BD", "Belarus": "BY", "Belgium": "BE", "Belize": "BZ", "Benin": "BJ", "Bermuda": "BM", "Bhutan": "BT", "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA", "Botswana": "BW", "Brazil": "BR", "Brunei": "BN", "Bulgaria": "BG", "Burkina Faso": "BF", "Burundi": "BI",
  "Cambodia": "KH", "Cameroon": "CM", "Canada": "CA", "Central African Republic": "CF", "Chad": "TD", "Chile": "CL", "China": "CN", "Colombia": "CO",
  "Comoros": "KM", "Costa Rica": "CR", "Croatia": "HR", "Cuba": "CU", "Cyprus": "CY", "Czechia": "CZ", "Czech Republic": "CZ",
  "Democratic Republic of the Congo": "CD", "Denmark": "DK", "Djibouti": "DJ", "Dominican Republic": "DO",
  "East Timor": "TL", "Ecuador": "EC", "Egypt": "EG", "El Salvador": "SV", "Equatorial Guinea": "GQ", "Eritrea": "ER", "Estonia": "EE", "eSwatini": "SZ", "Eswatini": "SZ", "Ethiopia": "ET",
  "Falkland Islands": "FK", "Fiji": "FJ", "Finland": "FI", "France": "FR", "French Guiana": "GF", "French Southern and Antarctic Lands": "TF",
  "Gabon": "GA", "Gambia": "GM", "Georgia": "GE", "Germany": "DE", "Ghana": "GH", "Greece": "GR", "Greenland": "GL", "Guatemala": "GT", "Guinea": "GN", "Guinea-Bissau": "GW", "Guyana": "GY",
  "Haiti": "HT", "Honduras": "HN", "Hungary": "HU", "Iceland": "IS", "India": "IN", "Indonesia": "ID", "Iran": "IR", "Iraq": "IQ", "Ireland": "IE", "Israel": "IL", "Italy": "IT", "Ivory Coast": "CI",
  "Jamaica": "JM", "Japan": "JP", "Jordan": "JO", "Kazakhstan": "KZ", "Kenya": "KE", "Kosovo": "XK", "Kuwait": "KW", "Kyrgyzstan": "KG",
  "Laos": "LA", "Latvia": "LV", "Lebanon": "LB", "Lesotho": "LS", "Liberia": "LR", "Libya": "LY", "Lithuania": "LT", "Luxembourg": "LU",
  "Macedonia": "MK", "North Macedonia": "MK", "Madagascar": "MG", "Malawi": "MW", "Malaysia": "MY", "Mali": "ML", "Malta": "MT", "Mauritania": "MR", "Mauritius": "MU", "Mexico": "MX", "Moldova": "MD", "Mongolia": "MN", "Montenegro": "ME", "Morocco": "MA", "Mozambique": "MZ", "Myanmar": "MM",
  "Namibia": "NA", "Nepal": "NP", "Netherlands": "NL", "New Caledonia": "NC", "New Zealand": "NZ", "Nicaragua": "NI", "Niger": "NE", "Nigeria": "NG", "North Korea": "KP", "Northern Cyprus": "CY", "Norway": "NO",
  "Oman": "OM", "Pakistan": "PK", "Palestine": "PS", "Panama": "PA", "Papua New Guinea": "PG", "Paraguay": "PY", "Peru": "PE", "Philippines": "PH", "Poland": "PL", "Portugal": "PT", "Puerto Rico": "PR",
  "Qatar": "QA", "Republic of Serbia": "RS", "Serbia": "RS", "Republic of the Congo": "CG", "Romania": "RO", "Russia": "RU", "Rwanda": "RW",
  "Saudi Arabia": "SA", "Senegal": "SN", "Sierra Leone": "SL", "Singapore": "SG", "Slovakia": "SK", "Slovenia": "SI", "Solomon Islands": "SB", "Somalia": "SO", "Somaliland": "SO", "South Africa": "ZA", "South Korea": "KR", "South Sudan": "SS", "Spain": "ES", "Sri Lanka": "LK", "Sudan": "SD", "Suriname": "SR", "Swaziland": "SZ", "Sweden": "SE", "Switzerland": "CH", "Syria": "SY",
  "Taiwan": "TW", "Tajikistan": "TJ", "Tanzania": "TZ", "United Republic of Tanzania": "TZ", "Thailand": "TH", "The Bahamas": "BS", "Togo": "TG", "Trinidad and Tobago": "TT", "Tunisia": "TN", "Turkey": "TR", "Turkiye": "TR", "Turkmenistan": "TM",
  "Uganda": "UG", "Ukraine": "UA", "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US", "United States of America": "US", "Uruguay": "UY", "Uzbekistan": "UZ",
  "Vanuatu": "VU", "Venezuela": "VE", "Vietnam": "VN", "Western Sahara": "EH", "Yemen": "YE", "Zambia": "ZM", "Zimbabwe": "ZW"
};

function isoForAdmin(admin, fallback) {
  if (ISO_BY_ADMIN[admin]) return ISO_BY_ADMIN[admin];
  if (fallback && fallback !== "-99" && fallback.length === 2) return fallback;
  return "";
}
function flagOf(iso) {
  if (!iso || iso.length !== 2) return "🌐";
  return String.fromCodePoint(...[...iso.toUpperCase()].map(ch => 0x1F1E6 + ch.charCodeAt(0) - 65));
}
function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function dateLabel(iso) {
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
function entryTypeLabel(t) {
  return t === "open" ? "Open registration" : t === "lottery" ? "Lottery" : t === "qualifier" ? "Qualifying time required" : t === "charity" ? "Charity entry" : t;
}
function speedRating(m) {
  const n = (m.note || "").toLowerCase();
  let s = 55;
  if (/flat|fast|fastest|record course/.test(n)) s += 28;
  if (/hilly|hill|altitude|climb|strength|rolling|undulating/.test(n)) s -= 25;
  if (m.major) s += 6;
  return Math.max(8, Math.min(100, s));
}
function seasonOf(m) {
  let s = MONTH_SEASON[m.month];
  if (SOUTHERN.includes(m.country)) { const flip = { Winter: "Summer", Summer: "Winter", Spring: "Fall", Fall: "Spring" }; s = flip[s]; }
  return s;
}
function seasonFit(m, season) {
  const s = seasonOf(m);
  if (s === season) return 95;
  const adj = { Winter: ["Fall", "Spring"], Spring: ["Winter", "Summer"], Summer: ["Spring", "Fall"], Fall: ["Summer", "Winter"] };
  return (adj[season] || []).includes(s) ? 55 : 22;
}
function entryEase(m) {
  if (m.entryType === "open") return m.lotteryStatus === "closed" ? 68 : 95;
  if (m.entryType === "charity") return 60;
  if (m.entryType === "lottery") return m.lotteryStatus === "open" ? 65 : 32;
  if (m.entryType === "qualifier") return 15;
  return 50;
}
function estimateCost(m, home) {
  const dist = haversineKm(home.lat, home.lng, m.lat, m.lng);
  const fee = m.major ? 320 : (m.entryType === "qualifier" ? 220 : m.entryType === "lottery" ? 170 : 110);
  const hotel = dist < 250 ? 140 : dist < 3000 ? 300 : 500;
  return Math.round((fee + hotel + dist * 0.11) / 10) * 10;
}
function solidTexture(hex) {
  const c = document.createElement("canvas");
  c.width = c.height = 4;
  const x = c.getContext("2d");
  x.fillStyle = hex; x.fillRect(0, 0, 4, 4);
  return c.toDataURL();
}
function ringCentroid(feature) {
  let best = null, bestLen = 0;
  const walk = (coords, depth) => {
    if (depth === 0) return;
    if (typeof coords[0][0] === "number") { if (coords.length > bestLen) { bestLen = coords.length; best = coords; } return; }
    coords.forEach(c => walk(c, depth - 1));
  };
  const g = feature.geometry;
  if (!g) return null;
  walk(g.coordinates, g.type === "Polygon" ? 2 : 3);
  if (!best) return null;
  let x = 0, y = 0;
  best.forEach(p => { x += p[0]; y += p[1]; });
  return { lng: x / best.length, lat: y / best.length };
}
function escapeHtml(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// ---------------------------------------------------------------------------
// state
// ---------------------------------------------------------------------------
const state = {
  mode: localStorage.getItem("rtwMode") || "community",
  userRuns: JSON.parse(localStorage.getItem("rtwRuns") || "[]"),
  countriesOpen: false, addOpen: false, country: null,
  form: { country: "", city: "", member: "", profile: "", title: "", km: "", date: "", note: "", strava: "" },
  addHint: "",
  geoFeatures: [], geoIndex: {},
  marathons: MARATHONS, courses: MAJOR_COURSES,
  majorsOnly: false, openNowOnly: false, region: "All", entryFilter: "All",
  search: "", selected: null, hovered: null, showCourse: false,
  quest: new Set(JSON.parse(localStorage.getItem("rtwQuest") || "[]")),
  watchlist: new Set(JSON.parse(localStorage.getItem("rtwWatch") || "[]")),
  questOpen: false, recOpen: false,
  rec: { home: "New York", goal: "pb", season: "Spring", budget: 1500, weights: { ...GOAL_WEIGHTS.pb }, results: [] }
};

let globe = null;
let mouseX = 0, mouseY = 0;

// ---------------------------------------------------------------------------
// derived data
// ---------------------------------------------------------------------------
function allRuns() {
  return [...SEED.map(r => ({ ...r, seed: true })), ...state.userRuns];
}
function countryRecords() {
  const map = new Map();
  allRuns().slice().sort((a, b) => a.date.localeCompare(b.date)).forEach(r => {
    if (!map.has(r.c)) map.set(r.c, { name: r.c, iso: r.iso, flag: flagOf(r.iso), first: r.date, runs: [] });
    const rec = map.get(r.c);
    rec.runs.push(r);
    rec.last = r.date;
  });
  return map;
}
function adminFor(name) {
  const a = ADMIN_ALIASES[name] || name;
  if (state.geoIndex[a]) return a;
  const hit = Object.keys(state.geoIndex).find(k => k.toLowerCase() === a.toLowerCase() || k.toLowerCase().includes(a.toLowerCase()));
  return hit || a;
}
function displayNameFor(admin) {
  const keys = [...countryRecords().keys()];
  return keys.find(k => adminFor(k) === admin) || admin;
}
function getFilteredMarathons() {
  const { majorsOnly, openNowOnly, region, entryFilter, marathons } = state;
  return marathons.filter(m =>
    (!majorsOnly || m.major) &&
    (!openNowOnly || m.lotteryStatus === "open") &&
    (region === "All" || m.region === region) &&
    (entryFilter === "All" || m.entryType === entryFilter)
  );
}
function getSearchResults() {
  const q = state.search.trim().toLowerCase();
  if (!q) return [];
  return state.marathons.filter(m => m.name.toLowerCase().includes(q) || m.city.toLowerCase().includes(q) || m.country.toLowerCase().includes(q)).slice(0, 8);
}

// ---------------------------------------------------------------------------
// globe
// ---------------------------------------------------------------------------
function mountGlobe() {
  const el = document.getElementById("globe");
  const g = Globe()(el)
    .width(el.clientWidth).height(el.clientHeight)
    .backgroundColor("rgba(0,0,0,0)")
    .globeImageUrl(solidTexture("#0d5cb6"))
    .showAtmosphere(true).atmosphereColor("#8fbdf0").atmosphereAltitude(0.17)
    .polygonCapColor(d => d.__visited ? "rgba(252,111,20,0.92)" : "rgba(142,214,207,0.95)")
    .polygonSideColor(() => "rgba(9,58,120,0.75)")
    .polygonStrokeColor(d => d.__visited ? "#fff6ea" : "rgba(9,58,120,0.95)")
    .polygonAltitude(d => d.__visited ? 0.016 : 0.008)
    .polygonLabel(() => "")
    .onPolygonClick(d => { if (d && d.__visited) selectCountry(d.__country); })
    .pointLat("lat").pointLng("lng").pointColor("color").pointRadius("size").pointAltitude("alt")
    .pointResolution(20).pointLabel(() => "")
    .ringColor(() => (t) => `rgba(252,76,2,${1 - t})`)
    .ringMaxRadius(4.5).ringPropagationSpeed(1.5).ringRepeatPeriod(2400)
    .pathColor(() => "rgba(252,76,2,0.95)")
    .pathDashLength(0.01).pathDashGap(0.005).pathDashAnimateTime(6000)
    .onPointHover(pt => handlePointHover(pt))
    .onPointClick(pt => handlePointClick(pt));

  try { g.globeMaterial().color.set("#0d5cb6"); } catch (e) {}
  g.pointOfView({ lat: 20, lng: 10, altitude: 2.5 });
  const controls = g.controls();
  controls.autoRotate = true; controls.autoRotateSpeed = ROTATE_SPEED;
  controls.addEventListener("start", () => { controls.autoRotate = false; });
  el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect(); mouseX = e.clientX - r.left; mouseY = e.clientY - r.top; });

  globe = g;
  new ResizeObserver(() => { g.width(el.clientWidth); g.height(el.clientHeight); }).observe(el);
  refresh();
}

function refresh() {
  if (!globe) return;
  const { mode } = state;
  const visited = new Set([...countryRecords().keys()].map(n => adminFor(n)));
  state.geoFeatures.forEach(f => {
    f.__visited = mode === "community" && visited.has(f.__admin);
    f.__country = f.__admin;
  });
  globe.polygonsData(state.geoFeatures.slice());

  if (mode === "community") {
    const runs = allRuns();
    const pts = runs.map(r => ({ ...r, kind: "run", lat: r.lat, lng: r.lng, color: "rgba(255,252,247,1)", size: 0.55, alt: 0.04 }));
    globe.pointsData(pts);
    const recent = runs.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
    globe.ringsData(recent.map(r => ({ lat: r.lat, lng: r.lng })));
    globe.pathsData([]);
  } else {
    const list = getFilteredMarathons().map(m => ({
      ...m, kind: "race",
      color: m.major ? "rgba(252,76,2,0.95)" : "rgba(255,217,168,0.9)",
      size: m.major ? 0.62 : 0.4, alt: m.major ? 0.03 : 0.02
    }));
    globe.pointsData(list);
    globe.ringsData(list.filter(m => m.major).map(m => ({ lat: m.lat, lng: m.lng })));
    updateCourseLayer();
  }
}
function updateCourseLayer() {
  if (!globe) return;
  const sel = state.selected;
  const show = state.showCourse && sel && state.courses[sel.name];
  globe.pathsData(show ? [state.courses[sel.name]] : []);
}

// ---------------------------------------------------------------------------
// mode
// ---------------------------------------------------------------------------
function setMode(mode) {
  localStorage.setItem("rtwMode", mode);
  state.mode = mode; state.selected = null; state.country = null; state.hovered = null;
  state.recOpen = false; state.countriesOpen = false; state.addOpen = false;
  refresh();
  renderHeader(); renderCommunityRail(); renderRacesToolbar(); renderQuest();
  renderTooltip(); renderCountryPanel(); renderMarathonPanel(); renderCountriesDrawer(); renderAddModal(); renderRecDrawer();
}

// ---------------------------------------------------------------------------
// hover / click
// ---------------------------------------------------------------------------
function handlePointHover(pt) {
  if (!pt) { state.hovered = null; renderTooltip(); return; }
  const title = pt.kind === "run" ? pt.city : pt.name;
  const sub = pt.kind === "run" ? `${pt.member} · ${dateLabel(pt.date)}` : `${pt.city}, ${pt.country}`;
  state.hovered = { title, sub, x: mouseX, y: mouseY };
  renderTooltip();
}
function handlePointClick(pt) {
  if (pt.kind === "run") selectCountry(adminFor(pt.c));
  else selectMarathon(pt);
}

// ---------------------------------------------------------------------------
// country selection
// ---------------------------------------------------------------------------
function selectCountry(admin) {
  const name = displayNameFor(admin);
  const rec = countryRecords().get(name);
  if (!rec) return;
  const runs = rec.runs.slice().sort((a, b) => b.date.localeCompare(a.date)).map(r => ({ ...r, dateLabel: dateLabel(r.date) }));
  const members = new Set(rec.runs.map(r => r.member)).size;
  const target = state.geoIndex[admin];
  state.country = {
    name, flag: rec.flag, runs,
    summary: `${runs.length} run${runs.length > 1 ? "s" : ""} · ${members} member${members > 1 ? "s" : ""} · on the map since ${dateLabel(rec.first)}`
  };
  state.selected = null; state.hovered = null; state.countriesOpen = false;
  renderTooltip(); renderCountryPanel(); renderMarathonPanel(); renderCountriesDrawer();
  if (globe && target && target.__centroid) {
    globe.controls().autoRotate = false;
    globe.pointOfView({ lat: target.__centroid.lat, lng: target.__centroid.lng, altitude: 1.7 }, 1000);
  }
}
function closeCountry() { state.country = null; renderCountryPanel(); }

function openCountries() { state.countriesOpen = true; renderCountriesDrawer(); }
function closeCountries() { state.countriesOpen = false; renderCountriesDrawer(); }
function openAdd() { state.addOpen = true; state.addHint = ""; renderAddModal(); }
function closeAdd() { state.addOpen = false; renderAddModal(); }

function submitRun() {
  const f = state.form;
  if (!f.country) { state.addHint = "Pick a country first."; renderAddModal(); return; }
  if (!f.city.trim()) { state.addHint = "Where did you run?"; renderAddModal(); return; }
  if (!f.member.trim()) { state.addHint = "Add your name so the club knows."; renderAddModal(); return; }
  const feat = state.geoIndex[f.country];
  const c = feat && feat.__centroid ? feat.__centroid : { lat: 0, lng: 0 };
  const jitter = () => (Math.random() - 0.5) * 3;
  const iso = isoForAdmin(f.country, feat && feat.__iso);
  const run = {
    c: f.country, iso, city: f.city.trim(), member: f.member.trim(),
    date: f.date || new Date().toISOString().slice(0, 10),
    note: f.note.trim(), strava: f.strava.trim(),
    profile: f.profile.trim(), title: f.title.trim(), km: Number(f.km) || 0,
    lat: c.lat + jitter(), lng: c.lng + jitter()
  };
  const wasNew = !countryRecords().has(f.country);
  state.userRuns = [...state.userRuns, run];
  localStorage.setItem("rtwRuns", JSON.stringify(state.userRuns));
  state.addOpen = false;
  state.form = { country: "", city: "", member: "", profile: "", title: "", km: "", date: "", note: "", strava: "" };
  state.addHint = "";
  resetFormInputs();
  refresh();
  renderCommunityRail(); renderAddModal(); renderCountriesDrawer();
  if (wasNew) selectCountry(adminFor(f.country));
}
function resetFormInputs() {
  document.getElementById("formCountry").value = "";
  document.getElementById("formCity").value = "";
  document.getElementById("formMember").value = "";
  document.getElementById("formDate").value = "";
  document.getElementById("formProfile").value = "";
  document.getElementById("formTitle").value = "";
  document.getElementById("formKm").value = "";
  document.getElementById("formStrava").value = "";
  document.getElementById("formNote").value = "";
}

// ---------------------------------------------------------------------------
// races filters / search
// ---------------------------------------------------------------------------
function setFilterAll() { state.majorsOnly = false; state.openNowOnly = false; refresh(); renderRacesToolbar(); }
function setFilterMajorsOnly() { state.majorsOnly = true; state.openNowOnly = false; refresh(); renderRacesToolbar(); }
function toggleOpenNow() { state.openNowOnly = !state.openNowOnly; state.majorsOnly = false; refresh(); renderRacesToolbar(); }
function setRegion(v) { state.region = v; refresh(); }
function setEntryFilter(v) { state.entryFilter = v; refresh(); }

function selectFromSearch(m) { state.search = ""; document.getElementById("searchInput").value = ""; selectMarathon(m); }
function selectMarathon(m) {
  state.selected = { ...m, hasCourse: !!state.courses[m.name] };
  state.hovered = null; state.showCourse = false; state.recOpen = false; state.country = null;
  renderTooltip(); renderCountryPanel(); renderMarathonPanel(); renderRecDrawer(); renderSearchResults();
  if (globe) {
    globe.controls().autoRotate = false;
    globe.pointOfView({ lat: m.lat, lng: m.lng, altitude: 1.6 }, 1000);
    updateCourseLayer();
  }
}
function closePanel() { state.selected = null; renderMarathonPanel(); updateCourseLayer(); }
function toggleCourse() { state.showCourse = !state.showCourse; renderMarathonPanel(); updateCourseLayer(); }
function toggleNotify() {
  if (!state.selected) return;
  const w = state.watchlist;
  w.has(state.selected.name) ? w.delete(state.selected.name) : w.add(state.selected.name);
  localStorage.setItem("rtwWatch", JSON.stringify([...w]));
  renderMarathonPanel();
}
function toggleQuestOpen() { state.questOpen = !state.questOpen; renderQuest(); }
function toggleQuestMajor(name) {
  const q = state.quest;
  q.has(name) ? q.delete(name) : q.add(name);
  localStorage.setItem("rtwQuest", JSON.stringify([...q]));
  renderQuest();
}

// ---------------------------------------------------------------------------
// recommender
// ---------------------------------------------------------------------------
function openRec() { state.recOpen = true; renderRecDrawer(); computeRecommendations(); }
function closeRec() { state.recOpen = false; renderRecDrawer(); }
function setGoal(goal) { state.rec.goal = goal; state.rec.weights = { ...GOAL_WEIGHTS[goal] }; renderRecDrawer(); computeRecommendations(); }
function computeRecommendations() {
  const { home: homeName, goal, season, budget, weights } = state.rec;
  const home = HOME_CITIES.find(c => c.n === homeName) || HOME_CITIES[0];
  const wSum = Object.values(weights).reduce((a, b) => a + b, 0) || 1;
  const scored = state.marathons.map(m => {
    const speed = speedRating(m);
    const weather = seasonFit(m, season);
    const estCost = estimateCost(m, home);
    const cost = estCost <= budget ? 100 : Math.max(10, 100 - (estCost - budget) / 20);
    const entry = entryEase(m);
    const qualifying = goal === "bq" ? speed : Math.round(speed * 0.6);
    const fit = (speed * weights.speed + weather * weights.weather + cost * weights.cost + entry * weights.entry + qualifying * weights.qualifying) / wSum;
    return { ...m, estCost, entryLabel: entryTypeLabel(m.entryType), fit: Math.max(0, Math.min(100, Math.round(fit))) };
  });
  scored.sort((a, b) => b.fit - a.fit);
  state.rec.results = scored.slice(0, 8);
  renderRecResults();
}

// ---------------------------------------------------------------------------
// render: header
// ---------------------------------------------------------------------------
function renderHeader() {
  const isCommunity = state.mode === "community";
  document.getElementById("modeCommunity").classList.toggle("active", isCommunity);
  document.getElementById("modeRaces").classList.toggle("active", !isCommunity);
  document.getElementById("btnCountries").hidden = !isCommunity;
  document.getElementById("btnAdd").hidden = !isCommunity;
  document.getElementById("btnFindRace").hidden = isCommunity;
  document.getElementById("countryCountHeader").textContent = countryRecords().size;
}

// ---------------------------------------------------------------------------
// render: community rail
// ---------------------------------------------------------------------------
function computeFeed() {
  const goal = GOAL_TARGET;
  const runsAll = allRuns();
  const timeline = [];
  const seen = new Set();
  runsAll.slice().sort((a, b) => a.date.localeCompare(b.date)).forEach(r => {
    const isNew = !seen.has(r.c);
    if (isNew) seen.add(r.c);
    timeline.push({
      flag: flagOf(r.iso), isNew,
      head: isNew ? `${r.member} added ${r.c} to the map.` : `${r.member} logged ${r.city}, ${r.c}.`,
      sub: [r.profile, r.title].filter(Boolean).join(" · "),
      color: "var(--ink)",
      country: r.c
    });
    if (isNew && seen.size % 5 === 0) {
      timeline.push({
        flag: "🏁", isNew: false,
        head: `${seen.size} countries on the map. ${Math.max(0, goal - seen.size)} to go.`,
        sub: "", color: "#a83303", country: null
      });
    }
  });
  return timeline.reverse().slice(0, 4);
}

function renderCommunityRail() {
  const isCommunity = state.mode === "community";
  document.getElementById("communityRail").hidden = !isCommunity;
  if (!isCommunity) return;

  const goal = GOAL_TARGET;
  const countryCount = countryRecords().size;
  const runsAll = allRuns();

  document.getElementById("countryCount").textContent = countryCount;
  document.getElementById("goalCount").textContent = goal;
  document.getElementById("progressFill").style.width = Math.min(100, Math.round((countryCount / goal) * 100)) + "%";
  document.getElementById("remainingText").textContent = `${Math.max(0, goal - countryCount)} to go.`;
  document.getElementById("runCount").textContent = runsAll.length;
  document.getElementById("memberCount").textContent = new Set(runsAll.map(r => r.member)).size;
  document.getElementById("totalKm").textContent = Math.round(runsAll.reduce((a, r) => a + (Number(r.km) || 0), 0)).toLocaleString();

  renderFeed();
}

function renderFeed() {
  const feed = computeFeed();
  const card = document.getElementById("feedCard");
  card.hidden = feed.length === 0;
  if (feed.length === 0) return;
  const list = document.getElementById("feedList");
  list.innerHTML = feed.map((f, i) => `
    <div class="rtw-feed-row rtw-row" data-feed-index="${i}" style="cursor:${f.country ? "pointer" : "default"};">
      <span class="rtw-feed-flag">${f.flag}</span>
      <div style="flex:1;min-width:0;">
        <div class="rtw-feed-head" style="color:${f.color};">${escapeHtml(f.head)}</div>
        ${f.sub ? `<div class="rtw-feed-sub">${escapeHtml(f.sub)}</div>` : ""}
      </div>
      ${f.isNew ? `<span class="rtw-feed-new">NEW</span>` : ""}
    </div>
  `).join("");
  [...list.querySelectorAll("[data-feed-index]")].forEach(el => {
    const f = feed[Number(el.dataset.feedIndex)];
    if (f.country) el.addEventListener("click", () => selectCountry(adminFor(f.country)));
  });
}

// ---------------------------------------------------------------------------
// render: races toolbar
// ---------------------------------------------------------------------------
function renderRacesToolbar() {
  const isRaces = state.mode === "races";
  document.getElementById("racesToolbar").hidden = !isRaces;
  if (!isRaces) return;
  document.getElementById("segAll").classList.toggle("active", !state.majorsOnly && !state.openNowOnly);
  document.getElementById("segMajors").classList.toggle("active", state.majorsOnly);
  document.getElementById("segOpenNow").classList.toggle("active", state.openNowOnly);
  renderSearchResults();
}

function renderSearchResults() {
  const wrap = document.getElementById("searchResults");
  const q = state.search.trim();
  if (!q) { wrap.hidden = true; wrap.innerHTML = ""; return; }
  const results = getSearchResults();
  wrap.hidden = false;
  if (results.length === 0) {
    wrap.innerHTML = `<div class="rtw-search-empty">No marathon matches that.</div>`;
    return;
  }
  wrap.innerHTML = results.map((m, i) => `
    <div class="rtw-search-row rtw-row" data-idx="${i}">
      <span>${escapeHtml(m.name)}</span><span style="color:var(--muted);">${escapeHtml(m.country)}</span>
    </div>
  `).join("");
  [...wrap.querySelectorAll("[data-idx]")].forEach(el => {
    const m = results[Number(el.dataset.idx)];
    el.addEventListener("click", () => selectFromSearch(m));
  });
}

// ---------------------------------------------------------------------------
// render: quest widget
// ---------------------------------------------------------------------------
function renderQuest() {
  const isRaces = state.mode === "races";
  document.getElementById("questWidget").hidden = !isRaces;
  if (!isRaces) return;
  const questList = MAJOR_NAMES.map(name => ({ name, checked: state.quest.has(name) }));
  const questCount = questList.filter(q => q.checked).length;
  const turn = Math.round((questCount / 7) * 1000) / 1000;
  document.getElementById("questRing").style.background = `conic-gradient(var(--heat) 0turn ${turn}turn, rgba(32,30,29,.12) ${turn}turn 1turn)`;
  document.getElementById("questCountText").textContent = `${questCount}/7`;
  document.getElementById("questPanel").hidden = !state.questOpen;
  const list = document.getElementById("questList");
  list.innerHTML = questList.map((qm, i) => `
    <label class="rtw-quest-item"><input type="checkbox" data-qidx="${i}" ${qm.checked ? "checked" : ""}>${escapeHtml(qm.name)}</label>
  `).join("");
  [...list.querySelectorAll("[data-qidx]")].forEach(el => {
    const qm = questList[Number(el.dataset.qidx)];
    el.addEventListener("change", () => toggleQuestMajor(qm.name));
  });
}

// ---------------------------------------------------------------------------
// render: tooltip
// ---------------------------------------------------------------------------
function renderTooltip() {
  const tt = document.getElementById("tooltip");
  if (!state.hovered) { tt.hidden = true; return; }
  tt.hidden = false;
  tt.style.left = (state.hovered.x + 18) + "px";
  tt.style.top = (state.hovered.y + 14) + "px";
  document.getElementById("tooltipTitle").textContent = state.hovered.title;
  document.getElementById("tooltipSub").textContent = state.hovered.sub;
}

// ---------------------------------------------------------------------------
// render: country panel
// ---------------------------------------------------------------------------
function renderCountryPanel() {
  const panel = document.getElementById("countryPanel");
  const open = !!state.country;
  panel.classList.toggle("open", open);
  if (!open) return;
  const c = state.country;
  document.getElementById("countryPanelBody").innerHTML = `
    <div style="font-size:40px;line-height:1;margin-bottom:8px;">${c.flag}</div>
    <h2 style="margin:0 0 4px;font-family:var(--font-heading);font-size:26px;color:var(--ink);line-height:1.15;padding-right:34px;">${escapeHtml(c.name)}</h2>
    <div style="font-size:12.5px;color:var(--muted);margin-bottom:18px;">${escapeHtml(c.summary)}</div>
    <div style="display:flex;flex-direction:column;gap:9px;">
      ${c.runs.map(r => `
        <div class="rtw-run-card">
          <div style="display:flex;justify-content:space-between;gap:10px;align-items:baseline;">
            <span style="font-size:13.5px;color:var(--ink);font-family:var(--font-heading);">${escapeHtml(r.city)}</span>
            <span style="font-size:10.5px;color:var(--muted);white-space:nowrap;">${escapeHtml(r.dateLabel)}</span>
          </div>
          <div style="font-size:11.5px;color:var(--muted);margin-top:2px;">${escapeHtml(r.member)}</div>
          ${r.note ? `<div style="font-size:12.5px;color:var(--ink);line-height:1.5;margin-top:7px;">${escapeHtml(r.note)}</div>` : ""}
          ${r.strava ? `<a href="${escapeHtml(r.strava)}" target="_blank" rel="noopener" style="font-size:11.5px;display:inline-block;margin-top:7px;">On Strava &#8599;</a>` : ""}
        </div>
      `).join("")}
    </div>
  `;
}

// ---------------------------------------------------------------------------
// render: marathon panel
// ---------------------------------------------------------------------------
function renderMarathonPanel() {
  const panel = document.getElementById("marathonPanel");
  const open = !!state.selected;
  panel.classList.toggle("open", open);
  if (!open) return;
  const m = state.selected;
  const w = state.watchlist.has(m.name);
  const notifyStyle = w ? "background:#fc4c02;color:#fff9f2;border:1.5px solid #fc4c02;" : "background:transparent;color:var(--ink);border:1.5px solid var(--border);";
  const notifyLabel = w ? "Watching this race" : "Notify me when entry opens";
  const courseBtnLabel = state.showCourse ? "Hide course line" : "Show course line";

  document.getElementById("marathonPanelBody").innerHTML = `
    ${m.major ? `<div style="display:inline-flex;align-self:flex-start;background:rgba(252,76,2,.14);color:#a83303;font-size:10.5px;letter-spacing:.06em;text-transform:uppercase;padding:5px 12px;border-radius:999px;margin-bottom:12px;">Abbott World Marathon Major</div>` : ""}
    <h2 style="margin:0 0 4px;font-family:var(--font-heading);font-size:24px;color:var(--ink);line-height:1.15;padding-right:34px;">${escapeHtml(m.name)}</h2>
    <div style="font-size:13.5px;color:var(--muted);margin-bottom:14px;">${escapeHtml(m.city)}, ${escapeHtml(m.country)}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;">
      <span style="background:rgba(32,30,29,.06);border-radius:999px;padding:5px 12px;font-size:11.5px;color:var(--ink);">Founded ${m.founded}</span>
      <span style="background:rgba(32,30,29,.06);border-radius:999px;padding:5px 12px;font-size:11.5px;color:var(--ink);">${escapeHtml(m.month)}</span>
      <span style="background:rgba(32,30,29,.06);border-radius:999px;padding:5px 12px;font-size:11.5px;color:var(--ink);">Rank #${m.rank}</span>
    </div>
    <div style="font-size:12.5px;color:var(--ink);margin-bottom:10px;">${escapeHtml(entryTypeLabel(m.entryType))}</div>
    <div style="display:flex;align-items:center;gap:10px;margin:4px 0 14px;">
      <span id="notifyToggle" style="width:28px;height:28px;border-radius:50%;flex:none;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;${notifyStyle}">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
      </span>
      <span style="font-size:11.5px;color:var(--muted);">${notifyLabel}</span>
    </div>
    ${m.hasCourse ? `
      <div id="courseToggle" style="display:inline-flex;align-self:flex-start;align-items:center;gap:6px;border:1px solid var(--border);color:var(--ink);font-size:11.5px;padding:7px 14px;border-radius:999px;cursor:pointer;margin-bottom:6px;">${courseBtnLabel}</div>
      <div style="font-size:10px;color:var(--muted);margin-bottom:14px;">Simplified route from known course landmarks, not surveyed GPS.</div>
    ` : ""}
    <div style="height:1px;background:var(--border);margin-bottom:14px;"></div>
    <div style="font-size:13px;color:var(--ink);margin-bottom:2px;">From <b>$${m.priceFrom}</b></div>
    <div style="font-size:11px;color:var(--muted);margin-bottom:12px;">flight + 2 nights + entry, estimated</div>
    <a href="${escapeHtml(m.officialUrl)}" target="_blank" rel="noopener" style="display:block;text-align:center;background:var(--terra);color:var(--onterra);font-family:var(--font-heading);font-size:12.5px;padding:11px;border-radius:999px;text-decoration:none;margin-bottom:14px;">Official site &#8599;</a>
    <p style="margin:0;font-size:13.5px;line-height:1.65;color:var(--ink);">${escapeHtml(m.note)}</p>
  `;
  const notifyEl = document.getElementById("notifyToggle");
  if (notifyEl) notifyEl.addEventListener("click", toggleNotify);
  const courseEl = document.getElementById("courseToggle");
  if (courseEl) courseEl.addEventListener("click", toggleCourse);
}

// ---------------------------------------------------------------------------
// render: countries drawer
// ---------------------------------------------------------------------------
function renderCountriesDrawer() {
  const drawer = document.getElementById("countriesDrawer");
  drawer.classList.toggle("open", state.countriesOpen);
  const records = countryRecords();
  const goal = GOAL_TARGET;
  const countryCount = records.size;
  document.getElementById("countriesDrawerMeta").textContent = `${countryCount} of ${goal} · ${Math.max(0, goal - countryCount)} to go`;
  const ordered = [...records.values()].sort((a, b) => b.last.localeCompare(a.last));
  const grid = document.getElementById("countriesGrid");
  grid.innerHTML = ordered.map((c, i) => `
    <div class="rtw-country-row rtw-row" data-cidx="${i}">
      <span class="rtw-country-flag">${c.flag}</span>
      <div style="min-width:0;">
        <div class="rtw-country-name">${escapeHtml(c.name)}</div>
        <div class="rtw-country-meta">${c.runs.length} run${c.runs.length > 1 ? "s" : ""} · since ${dateLabel(c.first)}</div>
      </div>
    </div>
  `).join("");
  [...grid.querySelectorAll("[data-cidx]")].forEach(el => {
    const c = ordered[Number(el.dataset.cidx)];
    el.addEventListener("click", () => selectCountry(adminFor(c.name)));
  });
}

// ---------------------------------------------------------------------------
// render: add-run modal
// ---------------------------------------------------------------------------
function renderAddModal() {
  document.getElementById("addModal").classList.toggle("open", state.addOpen);
  document.getElementById("addHint").textContent = state.addHint;
}
function populateCountryOptions() {
  const select = document.getElementById("formCountry");
  const options = state.geoFeatures
    .map(f => ({ name: f.__admin, label: `${flagOf(f.__iso)}  ${f.__admin}` }))
    .sort((a, b) => a.name.localeCompare(b.name));
  select.innerHTML = `<option value="">Choose a country...</option>` +
    options.map(o => `<option value="${escapeHtml(o.name)}">${escapeHtml(o.label)}</option>`).join("");
}

// ---------------------------------------------------------------------------
// render: recommender drawer
// ---------------------------------------------------------------------------
function renderRecDrawer() {
  document.getElementById("recDrawer").classList.toggle("open", state.recOpen);
  document.getElementById("goalBq").classList.toggle("active", state.rec.goal === "bq");
  document.getElementById("goalPb").classList.toggle("active", state.rec.goal === "pb");
  document.getElementById("goalBucket").classList.toggle("active", state.rec.goal === "bucket");
  document.getElementById("goalFirst").classList.toggle("active", state.rec.goal === "first");
  document.getElementById("recBudgetLabel").textContent = state.rec.budget;
}
function renderRecResults() {
  const wrap = document.getElementById("recResults");
  wrap.innerHTML = state.rec.results.map((r, i) => `
    <div class="rtw-rec-row rtw-row" data-ridx="${i}">
      <div class="rtw-rec-fit">${r.fit}</div>
      <div style="flex:1;">
        <div class="rtw-rec-name">${escapeHtml(r.name)}</div>
        <div class="rtw-rec-meta">${escapeHtml(r.month)} · $${r.estCost} from you · ${escapeHtml(r.entryLabel)}</div>
      </div>
    </div>
  `).join("");
  [...wrap.querySelectorAll("[data-ridx]")].forEach(el => {
    const r = state.rec.results[Number(el.dataset.ridx)];
    el.addEventListener("click", () => { closeRec(); selectMarathon(r); });
  });
}

// ---------------------------------------------------------------------------
// wire up static event listeners
// ---------------------------------------------------------------------------
function wireEvents() {
  document.getElementById("modeCommunity").addEventListener("click", () => setMode("community"));
  document.getElementById("modeRaces").addEventListener("click", () => setMode("races"));
  document.getElementById("btnCountries").addEventListener("click", openCountries);
  document.getElementById("btnAdd").addEventListener("click", openAdd);
  document.getElementById("btnFindRace").addEventListener("click", openRec);
  document.getElementById("closeCountryBtn").addEventListener("click", closeCountry);
  document.getElementById("closePanelBtn").addEventListener("click", closePanel);
  document.getElementById("closeCountriesBtn").addEventListener("click", closeCountries);
  document.getElementById("closeAddBtn").addEventListener("click", closeAdd);
  document.getElementById("closeRecBtn").addEventListener("click", closeRec);
  document.getElementById("submitRunBtn").addEventListener("click", submitRun);

  document.getElementById("segAll").addEventListener("click", setFilterAll);
  document.getElementById("segMajors").addEventListener("click", setFilterMajorsOnly);
  document.getElementById("segOpenNow").addEventListener("click", toggleOpenNow);
  document.getElementById("regionSelect").addEventListener("change", e => setRegion(e.target.value));
  document.getElementById("entryFilterSelect").addEventListener("change", e => setEntryFilter(e.target.value));
  document.getElementById("searchInput").addEventListener("input", e => { state.search = e.target.value; renderSearchResults(); });
  document.getElementById("searchInput").addEventListener("keydown", e => {
    if (e.key === "Enter") { const r = getSearchResults(); if (r.length) selectFromSearch(r[0]); }
  });

  document.getElementById("questButton").addEventListener("click", toggleQuestOpen);

  const formIds = { formCountry: "country", formCity: "city", formMember: "member", formDate: "date", formProfile: "profile", formTitle: "title", formKm: "km", formStrava: "strava", formNote: "note" };
  Object.entries(formIds).forEach(([id, key]) => {
    document.getElementById(id).addEventListener("input", e => { state.form[key] = e.target.value; });
    document.getElementById(id).addEventListener("change", e => { state.form[key] = e.target.value; });
  });

  document.getElementById("goalBq").addEventListener("click", () => setGoal("bq"));
  document.getElementById("goalPb").addEventListener("click", () => setGoal("pb"));
  document.getElementById("goalBucket").addEventListener("click", () => setGoal("bucket"));
  document.getElementById("goalFirst").addEventListener("click", () => setGoal("first"));
  document.getElementById("recHomeSelect").addEventListener("change", e => { state.rec.home = e.target.value; computeRecommendations(); });
  document.getElementById("recSeasonSelect").addEventListener("change", e => { state.rec.season = e.target.value; computeRecommendations(); });
  document.getElementById("recBudgetRange").addEventListener("input", e => {
    state.rec.budget = Number(e.target.value);
    document.getElementById("recBudgetLabel").textContent = state.rec.budget;
    computeRecommendations();
  });
}

function populateHomeCityOptions() {
  document.getElementById("recHomeSelect").innerHTML = HOME_CITIES.map(c => `<option value="${escapeHtml(c.n)}">${escapeHtml(c.n)}</option>`).join("");
}

// ---------------------------------------------------------------------------
// init
// ---------------------------------------------------------------------------
function observeHeaderHeight() {
  const header = document.querySelector(".rtw-header");
  const root = document.getElementById("rtw");
  const apply = () => root.style.setProperty("--header-h", header.offsetHeight + "px");
  new ResizeObserver(apply).observe(header);
  apply();
}

async function init() {
  wireEvents();
  populateHomeCityOptions();
  observeHeaderHeight();
  try { mountGlobe(); } catch (e) { console.error("Globe failed to mount:", e); }

  renderHeader();
  renderCommunityRail();
  renderRacesToolbar();
  renderQuest();
  renderCountriesDrawer();
  renderAddModal();
  renderRecDrawer();

  try {
    const gj = await fetch(GEO_URL).then(r => r.json());
    const feats = (gj.features || []).filter(f => f.properties && f.properties.ADMIN !== "Antarctica");
    const index = {};
    feats.forEach(f => {
      const p = f.properties;
      const c = ringCentroid(f);
      f.__admin = p.ADMIN; f.__iso = isoForAdmin(p.ADMIN, p.ISO_A2);
      f.__centroid = c;
      index[p.ADMIN] = f;
    });
    state.geoFeatures = feats; state.geoIndex = index;
    populateCountryOptions();
    refresh();
    renderHeader(); renderCommunityRail(); renderCountriesDrawer();
  } catch (e) { /* map still usable without country polygons */ }
}

init();
