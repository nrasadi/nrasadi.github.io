const DEFAULT_CSV_NAME = "conference_deadlines.csv";
const STORAGE_KEY = "conference-deadline-tracker-state";
const FIELD_ORDER = [
  "conferenceName",
  "conferenceAcronym",
  "abstractDeadline",
  "paperDeadline",
  "notificationDate",
  "conferenceDates",
  "location",
  "submissionLink",
  "status",
  "notes",
];

const FIELD_LABELS = {
  conferenceName: "Conference name",
  conferenceAcronym: "Acronym",
  abstractDeadline: "Abstract deadline",
  paperDeadline: "Paper deadline",
  notificationDate: "Notification date",
  conferenceDates: "Conference dates",
  location: "Location",
  submissionLink: "Submission link",
  status: "Status",
  notes: "Notes",
};

const STATUS_OPTIONS = ["Planning", "Writing", "Submitted", "Accepted", "Rejected", "Withdrawn"];
const SOON_THRESHOLD_DAYS = 21;
const CRITICAL_THRESHOLD_DAYS = 7;
const PREFS_STORAGE_KEY = "conference-deadline-tracker-prefs";
const TABLE_COLUMN_COUNT = 7;

// Every row belongs to one of these groups, or to the always-visible "active" remainder.
// `inline: true` groups sit in the main list while shown; the rest are always demoted to a
// section at the bottom of the table. Any group that is hidden collapses behind a separator
// there and drops off the timeline. Listed in the order those bottom sections appear.
const ROW_GROUPS = [
  { key: "planning", domId: "Planning", prefKey: "showPlanning", label: "Planning", hint: "Not started yet", inline: true, defaultVisible: true },
  { key: "submitted", domId: "Submitted", prefKey: "showSubmitted", label: "Submitted", hint: "Submitted, waiting on a decision", inline: true, defaultVisible: true },
  { key: "accepted", domId: "Accepted", prefKey: "showAccepted", label: "Accepted", hint: "Accepted for publication", inline: true, defaultVisible: true },
  { key: "past", domId: "Past", prefKey: "showPast", label: "Past", hint: "All dates (including the conference itself) have passed", inline: false, defaultVisible: false },
  { key: "withdrawn", domId: "Withdrawn", prefKey: "showWithdrawn", label: "Withdrawn", hint: "Marked as withdrawn", inline: false, defaultVisible: false },
  { key: "rejected", domId: "Rejected", prefKey: "showRejected", label: "Rejected", hint: "Marked as rejected", inline: false, defaultVisible: false },
];

// "off" tints nothing, "active" tints only rows still being worked on, "all" tints every row.
const HIGHLIGHT_MODES = ["off", "active", "all"];
const SETTLED_STATUSES = new Set(["submitted", "accepted", "rejected", "withdrawn"]);

const DEFAULT_PREFS = {
  ...Object.fromEntries(ROW_GROUPS.map((group) => [group.prefKey, group.defaultVisible])),
  highlightMode: "active",
  criticalDays: CRITICAL_THRESHOLD_DAYS,
  soonDays: SOON_THRESHOLD_DAYS,
};
const DISPLAY_FIELD_ORDER = FIELD_ORDER.filter((field) => field !== "conferenceAcronym");
const TABLE_EDIT_FIELDS = DISPLAY_FIELD_ORDER.filter((field) => field !== "conferenceName" && field !== "conferenceAcronym" && field !== "status");
const MONTH_LOOKUP = {
  jan: 0,
  january: 0,
  feb: 1,
  february: 1,
  mar: 2,
  march: 2,
  apr: 3,
  april: 3,
  may: 4,
  jun: 5,
  june: 5,
  jul: 6,
  july: 6,
  aug: 7,
  august: 7,
  sep: 8,
  sept: 8,
  september: 8,
  oct: 9,
  october: 9,
  nov: 10,
  november: 10,
  dec: 11,
  december: 11,
};

const MONTH_ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const COUNTRY_FLAGS = {
  "afghanistan": "🇦🇫",
  "albania": "🇦🇱",
  "algeria": "🇩🇿",
  "andorra": "🇦🇩",
  "angola": "🇦🇴",
  "argentina": "🇦🇷",
  "armenia": "🇦🇲",
  "australia": "🇦🇺",
  "austria": "🇦🇹",
  "azerbaijan": "🇦🇿",
  "bahamas": "🇧🇸",
  "bahrain": "🇧🇭",
  "bangladesh": "🇧🇩",
  "barbados": "🇧🇧",
  "belarus": "🇧🇾",
  "belgium": "🇧🇪",
  "belize": "🇧🇿",
  "benin": "🇧🇯",
  "bhutan": "🇧🇹",
  "bolivia": "🇧🇴",
  "bosnia": "🇧🇦",
  "botswana": "🇧🇼",
  "brazil": "🇧🇷",
  "brunei": "🇧🇳",
  "bulgaria": "🇧🇬",
  "burkina faso": "🇧🇫",
  "burundi": "🇧🇮",
  "cambodia": "🇰🇭",
  "cameroon": "🇨🇲",
  "canada": "🇨🇦",
  "cape verde": "🇨🇻",
  "central african republic": "🇨🇫",
  "chad": "🇹🇩",
  "chile": "🇨🇱",
  "china": "🇨🇳",
  "colombia": "🇨🇴",
  "comoros": "🇰🇲",
  "congo": "🇨🇬",
  "costa rica": "🇨🇷",
  "croatia": "🇭🇷",
  "cuba": "🇨🇺",
  "cyprus": "🇨🇾",
  "czech republic": "🇨🇿",
  "czechia": "🇨🇿",
  "denmark": "🇩🇰",
  "djibouti": "🇩🇯",
  "dominica": "🇩🇲",
  "dominican republic": "🇩🇴",
  "ecuador": "🇪🇨",
  "egypt": "🇪🇬",
  "el salvador": "🇸🇻",
  "equatorial guinea": "🇬🇶",
  "eritrea": "🇪🇷",
  "estonia": "🇪🇪",
  "eswatini": "🇸🇿",
  "ethiopia": "🇪🇹",
  "fiji": "🇫🇯",
  "finland": "🇫🇮",
  "france": "🇫🇷",
  "gabon": "🇬🇦",
  "gambia": "🇬🇲",
  "georgia": "🇬🇪",
  "germany": "🇩🇪",
  "ghana": "🇬🇭",
  "greece": "🇬🇷",
  "grenada": "🇬🇩",
  "guatemala": "🇬🇹",
  "guinea": "🇬🇳",
  "guinea-bissau": "🇬🇼",
  "guyana": "🇬🇾",
  "haiti": "🇭🇹",
  "honduras": "🇭🇳",
  "hong kong": "🇭🇰",
  "hungary": "🇭🇺",
  "iceland": "🇮🇸",
  "india": "🇮🇳",
  "indonesia": "🇮🇩",
  "iran": "🇮🇷",
  "iraq": "🇮🇶",
  "ireland": "🇮🇪",
  "israel": "🇮🇱",
  "italy": "🇮🇹",
  "ivory coast": "🇨🇮",
  "jamaica": "🇯🇲",
  "japan": "🇯🇵",
  "jordan": "🇯🇴",
  "kazakhstan": "🇰🇿",
  "kenya": "🇰🇪",
  "kiribati": "🇰🇮",
  "korea": "🇰🇷",
  "south korea": "🇰🇷",
  "north korea": "🇰🇵",
  "kosovo": "🇽🇰",
  "kuwait": "🇰🇼",
  "kyrgyzstan": "🇰🇬",
  "laos": "🇱🇦",
  "latvia": "🇱🇻",
  "lebanon": "🇱🇧",
  "lesotho": "🇱🇸",
  "liberia": "🇱🇷",
  "libya": "🇱🇾",
  "liechtenstein": "🇱🇮",
  "lithuania": "🇱🇹",
  "luxembourg": "🇱🇺",
  "macao": "🇲🇴",
  "madagascar": "🇲🇬",
  "malawi": "🇲🇼",
  "malaysia": "🇲🇾",
  "maldives": "🇲🇻",
  "mali": "🇲🇱",
  "malta": "🇲🇹",
  "marshall islands": "🇲🇭",
  "mauritania": "🇲🇷",
  "mauritius": "🇲🇺",
  "mexico": "🇲🇽",
  "micronesia": "🇫🇲",
  "moldova": "🇲🇩",
  "monaco": "🇲🇨",
  "mongolia": "🇲🇳",
  "montenegro": "🇲🇪",
  "morocco": "🇲🇦",
  "mozambique": "🇲🇿",
  "myanmar": "🇲🇲",
  "namibia": "🇳🇦",
  "nauru": "🇳🇷",
  "nepal": "🇳🇵",
  "netherlands": "🇳🇱",
  "new zealand": "🇳🇿",
  "nicaragua": "🇳🇮",
  "niger": "🇳🇪",
  "nigeria": "🇳🇬",
  "north macedonia": "🇲🇰",
  "norway": "🇳🇴",
  "oman": "🇴🇲",
  "pakistan": "🇵🇰",
  "palau": "🇵🇼",
  "palestine": "🇵🇸",
  "panama": "🇵🇦",
  "papua new guinea": "🇵🇬",
  "paraguay": "🇵🇾",
  "peru": "🇵🇪",
  "philippines": "🇵🇭",
  "poland": "🇵🇱",
  "portugal": "🇵🇹",
  "qatar": "🇶🇦",
  "romania": "🇷🇴",
  "russia": "🇷🇺",
  "rwanda": "🇷🇼",
  "saint kitts and nevis": "🇰🇳",
  "saint lucia": "🇱🇨",
  "saint vincent and the grenadines": "🇻🇨",
  "samoa": "🇼🇸",
  "san marino": "🇸🇲",
  "sao tome and principe": "🇸🇹",
  "saudi arabia": "🇸🇦",
  "senegal": "🇸🇳",
  "serbia": "🇷🇸",
  "seychelles": "🇸🇨",
  "sierra leone": "🇸🇱",
  "singapore": "🇸🇬",
  "slovakia": "🇸🇰",
  "slovenia": "🇸🇮",
  "solomon islands": "🇸🇧",
  "somalia": "🇸🇴",
  "south africa": "🇿🇦",
  "south sudan": "🇸🇸",
  "spain": "🇪🇸",
  "sri lanka": "🇱🇰",
  "sudan": "🇸🇩",
  "suriname": "🇸🇷",
  "sweden": "🇸🇪",
  "switzerland": "🇨🇭",
  "syria": "🇸🇾",
  "taiwan": "🇹🇼",
  "tajikistan": "🇹🇯",
  "tanzania": "🇹🇿",
  "thailand": "🇹🇭",
  "timor-leste": "🇹🇱",
  "togo": "🇹🇬",
  "tonga": "🇹🇴",
  "trinidad and tobago": "🇹🇹",
  "tunisia": "🇹🇳",
  "turkey": "🇹🇷",
  "turkmenistan": "🇹🇲",
  "tuvalu": "🇹🇻",
  "uganda": "🇺🇬",
  "ukraine": "🇺🇦",
  "united arab emirates": "🇦🇪",
  "uae": "🇦🇪",
  "united kingdom": "🇬🇧",
  "uk": "🇬🇧",
  "united states": "🇺🇸",
  "usa": "🇺🇸",
  "us": "🇺🇸",
  "uruguay": "🇺🇾",
  "uzbekistan": "🇺🇿",
  "vanuatu": "🇻🇺",
  "vatican city": "🇻🇦",
  "venezuela": "🇻🇪",
  "vietnam": "🇻🇳",
  "yemen": "🇾🇪",
  "zambia": "🇿🇲",
  "zimbabwe": "🇿🇼",
};

const elements = {
  fileInput: document.getElementById("fileInput"),
  openCsvBtn: document.getElementById("openCsvBtn"),
  exportCalendarBtn: document.getElementById("exportCalendarBtn"),
  exportCalendarMenu: document.getElementById("exportCalendarMenu"),
  createCsvBtn: document.getElementById("createCsvBtn"),
  saveBtn: document.getElementById("saveBtn"),
  downloadBtn: document.getElementById("downloadBtn"),
  exportPngBtn: document.getElementById("exportPngBtn"),
  fileStatus: document.getElementById("fileStatus"),
  ganttChart: document.getElementById("ganttChart"),
  ganttViewport: document.getElementById("ganttViewport"),
  ganttSlider: document.getElementById("ganttSlider"),
  ganttSummary: document.getElementById("ganttSummary"),
  tableBody: document.getElementById("tableBody"),
  tableSummary: document.getElementById("tableSummary"),
  tableWrap: document.getElementById("tableWrap"),
  rowForm: document.getElementById("rowForm"),
  clearFormBtn: document.getElementById("clearFormBtn"),
  location: document.getElementById("location"),
  searchInput: document.getElementById("searchInput"),
  rowId: document.getElementById("rowId"),
  conferenceName: document.getElementById("conferenceName"),
  conferenceAcronym: document.getElementById("conferenceAcronym"),
  abstractDeadline: document.getElementById("abstractDeadline"),
  paperDeadline: document.getElementById("paperDeadline"),
  notificationDate: document.getElementById("notificationDate"),
  conferenceDates: document.getElementById("conferenceDates"),
  submissionLink: document.getElementById("submissionLink"),
  status: document.getElementById("status"),
  notes: document.getElementById("notes"),
  groupControls: Object.fromEntries(
    ROW_GROUPS.map((group) => [
      group.key,
      {
        toggle: document.getElementById(`toggle${group.domId}`),
        count: document.getElementById(`count${group.domId}`),
      },
    ])
  ),
  highlightSegment: document.getElementById("highlightSegment"),
  criticalDaysInput: document.getElementById("criticalDaysInput"),
  soonDaysInput: document.getElementById("soonDaysInput"),
  resetPrefsBtn: document.getElementById("resetPrefsBtn"),
};

const state = {
  rows: [],
  fileHandle: null,
  activeFileName: DEFAULT_CSV_NAME,
  filterText: "",
  editingRowId: null,
  prefs: { ...DEFAULT_PREFS },
};

function clampDays(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(365, Math.max(0, Math.round(parsed)));
}

function loadPrefs() {
  try {
    const saved = window.localStorage.getItem(PREFS_STORAGE_KEY);
    if (!saved) {
      return { ...DEFAULT_PREFS };
    }

    const parsed = JSON.parse(saved) || {};
    const prefs = { ...DEFAULT_PREFS };

    // Only override a group's default when it was actually stored, so preferences saved
    // before a group existed keep that group's default rather than falling back to false.
    for (const group of ROW_GROUPS) {
      if (typeof parsed[group.prefKey] === "boolean") {
        prefs[group.prefKey] = parsed[group.prefKey];
      }
    }

    if (HIGHLIGHT_MODES.includes(parsed.highlightMode)) {
      prefs.highlightMode = parsed.highlightMode;
    }

    prefs.criticalDays = clampDays(parsed.criticalDays, DEFAULT_PREFS.criticalDays);
    prefs.soonDays = clampDays(parsed.soonDays, DEFAULT_PREFS.soonDays);
    return prefs;
  } catch (e) {
    return { ...DEFAULT_PREFS };
  }
}

function persistPrefs() {
  try {
    window.localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(state.prefs));
  } catch (e) {
    // storage may be unavailable (private mode); preferences stay session-only
  }
}

function uid() {
  if (window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeLineEndings(text) {
  return text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

function parseCSV(text) {
  const rows = [];
  const input = normalizeLineEndings(text).trim();

  if (!input) {
    return { headers: [], rows: [] };
  }

  const parsed = [];
  let current = "";
  let record = [];
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      record.push(current);
      current = "";
      continue;
    }

    if (char === "\n" && !inQuotes) {
      record.push(current);
      parsed.push(record);
      record = [];
      current = "";
      continue;
    }

    current += char;
  }

  record.push(current);
  parsed.push(record);

  const headers = parsed.shift().map((header) => header.trim());

  for (const row of parsed) {
    if (row.length === 1 && row[0].trim() === "") {
      continue;
    }

    const entry = { id: uid() };
    headers.forEach((header, index) => {
      entry[header] = row[index] ?? "";
    });
    rows.push(entry);
  }

  return { headers, rows };
}

function escapeCSVCell(value) {
  const text = value == null ? "" : String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function rowsToCSV(rows) {
  const headers = ["id", ...FIELD_ORDER];
  const lines = [headers.join(",")];

  for (const row of rows) {
    const values = headers.map((header) => escapeCSVCell(row[header] ?? ""));
    lines.push(values.join(","));
  }

  return `${lines.join("\r\n")}\r\n`;
}

function mapCsvRowToAppRow(csvRow) {
  const appRow = { id: csvRow.id || uid() };
  for (const field of FIELD_ORDER) {
    let raw = csvRow[field] ?? csvRow[FIELD_LABELS[field]] ?? "";
    if (typeof raw === "string") raw = raw.trim();

    // Convert DD.MM.YYYY or DD/MM/YYYY to ISO yyyy-mm-dd for date inputs
    if (raw && (field === "abstractDeadline" || field === "paperDeadline" || field === "notificationDate")) {
      const m = raw.match(/^(\d{1,2})[\.\/](\d{1,2})[\.\/](\d{2,4})$/);
      if (m) {
        const dd = m[1].padStart(2, "0");
        const mm = m[2].padStart(2, "0");
        let yyyy = m[3];
        if (yyyy.length === 2) {
          // rudimentary two-digit year handling: assume 2000s
          yyyy = `20${yyyy}`;
        }
        raw = `${yyyy}-${mm}-${dd}`;
      }
    }

    appRow[field] = raw ?? "";
  }

  return appRow;
}

function appRowToCsvRow(row) {
  const csvRow = { id: row.id };
  for (const field of FIELD_ORDER) {
    csvRow[field] = row[field] ?? "";
  }
  return csvRow;
}

function hasRequiredData(row) {
  return Boolean(row.conferenceName?.trim());
}

function isIsoDateValue(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
}

function setDateInputValue(input, value) {
  if (isIsoDateValue(value)) {
    input.value = value;
    return;
  }
  // Use parseDateText() which properly handles DD/MM/YYYY, DD.MM.YYYY, and other formats
  const date = parseDateText(value);
  if (date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    input.value = `${yyyy}-${mm}-${dd}`;
  } else {
    input.value = "";
  }
}

function normalizeDateInput(value) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function dateToIso(value) {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
    return "";
  }

  const yyyy = value.getFullYear();
  const mm = String(value.getMonth() + 1).padStart(2, "0");
  const dd = String(value.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function makeDate(year, monthIndex, day) {
  const date = new Date(year, monthIndex, day);
  if (date.getFullYear() !== year || date.getMonth() !== monthIndex || date.getDate() !== day) {
    return null;
  }

  return date;
}

function parseDateText(text) {
  if (!text) {
    return null;
  }

  const trimmed = String(text).trim();

  let match = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    return makeDate(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  match = trimmed.match(/^(\d{1,2})[./](\d{1,2})[./](\d{2,4})$/);
  if (match) {
    let year = Number(match[3]);
    if (match[3].length === 2) {
      year += 2000;
    }
    return makeDate(year, Number(match[2]) - 1, Number(match[1]));
  }

  match = trimmed.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) {
    const monthIndex = MONTH_LOOKUP[match[1].toLowerCase()];
    if (monthIndex == null) {
      return null;
    }
    return makeDate(Number(match[3]), monthIndex, Number(match[2]));
  }

  return null;
}

function parseConferenceDateRange(text) {
  if (!text) {
    return null;
  }

  const trimmed = String(text).trim();
  if (!trimmed) {
    return null;
  }

  let match = trimmed.match(/^([A-Za-z]{3,9})\s+(\d{1,2})\s*[-–—]\s*(\d{1,2}),?\s+(\d{4})$/);
  if (match) {
    const monthIndex = MONTH_LOOKUP[match[1].toLowerCase()];
    if (monthIndex != null) {
      const start = makeDate(Number(match[4]), monthIndex, Number(match[2]));
      const end = makeDate(Number(match[4]), monthIndex, Number(match[3]));
      if (start && end) {
        return { start, end };
      }
    }
  }

  // Handle ranges that span different months where the year appears only once,
  // e.g. "Sep 29 - Oct 2, 2026" or "Sep 29 – Oct 2, 2026".
  match = trimmed.match(/^([A-Za-z]{3,9})\s+(\d{1,2})\s*[-–—]\s*([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) {
    const startMonthIndex = MONTH_LOOKUP[match[1].toLowerCase()];
    const endMonthIndex = MONTH_LOOKUP[match[3].toLowerCase()];
    const year = Number(match[5]);
    if (startMonthIndex != null && endMonthIndex != null) {
      const start = makeDate(year, startMonthIndex, Number(match[2]));
      const end = makeDate(year, endMonthIndex, Number(match[4]));
      if (start && end) {
        return { start, end };
      }
    }
  }

  match = trimmed.match(/^(\d{4}-\d{2}-\d{2})\s*(?:to|[-–—])\s*(\d{4}-\d{2}-\d{2})$/i);
  if (match) {
    const start = parseDateText(match[1]);
    const end = parseDateText(match[2]);
    if (start && end) {
      return { start, end };
    }
  }

  match = trimmed.match(/^(\d{1,2}[./]\d{1,2}[./]\d{2,4})\s*(?:to|[-–—])\s*(\d{1,2}[./]\d{1,2}[./]\d{2,4})$/);
  if (match) {
    const start = parseDateText(match[1]);
    const end = parseDateText(match[2]);
    if (start && end) {
      return { start, end };
    }
  }

  const tokens = trimmed.match(/(\d{4}-\d{2}-\d{2}|\d{1,2}[./]\d{1,2}[./]\d{2,4}|[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{4})/g);
  if (tokens && tokens.length >= 2) {
    const start = parseDateText(tokens[0]);
    const end = parseDateText(tokens[tokens.length - 1]);
    if (start && end) {
      return { start, end };
    }
  }

  return null;
}

function getConferenceTimeline(row) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const abstract = normalizeDateInput(row.abstractDeadline);
  const submission = normalizeDateInput(row.paperDeadline);
  const notification = normalizeDateInput(row.notificationDate);
  const conferenceRange = parseConferenceDateRange(row.conferenceDates);
  const conferenceStart = conferenceRange?.start || null;
  const conferenceEnd = conferenceRange?.end || conferenceStart || null;

  const milestones = [];
  // Always include abstract if present; include submission separately.
  // This ensures the chart reflects both dates even when they are identical.
  if (abstract) {
    milestones.push({ key: "abstract", date: abstract, label: "Abstract" });
  }
  if (submission) {
    milestones.push({ key: "submission", date: submission, label: "Paper" });
  }
  if (notification) {
    milestones.push({ key: "notification", date: notification, label: "Notification" });
  }
  if (conferenceStart) {
    milestones.push({ key: "conferenceStart", date: conferenceStart, label: "Conference" });
  }
  if (conferenceEnd && (!conferenceStart || conferenceEnd.getTime() !== conferenceStart.getTime())) {
    milestones.push({ key: "conferenceEnd", date: conferenceEnd, label: "End" });
  }

  if (!milestones.length) {
    return null;
  }

  const latestDate = milestones.reduce((latest, milestone) => {
    return milestone.date.getTime() > latest.getTime() ? milestone.date : latest;
  }, milestones[0].date);
  const totalDays = Math.max(1, Math.ceil((latestDate.getTime() - today.getTime()) / 86400000));

  const segments = [];
  const segmentColors = ["#F38400", "#870074", "#00A693", "#4C516D", "#1C39BB"];

  const addSegment = (key, label, start, end, color) => {
    const startDays = Math.max(0, Math.floor((start.getTime() - today.getTime()) / 86400000));
    const endDays = Math.max(startDays + 1, Math.ceil((end.getTime() - today.getTime()) / 86400000));
    const widthDays = Math.max(1, endDays - startDays);

    segments.push({
      key,
      label,
      startDays,
      widthDays,
      color,
      start,
      end,
    });
  };

  if (abstract) {
    addSegment("abstract", "Today to Abstract", today, abstract, segmentColors[0]);
  }

  if (submission) {
    addSegment("submission", "Today to Paper", today, submission, segmentColors[1]);
  }

  const timelineAnchor = submission || abstract || today;

  if (notification) {
    addSegment("notification", "Paper to Notification", timelineAnchor, notification, segmentColors[2]);
  }

  if (conferenceStart) {
    addSegment("conferenceStart", "Notification to Conference", notification || timelineAnchor, conferenceStart, segmentColors[3]);
  }

  if (conferenceEnd && (!conferenceStart || conferenceEnd.getTime() !== conferenceStart.getTime())) {
    addSegment("conferenceEnd", "Conference", conferenceStart, conferenceEnd, segmentColors[4]);
  }

  return {
    label: row.conferenceAcronym || row.conferenceName || "Conference",
    fullName: row.conferenceName || row.conferenceAcronym || "",
    segments,
    totalDays,
    start: today,
    end: latestDate,
    submission,
    abstract,
    conferenceStart,
    conferenceEnd,
  };
}

function compareDeadlineDates(leftRow, rightRow) {
  const leftPaper = normalizeDateInput(leftRow.paperDeadline);
  const rightPaper = normalizeDateInput(rightRow.paperDeadline);
  const leftAbstract = normalizeDateInput(leftRow.abstractDeadline);
  const rightAbstract = normalizeDateInput(rightRow.abstractDeadline);

  const leftPrimary = leftPaper?.getTime() ?? leftAbstract?.getTime() ?? Number.POSITIVE_INFINITY;
  const rightPrimary = rightPaper?.getTime() ?? rightAbstract?.getTime() ?? Number.POSITIVE_INFINITY;

  if (leftPrimary !== rightPrimary) {
    return leftPrimary - rightPrimary;
  }

  const leftSecondary = leftPaper?.getTime() ?? Number.POSITIVE_INFINITY;
  const rightSecondary = rightPaper?.getTime() ?? Number.POSITIVE_INFINITY;
  if (leftSecondary !== rightSecondary) {
    return leftSecondary - rightSecondary;
  }

  return [leftRow.conferenceName, leftRow.conferenceAcronym, leftRow.id]
    .join(" ")
    .toLowerCase()
    .localeCompare([rightRow.conferenceName, rightRow.conferenceAcronym, rightRow.id].join(" ").toLowerCase());
}

function getSortedRows() {
  return [...state.rows].sort(compareDeadlineDates);
}

function getDeadlineState(value) {
  const date = normalizeDateInput(value);
  if (!date) {
    return "";
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const differenceInDays = Math.ceil((date.getTime() - today.getTime()) / 86400000);
  if (differenceInDays < 0) {
    return "deadline-overdue";
  }

  if (differenceInDays <= state.prefs.criticalDays) {
    return "deadline-critical";
  }

  if (differenceInDays <= state.prefs.soonDays) {
    return "deadline-soon";
  }

  return "";
}

function shouldHighlightRow(row) {
  if (state.prefs.highlightMode === "off") {
    return false;
  }

  if (state.prefs.highlightMode === "all") {
    return true;
  }

  // "active": a deadline only demands attention while the paper is still being worked on.
  return !SETTLED_STATUSES.has(String(row.status || "Planning").trim().toLowerCase());
}

function getRowLatestDate(row) {
  const candidates = [
    normalizeDateInput(row.abstractDeadline),
    normalizeDateInput(row.paperDeadline),
    normalizeDateInput(row.notificationDate),
  ];

  const conferenceRange = parseConferenceDateRange(row.conferenceDates);
  if (conferenceRange?.end || conferenceRange?.start) {
    candidates.push(conferenceRange.end || conferenceRange.start);
  }

  const known = candidates.filter(Boolean);
  if (!known.length) {
    return null;
  }

  return known.reduce((latest, date) => (date.getTime() > latest.getTime() ? date : latest), known[0]);
}

function isRowFullyPast(row) {
  const latest = getRowLatestDate(row);
  if (!latest) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return latest.getTime() < today.getTime();
}

function getRowGroup(row) {
  const status = String(row.status || "").trim().toLowerCase();

  // Terminal statuses win over "past" — knowing a paper was rejected beats knowing its
  // dates elapsed. Everything else defers to "past" before falling back to its status.
  if (status === "rejected") {
    return "rejected";
  }

  if (status === "withdrawn") {
    return "withdrawn";
  }

  if (isRowFullyPast(row)) {
    return "past";
  }

  if (status === "accepted" || status === "submitted") {
    return status;
  }

  if (status === "planning" || !status) {
    return "planning";
  }

  return "active";
}

function findRowGroup(groupKey) {
  return ROW_GROUPS.find((candidate) => candidate.key === groupKey) || null;
}

function isGroupVisible(groupKey) {
  const group = findRowGroup(groupKey);
  return group ? Boolean(state.prefs[group.prefKey]) : true;
}

// A row is demoted to a bottom section when its group is hidden, or when the group is one
// of the de-emphasised ones that never belongs in the main list.
function isRowDemoted(row) {
  const group = findRowGroup(getRowGroup(row));
  return Boolean(group) && (!group.inline || !isGroupVisible(group.key));
}

function setGroupVisibility(groupKey, visible) {
  const group = ROW_GROUPS.find((candidate) => candidate.key === groupKey);
  if (!group) {
    return;
  }

  state.prefs[group.prefKey] = Boolean(visible);
  persistPrefs();
  renderTable();
}

function createDisplayCell(value, className = "") {
  const td = document.createElement("td");
  if (className) {
    td.className = className;
  }

  td.textContent = value || "—";
  if (!value) {
    td.classList.add("cell-muted");
  }

  return td;
}

function createConferenceCell(row, isEditing = false) {
  const td = document.createElement("td");
  td.className = "conference-cell";
  td.title = row.conferenceName || row.conferenceAcronym || "";

  const layout = document.createElement("div");
  layout.className = isEditing ? "conference-cell-layout conference-cell-layout--editing" : "conference-cell-layout";

  if (isEditing) {
    const fieldsContainer = document.createElement("div");
    fieldsContainer.className = "conference-edit-fields";
    
    const acronymInput = createEditableInput("conferenceAcronym", row);
    acronymInput.classList.add("conference-acronym-input");
    acronymInput.placeholder = "Acronym";
    fieldsContainer.appendChild(acronymInput);
    
    const nameInput = createEditableInput("conferenceName", row);
    nameInput.classList.add("conference-name-input");
    fieldsContainer.appendChild(nameInput);
    
    layout.appendChild(fieldsContainer);
    layout.appendChild(createEditingActionGroup(row));
  } else {
    const title = document.createElement("div");
    title.className = "conference-cell-title";
    title.textContent = row.conferenceAcronym || row.conferenceName || "—";
    if (!row.conferenceAcronym && !row.conferenceName) {
      title.classList.add("cell-muted");
    }

    layout.appendChild(title);

    layout.appendChild(createConferenceActionGroup(row));
  }

  td.appendChild(layout);
  return td;
}

function createConferenceActionGroup(row) {
  const actionWrap = document.createElement("div");
  actionWrap.className = "conference-actions";

  const topRow = document.createElement("div");
  topRow.className = "row-actions conference-actions-row";

  const bottomRow = document.createElement("div");
  bottomRow.className = "row-actions conference-actions-row";

  const editButton = createActionButton({
    label: `Edit ${row.conferenceName || "conference"}`,
    title: "Edit",
    icon: iconPen(),
    className: "icon-button",
    onClick: () => {
      startInlineEdit(row.id);
    },
  });

  const linkButton = createActionButton({
    label: `Open link for ${row.conferenceName || "conference"}`,
    title: row.submissionLink ? `Open submission link: ${row.submissionLink}` : "No submission link",
    icon: iconLink(),
    className: "icon-button",
    onClick: () => {
      if (isSafeWebUrl(row.submissionLink)) {
        window.open(row.submissionLink, "_blank", "noreferrer");
      }
    },
  });

  if (!isSafeWebUrl(row.submissionLink)) {
    linkButton.disabled = true;
    linkButton.title = row.submissionLink
      ? "Only http and https submission links can be opened from this app"
      : "No submission link";
  }

  const statusButton = createStatusButton(row);

  const deleteButton = createActionButton({
    label: `Delete ${row.conferenceName || "conference"}`,
    title: "Delete",
    icon: iconTrash(),
    className: "icon-button danger",
    onClick: () => {
      state.rows = state.rows.filter((candidate) => candidate.id !== row.id);
      if (elements.rowId.value === row.id) {
        clearForm();
      }
      if (state.editingRowId === row.id) {
        state.editingRowId = null;
      }
      renderTable();
      persistState();
    },
  });

  topRow.append(editButton, linkButton, deleteButton);
  bottomRow.append(statusButton);
  actionWrap.append(topRow, bottomRow);
  return actionWrap;
}

function createEditingActionGroup(row) {
  const actionWrap = document.createElement("div");
  actionWrap.className = "row-actions conference-actions";

  const saveButton = createActionButton({
    label: `Save ${row.conferenceName || "conference"}`,
    title: "Save",
    icon: iconCheckmark(),
    className: "icon-button",
    onClick: () => {
      commitInlineEdit(row.id);
    },
  });

  const cancelButton = createActionButton({
    label: `Cancel editing ${row.conferenceName || "conference"}`,
    title: "Cancel",
    icon: iconX(),
    className: "icon-button",
    onClick: cancelInlineEdit,
  });

  const deleteButton = createActionButton({
    label: `Delete ${row.conferenceName || "conference"}`,
    title: "Delete",
    icon: iconTrash(),
    className: "icon-button danger",
    onClick: () => {
      state.rows = state.rows.filter((candidate) => candidate.id !== row.id);
      state.editingRowId = null;
      if (elements.rowId.value === row.id) {
        clearForm();
      }
      renderTable();
      persistState();
    },
  });

  actionWrap.append(saveButton, cancelButton, deleteButton);
  return actionWrap;
}

function createStatusButton(row) {
  const status = row.status || "Planning";
  const button = document.createElement("button");
  button.type = "button";
  button.title = `Status: ${status} — click to change`;
  button.setAttribute("aria-label", `Status: ${status}. Click to change.`);
  button.setAttribute("aria-haspopup", "menu");
  button.setAttribute("aria-expanded", "false");
  button.className = `icon-button status-button ${getStatusToneClass(status)}`;
  button.innerHTML = iconStatus();

  const label = document.createElement("span");
  label.textContent = status;
  button.appendChild(label);

  const caret = document.createElement("span");
  caret.className = "status-button-caret";
  caret.textContent = "▾";
  button.appendChild(caret);

  button.addEventListener("click", () => {
    if (statusMenu.rowId === row.id && isStatusMenuOpen()) {
      closeStatusMenu();
      return;
    }

    openStatusMenu(button, row);
  });

  return button;
}

const statusMenu = { rowId: null, anchor: null, element: null };

function isStatusMenuOpen() {
  return Boolean(statusMenu.element?.classList.contains("is-open"));
}

function closeStatusMenu() {
  if (!statusMenu.element) {
    return;
  }

  statusMenu.element.classList.remove("is-open");
  statusMenu.anchor?.setAttribute("aria-expanded", "false");
  statusMenu.rowId = null;
  statusMenu.anchor = null;
}

function ensureStatusMenu() {
  if (statusMenu.element) {
    return statusMenu.element;
  }

  const menu = document.createElement("div");
  menu.className = "status-menu";
  menu.setAttribute("role", "menu");
  document.body.appendChild(menu);
  statusMenu.element = menu;

  document.addEventListener("click", (event) => {
    if (!isStatusMenuOpen()) {
      return;
    }

    if (menu.contains(event.target) || statusMenu.anchor?.contains(event.target)) {
      return;
    }

    closeStatusMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isStatusMenuOpen()) {
      event.preventDefault();
      const anchor = statusMenu.anchor;
      closeStatusMenu();
      anchor?.focus({ preventScroll: true });
    }
  });

  window.addEventListener("resize", closeStatusMenu);
  window.addEventListener("scroll", closeStatusMenu, true);

  return menu;
}

function positionStatusMenu(anchor) {
  const menu = statusMenu.element;
  if (!menu) {
    return;
  }

  const anchorRect = anchor.getBoundingClientRect();
  // offsetWidth/Height are transform-free, so the opening animation cannot skew placement.
  const menuHeight = menu.offsetHeight;
  const menuWidth = menu.offsetWidth;
  const margin = 8;

  let top = anchorRect.bottom + 6;
  if (top + menuHeight > window.innerHeight - margin) {
    top = Math.max(margin, anchorRect.top - menuHeight - 6);
  }

  const maxLeft = window.innerWidth - menuWidth - margin;
  const left = Math.max(margin, Math.min(anchorRect.left, maxLeft));

  menu.style.top = `${Math.round(top)}px`;
  menu.style.left = `${Math.round(left)}px`;
}

function openStatusMenu(anchor, row) {
  const menu = ensureStatusMenu();
  const current = row.status || "Planning";

  menu.innerHTML = "";
  statusMenu.rowId = row.id;
  statusMenu.anchor = anchor;
  anchor.setAttribute("aria-expanded", "true");

  const heading = document.createElement("div");
  heading.className = "status-menu-heading";
  heading.textContent = row.conferenceAcronym || row.conferenceName || "Conference";
  menu.appendChild(heading);

  STATUS_OPTIONS.forEach((option) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "status-menu-item";
    item.setAttribute("role", "menuitemradio");
    item.setAttribute("aria-checked", String(option === current));
    if (option === current) {
      item.classList.add("is-current");
    }

    const dot = document.createElement("span");
    dot.className = `status-menu-dot ${getStatusToneClass(option)}`;

    const label = document.createElement("span");
    label.className = "status-menu-label";
    label.textContent = option;

    const face = document.createElement("span");
    face.className = "status-menu-face";
    face.append(dot, label);
    item.appendChild(face);

    const group = ROW_GROUPS.find((candidate) => candidate.key === option.toLowerCase());
    if (group && !isGroupVisible(group.key)) {
      const note = document.createElement("span");
      note.className = "status-menu-note";
      note.textContent = "collapses row";
      item.appendChild(note);
    }

    item.addEventListener("click", () => {
      closeStatusMenu();
      setConferenceStatus(row.id, option);
    });

    menu.appendChild(item);
  });

  menu.classList.add("is-open");
  positionStatusMenu(anchor);
  menu.querySelector(".status-menu-item.is-current, .status-menu-item")?.focus({ preventScroll: true });
}

function setConferenceStatus(rowId, status) {
  const row = state.rows.find((candidate) => candidate.id === rowId);
  if (!row || row.status === status) {
    return;
  }

  row.status = status;
  renderTable();
  persistState();

  const name = row.conferenceAcronym || row.conferenceName || "Conference";
  const group = ROW_GROUPS.find((candidate) => candidate.key === getRowGroup(row));

  setStatus(
    group && !isGroupVisible(group.key)
      ? `${name} is now ${status} — moved to the collapsed ${group.label} group at the bottom of the table.`
      : `Updated ${name} status to ${status}.`
  );
}

function createActionButton({ label, title, icon, className = "", onClick }) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.title = title;
  button.setAttribute("aria-label", label);
  button.innerHTML = icon;
  button.addEventListener("click", onClick);
  return button;
}

function isSafeWebUrl(value) {
  if (!value) {
    return false;
  }

  try {
    const url = new URL(value, window.location.href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (error) {
    return false;
  }
}

function iconPen() {
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M3 14.75V17h2.25l8.9-8.9-2.25-2.25-8.9 8.9Zm11.8-8.95a.6.6 0 0 0 0-.85l-1.75-1.75a.6.6 0 0 0-.85 0l-1.37 1.37 2.6 2.6 1.37-1.37Z" fill="currentColor"/>
    </svg>`;
}

function iconTrash() {
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M7.2 3.25h5.6l.6 1.25H16v1.5H4V4.5h2.6l.6-1.25Zm1.05 4h1.5v7h-1.5v-7Zm3 0h1.5v7h-1.5v-7ZM5.5 6.25h9l-.55 9.2a1.5 1.5 0 0 1-1.5 1.4H7.55a1.5 1.5 0 0 1-1.5-1.4l-.55-9.2Z" fill="currentColor"/>
    </svg>`;
}

function iconLink() {
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M7.5 12.5a3 3 0 0 1 0-4.24l1.06-1.06 1.06 1.06-1.06 1.06a1.5 1.5 0 0 0 2.12 2.12l1.06-1.06 1.06 1.06-1.06 1.06a3 3 0 0 1-4.24 0Zm4.99-7.74-1.06 1.06 1.06 1.06a1.5 1.5 0 0 0 2.12 2.12l1.06-1.06 1.06 1.06-1.06 1.06a3 3 0 1 1-4.24-4.24Zm-7.74 7.74 1.06-1.06-1.06-1.06a1.5 1.5 0 0 0-2.12-2.12l-1.06 1.06L1.77 8.02 2.83 6.96a3 3 0 0 1 4.24 4.24Z" fill="currentColor"/>
    </svg>`;
}

function iconStatus() {
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M10 3.25a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5Zm0 3.1a3.65 3.65 0 1 1 0 7.3 3.65 3.65 0 0 1 0-7.3Z" fill="currentColor"/>
    </svg>`;
}

function iconCheckmark() {
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M16.7 5.5l-8.3 10.2-4.2-4.2 1.1-1.1 3.1 3.1L15.5 4.4z" fill="currentColor"/>
    </svg>`;
}

function iconX() {
  return `
    <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M15.898 4.045c-.283-.283-.652-.424-1.02-.424-.38 0-.748.14-1.02.424l-4.86 4.86-4.86-4.86c-.572-.572-1.468-.572-2.04 0-.571.572-.571 1.469 0 2.04l4.86 4.86-4.86 4.86c-.571.572-.571 1.469 0 2.04.285.283.652.424 1.02.424.38 0 .748-.14 1.02-.424l4.86-4.86 4.86 4.86c.285.283.652.424 1.02.424.38 0 .748-.14 1.02-.424.571-.572.571-1.469 0-2.04l-4.86-4.86 4.86-4.86c.571-.571.571-1.468 0-2.04z" fill="currentColor"/>
    </svg>`;
}

function getStatusToneClass(status) {
  return `status-${String(status || "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

function sameDay(left, right) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

function daysBetween(left, right) {
  return Math.round((right.getTime() - left.getTime()) / 86400000);
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function isFirstOfMonth(date) {
  return date.getDate() === 1;
}

function isMidMonth(date) {
  return date.getDate() >= 13 && date.getDate() <= 17;
}

function monthAbbreviation(monthIndex) {
  return MONTH_ABBR[monthIndex] || "";
}

function formatDisplayDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    return "";
  }

  return `${monthAbbreviation(date.getMonth())} ${date.getDate()}, ${date.getFullYear()}`;
}

function abbreviateMonthWords(text) {
  if (!text) {
    return "";
  }

  const abbreviations = {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    sept: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec",
  };

  return String(text).replace(/\b(january|february|march|april|may|june|july|august|september|sept|october|november|december)\b/gi, (match) => {
    return abbreviations[match.toLowerCase()] || match;
  });
}

function getCountryIsoCode(location) {
  if (!location) {
    return "";
  }

  // Extract country - usually after comma or the last word
  const parts = location.split(",").map((p) => p.trim());
  const country = parts[parts.length - 1];
  const flag = COUNTRY_FLAGS[country.toLowerCase()];
  
  if (!flag) {
    return "";
  }
  
  // Convert two regional indicator symbols (e.g. 🇨🇦) to two letter lowercase ISO code (ca)
  // Regional indicator symbols start at code point 127462 (U+1F1E6 for A)
  // ASCII 'a' is 97. 127462 - 97 = 127365
  return Array.from(flag)
    .map((char) => String.fromCharCode(char.codePointAt(0) - 127365))
    .join("");
}

function formatTableCellValue(field, value) {
  if (!value) {
    return "";
  }

  if (field === "abstractDeadline" || field === "paperDeadline" || field === "notificationDate") {
    const date = normalizeDateInput(value);
    return date ? formatDisplayDate(date) : value;
  }

  if (field === "conferenceDates") {
    return abbreviateMonthWords(value);
  }

  return value;
}

function formatTimelineLabel(date, today) {
  if (sameDay(date, today)) {
    return "Today";
  }

  if (isFirstOfMonth(date)) {
    return monthAbbreviation(date.getMonth());
  }

  if (isMidMonth(date)) {
    return `mid-${monthAbbreviation(date.getMonth())}`;
  }

  return `${monthAbbreviation(date.getMonth())} ${date.getDate()}`;
}

function buildTimelineTicks(chartStart, chartEnd) {
  const ticks = [{ date: new Date(chartStart), label: "Today" }];
  const seen = new Set([dateToIso(chartStart)]);

  let monthCursor = new Date(chartStart.getFullYear(), chartStart.getMonth() + 1, 1);
  while (monthCursor <= chartEnd) {
    const monthStart = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1);
    const midMonth = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 15);

    for (const tickDate of [monthStart, midMonth]) {
      if (tickDate > chartEnd) {
        continue;
      }

      const iso = dateToIso(tickDate);
      if (seen.has(iso)) {
        continue;
      }

      ticks.push({ date: tickDate, label: formatTimelineLabel(tickDate, chartStart) });
      seen.add(iso);
    }

    monthCursor.setMonth(monthCursor.getMonth() + 1);
  }

  if (!seen.has(dateToIso(chartEnd))) {
    ticks.push({ date: chartEnd, label: formatTimelineLabel(chartEnd, chartStart) });
  }

  return ticks.sort((left, right) => left.date.getTime() - right.date.getTime());
}

function createEditableInput(field, row) {
  if (field === "status") {
    const select = document.createElement("select");
    select.dataset.field = field;

    for (const option of STATUS_OPTIONS) {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    }

    select.value = row[field] || "Planning";
    return select;
  }

  if (field === "notes") {
    const textarea = document.createElement("textarea");
    textarea.dataset.field = field;
    textarea.rows = 3;
    textarea.value = row[field] || "";
    return textarea;
  }

  const input = document.createElement("input");
  input.dataset.field = field;

  if (field === "abstractDeadline" || field === "paperDeadline" || field === "notificationDate") {
    input.type = "date";
    input.value = row[field] || "";
  } else if (field === "submissionLink") {
    input.type = "url";
    input.placeholder = "https://...";
    input.value = row[field] || "";
  } else {
    input.type = "text";
    input.value = row[field] || "";
  }

  return input;
}

function readInlineEditorRow(rowId) {
  const rowElement = document.querySelector(`[data-row-id="${CSS.escape(rowId)}"]`);
  if (!rowElement) {
    return null;
  }

  const readValue = (field) => {
    const control = rowElement.querySelector(`[data-field="${field}"]`);
    return control ? control.value.trim() : "";
  };

  return {
    id: rowId,
    conferenceName: readValue("conferenceName"),
    conferenceAcronym: readValue("conferenceAcronym"),
    abstractDeadline: readValue("abstractDeadline"),
    paperDeadline: readValue("paperDeadline"),
    notificationDate: readValue("notificationDate"),
    conferenceDates: readValue("conferenceDates"),
    location: readValue("location"),
    submissionLink: readValue("submissionLink"),
    notes: readValue("notes"),
  };
}

function startInlineEdit(rowId) {
  state.editingRowId = rowId;
  renderTable();

  const rowElement = document.querySelector(`[data-row-id="${CSS.escape(rowId)}"]`);
  rowElement?.querySelector('[data-field="conferenceName"]')?.focus();
}

function cancelInlineEdit() {
  state.editingRowId = null;
  renderTable();
}

function commitInlineEdit(rowId) {
  const updatedRow = readInlineEditorRow(rowId);
  if (!updatedRow) {
    return;
  }

  const existingRow = state.rows.find((candidate) => candidate.id === rowId);
  if (existingRow) {
    updatedRow.status = existingRow.status || "Planning";
  }

  if (!hasRequiredData(updatedRow)) {
    setStatus("Conference name is required before saving a row.");
    document.querySelector(`[data-row-id="${CSS.escape(rowId)}"] [data-field="conferenceName"]`)?.focus();
    return;
  }

  const rowIndex = state.rows.findIndex((candidate) => candidate.id === rowId);
  if (rowIndex >= 0) {
    state.rows[rowIndex] = updatedRow;
  }

  state.editingRowId = null;
  renderTable();
  persistState();
  setStatus(`Updated ${updatedRow.conferenceName}. Save changes to write the CSV.`);
}

function buildRowFromForm() {
  const abstractDeadline = elements.abstractDeadline.value;
  // Do not auto-complete the paper deadline from the abstract deadline.
  // Use the explicit paper deadline value only when provided to avoid
  // accidental incorrect date parsing or unexpected fallbacks.
  const paperDeadline = elements.paperDeadline.value || "";

  return {
    id: elements.rowId.value || uid(),
    conferenceName: elements.conferenceName.value.trim(),
    conferenceAcronym: elements.conferenceAcronym.value.trim(),
    abstractDeadline,
    paperDeadline,
    notificationDate: elements.notificationDate.value,
    conferenceDates: elements.conferenceDates.value.trim(),
    location: elements.location.value.trim(),
    submissionLink: elements.submissionLink.value.trim(),
    status: elements.status.value,
    notes: elements.notes.value.trim(),
  };
}

function fillForm(row) {
  elements.rowId.value = row.id || "";
  elements.conferenceName.value = row.conferenceName || "";
  elements.conferenceAcronym.value = row.conferenceAcronym || "";
  setDateInputValue(elements.abstractDeadline, row.abstractDeadline);
  setDateInputValue(elements.paperDeadline, row.paperDeadline);
  setDateInputValue(elements.notificationDate, row.notificationDate);
  elements.conferenceDates.value = row.conferenceDates || "";
  elements.location.value = row.location || "";
  elements.submissionLink.value = row.submissionLink || "";
  elements.status.value = row.status || "Planning";
  elements.notes.value = row.notes || "";
}

function clearForm() {
  fillForm({ id: "", status: "Planning" });
  elements.rowId.value = "";
}

function setStatus(message) {
  elements.fileStatus.textContent = message;
}

function renderTable() {
  const scrollTarget = document.scrollingElement || document.documentElement;
  const pageScrollLeft = window.scrollX;
  const pageScrollTop = window.scrollY;
  const tableScrollLeft = elements.tableWrap?.scrollLeft ?? 0;
  const tableScrollTop = elements.tableWrap?.scrollTop ?? 0;

  const filteredRows = getSortedRows().filter((row) => {
    const query = state.filterText.toLowerCase();
    if (!query) {
      return true;
    }

    return [
      row.conferenceName,
      row.conferenceAcronym,
      row.status,
      row.notes,
      row.conferenceDates,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const mainRows = [];
  const demotedRows = Object.fromEntries(ROW_GROUPS.map((group) => [group.key, []]));
  const groupTotals = Object.fromEntries(ROW_GROUPS.map((group) => [group.key, 0]));

  for (const row of filteredRows) {
    const group = findRowGroup(getRowGroup(row));
    if (!group) {
      mainRows.push(row);
      continue;
    }

    groupTotals[group.key] += 1;
    if (group.inline && isGroupVisible(group.key)) {
      mainRows.push(row);
    } else {
      demotedRows[group.key].push(row);
    }
  }

  const hiddenCount = ROW_GROUPS.reduce(
    (sum, group) => sum + (isGroupVisible(group.key) ? 0 : demotedRows[group.key].length),
    0
  );

  updatePrefControls(groupTotals);
  renderGanttChart(
    [...mainRows, ...ROW_GROUPS.filter((group) => isGroupVisible(group.key)).flatMap((group) => demotedRows[group.key])],
    hiddenCount
  );

  elements.tableBody.innerHTML = "";

  if (!filteredRows.length) {
    const empty = document.getElementById("emptyRowTemplate").content.cloneNode(true);
    elements.tableBody.appendChild(empty);
    elements.tableSummary.textContent = state.rows.length
      ? `No rows match "${state.filterText}".`
      : "No rows loaded yet.";
    window.requestAnimationFrame(() => {
      window.scrollTo(pageScrollLeft, pageScrollTop);
      if (elements.tableWrap) {
        elements.tableWrap.scrollLeft = tableScrollLeft;
        elements.tableWrap.scrollTop = tableScrollTop;
      }
      if (scrollTarget) {
        scrollTarget.scrollTop = pageScrollTop;
        scrollTarget.scrollLeft = pageScrollLeft;
      }
    });
    return;
  }

  const listedCount = filteredRows.length - hiddenCount;
  elements.tableSummary.textContent = hiddenCount
    ? `${listedCount} row${listedCount === 1 ? "" : "s"} shown from ${state.rows.length} total · ${hiddenCount} collapsed below.`
    : `${filteredRows.length} row${filteredRows.length === 1 ? "" : "s"} shown from ${state.rows.length} total.`;

  for (const row of mainRows) {
    elements.tableBody.appendChild(createTableRow(row));
  }

  for (const group of ROW_GROUPS) {
    const rows = demotedRows[group.key];
    if (!rows.length) {
      continue;
    }

    elements.tableBody.appendChild(createGroupSeparatorRow(group, rows.length));

    if (isGroupVisible(group.key)) {
      for (const row of rows) {
        elements.tableBody.appendChild(createTableRow(row, true));
      }
    }
  }

  window.requestAnimationFrame(() => {
    window.scrollTo(pageScrollLeft, pageScrollTop);
    if (elements.tableWrap) {
      elements.tableWrap.scrollLeft = tableScrollLeft;
      elements.tableWrap.scrollTop = tableScrollTop;
    }
    if (scrollTarget) {
      scrollTarget.scrollTop = pageScrollTop;
      scrollTarget.scrollLeft = pageScrollLeft;
    }
  });
}

function createGroupSeparatorRow(group, count) {
  const expanded = isGroupVisible(group.key);
  const tr = document.createElement("tr");
  tr.className = `table-group-row table-group-${group.key}`;
  if (expanded) {
    tr.classList.add("is-expanded");
  }

  const td = document.createElement("td");
  td.colSpan = TABLE_COLUMN_COUNT;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "table-group-toggle";
  button.setAttribute("aria-expanded", String(expanded));
  button.title = `${group.hint} — click to ${expanded ? "hide" : "show"}`;

  const caret = document.createElement("span");
  caret.className = "table-group-caret";
  caret.textContent = expanded ? "▾" : "▸";

  const label = document.createElement("span");
  label.className = "table-group-label";
  label.textContent = group.label;

  const badge = document.createElement("span");
  badge.className = "table-group-count";
  badge.textContent = String(count);

  const hint = document.createElement("span");
  hint.className = "table-group-hint";
  hint.textContent = expanded ? "hide" : "show";

  button.append(caret, label, badge, hint);
  button.addEventListener("click", () => setGroupVisibility(group.key, !expanded));

  td.appendChild(button);
  tr.appendChild(td);
  return tr;
}

function createTableRow(row, demoted = false) {
  const tr = document.createElement("tr");
  tr.dataset.rowId = row.id;
  tr.tabIndex = 0;

  if (demoted) {
    tr.classList.add("row-inactive", `row-group-${getRowGroup(row)}`);
  }

  const isEditing = state.editingRowId === row.id;
  const highlight = !isEditing && shouldHighlightRow(row);
  if (highlight) {
    const rowDeadlineState = [getDeadlineState(row.paperDeadline), getDeadlineState(row.abstractDeadline)].find(Boolean);
    if (rowDeadlineState) {
      tr.classList.add(rowDeadlineState);
    }
  }

  if (!isEditing) {
    const cells = [
      { field: "abstractDeadline", value: row.abstractDeadline },
      { field: "paperDeadline", value: row.paperDeadline },
      { field: "notificationDate", value: row.notificationDate },
      { field: "conferenceDates", value: row.conferenceDates },
      { field: "location", value: row.location },
      { field: "notes", value: row.notes },
    ];

    cells.forEach((cell) => {
      if (cell.field === "submissionLink" && cell.value) {
        const td = document.createElement("td");
        const link = document.createElement("a");
        link.href = cell.value;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.className = "link";
        link.textContent = "Open";
        td.appendChild(link);
        tr.appendChild(td);
        return;
      }

      if (cell.field === "notes") {
        tr.appendChild(createDisplayCell(cell.value, "notes-cell"));
        return;
      }

      if (cell.field === "location") {
        const td = document.createElement("td");
        if (cell.value) {
          const wrapper = document.createElement("div");
          wrapper.style.display = "flex";
          wrapper.style.alignItems = "center";
          wrapper.style.gap = "6px";

          const isoCode = getCountryIsoCode(cell.value);
          if (isoCode) {
            const img = document.createElement("img");
            img.src = `https://flagcdn.com/w20/${isoCode}.png`;
            img.alt = isoCode.toUpperCase();
            img.style.width = "20px";
            img.style.height = "auto";
            img.style.display = "block";
            wrapper.appendChild(img);
          }

          const textSpan = document.createElement("span");
          textSpan.textContent = cell.value;
          wrapper.appendChild(textSpan);

          td.appendChild(wrapper);
        } else {
          td.textContent = "—";
          td.classList.add("cell-muted");
        }
        tr.appendChild(td);
        return;
      }

      const className = highlight && (cell.field === "abstractDeadline" || cell.field === "paperDeadline")
        ? getDeadlineState(cell.value)
        : "";
      tr.appendChild(createDisplayCell(formatTableCellValue(cell.field, cell.value), className));
    });

    tr.prepend(createConferenceCell(row));
  } else {
    tr.appendChild(createConferenceCell(row, true));

    TABLE_EDIT_FIELDS.forEach((field) => {
      const td = document.createElement("td");
      td.appendChild(createEditableInput(field, row));
      tr.appendChild(td);
    });
  }

  return tr;
}

function updatePrefControls(groupTotals) {
  for (const group of ROW_GROUPS) {
    const control = elements.groupControls[group.key];
    const total = groupTotals?.[group.key] ?? 0;

    if (control?.toggle) {
      control.toggle.checked = Boolean(state.prefs[group.prefKey]);
      control.toggle.closest(".pref-toggle")?.classList.toggle("is-empty", total === 0);
    }

    if (control?.count) {
      control.count.textContent = String(total);
    }
  }

  const highlightingOff = state.prefs.highlightMode === "off";

  elements.highlightSegment?.querySelectorAll("button[data-mode]").forEach((button) => {
    const selected = button.dataset.mode === state.prefs.highlightMode;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-checked", String(selected));
  });

  // The thresholds and their legend only mean something while something is being highlighted.
  elements.highlightSegment?.closest(".pref-group")?.classList.toggle("is-muted", highlightingOff);
  [elements.criticalDaysInput, elements.soonDaysInput].forEach((input) => {
    if (input) {
      input.disabled = highlightingOff;
    }
  });

  if (elements.criticalDaysInput && document.activeElement !== elements.criticalDaysInput) {
    elements.criticalDaysInput.value = String(state.prefs.criticalDays);
  }

  if (elements.soonDaysInput && document.activeElement !== elements.soonDaysInput) {
    elements.soonDaysInput.value = String(state.prefs.soonDays);
  }
}

function renderGanttChart(rows, hiddenCount = 0) {
  if (!elements.ganttChart) {
    return;
  }

  const items = rows
    .map((row) => {
      const timeline = getConferenceTimeline(row);
      return timeline ? { ...timeline, group: getRowGroup(row), demoted: isRowDemoted(row) } : null;
    })
    .filter(Boolean);
  elements.ganttChart.innerHTML = "";

  const chartStart = new Date();
  chartStart.setHours(0, 0, 0, 0);
  const chartEnd = items.reduce((latest, item) => {
    return item.end.getTime() > latest.getTime() ? item.end : latest;
  }, chartStart);
  const totalDays = Math.max(1, daysBetween(chartStart, chartEnd));
  const pxPerDay = 6;
  const chartWidth = Math.max(720, Math.ceil(totalDays * pxPerDay));
  const labelWidth = 120; // keep in sync with styles.css

  if (elements.ganttSummary) {
    const hiddenNote = hiddenCount
      ? ` ${hiddenCount} past/withdrawn/rejected hidden — use the toggles below to show them.`
      : "";
    elements.ganttSummary.textContent = items.length
      ? `${items.length} conference timeline${items.length === 1 ? "" : "s"} shown from today to the latest conference milestone.${hiddenNote}`
      : `No timeline data yet.${hiddenCount ? hiddenNote : " Add deadlines and conference dates to see the chart."}`;
  }

  if (elements.ganttSlider) {
    elements.ganttSlider.disabled = !items.length;
    elements.ganttSlider.value = "0";
  }

  if (elements.ganttViewport) {
    elements.ganttViewport.scrollLeft = 0;
  }

  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "gantt-empty";
    empty.textContent = "Add rows with abstract, submission, and conference dates to build the timeline.";
    elements.ganttChart.appendChild(empty);
    return;
  }

  const axis = document.createElement("div");
  axis.className = "gantt-axis";
  const axisTrack = document.createElement("div");
  axisTrack.className = "gantt-axis-track";
  const axisTicks = buildTimelineTicks(chartStart, chartEnd);

  axisTicks.forEach((tick, index) => {
    const marker = document.createElement("div");
    marker.className = "gantt-axis-tick";
    marker.style.left = `${Math.max(0, daysBetween(chartStart, tick.date) * pxPerDay)}px`;
    if (index === 0) {
      marker.classList.add("start");
    }
    if (index === axisTicks.length - 1) {
      marker.classList.add("end");
    }

    const label = document.createElement("span");
    label.className = "gantt-axis-label";
    label.textContent = tick.label;
    marker.append(label);
    axisTrack.appendChild(marker);
  });

  axisTrack.style.width = `${chartWidth}px`;

  axis.appendChild(axisTrack);
  elements.ganttChart.appendChild(axis);

  // Hide overlapping axis tick labels (greedy): after insertion measure positions
  try {
    const markers = axisTrack.querySelectorAll(".gantt-axis-tick");
    let lastRight = -Infinity;
    for (const marker of markers) {
      const rect = marker.getBoundingClientRect();
      if (rect.left <= lastRight + 6) {
        marker.style.visibility = "hidden";
      } else {
        lastRight = rect.right;
      }
    }
  } catch (e) {
    // Swallow measurement errors in older browsers
  }

  const legend = document.createElement("div");
  legend.className = "gantt-legend";
  const legendItems = [
    { color: "#F38400", label: "Today to Abstract" },
    { color: "#870074", label: "Today to Paper" },
    { color: "#00A693", label: "Paper to Notification" },
    { color: "#4C516D", label: "Notification to Conference" },
    { color: "#1C39BB", label: "Conference" },
  ];

  for (const item of legendItems) {
    const legendItem = document.createElement("div");
    legendItem.className = "gantt-legend-item";
    const swatch = document.createElement("span");
    swatch.className = "gantt-swatch";
    swatch.style.background = item.color;
    const label = document.createElement("span");
    label.textContent = item.label;
    legendItem.append(swatch, label);
    legend.appendChild(legendItem);
  }

  // Place the legend outside the horizontally-scrollable viewport so it remains visible
  // when the timeline is scrolled. The DOM structure is: .gantt-panel > .gantt-controls, #ganttViewport.
  // Insert legend into the gantt-panel just before the ganttViewport element.
  const ganttViewportEl = elements.ganttChart.parentElement; // #ganttViewport
  const ganttPanelEl = ganttViewportEl?.parentElement; // .gantt-panel
  if (ganttPanelEl) {
    ganttPanelEl.querySelectorAll(".gantt-legend").forEach((node) => node.remove());
    ganttPanelEl.insertBefore(legend, ganttViewportEl);
  } else {
    elements.ganttChart.querySelectorAll(".gantt-legend").forEach((node) => node.remove());
    elements.ganttChart.appendChild(legend);
  }

  for (const item of items) {
    const row = document.createElement("div");
    row.className = "gantt-row";
    if (item.demoted) {
      row.classList.add("gantt-row-inactive", `gantt-row-${item.group}`);
    }
    row.style.width = `${chartWidth + labelWidth}px`;

    const label = document.createElement("div");
    label.className = "gantt-row-label";
    label.title = item.demoted ? `${item.fullName} (${item.group})` : item.fullName;
    label.textContent = item.label;

    const track = document.createElement("div");
    track.className = "gantt-track";
    track.setAttribute("role", "img");
    track.setAttribute("aria-label", `${item.label} timeline`);
    track.style.width = `${chartWidth}px`;

    const abstractSegment = item.segments.find((segment) => segment.key === "abstract");
    const paperSegment = item.segments.find((segment) => segment.key === "submission");
    const hasParallelOverlap = Boolean(
      abstractSegment && paperSegment && sameDay(abstractSegment.start, paperSegment.start)
    );

    const renderedSegments = new Set();
    const renderedBlocks = [];

    // The chart begins at today, so a segment that started earlier has to be clipped there
    // before it is measured. Measuring the width from the original start would push the bar
    // past its real end date by however many days it began in the past.
    const blockGeometry = (start, end) => {
      const from = start.getTime() < chartStart.getTime() ? chartStart : start;
      const to = end.getTime() < from.getTime() ? from : end;

      return {
        left: Math.max(0, daysBetween(chartStart, from) * pxPerDay),
        width: Math.max(1, daysBetween(from, to) * pxPerDay),
        startTime: from.getTime(),
        endTime: to.getTime(),
      };
    };

    if (hasParallelOverlap) {
      const overlapEnd = abstractSegment.end.getTime() <= paperSegment.end.getTime()
        ? abstractSegment.end
        : paperSegment.end;
      const overlap = blockGeometry(abstractSegment.start, overlapEnd);

      const container = document.createElement("div");
      container.className = "gantt-segment gantt-segment-split";
      container.style.left = `${overlap.left}px`;
      container.style.width = `${overlap.width}px`;
      container.title = `Today to Abstract / Today to Paper overlap: ${dateToIso(abstractSegment.start)} to ${dateToIso(overlapEnd)}`;

      const top = document.createElement("div");
      top.className = "gantt-segment-split-top";
      top.style.background = abstractSegment.color;

      const bottom = document.createElement("div");
      bottom.className = "gantt-segment-split-bottom";
      bottom.style.background = paperSegment.color;

      container.appendChild(top);
      container.appendChild(bottom);
      track.appendChild(container);
      renderedBlocks.push({ element: container, startTime: overlap.startTime, endTime: overlap.endTime });
      renderedSegments.add("abstract");
      renderedSegments.add("submission");

      if (abstractSegment.end.getTime() !== paperSegment.end.getTime()) {
        const tailSegment = abstractSegment.end.getTime() > paperSegment.end.getTime() ? abstractSegment : paperSegment;
        const tailStart = overlapEnd;
        const tailGeometry = blockGeometry(tailStart, tailSegment.end);

        const tail = document.createElement("div");
        tail.className = "gantt-segment";
        tail.style.left = `${tailGeometry.left}px`;
        tail.style.width = `${tailGeometry.width}px`;
        tail.style.background = tailSegment.color;
        tail.title = `${tailSegment.label}: ${dateToIso(tailStart)} to ${dateToIso(tailSegment.end)}`;
        track.appendChild(tail);
        renderedBlocks.push({
          element: tail,
          startTime: tailGeometry.startTime,
          endTime: tailGeometry.endTime,
        });
      }
    }

    for (const segment of item.segments) {
      if (renderedSegments.has(segment.key)) {
        continue;
      }

      const geometry = blockGeometry(segment.start, segment.end);

      const bar = document.createElement("div");
      bar.className = "gantt-segment";
      bar.style.left = `${geometry.left}px`;
      bar.style.width = `${geometry.width}px`;
      bar.style.background = segment.color;
      bar.title = `${segment.label}: ${dateToIso(segment.start)} to ${dateToIso(segment.end)}`;
      track.appendChild(bar);
      renderedBlocks.push({
        element: bar,
        startTime: geometry.startTime,
        endTime: geometry.endTime,
      });
    }

    if (renderedBlocks.length) {
      const minStart = Math.min(...renderedBlocks.map((block) => block.startTime));
      const maxEnd = Math.max(...renderedBlocks.map((block) => block.endTime));

      for (const block of renderedBlocks) {
        if (block.startTime === minStart) {
          block.element.classList.add("gantt-rounded-start");
        }
        if (block.endTime === maxEnd) {
          block.element.classList.add("gantt-rounded-end");
        }
      }
    }

    row.append(label, track);
    elements.ganttChart.appendChild(row);
  }

  if (elements.ganttViewport && elements.ganttSlider) {
    const syncSlider = () => {
      const maxScroll = Math.max(0, elements.ganttViewport.scrollWidth - elements.ganttViewport.clientWidth);
      elements.ganttSlider.max = String(maxScroll);
      elements.ganttSlider.value = String(elements.ganttViewport.scrollLeft);
    };

    requestAnimationFrame(syncSlider);
    window.requestAnimationFrame(syncSlider);

    if (!elements.ganttViewport.dataset.sliderWired) {
      elements.ganttViewport.addEventListener("scroll", () => {
        elements.ganttSlider.value = String(elements.ganttViewport.scrollLeft);
      });

      elements.ganttSlider.addEventListener("input", () => {
        elements.ganttViewport.scrollTo({ left: Number(elements.ganttSlider.value), behavior: "auto" });
      });

      window.addEventListener("resize", () => {
        syncSlider();
      });

      elements.ganttViewport.dataset.sliderWired = "true";
    }
  }
}

function syncRowsFromCsv(text) {
  try {
    const { headers, rows } = parseCSV(text);

    if (!headers.length) {
      state.rows = [];
      return;
    }

    state.rows = rows.map((row) => mapCsvRowToAppRow(row));
  } catch (err) {
    state.rows = [];
    setStatus(`Error parsing CSV: ${err?.message || String(err)}`);
    throw err;
  }
}

function loadFromCsvText(text, sourceName = DEFAULT_CSV_NAME, fileHandle = null) {
  syncRowsFromCsv(text);
  state.activeFileName = sourceName;
  state.fileHandle = fileHandle;
  state.editingRowId = null;
  renderTable();
  setStatus(`Loaded ${state.rows.length} row${state.rows.length === 1 ? "" : "s"} from ${sourceName}.`);
}

async function loadFromSelectedFile(file) {
  if (!file) return;
  const text = await file.text();
  // When a user selects a file via input or drops it, we consider it a non-writable File
  // unless the File System Access API provides a writable handle. Keep fileHandle=null.
  loadFromCsvText(text, file.name, null);
}

async function tryLoadDefaultCsv() {
  // Picker-only workflow: do not attempt automatic network/file fetches.
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const payload = JSON.parse(saved);
    state.rows = (payload.rows || []).map((row) => ({ ...row, id: row.id || uid() }));
    state.activeFileName = payload.activeFileName || DEFAULT_CSV_NAME;
    state.editingRowId = null;
    renderTable();
    setStatus(`Loaded ${state.rows.length} row${state.rows.length === 1 ? "" : "s"} from local browser storage. Use 'Open CSV file' or 'Create new CSV'.`);
    return;
  }

  state.rows = [];
  state.editingRowId = null;
  renderTable();
  setStatus(`No CSV loaded. Click 'Open CSV file' to pick a file or 'Create new CSV' to start a tracker.`);
  return;
}


async function createNewCsv() {
  state.rows = [];
  state.activeFileName = DEFAULT_CSV_NAME;
  state.fileHandle = null;
  state.editingRowId = null;
  renderTable();
  setStatus(`New tracker created in memory as ${DEFAULT_CSV_NAME}. Click 'Save changes' to write it.`);

  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: DEFAULT_CSV_NAME,
        types: [{ description: "CSV", accept: { "text/csv": [".csv"] } }],
      });
      state.fileHandle = handle;
      state.activeFileName = handle.name;
      await saveToHandle();
    } catch (err) {
      // user canceled; leave in-memory
      setStatus(`New tracker created in memory. Use 'Save changes' to write to disk.`);
    }
  }
}
async function openCsvFile() {
  const [handle] = await window.showOpenFilePicker({
    multiple: false,
    types: [{ description: "CSV", accept: { "text/csv": [".csv"] } }],
  });

  const file = await handle.getFile();
  const text = await file.text();
  loadFromCsvText(text, handle.name, handle);
}

async function saveToHandle() {
  if (!state.fileHandle) {
    if (window.showSaveFilePicker) {
      const handle = await window.showSaveFilePicker({
        suggestedName: state.activeFileName || DEFAULT_CSV_NAME,
        types: [{ description: "CSV", accept: { "text/csv": [".csv"] } }],
      });
      state.fileHandle = handle;
      state.activeFileName = handle.name;
    } else {
      downloadCsv();
      setStatus("Browser doesn't support direct file save; download prepared instead.");
      return;
    }
  }

  const writable = await state.fileHandle.createWritable();
  await writable.write(rowsToCSV(state.rows.map(appRowToCsvRow)));
  await writable.close();
  setStatus(`Saved ${state.rows.length} row${state.rows.length === 1 ? "" : "s"} to ${state.activeFileName}.`);
}

function downloadCsv() {
  const blob = new Blob([rowsToCSV(state.rows.map(appRowToCsvRow))], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = state.activeFileName || DEFAULT_CSV_NAME;
  anchor.click();
  URL.revokeObjectURL(url);
  setStatus(`Prepared a download for ${anchor.download}.`);
}

function persistState() {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ rows: state.rows, activeFileName: state.activeFileName })
  );
}

function copyComputedStyles(source, target) {
  const s = window.getComputedStyle(source);
  for (const key of s) {
    try {
      target.style.setProperty(key, s.getPropertyValue(key), s.getPropertyPriority(key));
    } catch (e) {
      // ignore read-only properties
    }
  }
}

function cloneWithInlineStyles(node) {
  const clone = node.cloneNode(false);
  if (node.nodeType === Node.ELEMENT_NODE) {
    copyComputedStyles(node, clone);
    for (const child of node.childNodes) {
      clone.appendChild(cloneWithInlineStyles(child));
    }
  } else if (node.nodeType === Node.TEXT_NODE) {
    clone.textContent = node.textContent;
  }
  return clone;
}

async function exportTableAsPng() {
  try {
    const table = document.querySelector(".table-wrap table");
    if (!table) {
      setStatus("No planner content to export.");
      return;
    }

    const rows = Array.from(table.querySelectorAll("thead tr, tbody tr"));
    const tableRect = table.getBoundingClientRect();
    const tableWidth = Math.ceil(tableRect.width);
    const tableHeight = Math.ceil(tableRect.height);
    const ganttChart = elements.ganttChart;
    const hasGantt = Boolean(ganttChart?.querySelector(".gantt-axis, .gantt-empty"));
    const ganttChartWidth = hasGantt
      ? Math.ceil(Math.max(ganttChart.scrollWidth, ganttChart.getBoundingClientRect().width))
      : 0;
    const ganttChartHeight = hasGantt
      ? Math.ceil(Math.max(ganttChart.scrollHeight, ganttChart.getBoundingClientRect().height))
      : 0;
    const ganttPadding = 12;
    const ganttChartTop = 96;
    const ganttSectionHeight = hasGantt ? ganttChartTop + ganttChartHeight + ganttPadding : 0;
    const sectionGap = hasGantt ? 16 : 0;
    const tableTop = ganttSectionHeight + sectionGap;
    const width = Math.ceil(Math.max(tableWidth, hasGantt ? ganttChartWidth + ganttPadding * 2 : 0));
    const height = Math.ceil(tableTop + tableHeight);
    const dpr = window.devicePixelRatio || 1;
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setStatus("PNG export is not supported in this browser.");
      return;
    }

    ctx.scale(dpr, dpr);
    const themeStyles = getComputedStyle(document.documentElement);
    const themeColor = (name, fallback) => themeStyles.getPropertyValue(name).trim() || fallback;
    const bgColor = themeColor("--tracker-panel-alt", "#1f1f1f");
    const borderColor = themeColor("--tracker-border", "#444444");
    const headerBg = themeColor("--tracker-table-head", "#1f1f1f");
    const bodyBg = themeColor("--tracker-panel", "#111111");
    const mutedColor = themeColor("--tracker-muted", "#aaaaaa");
    const textColor = themeColor("--tracker-text", "#dddddd");
    const sandColor = themeColor("--sand", "#c2b07e");
    const planningTone = themeColor("--tracker-status-planning", "#c2b07e");
    const writingTone = themeColor("--tracker-status-writing", "#0067a5");
    const submittedTone = themeColor("--tracker-status-submitted", "#1c39bb");
    const acceptedTone = themeColor("--tracker-status-accepted", "#006b60");
    const rejectedTone = themeColor("--tracker-status-rejected", "#700060");
    const withdrawnTone = themeColor("--tracker-status-withdrawn", "#555555");
    const statusTextColor = themeColor("--tracker-status-text", "#ffffff");
    const statusAlpha = Math.min(1, Math.max(0, (parseFloat(themeColor("--tracker-status-strength", "35%")) || 35) / 100));

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    const drawRoundedRect = (x, y, w, h, r) => {
      const radius = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
    };

    const wrapText = (text, maxWidth, font) => {
      ctx.font = font;
      const words = String(text || "").split(/\s+/).filter(Boolean);
      if (!words.length) {
        return [""];
      }

      const lines = [];
      let line = words[0];
      for (let index = 1; index < words.length; index += 1) {
        const testLine = `${line} ${words[index]}`;
        if (ctx.measureText(testLine).width <= maxWidth) {
          line = testLine;
        } else {
          lines.push(line);
          line = words[index];
        }
      }
      lines.push(line);
      return lines;
    };

    // Canvas fillStyle cannot be relied on to parse color-mix(), so mix to rgba here.
    const withAlpha = (color, alpha) => {
      const match = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(color).trim());
      if (!match) {
        return color;
      }

      const digits = match[1].length === 3
        ? match[1].split("").map((char) => char + char).join("")
        : match[1];
      const value = parseInt(digits, 16);
      return `rgba(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}, ${alpha})`;
    };

    // Keep in sync with the .status-* rules in styles.css.
    const statusColors = (status) => {
      const tones = {
        planning: planningTone,
        writing: writingTone,
        submitted: submittedTone,
        accepted: acceptedTone,
        rejected: rejectedTone,
        withdrawn: withdrawnTone,
      };

      const tone = tones[String(status || "").toLowerCase()] || sandColor;
      return { background: withAlpha(tone, statusAlpha), text: statusTextColor };
    };

    const fitText = (text, maxWidth) => {
      const value = String(text || "");
      if (ctx.measureText(value).width <= maxWidth) {
        return value;
      }

      let shortened = value;
      while (shortened.length && ctx.measureText(`${shortened}…`).width > maxWidth) {
        shortened = shortened.slice(0, -1);
      }
      return shortened ? `${shortened}…` : "";
    };

    const drawGantt = () => {
      if (!hasGantt || !ganttChart) {
        return;
      }

      const panelColor = getComputedStyle(ganttChart.closest(".gantt-panel") || document.documentElement)
        .backgroundColor || "#454545";
      const fontFamily = getComputedStyle(document.body).fontFamily || "sans-serif";

      drawRoundedRect(0.5, 0.5, width - 1, ganttSectionHeight - 1, 16);
      ctx.fillStyle = panelColor;
      ctx.fill();
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillStyle = textColor;
      ctx.font = `700 20px ${fontFamily}`;
      ctx.fillText("Timeline", ganttPadding, 12);

      const summary = elements.ganttSummary?.textContent?.trim() || "Conference timeline";
      ctx.fillStyle = mutedColor;
      ctx.font = `400 13px ${fontFamily}`;
      ctx.fillText(fitText(summary, width - ganttPadding * 2), ganttPadding, 39);

      const legendItems = Array.from(
        ganttChart.closest(".gantt-panel")?.querySelectorAll(".gantt-legend-item") || []
      );
      let legendX = ganttPadding + 137;
      const legendY = 64;
      ctx.font = `700 12px ${fontFamily}`;
      for (const item of legendItems) {
        const swatch = item.querySelector(".gantt-swatch");
        const label = item.textContent?.trim() || "";
        ctx.fillStyle = swatch ? getComputedStyle(swatch).backgroundColor : sandColor;
        drawRoundedRect(legendX, legendY + 1, 22, 12, 999);
        ctx.fill();
        ctx.fillStyle = mutedColor;
        ctx.fillText(label, legendX + 30, legendY);
        legendX += 30 + ctx.measureText(label).width + 14;
      }

      const chartX = ganttPadding;
      const chartY = ganttChartTop;
      const chartRect = ganttChart.getBoundingClientRect();
      const axis = ganttChart.querySelector(".gantt-axis");
      const axisTrack = axis?.querySelector(".gantt-axis-track");
      if (axis && axisTrack) {
        const axisTrackRect = axisTrack.getBoundingClientRect();
        const axisX = chartX + axisTrackRect.left - chartRect.left;
        const axisY = chartY + axisTrackRect.top - chartRect.top;
        const axisWidth = axisTrackRect.width;
        const axisHeight = axisTrackRect.height;
        drawRoundedRect(axisX, axisY, axisWidth, axisHeight, 12);
        ctx.fillStyle = getComputedStyle(axisTrack).backgroundColor;
        ctx.fill();
        ctx.strokeStyle = borderColor;
        ctx.stroke();

        ctx.fillStyle = sandColor;
        ctx.font = `700 11px ${fontFamily}`;
        ctx.textBaseline = "top";
        for (const marker of axisTrack.querySelectorAll(".gantt-axis-tick")) {
          if (getComputedStyle(marker).visibility === "hidden") {
            continue;
          }
          const label = marker.querySelector(".gantt-axis-label")?.textContent || "";
          const markerLeft = parseFloat(marker.style.left) || 0;
          const markerX = axisX + (marker.style.left.endsWith("%")
            ? (axisWidth * markerLeft) / 100
            : markerLeft);
          ctx.textAlign = marker.classList.contains("start")
            ? "left"
            : marker.classList.contains("end")
              ? "right"
              : "center";
          ctx.fillText(label, markerX, axisY + 10);
        }
      }

      ctx.textAlign = "left";
      for (const row of ganttChart.querySelectorAll(".gantt-row")) {
        const label = row.querySelector(".gantt-row-label");
        const track = row.querySelector(".gantt-track");
        if (!label || !track) {
          continue;
        }

        const opacity = Number.parseFloat(getComputedStyle(row).opacity) || 1;
        const labelRect = label.getBoundingClientRect();
        const trackRect = track.getBoundingClientRect();
        const labelX = chartX + labelRect.left - chartRect.left;
        const trackX = chartX + trackRect.left - chartRect.left;
        const trackY = chartY + trackRect.top - chartRect.top;
        const trackWidth = trackRect.width;
        const trackHeight = trackRect.height;

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.fillStyle = getComputedStyle(track).backgroundColor;
        drawRoundedRect(trackX, trackY, trackWidth, trackHeight, 999);
        ctx.fill();
        ctx.strokeStyle = borderColor;
        ctx.stroke();

        for (const segment of track.querySelectorAll(":scope > .gantt-segment")) {
          const segmentRect = segment.getBoundingClientRect();
          const segmentX = chartX + segmentRect.left - chartRect.left;
          const segmentY = chartY + segmentRect.top - chartRect.top;
          const segmentWidth = segmentRect.width;
          const segmentHeight = segmentRect.height;
          const radius = segment.classList.contains("gantt-rounded-start")
            || segment.classList.contains("gantt-rounded-end")
            ? 999
            : 0;

          if (segment.classList.contains("gantt-segment-split")) {
            const halves = Array.from(segment.children);
            ctx.save();
            drawRoundedRect(segmentX, segmentY, segmentWidth, segmentHeight, radius);
            ctx.clip();
            const halfHeight = segmentHeight / 2;
            ctx.fillStyle = halves[0] ? getComputedStyle(halves[0]).backgroundColor : sandColor;
            ctx.fillRect(segmentX, segmentY, segmentWidth, halfHeight);
            ctx.fillStyle = halves[1] ? getComputedStyle(halves[1]).backgroundColor : sandColor;
            ctx.fillRect(segmentX, segmentY + halfHeight, segmentWidth, segmentHeight - halfHeight);
            ctx.restore();
          } else {
            ctx.fillStyle = getComputedStyle(segment).backgroundColor;
            drawRoundedRect(segmentX, segmentY, segmentWidth, segmentHeight, radius);
            ctx.fill();
          }
        }

        ctx.fillStyle = getComputedStyle(label).color || textColor;
        ctx.font = `700 14px ${fontFamily}`;
        ctx.textBaseline = "middle";
        ctx.fillText(
          fitText(label.textContent?.trim() || "", Math.max(0, trackX - labelX - 10)),
          labelX,
          trackY + trackHeight / 2
        );
        ctx.restore();
      }

      const empty = ganttChart.querySelector(".gantt-empty");
      if (empty) {
        const emptyRect = empty.getBoundingClientRect();
        ctx.fillStyle = mutedColor;
        ctx.font = `400 14px ${fontFamily}`;
        ctx.textBaseline = "top";
        ctx.fillText(
          empty.textContent?.trim() || "No timeline data yet.",
          chartX + emptyRect.left - chartRect.left,
          chartY + emptyRect.top - chartRect.top
        );
      }

      ctx.globalAlpha = 1;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
    };

    drawGantt();

    const columnWeights = [1.2, 0.78, 0.78, 0.92, 1.0, 0.82, 3.5];
    const horizontalPadding = 2;
    const totalWeight = columnWeights.reduce((sum, value) => sum + value, 0);
    const usableTableWidth = Math.max(1, width - horizontalPadding * 2);
    const columnWidths = columnWeights.map((weight) => Math.floor((usableTableWidth * weight) / totalWeight));
    columnWidths[columnWidths.length - 1] = usableTableWidth - columnWidths.slice(0, -1).reduce((sum, value) => sum + value, 0);

    const rowsToDraw = rows.map((row) => Array.from(row.children));
    const rowTop = (rowIndex) => rows.slice(0, rowIndex).reduce((sum, row) => sum + row.getBoundingClientRect().height, 0);

    rowsToDraw.forEach((cells, rowIndex) => {
      const rowElement = rows[rowIndex];
      const rowRect = rowElement.getBoundingClientRect();
      const y = tableTop + rowTop(rowIndex);
      const isHeader = rowElement.closest("thead") !== null;
      const rowBackground = isHeader ? headerBg : bodyBg;
      const sourceRow = rowElement.dataset.rowId
        ? state.rows.find((candidate) => candidate.id === rowElement.dataset.rowId)
        : null;

      ctx.fillStyle = rowBackground;
      ctx.fillRect(0, y, width, rowRect.height);

      // Group separators span the whole table: draw a single banded label instead of columns.
      if (rowElement.classList.contains("table-group-row")) {
        const fontFamily = getComputedStyle(document.body).fontFamily || "sans-serif";
        ctx.fillStyle = "rgba(194, 176, 126, 0.08)";
        ctx.fillRect(0, y, width, rowRect.height);
        ctx.strokeStyle = borderColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, y + rowRect.height + 0.5);
        ctx.lineTo(width, y + rowRect.height + 0.5);
        ctx.stroke();
        ctx.fillStyle = sandColor;
        ctx.font = `700 12px ${fontFamily}`;
        ctx.textBaseline = "middle";
        const bandText = (rowElement.innerText || rowElement.textContent || "")
          .replace(/\s+/g, " ")
          .replace(/[▾▸]\s*/g, "")
          .trim()
          .toUpperCase();
        ctx.fillText(bandText, horizontalPadding + 14, y + rowRect.height / 2);
        ctx.textBaseline = "top";
        return;
      }

      let x = horizontalPadding;
      cells.forEach((cell, cellIndex) => {
        const cellWidth = columnWidths[cellIndex] || 0;
        const cellHeight = rowRect.height;
        const computed = getComputedStyle(cell);
        const paddingLeft = parseFloat(computed.paddingLeft) || 0;
        const paddingRight = parseFloat(computed.paddingRight) || 0;
        const paddingTop = parseFloat(computed.paddingTop) || 0;
        const paddingBottom = parseFloat(computed.paddingBottom) || 0;
        const usableWidth = Math.max(0, cellWidth - paddingLeft - paddingRight);
        const border = borderColor;

        ctx.fillStyle = rowBackground;
        ctx.fillRect(x, y, cellWidth, cellHeight);
        ctx.strokeStyle = border;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, y + cellHeight + 0.5);
        ctx.lineTo(x + cellWidth, y + cellHeight + 0.5);
        ctx.stroke();

        const isNotesCell = cell.classList.contains("notes-cell");
        const isHeaderCell = isHeader;

        const fontFamily = getComputedStyle(document.body).fontFamily || "sans-serif";
        if (isHeaderCell) {
          const text = (cell.innerText || cell.textContent || "").toUpperCase();
          const font = `700 12px ${fontFamily}`;
          ctx.fillStyle = sandColor;
          ctx.font = font;
          ctx.textBaseline = "top";
          const lines = wrapText(text, usableWidth, font);
          let textY = y + paddingTop;
          const maxLines = Math.max(1, Math.floor((cellHeight - paddingTop - paddingBottom) / 16));
          lines.slice(0, maxLines).forEach((line) => {
            ctx.fillText(line || "", x + paddingLeft, textY);
            textY += 16;
          });
        } else if (cellIndex === 0 && sourceRow) {
          const title = sourceRow.conferenceAcronym || sourceRow.conferenceName || "—";
          const status = sourceRow.status || "Planning";
          const titleFont = `700 15px ${fontFamily}`;
          const badgeFont = `700 11px ${fontFamily}`;
          ctx.font = titleFont;
          ctx.fillStyle = title === "—" ? mutedColor : textColor;
          ctx.textBaseline = "top";
          const titleLines = wrapText(title, usableWidth, titleFont).slice(0, 2);
          let textY = y + paddingTop;
          titleLines.forEach((line) => {
            ctx.fillText(line || "", x + paddingLeft, textY);
            textY += 17;
          });

          const badgeTop = textY + 2;
          const badgePaddingX = 8;
          const badgeHeight = 20;
          const badgeText = status;
          ctx.font = badgeFont;
          const badgeWidth = Math.min(usableWidth, Math.ceil(ctx.measureText(badgeText).width) + badgePaddingX * 2);
          const badgeColors = statusColors(status);
          drawRoundedRect(x + paddingLeft, badgeTop, badgeWidth, badgeHeight, 999);
          ctx.fillStyle = badgeColors.background;
          ctx.fill();
          ctx.fillStyle = badgeColors.text;
          ctx.fillText(badgeText, x + paddingLeft + badgePaddingX, badgeTop + 4);
        } else {
          let text = cell.innerText || cell.textContent || "";
          const fontWeight = 400;
          const fontSize = 15;
          const lineHeight = isNotesCell ? 18 : 17;
          const font = `${fontWeight} ${fontSize}px ${fontFamily}`;
          const lines = isNotesCell
            ? String(text).split(/\r?\n/).flatMap((part) => wrapText(part, usableWidth, font))
            : wrapText(text, usableWidth, font);

          ctx.fillStyle = text ? textColor : mutedColor;
          ctx.font = font;
          ctx.textBaseline = "top";

          let textY = y + paddingTop;
          const maxLines = Math.max(1, Math.floor((cellHeight - paddingTop - paddingBottom) / lineHeight));
          const visibleLines = lines.slice(0, maxLines);
          visibleLines.forEach((line) => {
            ctx.fillText(line || "", x + paddingLeft, textY);
            textY += lineHeight;
          });
        }

        x += cellWidth;
      });
    });

    canvas.toBlob((blob) => {
      if (!blob) {
        setStatus("Failed to export table as PNG.");
        return;
      }

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = (state.activeFileName || "deadlines").replace(/\.csv$/i, "") + ".png";
      a.click();
      URL.revokeObjectURL(a.href);
      setStatus("Downloaded planner as PNG.");
    });
  } catch (err) {
    setStatus(`Export failed: ${err?.message || String(err)}`);
  }
}

function formatDateToIcsDate(date) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return null;
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}${mm}${dd}`;
}

function generateIcs() {
  const lines = [];
  lines.push("BEGIN:VCALENDAR");
  lines.push("VERSION:2.0");
  lines.push("PRODID:-//Deadline Tracker//EN");

  const now = new Date();
  const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  for (const row of state.rows) {
    const confLabel = row.conferenceAcronym || row.conferenceName || 'Conference';
    const descriptionParts = [];
    if (row.notes) descriptionParts.push(row.notes);
    if (row.submissionLink) descriptionParts.push(`Link: ${row.submissionLink}`);
    if (row.conferenceDates) descriptionParts.push(`Dates: ${row.conferenceDates}`);
    const description = descriptionParts.join('\n');

    const addEvent = (key, dateStr, titleSuffix) => {
      const date = normalizeDateInput(dateStr);
      if (!date) return;
      const dt = formatDateToIcsDate(date);
      if (!dt) return;
      const uid = `${row.id}-${key}@deadline-tracker`;
      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${uid}`);
      lines.push(`DTSTAMP:${dtstamp}`);
      lines.push(`DTSTART;VALUE=DATE:${dt}`);
      lines.push(`SUMMARY:${confLabel} — ${titleSuffix}`);
      if (description) lines.push(`DESCRIPTION:${description.replace(/\n/g, '\\n')}`);
      lines.push('END:VEVENT');
    };

    addEvent('abstract', row.abstractDeadline, 'Abstract Deadline');
    addEvent('paper', row.paperDeadline, 'Paper Deadline');
    addEvent('notification', row.notificationDate, 'Notification');

    const range = parseConferenceDateRange(row.conferenceDates);
    if (range && range.start) {
      addEvent('conferenceStart', dateToIso(range.start), 'Conference Start');
    }
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n') + '\r\n';
}

function exportCalendar(provider) {
  try {
    const ics = generateIcs();
    if (!ics) {
      setStatus('No events to export.');
      return;
    }

    const filename = (state.activeFileName || 'deadlines').replace(/\.csv$/i, '') + '.ics';
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    setStatus(`Prepared ${filename} for download.`);

    if (provider === 'google') {
      window.open('https://calendar.google.com/calendar/u/0/r/settings/import', '_blank', 'noreferrer');
      setStatus('Downloaded .ics — open Google Calendar Import to add it.');
    } else if (provider === 'yahoo') {
      window.open('https://calendar.yahoo.com/', '_blank', 'noreferrer');
      setStatus('Downloaded .ics — open Yahoo Calendar and import the file.');
    } else if (provider === 'outlook') {
      window.open('https://outlook.live.com/calendar/0/import', '_blank', 'noreferrer');
      setStatus('Downloaded .ics — open Outlook import to add it.');
    } else {
      setStatus('Downloaded iCal (.ics).');
    }
  } catch (err) {
    setStatus(`Calendar export failed: ${err?.message || String(err)}`);
  }
}

function upsertRow(row) {
  const nextRow = { ...row };
  const existingIndex = state.rows.findIndex((candidate) => candidate.id === nextRow.id);

  if (existingIndex >= 0) {
    state.rows[existingIndex] = nextRow;
  } else {
    state.rows.unshift(nextRow);
  }

  renderTable();
  persistState();
  const target = document.querySelector(`[data-row-id="${CSS.escape(nextRow.id)}"]`);
  target?.classList.add("highlight");
  setTimeout(() => target?.classList.remove("highlight"), 650);
}

async function onSave() {
  try {
    if (state.editingRowId) {
      commitInlineEdit(state.editingRowId);
      if (state.editingRowId) {
        return;
      }
    }

    await saveToHandle();
    persistState();
  } catch (error) {
    downloadCsv();
    setStatus("Direct file save was blocked, so an updated CSV download was prepared instead.");
  }
}

function handleKeyboardShortcut(event) {
  if (event.defaultPrevented || event.isComposing || event.repeat || event.altKey) return;
  const target = event.target;
  const typing = target instanceof Element && (
    target.closest("input, textarea, select") || target.isContentEditable
  );
  const key = event.key.toLowerCase();
  const command = event.ctrlKey || event.metaKey;
  const focusRow = (rowId) => {
    elements.tableBody.querySelector(`[data-row-id="${CSS.escape(rowId)}"]`)?.focus();
  };

  if (command) {
    if (event.shiftKey) return;
    if (key === "s" || key === "o") {
      event.preventDefault();
      (key === "s" ? elements.saveBtn : elements.openCsvBtn).click();
    } else if (key === "enter") {
      if (state.editingRowId) {
        event.preventDefault();
        const rowId = state.editingRowId;
        commitInlineEdit(rowId);
        if (!state.editingRowId) focusRow(rowId);
      } else if (elements.rowForm.contains(target)) {
        event.preventDefault();
        elements.rowForm.requestSubmit();
      }
    }
    return;
  }

  if (key === "escape") {
    const calendarMenu = document.getElementById("exportCalendarMenu");
    if (isStatusMenuOpen()) {
      event.preventDefault();
      const anchor = statusMenu.anchor;
      closeStatusMenu();
      anchor?.focus();
    } else if (calendarMenu && !calendarMenu.hidden) {
      event.preventDefault();
      calendarMenu.hidden = true;
      elements.exportCalendarBtn.focus();
    } else if (target === elements.searchInput) {
      event.preventDefault();
      elements.searchInput.value = "";
      elements.searchInput.dispatchEvent(new Event("input", { bubbles: true }));
    } else if (state.editingRowId) {
      event.preventDefault();
      const rowId = state.editingRowId;
      cancelInlineEdit();
      focusRow(rowId);
    }
    return;
  }

  if (typing) return;
  if (key === "/" && !event.shiftKey) {
    event.preventDefault();
    elements.searchInput.focus();
    elements.searchInput.select();
  } else if (key === "n" && !event.shiftKey) {
    event.preventDefault();
    elements.conferenceName.focus();
  } else if (key === "e" && !event.shiftKey) {
    const row = target.closest?.("tr[data-row-id]") || elements.tableBody.querySelector("tr[data-row-id]");
    if (row) {
      event.preventDefault();
      // Keep an existing inline draft instead of replacing it with another editor.
      if (state.editingRowId) {
        elements.tableBody.querySelector(`[data-row-id="${CSS.escape(state.editingRowId)}"] [data-field="conferenceName"]`)?.focus();
      } else {
        startInlineEdit(row.dataset.rowId);
      }
    }
  } else if (key === "?") {
    event.preventDefault();
    const help = document.getElementById("keyboardShortcuts");
    help.open = !help.open;
    help.querySelector("summary").focus();
  }
}

function wireEvents() {
  document.addEventListener("keydown", handleKeyboardShortcut);
  // The native file input is hidden so the picker can be a button matching the rest of the bar.
  elements.openCsvBtn?.addEventListener("click", () => {
    elements.fileInput.click();
  });

  elements.fileInput.addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    if (!file) {
      return;
    }
    await loadFromSelectedFile(file);
    // Reset so picking the same file again still fires a change event.
    event.target.value = "";
  });

  elements.createCsvBtn.addEventListener("click", async () => {
    await createNewCsv();
  });

  // Wire export calendar menu
  if (elements.exportCalendarBtn && elements.exportCalendarMenu) {
    elements.exportCalendarBtn.addEventListener('click', (e) => {
      const menu = elements.exportCalendarMenu;
      menu.hidden = !menu.hidden;
      if (!menu.hidden) menu.querySelector('button')?.focus();
    });

    elements.exportCalendarMenu.querySelectorAll('button[data-provider]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const provider = btn.dataset.provider;
        elements.exportCalendarMenu.hidden = true;
        exportCalendar(provider);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const menu = elements.exportCalendarMenu;
      if (!menu) return;
      if (menu.hidden) return;
      const target = e.target;
      if (!elements.exportCalendarBtn.contains(target) && !menu.contains(target)) {
        menu.hidden = true;
      }
    });
  }

  if (elements.tableWrap) {
    elements.tableWrap.addEventListener("dragover", (e) => {
      e.preventDefault();
      elements.tableWrap.classList.add("drag-over");
    });

    elements.tableWrap.addEventListener("dragleave", () => {
      elements.tableWrap.classList.remove("drag-over");
    });

    elements.tableWrap.addEventListener("drop", async (e) => {
      e.preventDefault();
      elements.tableWrap.classList.remove("drag-over");
      const file = e.dataTransfer?.files?.[0];
      if (file) {
        await loadFromSelectedFile(file);
        setStatus(`Loaded ${file.name} via drag-and-drop.`);
      }
    });
  }

  // 'Load stored' and 'Open CSV' buttons removed; users load from browser cache, drag-and-drop, or Create new
  elements.downloadBtn.addEventListener("click", downloadCsv);
  elements.saveBtn.addEventListener("click", onSave);
  elements.exportPngBtn?.addEventListener("click", exportTableAsPng);

  elements.rowForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const row = buildRowFromForm();

    if (!hasRequiredData(row)) {
      elements.conferenceName.focus();
      setStatus("Conference name is required before saving a row.");
      return;
    }

    upsertRow(row);
    clearForm();
    setStatus(`Row saved locally. Use Save changes to write to ${state.activeFileName}.`);
  });

  elements.clearFormBtn.addEventListener("click", () => {
    clearForm();
    setStatus("Form cleared.");
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.filterText = event.target.value.trim();
    renderTable();
  });

  for (const group of ROW_GROUPS) {
    const toggle = elements.groupControls[group.key]?.toggle;
    toggle?.addEventListener("change", () => {
      setGroupVisibility(group.key, toggle.checked);
    });
  }

  elements.highlightSegment?.querySelectorAll("button[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      const mode = button.dataset.mode;
      if (!HIGHLIGHT_MODES.includes(mode) || state.prefs.highlightMode === mode) {
        return;
      }

      state.prefs.highlightMode = mode;
      persistPrefs();
      renderTable();

      const description = {
        off: "Deadline highlighting turned off.",
        active: "Highlighting deadlines for rows still in progress only.",
        all: "Highlighting deadlines for every row, whatever its status.",
      };
      setStatus(description[mode]);
    });
  });

  const wireThresholdInput = (input, prefKey) => {
    if (!input) {
      return;
    }

    input.addEventListener("input", () => {
      if (input.value === "") {
        return; // wait for a complete value while typing
      }

      state.prefs[prefKey] = clampDays(input.value, DEFAULT_PREFS[prefKey]);
      persistPrefs();
      renderTable();
    });

    input.addEventListener("change", () => {
      state.prefs[prefKey] = clampDays(input.value, DEFAULT_PREFS[prefKey]);
      // Keep the tiers ordered so both thresholds stay reachable.
      if (state.prefs.criticalDays > state.prefs.soonDays) {
        if (prefKey === "criticalDays") {
          state.prefs.soonDays = state.prefs.criticalDays;
        } else {
          state.prefs.criticalDays = state.prefs.soonDays;
        }
      }

      input.value = String(state.prefs[prefKey]);
      persistPrefs();
      renderTable();
    });
  };

  wireThresholdInput(elements.criticalDaysInput, "criticalDays");
  wireThresholdInput(elements.soonDaysInput, "soonDays");

  elements.resetPrefsBtn?.addEventListener("click", () => {
    state.prefs = { ...DEFAULT_PREFS };
    persistPrefs();
    renderTable();
    setStatus("Timeline visibility and highlight thresholds reset to defaults.");
  });

  // When the user completes the Abstract date, copy it to Paper deadline
  // only if the Paper field is currently empty. Use robust parsing to
  // accept both ISO (yyyy-mm-dd) and common local formats (dd/mm/yyyy).
  elements.abstractDeadline.addEventListener("change", () => {
    try {
      if (elements.paperDeadline.value) return; // don't overwrite user input

      const abstractVal = elements.abstractDeadline.value;
      if (!abstractVal) return;

      // Prefer using valueAsDate (native Date) when available from the input.
      // This avoids ambiguity and preserves the correct year.
      let dateObj = null;
      try {
        dateObj = elements.abstractDeadline.valueAsDate || null;
      } catch (e) {
        dateObj = null;
      }

      if (!dateObj) {
        // Not available — fall back to robust parsing for both ISO and common formats
        if (isIsoDateValue(abstractVal)) {
          // ISO string -> safe
          const parts = abstractVal.split("-");
          dateObj = makeDate(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        } else {
          // Try numeric ambiguous formats (DD/MM/YYYY or MM/DD/YYYY) and named months
          const numericMatch = String(abstractVal).trim().match(/^(\d{1,2})[./](\d{1,2})[./](\d{2,4})$/);
          if (numericMatch) {
            let a = Number(numericMatch[1]);
            let b = Number(numericMatch[2]);
            let y = Number(numericMatch[3]);
            if (numericMatch[3].length === 2) y += 2000;

            // Try day-month-year first
            dateObj = makeDate(y, b - 1, a);
            if (!dateObj) {
              // Try month-day-year as fallback
              dateObj = makeDate(y, a - 1, b);
            }
          } else {
            dateObj = parseDateText(abstractVal);
          }
        }
      }

      if (dateObj) {
        // If a 4-digit year appears in the raw input string, prefer it
        // in case parsing produced an incorrect small year (e.g., 1 or 2).
        const explicitYearMatch = String(abstractVal).match(/(20\d{2})/);
        if (explicitYearMatch) {
          const explicitYear = Number(explicitYearMatch[1]);
          if (dateObj.getFullYear() !== explicitYear) {
            const corrected = makeDate(explicitYear, dateObj.getMonth(), dateObj.getDate());
            if (corrected) dateObj = corrected;
          }
        }

        const yyyy = dateObj.getFullYear();
        const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
        const dd = String(dateObj.getDate()).padStart(2, "0");
        elements.paperDeadline.value = `${yyyy}-${mm}-${dd}`;
        // mark that we auto-copied this value so subsequent abstract edits
        // can decide whether to update the paper field.
        elements.paperDeadline.dataset.autoCopiedFrom = `${yyyy}-${mm}-${dd}`;
      }
    } catch (e) {
      // swallow errors to avoid breaking the form
    }
  });

  // If the user edits the Paper field manually, clear the auto-copied flag
  elements.paperDeadline.addEventListener("input", () => {
    if (elements.paperDeadline.value && elements.paperDeadline.dataset.autoCopiedFrom) {
      // If the value differs from the auto-copied source, assume manual edit
      if (elements.paperDeadline.value !== elements.paperDeadline.dataset.autoCopiedFrom) {
        delete elements.paperDeadline.dataset.autoCopiedFrom;
      }
    }
  });

}
(function init() {
  state.prefs = loadPrefs();
  wireEvents();
  updatePrefControls(null);
  clearForm();
  tryLoadDefaultCsv();
})();

// Ensure state is persisted before the page unloads (cover accidental refreshes)
window.addEventListener("beforeunload", () => {
  try {
    persistState();
  } catch (e) {
    // ignore
  }
});
