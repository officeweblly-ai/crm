import "./demo.css";

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

function Sidebar({ active }: { active: string }) {
  const items = [
    "לוח בקרה",
    "לידים",
    "לקוחות",
    "עסקאות",
    "אוטומציות",
    "סוכני AI",
    "דוחות",
  ];
  return (
    <aside className="dm-side">
      <div className="dm-brand">
        <i>M</i> מסטיק CRM
      </div>
      <div>
        <div className="dm-navlabel">ניהול</div>
        <nav className="dm-nav" style={{ marginTop: 8 }}>
          {items.map((it) => (
            <b key={it} className={it === active ? "on" : undefined}>
              <span className="dm-dot" />
              {it}
            </b>
          ))}
        </nav>
      </div>
      <div className="dm-upsell">
        <strong style={{ fontSize: 13 }}>סוכן AI חדש</strong>
        <p>הפעילו מענה אוטומטי 24/7 לפניות שנכנסות מהאתר</p>
        <span>הפעלה</span>
      </div>
    </aside>
  );
}

function TopBar({ placeholder }: { placeholder: string }) {
  return (
    <div className="dm-top">
      <div className="dm-search">{placeholder}</div>
      <div style={{ marginInlineStart: "auto", display: "flex", gap: 10 }}>
        <span className="dm-bell" />
        <span className="dm-ava" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — CRM dashboard                                                   */
/* ------------------------------------------------------------------ */

const MONTHS = ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק"];
const HEIGHTS = [38, 52, 44, 63, 57, 74, 66, 88, 79, 100];

const LEADS = [
  ["נועה ישראלי", "אתר — טופס", "פגישה נקבעה", "g", "₪18,400"],
  ["דניאל לוי", "וואטסאפ", "בטיפול", "y", "₪9,200"],
  ["איתי מזרחי", "קמפיין גוגל", "נסגר", "g", "₪42,000"],
  ["מאיה רוזנברג", "המלצה", "ליד חדש", "p", "₪6,800"],
  ["יונתן פרידמן", "אינסטגרם", "בטיפול", "y", "₪12,300"],
];

export function ScreenCrm() {
  return (
    <div className="dm">
      <Sidebar active="לוח בקרה" />
      <div className="dm-main">
        <TopBar placeholder="חיפוש לקוח, עסקה או פנייה…" />
        <div className="dm-body">
          <div className="dm-hello">
            <div>
              <h4>שלום אופק</h4>
              <small>יום שלישי, 18 באוגוסט · 7 משימות פתוחות</small>
            </div>
            <span className="dm-chip">30 הימים האחרונים</span>
          </div>

          <div className="dm-kpis">
            {[
              ["לידים חדשים", "128", "+12.4%", ""],
              ["פניות שנענו אוטומטית", "94%", "+8.1%", ""],
              ["עסקאות שנסגרו", "₪184,200", "+23.7%", ""],
              ["זמן תגובה ממוצע", "2:14 דק׳", "−41%", ""],
            ].map(([label, val, delta]) => (
              <div className="dm-kpi" key={label}>
                <h5>{label}</h5>
                <strong>{val}</strong>
                <span className="dm-delta">{delta}</span>
              </div>
            ))}
          </div>

          <div className="dm-grid">
            <div className="dm-card">
              <header>
                <h5>הכנסות לפי חודש</h5>
                <div className="dm-seg">
                  <span>שבועי</span>
                  <span className="on">חודשי</span>
                </div>
              </header>
              <div className="dm-bars">
                {MONTHS.map((m, i) => (
                  <div key={m} className={i === 7 ? "hi" : undefined}>
                    <u style={{ height: `${HEIGHTS[i]}%` }} />
                    <small>{m}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="dm-card">
              <header>
                <h5>מקורות לידים</h5>
              </header>
              <div className="dm-donut">
                <svg width="132" height="132" viewBox="0 0 42 42" aria-hidden>
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--bg-deep)" strokeWidth="6" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--gum-500)" strokeWidth="6" strokeDasharray="42 58" strokeDashoffset="25" strokeLinecap="round" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--gum-300)" strokeWidth="6" strokeDasharray="27 73" strokeDashoffset="-17" strokeLinecap="round" />
                  <circle cx="21" cy="21" r="15.9" fill="none" stroke="var(--ink-700)" strokeWidth="6" strokeDasharray="18 82" strokeDashoffset="-44" strokeLinecap="round" />
                </svg>
              </div>
              <div className="dm-legend">
                <div><i style={{ background: "var(--gum-500)" }} />אתר וטפסים<b>42%</b></div>
                <div><i style={{ background: "var(--gum-300)" }} />וואטסאפ<b>27%</b></div>
                <div><i style={{ background: "var(--ink-700)" }} />קמפיינים<b>18%</b></div>
                <div><i style={{ background: "var(--bg-deep)" }} />המלצות<b>13%</b></div>
              </div>
            </div>
          </div>

          <div className="dm-card" style={{ flex: "none" }}>
            <header>
              <h5>פניות אחרונות</h5>
              <span className="dm-chip">118 לקוחות</span>
            </header>
            <table className="dm-table">
              <thead>
                <tr>
                  <th>שם לקוח</th>
                  <th>מקור</th>
                  <th>סטטוס</th>
                  <th>שווי עסקה</th>
                </tr>
              </thead>
              <tbody>
                {LEADS.slice(0, 4).map(([name, src, status, tone, val]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{src}</td>
                    <td>
                      <span className={`dm-tag ${tone}`}>{status}</span>
                    </td>
                    <td>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2 — Automation builder                                              */
/* ------------------------------------------------------------------ */

const NODES = [
  { top: 60, right: 40, icon: "1", title: "טופס נשלח באתר", body: "טריגר · לקוח השאיר פרטים", live: true },
  { top: 60, right: 300, icon: "2", title: "בדיקת תנאי", body: "תקציב מעל ₪10,000?" },
  { top: 60, right: 560, icon: "3", title: "יצירת כרטיס לקוח", body: "נפתח אוטומטית ב-CRM" },
  { top: 300, right: 560, icon: "4", title: "הודעת וואטסאפ", body: "אישור קבלה + קישור ליומן" },
  { top: 300, right: 300, icon: "5", title: "משימה לנציג", body: "שיבוץ לפי עומס בצוות" },
  { top: 300, right: 40, icon: "6", title: "עדכון דוח", body: "הנתון נכנס ללוח הבקרה" },
];

export function ScreenAutomation() {
  return (
    <div className="dm">
      <Sidebar active="אוטומציות" />
      <div className="dm-main">
        <TopBar placeholder="חיפוש אוטומציה…" />
        <div className="dm-body">
          <div className="dm-hello">
            <div>
              <h4>אוטומציה: ליד חדש מהאתר</h4>
              <small>רצה 1,284 פעמים החודש · חסכה 47 שעות עבודה</small>
            </div>
            <span className="dm-chip" style={{ color: "#1d7a4c", fontWeight: 700 }}>
              ● פעילה
            </span>
          </div>

          <div className="dm-flow">
            <svg
              className="dm-wire"
              viewBox="0 0 896 578"
              preserveAspectRatio="none"
              aria-hidden
            >
              <g
                fill="none"
                stroke="var(--gum-300)"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <path d="M660 109 H596" />
                <path d="M400 109 H336" />
                <path d="M238 158 V300" />
                <path d="M336 349 H400" />
                <path d="M596 349 H660" />
              </g>
              <g fill="var(--gum-500)">
                <circle cx="628" cy="109" r="4" />
                <circle cx="368" cy="109" r="4" />
                <circle cx="238" cy="229" r="4" />
                <circle cx="368" cy="349" r="4" />
                <circle cx="628" cy="349" r="4" />
              </g>
            </svg>
            {NODES.map((n) => (
              <div
                key={n.icon}
                className={`dm-node${n.live ? " live" : ""}`}
                style={{ top: n.top, insetInlineStart: n.right }}
              >
                <i>{n.icon}</i>
                <h6>{n.title}</h6>
                <p>{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3 — AI agent                                                        */
/* ------------------------------------------------------------------ */

export function ScreenChatbot() {
  return (
    <div className="dm">
      <Sidebar active="סוכני AI" />
      <div className="dm-main">
        <TopBar placeholder="חיפוש שיחה…" />
        <div className="dm-body">
          <div className="dm-hello">
            <div>
              <h4>סוכן AI · שירות לקוחות</h4>
              <small>312 שיחות היום · 94% נסגרו בלי מגע אנושי</small>
            </div>
            <span className="dm-chip">מחובר ל-CRM</span>
          </div>

          <div className="dm-chat">
            <div className="dm-thread">
              <div className="dm-msg bot">שלום! אני העוזר של מסטיק. איך אפשר לעזור?</div>
              <div className="dm-msg me">רוצה לדעת מתי ההזמנה שלי מגיעה</div>
              <div className="dm-msg bot">
                בדקתי במערכת — הזמנה 4821 יצאה למשלוח היום ב-09:40 ומגיעה עד מחר.
                לשלוח לך קישור למעקב?
              </div>
              <div className="dm-msg me">כן, ותקבע לי גם שיחה עם נציג</div>
              <div className="dm-typing">
                <i /> <i /> <i />
              </div>
              <div className="dm-quick">
                <span>שעות פעילות</span>
                <span>החזרת מוצר</span>
                <span>לדבר עם נציג</span>
              </div>
              <div className="dm-input">כתבו הודעה…</div>
            </div>

            <div className="dm-intent">
              <strong style={{ fontSize: 13.5 }}>כוונות שזוהו</strong>
              <div className="dm-intent-row">
                {[
                  ["מעקב הזמנה", 92],
                  ["קביעת פגישה", 78],
                  ["בקשת הצעת מחיר", 41],
                ].map(([label, pct]) => (
                  <div key={label as string} style={{ marginBottom: 12 }}>
                    <div>
                      <b>{label}</b>
                      <span>{pct}%</span>
                    </div>
                    <div className="dm-meter">
                      <span style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "1px solid var(--line)", paddingTop: 13 }}>
                <strong style={{ fontSize: 13.5 }}>פעולות שבוצעו</strong>
                <div style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 8, lineHeight: 1.9 }}>
                  ✓ נשלח קישור מעקב<br />
                  ✓ נפתח כרטיס שירות<br />
                  ✓ נקבעה פגישה ליום ד׳
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const SCREENS = [ScreenCrm, ScreenAutomation, ScreenChatbot];
export const SCREEN_LABELS = ["מערכת CRM", "מנוע אוטומציות", "סוכן AI"];

export const SCREEN_STORY = [
  {
    kicker: "01 — המערכת",
    title: "CRM שנבנה סביב התהליך שלכם",
    body: "כל ליד, כל שיחה וכל עסקה במקום אחד — עם המסכים, השדות והסטטוסים של העסק שלכם, לא של תבנית גנרית.",
    chips: ["ניהול לידים", "צנרת מכירות", "דוחות חיים"],
  },
  {
    kicker: "02 — האוטומציות",
    title: "העבודה השחורה רצה לבד",
    body: "טופס שנשלח, וואטסאפ שנענה, פגישה שנקבעת ודוח שמתעדכן — שרשרת אחת שרצה ברקע בלי שתזכרו אותה.",
    chips: ["טפסים ולידים", "וואטסאפ ומייל", "סנכרון יומן"],
  },
  {
    kicker: "03 — הסוכן",
    title: "סוכן AI שמדבר עם הלקוחות",
    body: "מבין מה הלקוח באמת רוצה, שולף את התשובה מתוך המערכת שלכם, פותח קריאה ומזמן פגישה — 24 שעות ביממה.",
    chips: ["מענה 24/7", "סינון פניות", "תיאום פגישות"],
  },
];
