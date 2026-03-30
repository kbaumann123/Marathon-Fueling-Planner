import React, { useState, useMemo, useRef } from "react";

// ── Brand ────────────────────────────────────────────────────────────────
const B = {
  navy: "#2b3249",
  navyLight: "#3d4a6a",
  sand: "#d7b58b",
  sandLight: "#e8d0b0",
  mauve: "#ae887b",
  mauveLight: "#c9a99d",
  cream: "#f4f4f4",
  white: "#ffffff",
  border: "#e2d9d6",
  blush: "#d3c5c1",
  textMuted: "#8a7d79",
  textBody: "#4a4540",
  textDark: "#2b3249",
  warn: "#c0392b",
  warnBg: "#fdf0ee",
};

const FF = "'Montserrat', sans-serif";
const FB = "'Nunito', sans-serif";

// ── Product Database ─────────────────────────────────────────────────────
const PRODUCTS = [
  // GELS
  { id: 1,  brand: "GU Energy",          name: "Original Gel",                              type: "Gel",            carbs: 22, sodium: 60,   caffeine: 0,   servingSize: "32g packet" },
  { id: 2,  brand: "GU Energy",          name: "Roctane Gel",                               type: "Gel",            carbs: 21, sodium: 125,  caffeine: 35,  servingSize: "32g packet" },
  { id: 3,  brand: "GU Energy",          name: "Roctane Gel (High Caffeine)",               type: "Gel",            carbs: 21, sodium: 125,  caffeine: 70,  servingSize: "32g packet" },
  { id: 5,  brand: "Maurten",            name: "Gel 100",                                   type: "Gel",            carbs: 25, sodium: 20,   caffeine: 0,   servingSize: "40g packet" },
  { id: 6,  brand: "Maurten",            name: "Gel 100 CAF 100",                           type: "Gel",            carbs: 25, sodium: 20,   caffeine: 100, servingSize: "40g packet" },
  { id: 7,  brand: "Maurten",            name: "Gel 160",                                   type: "Gel",            carbs: 40, sodium: 30,   caffeine: 0,   servingSize: "50g packet" },
  { id: 8,  brand: "Precision Fuel",     name: "PF30 Gel",                                  type: "Gel",            carbs: 30, sodium: 30,   caffeine: 0,   servingSize: "45g packet" },
  { id: 9,  brand: "Precision Fuel",     name: "PF30 Caffeine Gel",                         type: "Gel",            carbs: 30, sodium: 30,   caffeine: 100, servingSize: "45g packet" },
  { id: 10, brand: "Huma",               name: "Chia Energy Gel",                           type: "Gel",            carbs: 21, sodium: 105,  caffeine: 0,   servingSize: "44g packet" },
  { id: 11, brand: "Huma",               name: "Chia Energy Gel Plus (Extra Electrolytes)", type: "Gel",            carbs: 21, sodium: 240,  caffeine: 0,   servingSize: "44g packet" },
  { id: 12, brand: "Huma",               name: "Chia Energy Gel (Caffeinated)",             type: "Gel",            carbs: 21, sodium: 105,  caffeine: 25,  servingSize: "44g packet" },
  { id: 13, brand: "Never Second",       name: "C30 Gel",                                   type: "Gel",            carbs: 30, sodium: 200,  caffeine: 0,   servingSize: "60ml packet" },
  { id: 14, brand: "Never Second",       name: "C30+ Caffeine Gel",                         type: "Gel",            carbs: 30, sodium: 200,  caffeine: 75,  servingSize: "60ml packet" },
  { id: 15, brand: "Science in Sport",   name: "GO Isotonic Gel",                           type: "Gel",            carbs: 22, sodium: 11,   caffeine: 0,   servingSize: "60ml packet" },
  { id: 16, brand: "Science in Sport",   name: "GO Isotonic Gel (Caffeinated)",             type: "Gel",            carbs: 22, sodium: 11,   caffeine: 75,  servingSize: "60ml packet" },
  { id: 17, brand: "Honey Stinger",      name: "Organic Energy Gel",                        type: "Gel",            carbs: 24, sodium: 50,   caffeine: 0,   servingSize: "32g packet" },
  { id: 19, brand: "BPN",                name: "Go Gel",                                    type: "Gel",            carbs: 24, sodium: 60,   caffeine: 0,   servingSize: "fruit puree packet" },
  { id: 20, brand: "BPN",                name: "Go Gel (Caffeinated)",                      type: "Gel",            carbs: 24, sodium: 60,   caffeine: 75,  servingSize: "fruit puree packet" },
  { id: 21, brand: "Untapped",           name: "Maple Gel",                                 type: "Gel",            carbs: 26, sodium: 5,    caffeine: 0,   servingSize: "38g packet" },
  { id: 22, brand: "Untapped",           name: "Salted Maple Gel",                          type: "Gel",            carbs: 26, sodium: 60,   caffeine: 0,   servingSize: "38g packet" },
  { id: 23, brand: "Untapped",           name: "Coffee Gel (Caffeinated)",                  type: "Gel",            carbs: 26, sodium: 11,   caffeine: 45,  servingSize: "38g packet" },
  { id: 24, brand: "Carbs Fuel",         name: "Original Gel (50g carbs)",                  type: "Gel",            carbs: 50, sodium: 105,  caffeine: 0,   servingSize: "76g packet" },
  { id: 25, brand: "Carbs Fuel",         name: "Salted Gel (50g carbs)",                    type: "Gel",            carbs: 50, sodium: 450,  caffeine: 0,   servingSize: "76g packet" },
  { id: 28, brand: "Clif",               name: "Shot Gel",                                  type: "Gel",            carbs: 25, sodium: 95,   caffeine: 0,   servingSize: "34g packet" },
  { id: 29, brand: "Clif",               name: "Shot Turbo Gel",                            type: "Gel",            carbs: 27, sodium: 100,  caffeine: 100, servingSize: "34g packet" },
  { id: 30, brand: "Spring Energy",      name: "Speednut",                                  type: "Gel",            carbs: 35, sodium: 40,   caffeine: 0,   servingSize: "45g packet" },
  { id: 31, brand: "Spring Energy",      name: "Hill Aid",                                  type: "Gel",            carbs: 30, sodium: 100,  caffeine: 0,   servingSize: "45g packet" },
  // CHEWS
  { id: 32, brand: "Skratch Labs",       name: "Sport Chews",                               type: "Chews",          carbs: 19, sodium: 80,   caffeine: 0,   servingSize: "half pack (5 pieces)" },
  { id: 33, brand: "Skratch Labs",       name: "Sport Chews (Sour Cherry w/ Caffeine)",     type: "Chews",          carbs: 19, sodium: 80,   caffeine: 50,  servingSize: "half pack (5 pieces)" },
  { id: 34, brand: "Clif",               name: "Shot Bloks",                                type: "Chews",          carbs: 24, sodium: 70,   caffeine: 0,   servingSize: "3 pieces" },
  { id: 35, brand: "Clif",               name: "Shot Bloks (Black Cherry w/ Caffeine)",     type: "Chews",          carbs: 24, sodium: 70,   caffeine: 50,  servingSize: "3 pieces" },
  { id: 36, brand: "Honey Stinger",      name: "Organic Energy Chews",                      type: "Chews",          carbs: 39, sodium: 65,   caffeine: 0,   servingSize: "1 packet (10 pieces)" },
  { id: 37, brand: "Honey Stinger",      name: "Caffeinated Energy Chews",                  type: "Chews",          carbs: 39, sodium: 130,  caffeine: 50,  servingSize: "1 packet (10 pieces)" },
  { id: 38, brand: "Noogs",              name: "Sour Energy Chews",                         type: "Chews",          carbs: 19, sodium: 150,  caffeine: 0,   servingSize: "1 packet (6 chews)" },
  { id: 73, brand: "GU Energy",          name: "Energy Chews",                              type: "Chews",          carbs: 22, sodium: 55,   caffeine: 0,   servingSize: "2 pieces" },
  { id: 74, brand: "Precision Fuel",     name: "PF30 Energy Chews",                         type: "Chews",          carbs: 30, sodium: 0,    caffeine: 0,   servingSize: "1 packet (2 chews)" },
  { id: 75, brand: "Science in Sport",   name: "Beta Fuel Chews",                           type: "Chews",          carbs: 45, sodium: 30,   caffeine: 0,   servingSize: "1 bar" },
  // SPORTS DRINKS
  { id: 40, brand: "Skratch Labs",       name: "Sport Hydration Mix",                       type: "Sports Drink",   carbs: 21, sodium: 380,  caffeine: 0,  fluidOz: 16, servingSize: "1 scoop in 16 fl oz" },
  { id: 41, brand: "Nuun",               name: "Nuun Endurance",                            type: "Sports Drink",   carbs: 16, sodium: 380,  caffeine: 0,  fluidOz: 16, servingSize: "1 scoop in 16 fl oz" },
  { id: 42, brand: "Tailwind",           name: "Endurance Fuel",                            type: "Sports Drink",   carbs: 25, sodium: 310,  caffeine: 0,  fluidOz: 20, servingSize: "1 scoop in 20 fl oz" },
  { id: 43, brand: "Tailwind",           name: "Endurance Fuel (Caffeinated)",              type: "Sports Drink",   carbs: 25, sodium: 310,  caffeine: 35, fluidOz: 20, servingSize: "1 scoop in 20 fl oz" },
  { id: 44, brand: "Gatorade",           name: "Endurance Formula",                         type: "Sports Drink",   carbs: 22, sodium: 300,  caffeine: 0,  fluidOz: 16, servingSize: "1.5 tbsp in 16 fl oz" },
  { id: 45, brand: "BPN",                name: "G.1.M Sport",                               type: "Sports Drink",   carbs: 20, sodium: 350,  caffeine: 0,  fluidOz: 16, servingSize: "1 scoop in 16 fl oz" },
  { id: 46, brand: "Mortal Hydration",   name: "Hydration (Regular)",                       type: "Sports Drink",   carbs: 10, sodium: 450,  caffeine: 0,  fluidOz: 16, servingSize: "1 packet in 16 fl oz" },
  { id: 47, brand: "Mortal Hydration",   name: "Hydration (Salty)",                         type: "Sports Drink",   carbs: 10, sodium: 900,  caffeine: 0,  fluidOz: 16, servingSize: "1 packet in 16 fl oz" },
  { id: 48, brand: "Liquid IV",          name: "Hydration Multiplier",                      type: "Sports Drink",   carbs: 11, sodium: 500,  caffeine: 0,  fluidOz: 16, servingSize: "1 packet in 16 fl oz" },
  // HIGH CARB DRINKS
  { id: 50, brand: "Maurten",            name: "Drink Mix 320",                             type: "High Carb Drink",carbs: 80, sodium: 200,  caffeine: 0,  fluidOz: 17, servingSize: "1 sachet in 500ml (17 fl oz)" },
  { id: 51, brand: "Maurten",            name: "Drink Mix 320 CAF 100",                     type: "High Carb Drink",carbs: 80, sodium: 200,  caffeine: 100,fluidOz: 17, servingSize: "1 sachet in 500ml (17 fl oz)" },
  { id: 52, brand: "Maurten",            name: "Drink Mix 160",                             type: "High Carb Drink",carbs: 40, sodium: 160,  caffeine: 0,  fluidOz: 17, servingSize: "1 sachet in 500ml (17 fl oz)" },
  { id: 53, brand: "Skratch Labs",       name: "Super High Carb Mix",                       type: "High Carb Drink",carbs: 50, sodium: 200,  caffeine: 0,  fluidOz: 16, servingSize: "1 scoop in 16 fl oz" },
  { id: 54, brand: "Tailwind",           name: "High Carb Fuel",                            type: "High Carb Drink",carbs: 90, sodium: 680,  caffeine: 0,  fluidOz: 20, servingSize: "1 packet in 20 fl oz" },
  // ELECTROLYTES
  { id: 60, brand: "LMNT",               name: "Recharge Electrolyte",                      type: "Electrolyte",    carbs: 0,  sodium: 1000, caffeine: 0,   servingSize: "1 packet" },
  { id: 61, brand: "Nuun",               name: "Sport Tablet",                              type: "Electrolyte",    carbs: 4,  sodium: 300,  caffeine: 0,   servingSize: "1 tablet in 16 fl oz" },
  { id: 62, brand: "Nuun",               name: "Sport + Caffeine Tablet",                   type: "Electrolyte",    carbs: 4,  sodium: 300,  caffeine: 40,  servingSize: "1 tablet in 16 fl oz" },
  { id: 63, brand: "Skratch Labs",       name: "Unsweetened Hydration Mix",                 type: "Electrolyte",    carbs: 1,  sodium: 380,  caffeine: 0,   servingSize: "1 scoop in 16 fl oz" },
  { id: 64, brand: "SaltStick",          name: "Electrolyte Capsule",                       type: "Electrolyte",    carbs: 0,  sodium: 215,  caffeine: 0,   servingSize: "1 capsule" },
  { id: 65, brand: "SaltStick",          name: "FastChew Electrolyte Tab",                  type: "Electrolyte",    carbs: 1,  sodium: 100,  caffeine: 0,   servingSize: "1 chewable tab" },
  { id: 66, brand: "Precision Hydration",name: "PH 1000 Tablet",                           type: "Electrolyte",    carbs: 1,  sodium: 1000, caffeine: 0,   servingSize: "1 tablet in 16 fl oz" },
  // REAL FOOD
  { id: 70, brand: "Medjool Dates",      name: "2 Dates",                                   type: "Real Food",      carbs: 36, sodium: 2,    caffeine: 0,   servingSize: "2 dates (~48g)" },
  { id: 71, brand: "Banana",             name: "Medium Banana",                             type: "Real Food",      carbs: 27, sodium: 1,    caffeine: 0,   servingSize: "1 medium banana" },
  { id: 72, brand: "RX Bar",             name: "Mini Bar",                                  type: "Real Food",      carbs: 13, sodium: 75,   caffeine: 0,   servingSize: "1 mini bar" },
];

const TYPE_COLORS = {
  Gel: "#2b3249",
  Chews: "#ae887b",
  "Sports Drink": "#6b8cae",
  "High Carb Drink": "#2e86ab",
  Electrolyte: "#9e8a7a",
  "Real Food": "#7a9e7e",
};

const CATEGORIES = ["Gel", "Chews", "Sports Drink", "High Carb Drink", "Electrolyte", "Real Food"];

// ── Helpers ──────────────────────────────────────────────────────────────
function fmt(n) { return isNaN(n) ? 0 : Math.round(n); }
function timeLabel(min) {
  const h = Math.floor(min / 60), m = min % 60;
  return h > 0 ? `${h}:${String(m).padStart(2, "0")}` : `${min}m`;
}

// ── Shared UI Pieces ─────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: B.white, borderRadius: 14, border: `1px solid ${B.border}`,
      padding: "20px 22px", marginBottom: 16, ...style
    }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, style = {} }) {
  return (
    <div style={{
      fontFamily: FF, fontWeight: 800, fontSize: 13, color: B.navy,
      letterSpacing: "0.09em", textTransform: "uppercase", marginBottom: 14,
      display: "flex", alignItems: "center", gap: 8, ...style
    }}>
      {children}
    </div>
  );
}

function Badge({ type }) {
  const color = TYPE_COLORS[type] || B.textMuted;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
      background: color + "18", color, letterSpacing: "0.08em",
      textTransform: "uppercase", fontFamily: FF, border: `1px solid ${color}33`,
      whiteSpace: "nowrap", flexShrink: 0
    }}>{type}</span>
  );
}

function Input({ label, value, onChange, type = "text", placeholder, style = {} }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5, ...style }}>
      {label && <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textMuted, letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</label>}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        style={{
          fontFamily: FB, fontSize: 14, padding: "9px 12px", border: `1.5px solid ${B.border}`,
          borderRadius: 8, background: B.cream, color: B.textDark, outline: "none",
          transition: "border-color 0.2s"
        }}
      />
    </div>
  );
}

function NutritionPill({ label, perHr, perHrUnit, total, totalUnit, color }) {
  // perHr is the hero number; total shown smaller beneath
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      background: color + "12", borderRadius: 10, padding: "12px 16px",
      border: `1px solid ${color}30`, minWidth: 90
    }}>
      <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 22, color, lineHeight: 1.1 }}>{perHr}</div>
      <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: color + "cc", marginBottom: 5 }}>{perHrUnit}</div>
      {total != null && (
        <div style={{ fontFamily: FB, fontSize: 11, color: B.textMuted }}>{total} {totalUnit} total</div>
      )}
      <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{label}</div>
    </div>
  );
}

// ── Email Gate Popup ──────────────────────────────────────────────────────
function EmailGate({ onClose }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [raceNameG, setRaceNameG] = useState("");
  const [raceDateG, setRaceDateG] = useState("");
  const [raceGoalG, setRaceGoalG] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const inputSt = {
    fontFamily: FB, fontSize: 14, padding: "9px 12px", border: "1.5px solid " + B.border,
    borderRadius: 8, background: B.cream, color: B.textDark, outline: "none",
    width: "100%", boxSizing: "border-box"
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setSubmitted(true);

    // Send to Make webhook → Flodesk
    fetch("https://hook.us2.make.com/u855z3twdgpfuhvwk3ugptpxonye3h6x", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        race_name: raceNameG,
        race_date: raceDateG,
        race_goal: raceGoalG,
        source: "Fueling Planner"
      })
    }).catch(() => {}); // silent fail — never block the PDF download

    setTimeout(() => onClose({ name, email, raceName: raceNameG, raceDate: raceDateG, raceGoal: raceGoalG }), 1800);
  }

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(43,50,73,0.72)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20
    }}>
      <div style={{
        background: B.white, borderRadius: 20, padding: "36px 32px", maxWidth: 440, width: "100%",
        boxShadow: "0 24px 64px rgba(43,50,73,0.28)", position: "relative", margin: "auto"
      }}>
        {!submitted ? (
          <>
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 21, color: B.navy, marginBottom: 6 }}>
                Almost There! 🎉
              </div>
              <div style={{ fontFamily: FB, fontSize: 13, color: B.textBody, lineHeight: 1.6 }}>
                Tell us about your race so your PDF is personalised — then we'll send you helpful fueling tips too.
              </div>
            </div>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color: B.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
                  First Name <span style={{ color: B.warn }}>*</span>
                </label>
                <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your first name" style={inputSt} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color: B.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
                  Email Address <span style={{ color: B.warn }}>*</span>
                </label>
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" style={inputSt} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ flex: 1, height: 1, background: B.border }} />
                <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color: B.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>Race Details (optional)</span>
                <div style={{ flex: 1, height: 1, background: B.border }} />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color: B.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Race Name</label>
                <input value={raceNameG} onChange={e => setRaceNameG(e.target.value)} placeholder="e.g. Boston Marathon" style={inputSt} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                <div>
                  <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color: B.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Race Date</label>
                  <input type="date" value={raceDateG} onChange={e => setRaceDateG(e.target.value)} style={inputSt} />
                </div>
                <div>
                  <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color: B.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Goal / Finish Time</label>
                  <input value={raceGoalG} onChange={e => setRaceGoalG(e.target.value)} placeholder="e.g. Sub-4:00" style={inputSt} />
                </div>
              </div>
              <button type="submit" style={{
                padding: "13px 24px", background: B.navy, color: B.white, border: "none",
                borderRadius: 10, fontFamily: FF, fontWeight: 800, fontSize: 14,
                cursor: "pointer", letterSpacing: "0.04em", width: "100%"
              }}>Download My Plan →</button>
            </form>
            <div style={{ fontFamily: FB, fontSize: 11, color: B.textMuted, marginTop: 14, lineHeight: 1.5, textAlign: "center" }}>
              By submitting you agree to receive nutrition tips from Marathon Nutritionist. Unsubscribe anytime.
            </div>
            <button onClick={() => onClose(null)} style={{
              position: "absolute", top: 14, right: 16, background: "none", border: "none",
              fontSize: 22, color: B.textMuted, cursor: "pointer", lineHeight: 1
            }}>×</button>
          </>
        ) : (
          <div style={{ padding: "28px 0", textAlign: "center" }}>
            <div style={{ fontSize: 44, marginBottom: 12 }}>✅</div>
            <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 18, color: B.navy, marginBottom: 8 }}>You're all set!</div>
            <div style={{ fontFamily: FB, fontSize: 14, color: B.textBody }}>Opening your fueling plan now…</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────
export default function RunnerFuelPlanner() {
  // Runner info — stored only after email gate submission
  const [pdfInfo, setPdfInfo] = useState(null); // { name, email, raceName, raceDate, raceGoal }

  // Targets
  const [targetCarbs, setTargetCarbs] = useState(60);
  const [targetFluid, setTargetFluid] = useState(16); // always stored in oz internally
  const [fluidUnit, setFluidUnit] = useState("oz");   // "oz" | "mL" — display only
  const OZ_TO_ML = 29.5735;
  // helpers: convert for display / entry
  const fluidToDisplay = (oz) => fluidUnit === "mL" ? Math.round(oz * OZ_TO_ML) : oz;
  const fluidFromDisplay = (val) => fluidUnit === "mL" ? val / OZ_TO_ML : val;
  const fluidUnitLabel = fluidUnit === "mL" ? "mL" : "oz";
  const [targetSodium, setTargetSodium] = useState(500);

  // Fueling mode
  const [fuelMode, setFuelMode] = useState("time"); // "time" | "distance"
  const [distUnit, setDistUnit] = useState("mi");   // "mi" | "km"

  // Time-mode state
  const [durationHrs, setDurationHrs] = useState(4);
  const [durationMins, setDurationMins] = useState(0);
  const duration = durationHrs * 60 + durationMins; // total minutes
  const [interval, setInterval] = useState(30);     // minutes
  const [firstFuel, setFirstFuel] = useState(30);   // minutes

  // Distance-mode state
  const [distTotal, setDistTotal] = useState(26.2);       // miles or km
  const [distInterval, setDistInterval] = useState(3);    // miles or km
  const [distFirstFuel, setDistFirstFuel] = useState(3);  // miles or km

  // Unified checkpoints — always stored as "checkpoint keys" (strings)
  // Time mode: numeric minutes. Distance mode: numeric miles/km as strings like "3mi"
  const unitLabel = distUnit === "mi" ? "mi" : "km";

  // Products & Plan
  const [search, setSearch] = useState("");
  const [openCats, setOpenCats] = useState({});
  const [plan, setPlan] = useState({}); // { checkpointMin: [productId, ...] }
  const [waterServingOz, setWaterServingOz] = useState(8); // single serving size in oz
  const [waterCps, setWaterCps] = useState(new Set());      // set of cp keys where water is assigned

  function toggleWaterCp(cp) {
    setWaterCps(prev => {
      const next = new Set(prev);
      if (next.has(String(cp))) next.delete(String(cp));
      else next.add(String(cp));
      return next;
    });
  }

  // Email Gate
  const [showGate, setShowGate] = useState(false);
  const [showTargetTip, setShowTargetTip] = useState(false);

  const printRef = useRef();

  // Responsive breakpoint
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);
  React.useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // Checkpoints — keys differ by mode
  // Time mode: integer minutes (e.g. 30, 60, 90)
  // Distance mode: strings like "3mi" or "5km"
  const checkpoints = useMemo(() => {
    if (fuelMode === "time") {
      const pts = [];
      let t = firstFuel;
      while (t <= duration && interval > 0) { pts.push(t); t += interval; }
      return pts;
    } else {
      const pts = [];
      let d = distFirstFuel;
      while (d <= distTotal + 0.001 && distInterval > 0) {
        pts.push(parseFloat(d.toFixed(1)));
        d = parseFloat((d + distInterval).toFixed(1));
      }
      return pts;
    }
  }, [fuelMode, duration, interval, firstFuel, distTotal, distInterval, distFirstFuel]);

  // Human-readable label for a checkpoint key
  function cpLabel(cp) {
    if (fuelMode === "time") return timeLabel(cp);
    return `${cp} ${unitLabel}`;
  }

  // Per-checkpoint totals
  function cpTotals(min) {
    const ids = plan[String(min)] || [];
    let carbs = 0, sodium = 0, caffeine = 0, fluid = 0;
    ids.forEach(id => {
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) return;
      carbs += p.carbs;
      sodium += p.sodium;
      caffeine += p.caffeine;
      fluid += (p.fluidOz || 0);
    });
    if (waterCps.has(String(min))) fluid += waterServingOz;
    return { carbs, sodium, caffeine, fluid };
  }

  // Overall totals — inlined to avoid stale closure on cpTotals
  const totals = useMemo(() => {
    let carbs = 0, sodium = 0, caffeine = 0, fluid = 0, count = 0;
    checkpoints.forEach(cp => {
      const ids = plan[String(cp)] || [];
      ids.forEach(id => {
        const p = PRODUCTS.find(x => x.id === id);
        if (!p) return;
        carbs    += p.carbs;
        sodium   += p.sodium;
        caffeine += p.caffeine;
        fluid    += (p.fluidOz || 0);
      });
      // add plain water for this checkpoint
      if (waterCps.has(String(cp))) fluid += waterServingOz;
      count += ids.length;
    });
    const hours = fuelMode === "time" ? duration / 60 : null;
    return {
      carbs, sodium, caffeine, fluid, count,
      carbsPerHr:  hours > 0 ? carbs  / hours : null,
      sodiumPerHr: hours > 0 ? sodium / hours : null,
      fluidPerHr:  hours > 0 ? fluid  / hours : null,
      showPerHr: fuelMode === "time"
    };
  }, [plan, checkpoints, duration, fuelMode, waterServingOz, waterCps]);

  function toggleProduct(cpMin, productId) {
    const key = String(cpMin); // normalize key to string to avoid type mismatch
    setPlan(prev => {
      const ids = prev[key] || [];
      const newIds = ids.includes(productId)
        ? ids.filter(i => i !== productId)
        : [...ids, productId];
      return { ...prev, [key]: newIds };
    });
  }

  function toggleCat(cat) {
    setOpenCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  }

  function filteredInCat(cat) {
    return PRODUCTS.filter(p => p.type === cat && (!search || p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase())));
  }

  function handleDownload() {
    setShowGate(true);
  }

  function doPrint(info) {
    if (info) setPdfInfo(info);
    setShowGate(false);
    setTimeout(() => window.print(), 400);
  }

  // ── Print Summary ────────────────────────────────────────────────────
  function PrintSummary() {
    const hasAnyPlan = checkpoints.some(cp => (plan[String(cp)] || []).length > 0 || waterCps.has(String(cp)));
    const totalCarbs  = checkpoints.reduce((s, cp) => s + cpTotals(cp).carbs, 0);
    const totalSodium = checkpoints.reduce((s, cp) => s + cpTotals(cp).sodium, 0);
    const totalFluid  = checkpoints.reduce((s, cp) => s + cpTotals(cp).fluid, 0);
    const totalCaff   = checkpoints.reduce((s, cp) => s + cpTotals(cp).caffeine, 0);
    const hours = fuelMode === "time" ? duration / 60 : null;

    return (
      <div id="print-area" style={{ display: "none" }}>
        <style>{`
          @media print {
            body * { visibility: hidden !important; }
            #print-area { display: block !important; }
            #print-area, #print-area * { visibility: visible !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            #print-area {
              position: absolute; left: 0; top: 0; width: 100%;
              background: white; z-index: 9999;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            .no-print { display: none !important; }
            @page { margin: 0; }
          }
        `}</style>

        <div style={{ fontFamily: FF, color: B.navy, background: "white" }}>

          {/* ── NAVY HEADER BAR ── */}
          <div style={{
            background: B.navy, padding: "20px 32px",
            display: "flex", justifyContent: "space-between", alignItems: "center"
          }}>
            <div>
              <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 20, color: B.white, letterSpacing: "0.03em" }}>
                MARATHON NUTRITIONIST
              </div>
              <div style={{ fontFamily: FB, fontSize: 12, color: B.sand, marginTop: 2 }}>
                by Kristy Baumann, Registered Dietitian ·{" "}
                <a href="https://www.marathonnutritionist.com" target="_blank" rel="noopener noreferrer"
                  style={{ color: B.sand, textDecoration: "underline", textDecorationColor: B.sand + "66" }}>
                  marathonnutritionist.com
                </a>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 14, color: B.white }}>
                {pdfInfo?.raceName || "Race Day Fueling Plan"}
              </div>
              {pdfInfo?.name && <div style={{ fontFamily: FB, fontSize: 12, color: B.sand, marginTop: 2 }}>{pdfInfo.name}</div>}
              <div style={{ fontFamily: FB, fontSize: 11, color: B.blush, marginTop: 2 }}>
                {pdfInfo?.raceDate && `${pdfInfo.raceDate}`}{pdfInfo?.raceGoal && ` · Goal: ${pdfInfo.raceGoal}`}
              </div>
            </div>
          </div>

          {/* ── SAND ACCENT BAR ── */}
          <div style={{ height: 4, background: `linear-gradient(90deg, ${B.sand}, ${B.mauve})` }} />

          <div style={{ padding: "16px 32px" }}>

            {/* ── HOURLY TARGETS ── */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: B.textMuted, marginBottom: 10 }}>
                Hourly Targets
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  ["Carbs", `${targetCarbs}g`, "per hour", B.sand],
                  ["Sodium", `${targetSodium}mg`, "per hour", B.mauve],
                  ["Fluid", `${fluidToDisplay(targetFluid)}${fluidUnitLabel}`, "per hour", "#4a9ebb"],
                ].map(([label, val, sub, color]) => (
                  <div key={label} style={{
                    flex: 1, background: color + "12", borderRadius: 8,
                    padding: "10px 14px", border: `1px solid ${color}30`,
                    display: "flex", flexDirection: "column", alignItems: "center"
                  }}>
                    <div style={{ fontWeight: 900, fontSize: 22, color, lineHeight: 1.1 }}>{val}</div>
                    <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>{sub}</div>
                    <div style={{ fontFamily: FB, fontSize: 11, color: B.textMuted, marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── CHECKPOINT PLAN ── */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: B.textMuted, marginBottom: 10 }}>
                Fueling Plan
              </div>
              {!hasAnyPlan ? (
                <div style={{ fontFamily: FB, fontSize: 12, color: B.textMuted, fontStyle: "italic" }}>No products assigned to checkpoints.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {checkpoints.map(cp => {
                    const ids = plan[String(cp)] || [];
                    const hasWater = waterCps.has(String(cp)) && waterServingOz > 0;
                    if (ids.length === 0 && !hasWater) return null;
                    const t = cpTotals(cp);
                    return (
                      <div key={cp} style={{
                        display: "flex", gap: 0,
                        border: `1px solid ${B.border}`, borderRadius: 8, overflow: "hidden"
                      }}>
                        {/* Time label */}
                        <div style={{
                          background: B.navy, padding: "10px 14px", minWidth: 64,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                        }}>
                          <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 13, color: B.white, textAlign: "center" }}>
                            {cpLabel(cp)}
                          </div>
                        </div>
                        {/* Products */}
                        <div style={{ flex: 1, padding: "7px 12px" }}>
                          {ids.map(id => {
                            const p = PRODUCTS.find(x => x.id === id);
                            if (!p) return null;
                            return (
                              <div key={id} style={{ fontFamily: FB, fontSize: 11, color: B.textBody, marginBottom: 2, display: "flex", alignItems: "baseline", gap: 6 }}>
                                <span style={{ color: B.navy, fontWeight: 700 }}>·</span>
                                <span><strong style={{ fontFamily: FF }}>{p.brand}</strong> {p.name}</span>
                                <span style={{ color: B.textMuted, fontSize: 10 }}>
                                  {p.carbs}g carbs · {p.sodium}mg sodium
                                  {p.caffeine > 0 ? ` · ${p.caffeine}mg caffeine` : ""}
                                  {p.servingSize ? ` (${p.servingSize})` : ""}
                                </span>
                              </div>
                            );
                          })}
                          {hasWater && (
                            <div style={{ fontFamily: FB, fontSize: 11, color: "#4a9ebb", marginBottom: 2, display: "flex", alignItems: "baseline", gap: 6 }}>
                              <span style={{ fontWeight: 700 }}>·</span>
                              <span>💧 Plain Water — {fluidToDisplay(waterServingOz)}{fluidUnitLabel}</span>
                            </div>
                          )}
                          {/* Stop total */}
                          <div style={{
                            marginTop: 6, paddingTop: 5, borderTop: `1px dashed ${B.border}`,
                            fontFamily: FF, fontWeight: 700, fontSize: 10,
                            color: B.textMuted, display: "flex", gap: 12
                          }}>
                            <span style={{ color: B.sand }}>Carbs: {t.carbs}g</span>
                            <span style={{ color: B.mauve }}>Sodium: {t.sodium}mg</span>
                            {t.fluid > 0 && <span style={{ color: "#4a9ebb" }}>Fluid: {fluidToDisplay(t.fluid)}{fluidUnitLabel}</span>}
                            {t.caffeine > 0 && <span style={{ color: B.navyLight }}>Caffeine: {t.caffeine}mg</span>}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── OVERALL TOTALS ── */}
            <div style={{ marginBottom: 22 }}>
              <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: B.textMuted, marginBottom: 10 }}>
                Race Totals
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                {[
                  ["Carbs", hours ? `~${Math.round(totalCarbs / hours)}g/hr` : `${totalCarbs}g`, `${totalCarbs}g total`, B.sand],
                  ["Sodium", hours ? `~${Math.round(totalSodium / hours)}mg/hr` : `${totalSodium}mg`, `${totalSodium}mg total`, B.mauve],
                  ["Fluid", hours ? `~${fluidToDisplay(Math.round(totalFluid / hours))}${fluidUnitLabel}/hr` : `${fluidToDisplay(totalFluid)}${fluidUnitLabel}`, `${fluidToDisplay(totalFluid)}${fluidUnitLabel} total`, "#4a9ebb"],
                  ...(totalCaff > 0 ? [["Caffeine", `${totalCaff}mg`, "total", B.navyLight]] : []),
                ].map(([label, hero, sub, color]) => (
                  <div key={label} style={{
                    flex: 1, background: color + "10", borderRadius: 8,
                    padding: "10px 14px", border: `1px solid ${color}25`,
                    display: "flex", flexDirection: "column", alignItems: "center"
                  }}>
                    <div style={{ fontWeight: 900, fontSize: 22, color, lineHeight: 1.1 }}>{hero}</div>
                    <div style={{ fontFamily: FB, fontSize: 10, color: B.textMuted, marginTop: 4 }}>{sub}</div>
                    <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 10, color, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DISCLAIMER ── */}
            <div style={{
              padding: "10px 14px", background: B.cream, borderRadius: 8,
              fontFamily: FB, fontSize: 10, color: B.textMuted, lineHeight: 1.7,
              marginBottom: 16
            }}>
              <strong style={{ fontFamily: FF, color: B.navy }}>Disclaimer: </strong>
              This plan is for informational and educational purposes only and does not constitute medical or clinical nutrition advice. Nutrition info verified from brand websites — always check your product label as formulations may change. Individual needs vary; consult a qualified healthcare provider for personalized guidance.
            </div>

            {/* ── FOOTER ── */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              paddingTop: 10, borderTop: `1px solid ${B.border}`
            }}>
              <div style={{ fontFamily: FB, fontSize: 10, color: B.textMuted }}>
                © {new Date().getFullYear()} Marathon Nutritionist by Kristy Baumann, Registered Dietitian · All rights reserved
              </div>
              <div style={{ fontFamily: FB, fontSize: 10, color: B.textMuted, fontStyle: "italic" }}>
                For personal use only · Not for redistribution
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  const inputStyle = {
    fontFamily: FB, fontSize: 14, padding: "9px 12px", border: `1.5px solid ${B.border}`,
    borderRadius: 8, background: B.cream, color: B.textDark, outline: "none", width: "100%", boxSizing: "border-box"
  };

  return (
    <div style={{ minHeight: "100vh", background: B.cream, fontFamily: FB }}>
      {showGate && <EmailGate onClose={doPrint} />}
      <PrintSummary />

      {/* HEADER */}
      <div style={{ background: B.navy, padding: "0 0 0 0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 16px rgba(43,50,73,0.18)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 16, color: B.white, letterSpacing: "0.04em" }}>
              🏃 Race Fueling Planner
            </div>
            <div style={{ fontFamily: FB, fontSize: 12, color: B.sand }}>by Marathon Nutritionist · Kristy Baumann, Registered Dietitian</div>
          </div>
          <button onClick={handleDownload} style={{
            padding: "9px 18px", background: B.sand, color: B.navy, border: "none",
            borderRadius: 8, fontFamily: FF, fontWeight: 800, fontSize: 12, cursor: "pointer",
            letterSpacing: "0.04em"
          }}>
            🖨️ Download PDF
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: "0 auto", padding: isMobile ? "16px 10px 180px" : "24px 16px 140px" }}>

        {/* INTRO BANNER */}
        <div style={{
          background: `linear-gradient(135deg, ${B.navy} 0%, ${B.navyLight} 100%)`,
          borderRadius: 16, padding: "28px 28px 24px", marginBottom: 20, position: "relative", overflow: "hidden"
        }}>
          {/* Decorative arc */}
          <div style={{
            position: "absolute", right: -40, top: -40, width: 180, height: 180,
            borderRadius: "50%", background: "rgba(215,181,139,0.12)", pointerEvents: "none"
          }} />
          <div style={{
            position: "absolute", right: 20, bottom: -60, width: 130, height: 130,
            borderRadius: "50%", background: "rgba(215,181,139,0.07)", pointerEvents: "none"
          }} />

          <div style={{ fontFamily: FF, fontWeight: 900, fontSize: 18, color: B.white, marginBottom: 6 }}>
            Welcome to Your Race-Day Fueling Planner 👋
          </div>
          <div style={{ fontFamily: FB, fontSize: 13, color: B.blush, lineHeight: 1.7, marginBottom: 22, maxWidth: 580 }}>
            Building a solid fueling plan is one of the best things you can do for your race. You've got this — let's map it out together.
          </div>

          {/* 3-step overview */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
            {[
              { n: "1", title: "Set Your Targets", body: "Your hourly carb, fluid, and sodium goals are pre-filled with solid starting points — adjust them to match your training and sweat rate." },
              { n: "2", title: "Browse & Plan", body: "Pick your favourite race-day products and tap each checkpoint to assign them. Your plan builds in real time." },
              { n: "3", title: "Download Your PDF", body: "When you're happy, hit Download to get a print-ready copy. We'll ask for your name and email so you can refer back to your plan." },
            ].map(({ n, title, body }) => (
              <div key={n} style={{
                background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 16px",
                border: "1px solid rgba(255,255,255,0.12)"
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%", background: B.sand,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: FF, fontWeight: 900, fontSize: 12, color: B.navy, flexShrink: 0
                  }}>{n}</div>
                  <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 12, color: B.white }}>{title}</div>
                </div>
                <div style={{ fontFamily: FB, fontSize: 11, color: B.blush, lineHeight: 1.6 }}>{body}</div>
              </div>
            ))}
          </div>


        </div>

        {/* TARGETS */}
        <Card>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <SectionTitle style={{ marginBottom: 0 }}>🎯 Hourly Targets</SectionTitle>
            <button
              onClick={() => setShowTargetTip(t => !t)}
              style={{
                background: "none", border: "none", cursor: "pointer", padding: 0,
                display: "flex", alignItems: "center", gap: 5,
                fontFamily: FB, fontSize: 12, color: B.mauve, fontWeight: 700,
                flexShrink: 0
              }}
            >
              🤔 Need help choosing your targets?
              <span style={{
                fontSize: 10, display: "inline-block", transition: "transform 0.2s",
                transform: showTargetTip ? "rotate(180deg)" : "rotate(0deg)"
              }}>▾</span>
            </button>
          </div>
          {showTargetTip && (
            <div style={{
              marginBottom: 14, background: B.cream, border: `1px solid ${B.border}`,
              borderRadius: 10, padding: "12px 16px", fontFamily: FB, fontSize: 12,
              color: B.textBody, lineHeight: 1.75, borderLeft: `3px solid ${B.mauve}`
            }}>
              That's totally okay! The pre-filled values are a solid starting point based on evidence-based guidelines for endurance athletes. If you've worked with a sports dietitian or know your sweat rate, feel free to adjust them. Not sure where to begin? Kristy's resources can help you dial in your personal targets before race day.
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr", gap: isMobile ? 10 : 16 }}>

            {/* Carbs */}
            <div>
              <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Carbs (g/hr)</label>
              <input type="number" value={targetCarbs} onChange={e => setTargetCarbs(Number(e.target.value))} style={inputStyle} />
              <div style={{ marginTop: 7, fontFamily: FB, fontSize: 12, color: B.textBody, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 700, color: B.sand }}>Range: 30–90g/hr</span><br />
                Based on race length and intensity. Higher for longer, faster efforts.
              </div>
            </div>

            {/* Fluid */}
            <div>
              <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>
                Fluid / hr
              </label>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <input
                  type="number"
                  value={fluidToDisplay(targetFluid)}
                  onChange={e => setTargetFluid(fluidFromDisplay(Number(e.target.value)))}
                  style={{ ...inputStyle, flex: 1 }}
                />
                <div style={{ display: "flex", background: B.cream, borderRadius: 8, border: `1px solid ${B.border}`, overflow: "hidden", flexShrink: 0 }}>
                  {["oz", "mL"].map(u => (
                    <button key={u} onClick={() => setFluidUnit(u)} style={{
                      padding: "8px 10px", border: "none", cursor: "pointer",
                      fontFamily: FF, fontWeight: 800, fontSize: 11,
                      background: fluidUnit === u ? B.navy : "transparent",
                      color: fluidUnit === u ? B.white : B.textMuted,
                      transition: "all 0.15s"
                    }}>{u}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 7, fontFamily: FB, fontSize: 12, color: B.textBody, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 700, color: "#4a9ebb" }}>Range: 8–24oz (240–720mL)/hr</span><br />
                Highly individual — adjust for your body size, sweat rate, heat, humidity, and elevation.
              </div>
            </div>

            {/* Sodium */}
            <div>
              <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Sodium (mg/hr)</label>
              <input type="number" value={targetSodium} onChange={e => setTargetSodium(Number(e.target.value))} style={inputStyle} />
              <div style={{ marginTop: 7, fontFamily: FB, fontSize: 12, color: B.textBody, lineHeight: 1.6 }}>
                <span style={{ fontWeight: 700, color: B.mauve }}>Range: 300–1000+mg/hr</span><br />
                Highly individual — your needs depend on your sweat rate, sweat saltiness, and race conditions.
              </div>
            </div>

          </div>

          {/* Gut training note */}
          <div style={{
            marginTop: 16, padding: "12px 16px",
            background: B.navy + "08",
            borderRadius: 10, border: "1.5px solid " + B.navy + "20",
            display: "flex", gap: 10, alignItems: "flex-start"
          }}>
            <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>💡</span>
            <div>
              <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 11, color: B.navy, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 4 }}>Coach's Tip</div>
              <div style={{ fontFamily: FB, fontSize: 12, color: B.textBody, lineHeight: 1.55 }}>
                Just like you train your legs for race day, your stomach needs time to adapt too. Build up your carb and fluid intake gradually over your training cycle — jumping straight to race-day amounts is a common cause of GI distress.
              </div>
            </div>
          </div>
        </Card>

        {/* TIMING */}
        <Card>
          <SectionTitle>⏱ Fueling Schedule</SectionTitle>

          {/* Mode toggle */}
          <div style={{ display: "flex", background: B.cream, borderRadius: 10, padding: 4, marginBottom: 20, width: "fit-content", border: `1px solid ${B.border}` }}>
            {[["time", "⏱ By Time"], ["distance", "📍 By Distance"]].map(([mode, label]) => (
              <button key={mode} onClick={() => setFuelMode(mode)} style={{
                padding: "7px 18px", borderRadius: 7, border: "none", cursor: "pointer",
                fontFamily: FF, fontWeight: 800, fontSize: 12, letterSpacing: "0.03em",
                background: fuelMode === mode ? B.navy : "transparent",
                color: fuelMode === mode ? B.white : B.textMuted,
                transition: "all 0.18s"
              }}>{label}</button>
            ))}
          </div>

          {fuelMode === "time" ? (
            <>
              {/* Time mode: hrs + mins duration */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Estimated Race Duration
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="number" min="0" max="24" value={durationHrs}
                      onChange={e => setDurationHrs(Math.max(0, Number(e.target.value)))}
                      style={{ ...inputStyle, width: 72, textAlign: "center" }} />
                    <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: B.textBody }}>hr</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input type="number" min="0" max="59" value={durationMins}
                      onChange={e => setDurationMins(Math.min(59, Math.max(0, Number(e.target.value))))}
                      style={{ ...inputStyle, width: 72, textAlign: "center" }} />
                    <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: B.textBody }}>min</span>
                  </div>
                  {!isMobile && <div style={{ fontFamily: FB, fontSize: 12, color: B.textBody, marginLeft: 4 }}>
                    = <span style={{ fontFamily: FF, fontWeight: 800, color: B.navy }}>{duration} min total</span>
                  </div>}
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Fuel Every (min)</label>
                  <input type="number" value={interval} onChange={e => setInterval(Number(e.target.value))} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>First Fuel At (min)</label>
                  <input type="number" value={firstFuel} onChange={e => setFirstFuel(Number(e.target.value))} style={inputStyle} />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Distance mode */}
              {/* Unit toggle + total distance */}
              <div style={{ marginBottom: 14 }}>
                <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  Total Race Distance
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="number" min="0" step="0.1" value={distTotal}
                    onChange={e => setDistTotal(parseFloat(e.target.value) || 0)}
                    style={{ ...inputStyle, width: 90, textAlign: "center" }} />
                  {/* mi / km toggle */}
                  <div style={{ display: "flex", background: B.cream, borderRadius: 8, border: `1px solid ${B.border}`, overflow: "hidden" }}>
                    {["mi", "km"].map(u => (
                      <button key={u} onClick={() => setDistUnit(u)} style={{
                        padding: "8px 14px", border: "none", cursor: "pointer",
                        fontFamily: FF, fontWeight: 800, fontSize: 11,
                        background: distUnit === u ? B.navy : "transparent",
                        color: distUnit === u ? B.white : B.textMuted,
                        transition: "all 0.15s"
                      }}>{u}</button>
                    ))}
                  </div>
                  {/* Common presets */}
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {(distUnit === "mi"
                      ? [["5K", 3.1], ["10K", 6.2], ["HM", 13.1], ["Marathon", 26.2]]
                      : [["5K", 5], ["10K", 10], ["HM", 21.1], ["Marathon", 42.2]]
                    ).map(([name, val]) => (
                      <button key={name} onClick={() => setDistTotal(val)} style={{
                        padding: "5px 10px", borderRadius: 6, border: `1.5px solid ${distTotal === val ? B.navy : B.border}`,
                        background: distTotal === val ? B.navy + "12" : "transparent",
                        color: distTotal === val ? B.navy : B.textMuted,
                        fontFamily: FF, fontWeight: 700, fontSize: 10, cursor: "pointer",
                        letterSpacing: "0.04em"
                      }}>{name}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>Fuel Every ({unitLabel})</label>
                  <input type="number" min="0.5" step="0.5" value={distInterval}
                    onChange={e => setDistInterval(parseFloat(e.target.value) || 1)} style={inputStyle} />
                </div>
                <div>
                  <label style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 5 }}>First Fuel At ({unitLabel})</label>
                  <input type="number" min="0.5" step="0.5" value={distFirstFuel}
                    onChange={e => setDistFirstFuel(parseFloat(e.target.value) || 1)} style={inputStyle} />
                </div>
              </div>

              {/* Soft nudge — after inputs */}
              <div style={{ background: B.sandLight + "55", border: `1px solid ${B.sand}55`, borderRadius: 10, padding: "10px 14px", marginTop: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
                <div style={{ fontFamily: FB, fontSize: 12, color: B.textBody, lineHeight: 1.6 }}>
                  <strong style={{ fontFamily: FF, color: B.navy }}>Time-based planning is more reliable on race day.</strong> Pace can vary due to hills, weather, and fatigue — fueling by time keeps you on schedule regardless. But if miles work better for how you train, go for it!
                </div>
              </div>
            </>
          )}

          {/* Checkpoint preview pills */}
          {checkpoints.length > 0 && (
            <div style={{ marginTop: 14, display: "flex", gap: 8, flexWrap: "wrap" }}>
              {checkpoints.map(cp => (
                <span key={cp} style={{ padding: "4px 10px", background: B.navy + "12", borderRadius: 99, fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.navy, border: `1px solid ${B.navy}22` }}>
                  {cpLabel(cp)}
                </span>
              ))}
            </div>
          )}
        </Card>

        {/* PRODUCT BROWSER */}
        <Card>
          <SectionTitle>🛒 Product Browser</SectionTitle>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products or brands…"
            style={{ ...inputStyle, marginBottom: 10, background: B.cream }}
          />
          <div style={{
            display: "flex", alignItems: "center", gap: 7, marginBottom: 14,
            padding: "8px 12px", background: B.navy + "08", borderRadius: 8,
            border: `1px solid ${B.navy}18`
          }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>👆</span>
            <span style={{ fontFamily: FB, fontSize: 12, color: B.textBody, lineHeight: 1.5 }}>
              Search for a product or open a category below, then tap a <strong style={{ fontFamily: FF, color: B.navy }}>time</strong> (e.g. +30 min, 1:00) next to any product to add it to your plan. Tap again to remove.
            </span>
          </div>
          {/* WATER — own section at top */}
          {(() => {
            const isOpen = openCats["Water"];
            const waterSearchMatch = !search || "water".includes(search.toLowerCase()) || "plain water".includes(search.toLowerCase());
            if (!waterSearchMatch) return null;
            return (
              <div style={{ marginBottom: 8, border: `1px solid ${B.border}`, borderRadius: 10, overflow: "hidden" }}>
                <button
                  onClick={() => toggleCat("Water")}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 16px", background: isOpen ? B.navy + "08" : B.white,
                    border: "none", cursor: "pointer", textAlign: "left"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99,
                      background: "#4a9ebb18", color: "#4a9ebb", letterSpacing: "0.08em",
                      textTransform: "uppercase", fontFamily: FF, border: "1px solid #4a9ebb33"
                    }}>Water</span>
                    <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: B.textDark }}>Plain Water</span>
                  </div>
                  <span style={{ color: B.textMuted, fontSize: 16, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid ${B.border}`, padding: "12px 16px" }}>
                    {/* Serving size input */}
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                        Amount per stop
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input
                          type="number" min="0"
                          step={fluidUnit === "mL" ? 30 : 2}
                          value={fluidToDisplay(waterServingOz) || ""}
                          placeholder="e.g. 8"
                          onChange={e => {
                            const raw = parseFloat(e.target.value) || 0;
                            setWaterServingOz(fluidUnit === "mL" ? raw / OZ_TO_ML : raw);
                          }}
                          style={{ ...inputStyle, width: 80, textAlign: "center" }}
                        />
                        <span style={{ fontFamily: FB, fontWeight: 700, fontSize: 13, color: "#4a9ebb" }}>{fluidUnitLabel}</span>
                        <span style={{ fontFamily: FB, fontSize: 12, color: B.textMuted }}>at each selected stop</span>
                      </div>
                    </div>

                    {/* Checkpoint toggle buttons — same pattern as products */}
                    <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 11, color: B.textBody, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                      Add at
                    </div>
                    {checkpoints.length === 0 ? (
                      <div style={{ fontFamily: FB, fontSize: 12, color: B.textMuted }}>Set your fueling schedule above to see your stops here.</div>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {checkpoints.map(cp => {
                          const active = waterCps.has(String(cp));
                          return (
                            <button
                              key={cp}
                              onClick={() => toggleWaterCp(cp)}
                              style={{
                                padding: "4px 9px", borderRadius: 6, fontSize: 10, fontFamily: FF, fontWeight: 700,
                                border: `1.5px solid ${active ? "#4a9ebb" : B.border}`,
                                background: active ? "#4a9ebb" : B.white,
                                color: active ? B.white : B.textMuted,
                                cursor: "pointer", transition: "all 0.15s",
                                display: "flex", alignItems: "center", gap: 3
                              }}
                            >
                              {active ? "✓" : "+"} {cpLabel(cp)}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {CATEGORIES.map(cat => {
            const items = filteredInCat(cat);
            if (items.length === 0) return null;
            const isOpen = openCats[cat];
            return (
              <div key={cat} style={{ marginBottom: 8, border: `1px solid ${B.border}`, borderRadius: 10, overflow: "hidden" }}>
                <button
                  onClick={() => toggleCat(cat)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 16px", background: isOpen ? B.navy + "08" : B.white,
                    border: "none", cursor: "pointer", textAlign: "left"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Badge type={cat} />
                    <span style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: B.textDark }}>{items.length} products</span>
                  </div>
                  <span style={{ color: B.textMuted, fontSize: 16, transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>▾</span>
                </button>

                {isOpen && (
                  <div style={{ borderTop: `1px solid ${B.border}`, padding: "8px 16px 12px" }}>
                    {items.map(p => {
                      const selectedCps = checkpoints.filter(min => (plan[String(min)] || []).includes(p.id));
                      return (
                        <div key={p.id} style={{
                          padding: "12px 0", borderBottom: `1px solid ${B.border}`
                        }}>
                          {/* Product info row */}
                          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: checkpoints.length > 0 ? 8 : 0 }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontFamily: FF, fontWeight: 700, fontSize: 12, color: B.navy }}>{p.brand} — {p.name}</div>
                              <div style={{ fontFamily: FB, fontSize: 11, color: B.textMuted, marginTop: 2 }}>
                                <span style={{ color: B.sand, fontWeight: 700 }}>{p.carbs}g carbs</span>
                                {" · "}
                                <span style={{ color: B.mauve, fontWeight: 700 }}>{p.sodium}mg sodium</span>
                                {p.caffeine > 0 && <span style={{ color: B.navyLight }}> · ☕ {p.caffeine}mg caffeine</span>}
                              </div>
                              {/* Serving size — always shown, emphasised for drinks */}
                              {p.servingSize && (
                                <div style={{ marginTop: 3, fontFamily: FB, fontSize: 11, color: p.fluidOz ? "#4a9ebb" : B.textMuted }}>
                                  {p.fluidOz
                                    ? <>💧 <strong>Serving:</strong> {p.servingSize} · {fluidToDisplay(p.fluidOz)}{fluidUnitLabel} fluid</>
                                    : <>Serving: {p.servingSize}</>
                                  }
                                </div>
                              )}
                            </div>
                          </div>
                          {/* Checkpoint buttons — full width below, clearly labelled */}
                          {checkpoints.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, alignItems: "center" }}>
                              <span style={{ fontFamily: FB, fontSize: 10, color: B.textMuted, marginRight: 2, whiteSpace: "nowrap" }}>Add at:</span>
                              {checkpoints.map(cp => {
                                const active = (plan[String(cp)] || []).includes(p.id);
                                return (
                                  <button
                                    key={cp}
                                    onClick={() => toggleProduct(cp, p.id)}
                                    style={{
                                      padding: "4px 9px", borderRadius: 6, fontSize: 10, fontFamily: FF, fontWeight: 700,
                                      border: `1.5px solid ${active ? B.navy : B.border}`,
                                      background: active ? B.navy : B.white,
                                      color: active ? B.white : B.textMuted,
                                      cursor: "pointer", transition: "all 0.15s",
                                      display: "flex", alignItems: "center", gap: 3
                                    }}
                                  >
                                    {active ? "✓" : "+"} {cpLabel(cp)}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </Card>

        {/* CHECKPOINT PLANNER */}
        <Card>
          <SectionTitle>📋 Checkpoint Plan</SectionTitle>
          {checkpoints.length === 0 ? (
            <div style={{ color: B.textMuted, fontFamily: FB, fontSize: 13 }}>Set your race duration and fueling interval above to generate checkpoints.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {checkpoints.map(cp => {
                const ids = plan[String(cp)] || [];
                const t = cpTotals(cp);
                const carbOk = t.carbs > 0;
                return (
                  <div key={cp} style={{
                    border: `1.5px solid ${carbOk ? B.navy + "30" : B.border}`,
                    borderRadius: 12, padding: "14px 16px",
                    background: carbOk ? B.navy + "05" : B.white
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ids.length > 0 ? 10 : 0 }}>
                      <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 13, color: B.navy }}>{fuelMode === "time" ? "⏱" : "📍"} {cpLabel(cp)}</div>
                      {carbOk ? (
                        <div style={{ fontFamily: FB, fontSize: 11, color: B.textMuted }}>
                          <span style={{ color: B.sand, fontWeight: 700 }}>{t.carbs}g</span>
                          {" · "}
                          <span style={{ color: B.mauve, fontWeight: 700 }}>{t.sodium}mg sodium</span>
                          {t.fluid > 0 && <span style={{ color: "#4a9ebb" }}> · 💧{fluidToDisplay(t.fluid)}{fluidUnitLabel} fluid</span>}
                          {waterCps.has(String(cp)) && waterServingOz > 0 && <span style={{ color: "#4a9ebb" }}> · 💧{fluidToDisplay(waterServingOz)}{fluidUnitLabel} water</span>}
                          {t.caffeine > 0 && <span style={{ color: B.navyLight }}> · ☕ {t.caffeine}mg caffeine</span>}
                        </div>
                      ) : (
                        <div style={{ fontFamily: FB, fontSize: 11, color: B.textMuted + "88" }}>Nothing selected</div>
                      )}
                    </div>
                    {ids.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {ids.map(id => {
                          const p = PRODUCTS.find(x => x.id === id);
                          if (!p) return null;
                          return (
                            <div key={id} style={{
                              display: "flex", alignItems: "center", gap: 6, padding: "4px 10px",
                              background: B.navy, borderRadius: 20, cursor: "pointer"
                            }} onClick={() => toggleProduct(cp, id)}>
                              <span style={{ fontFamily: FB, fontSize: 11, color: B.white }}>{p.brand} {p.name}</span>
                              <span style={{ color: B.sand, fontSize: 13, lineHeight: 1 }}>×</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        {/* OVERALL SUMMARY */}
        <Card>
          <SectionTitle>📊 Overall Summary</SectionTitle>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 16 }}>
            <NutritionPill
              label="Carbs"
              perHr={totals.showPerHr ? fmt(totals.carbsPerHr) : fmt(totals.carbs)}
              perHrUnit={totals.showPerHr ? "g / hr" : "g total"}
              total={totals.showPerHr ? fmt(totals.carbs) : null}
              totalUnit="g"
              color={B.sand}
            />
            <NutritionPill
              label="Sodium"
              perHr={totals.showPerHr ? fmt(totals.sodiumPerHr) : fmt(totals.sodium)}
              perHrUnit={totals.showPerHr ? "mg / hr" : "mg total"}
              total={totals.showPerHr ? fmt(totals.sodium) : null}
              totalUnit="mg"
              color={B.mauve}
            />
            <NutritionPill
              label="Fluid"
              perHr={totals.showPerHr ? fluidToDisplay(totals.fluidPerHr) : fluidToDisplay(totals.fluid)}
              perHrUnit={totals.showPerHr ? `${fluidUnitLabel} / hr` : `${fluidUnitLabel} total`}
              total={totals.showPerHr ? fluidToDisplay(totals.fluid) : null}
              totalUnit={fluidUnitLabel}
              color="#4a9ebb"
            />
            {totals.caffeine > 0 && (
              <NutritionPill
                label="Caffeine"
                perHr={totals.caffeine}
                perHrUnit="mg total"
                total={null}
                color={B.navyLight}
              />
            )}
          </div>
          {totals.carbsPerHr > 0 && totals.carbsPerHr < targetCarbs * 0.8 && (
            <div style={{ background: B.warnBg, border: `1px solid #e8c5c0`, borderRadius: 10, padding: "10px 14px", fontFamily: FB, fontSize: 12, color: B.warn, marginBottom: 12 }}>
              ⚠️ Current plan averages {fmt(totals.carbsPerHr)}g carbs/hr — below your {targetCarbs}g/hr target. Consider adding more fuel.
            </div>
          )}
        </Card>

        {/* DISCLAIMER */}
        <div style={{ background: B.navy + "08", border: `1px solid ${B.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 16 }}>
          <div style={{ fontFamily: FB, fontSize: 11, color: B.textMuted, lineHeight: 1.7 }}>
            <span style={{ fontWeight: 700, color: B.navy, fontFamily: FF }}>⚕️ Disclaimer: </span>
            This planner is for informational and educational purposes only and does not constitute medical or clinical nutrition advice. Nutrition info verified from brand websites — always check your product label as formulations may change. Individual needs vary; consult a qualified healthcare provider for personalized guidance.
          </div>
        </div>

        {/* PRACTICE IN TRAINING TIP */}
        <div style={{
          background: B.navy, borderRadius: 14, padding: "20px 24px", marginBottom: 16,
          display: "flex", gap: 14, alignItems: "flex-start"
        }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>🏃</span>
          <div>
            <div style={{ fontFamily: FF, fontWeight: 800, fontSize: 14, color: B.white, marginBottom: 6 }}>
              Always practice in training first
            </div>
            <div style={{ fontFamily: FB, fontSize: 13, color: B.blush, lineHeight: 1.75 }}>
              Race day is not the time to try something new. Test your fueling plan on your long runs so your gut is trained, your stomach is happy, and you show up to the start line confident in your strategy.
            </div>
          </div>
        </div>

        {/* DOWNLOAD BUTTON */}
        <div style={{ textAlign: "center", paddingBottom: 20 }}>
          <button onClick={handleDownload} style={{
            padding: "15px 40px", background: B.navy, color: B.white, border: "none",
            borderRadius: 12, fontFamily: FF, fontWeight: 800, fontSize: 15, cursor: "pointer",
            boxShadow: "0 4px 20px rgba(43,50,73,0.25)", letterSpacing: "0.04em"
          }}>
            🖨️ Download / Print My Plan
          </button>
          <div style={{ fontFamily: FB, fontSize: 11, color: B.textMuted, marginTop: 8 }}>
            Opens print dialog → Save as PDF to keep a copy or share
          </div>
          <div style={{ marginTop: 14 }}>
            <a href="https://www.marathonnutritionist.com" target="_blank" rel="noopener noreferrer"
              style={{
                fontFamily: FB, fontSize: 13, color: B.mauve, fontWeight: 700,
                textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 5
              }}>
              Learn more at marathonnutritionist.com →
            </a>
          </div>
        </div>

      </div>

      {/* LIVE SUMMARY BAR */}
      {(() => {
        const hasAny = totals.carbs > 0 || totals.sodium > 0 || totals.fluid > 0;
        const carbPct  = targetCarbs  > 0 && totals.showPerHr ? totals.carbsPerHr  / targetCarbs  : null;
        const sodPct   = targetSodium > 0 && totals.showPerHr ? totals.sodiumPerHr / targetSodium  : null;
        const fluidPct = targetFluid > 0 && totals.showPerHr && totals.fluidPerHr != null ? totals.fluidPerHr / targetFluid : null;

        function statusColor(pct) {
          if (pct === null) return B.textMuted;
          if (pct >= 0.85 && pct <= 1.2) return "#4caf78";  // green — on track
          if (pct >= 0.65 || pct <= 1.4) return "#e6a817";  // yellow — close
          return B.warn;                                      // red — off
        }
        function statusDot(pct) {
          const c = statusColor(pct);
          return <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: c, marginRight: 5, flexShrink: 0 }} />;
        }

        return (
          <div style={{
            position: "fixed",
            bottom: isMobile ? 0 : 28,
            left: 0, right: 0, zIndex: 60,
            display: "flex", justifyContent: "center", pointerEvents: "none"
          }}>
            <div style={{
              background: B.navy, borderRadius: isMobile ? 0 : 16,
              padding: isMobile ? "8px 16px" : "12px 22px",
              boxShadow: "0 8px 32px rgba(43,50,73,0.35), 0 2px 8px rgba(0,0,0,0.2)",
              display: "flex", alignItems: "center", gap: isMobile ? 4 : 6,
              flexWrap: "wrap",
              border: `1.5px solid ${B.navyLight}`, pointerEvents: "auto",
              maxWidth: isMobile ? "100%" : 760,
              width: isMobile ? "100%" : "auto"
            }}>
              <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 10, color: B.sand, letterSpacing: "0.1em", textTransform: "uppercase", marginRight: 6, whiteSpace: "nowrap" }}>
                Live Plan
              </span>

              {/* Carbs */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", background: "rgba(255,255,255,0.07)", borderRadius: 20 }}>
                {statusDot(carbPct)}
                <span style={{ fontFamily: FF, fontWeight: 900, fontSize: 15, color: statusColor(carbPct) }}>
                  {totals.showPerHr ? `${fmt(totals.carbsPerHr)}g/hr` : `${fmt(totals.carbs)}g`}
                </span>
                <span style={{ fontFamily: FB, fontSize: 11, color: B.white }}>carbs</span>
                {totals.showPerHr && totals.carbs > 0 && (
                  <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.55)" }}>({fmt(totals.carbs)}g total)</span>
                )}
              </div>

              <span style={{ color: B.navyLight, fontSize: 14 }}>·</span>

              {/* Sodium */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", background: "rgba(255,255,255,0.07)", borderRadius: 20 }}>
                {statusDot(sodPct)}
                <span style={{ fontFamily: FF, fontWeight: 900, fontSize: 15, color: statusColor(sodPct) }}>
                  {totals.showPerHr ? `${fmt(totals.sodiumPerHr)}mg/hr` : `${fmt(totals.sodium)}mg`}
                </span>
                <span style={{ fontFamily: FB, fontSize: 11, color: B.white }}>sodium</span>
                {totals.showPerHr && totals.sodium > 0 && (
                  <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.55)" }}>({fmt(totals.sodium)}mg total)</span>
                )}
              </div>

              <span style={{ color: B.navyLight, fontSize: 14 }}>·</span>

              {/* Fluid */}
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", background: "rgba(255,255,255,0.07)", borderRadius: 20 }}>
                {statusDot(fluidPct)}
                <span style={{ fontFamily: FF, fontWeight: 900, fontSize: 15, color: statusColor(fluidPct) }}>
                  {totals.showPerHr ? `${fluidToDisplay(totals.fluidPerHr)}${fluidUnitLabel}/hr` : `${fluidToDisplay(totals.fluid)}${fluidUnitLabel}`}
                </span>
                <span style={{ fontFamily: FB, fontSize: 11, color: B.white }}>fluid</span>
                {totals.showPerHr && totals.fluid > 0 && (
                  <span style={{ fontFamily: FB, fontSize: 11, color: "rgba(255,255,255,0.55)" }}>({fluidToDisplay(totals.fluid)}{fluidUnitLabel} total)</span>
                )}
              </div>

              {totals.caffeine > 0 && <>
                <span style={{ color: B.navyLight, fontSize: 14 }}>·</span>
                <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "4px 12px", background: "rgba(255,255,255,0.07)", borderRadius: 20 }}>
                  <span style={{ fontFamily: FF, fontWeight: 800, fontSize: 13, color: B.blush }}>☕ {totals.caffeine}mg caffeine</span>
                </div>
              </>}

              {!hasAny && (
                <span style={{ fontFamily: FB, fontSize: 12, color: B.textMuted, fontStyle: "italic" }}>
                  Add products to see your totals update here
                </span>
              )}
            </div>
          </div>
        );
      })()}

      {/* FOOTER */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: B.navy, borderTop: `1px solid ${B.navyLight}`,
        padding: "6px 20px", display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: 4, zIndex: 50
      }}>
        <span style={{ fontSize: 10, color: B.blush + "99", fontFamily: FB }}>
          © {new Date().getFullYear()} Marathon Nutritionist by Kristy Baumann, Registered Dietitian · All rights reserved
        </span>
        <span style={{ fontSize: 10, color: B.sand + "77", fontFamily: FB, fontStyle: "italic" }}>
          For personal use only · Not for redistribution
        </span>
      </div>
    </div>
  );
}
