/* =========================================
   GLOBAL INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("niche")) initCPMPage();
  if (document.getElementById("category") && document.getElementById("type"))
    initIncomePage();
  if (
    document.getElementById("category") &&
    document.getElementById("min") &&
    !document.getElementById("type")
  )
    initShortsPage();
});

/* =========================================
   1. CPM CALCULATOR PAGE
========================================= */

function initCPMPage() {
  const views = document.getElementById("cpmViews");
  const cpm = document.getElementById("cpmValue");
  const niche = document.getElementById("niche");

  const result = document.getElementById("result");
  const rpmResult = document.getElementById("rpmResult");
  const rangeResult = document.getElementById("rangeResult");
  const cpmRange = document.getElementById("cpmRange");

  const chartCanvas = document.getElementById("chart");
  const toggle = document.getElementById("manualCpmToggle");
  const cpmHint = document.getElementById("cpmHint");

  if (!views || !cpm || !niche || !chartCanvas) return;

  // ✅ Niche CPM Data (REQUIRED FIX)
  const nicheData = {
    gaming: { min: 50, max: 150 },
    entertainment: { min: 60, max: 180 },
    education: { min: 150, max: 350 },
    finance: { min: 250, max: 600 },
    tech: { min: 120, max: 300 },
    vlog: { min: 40, max: 120 },
    fitness: { min: 80, max: 200 },
    food: { min: 70, max: 180 },
    business: { min: 200, max: 500 },
  };

  let chart;

  // =========================
  // TOGGLE (Beginner / Advanced)
  // =========================
  if (toggle) {
    toggle.addEventListener("change", () => {
      if (toggle.checked) {
        // Advanced mode
        cpm.disabled = false;
        if (cpmHint) cpmHint.innerText = "You can now enter CPM manually";
      } else {
        // Beginner mode
        cpm.disabled = true;

        let selected = niche.value;
        if (selected && nicheData[selected]) {
          let data = nicheData[selected];
          let avg = (data.min + data.max) / 2;
          cpm.value = avg.toFixed(0);
        }

        if (cpmHint)
          cpmHint.innerText = "CPM is auto-filled based on selected niche";

        calcCPM();
      }
    });
  }

  // =========================
  // NICHE CHANGE
  // =========================
  niche.addEventListener("change", () => {
    let selected = niche.value;
    if (!selected || !nicheData[selected]) return;

    let data = nicheData[selected];
    let avg = (data.min + data.max) / 2;

    // Only auto-fill if NOT in manual mode
    if (!toggle || !toggle.checked) {
      cpm.value = avg.toFixed(0);
    }

    cpmRange.innerText = `Typical CPM Range: ₹${data.min} – ₹${data.max}`;

    calcCPM();
  });

  // =========================
  // CALCULATION
  // =========================
  function calcCPM() {
    let v = parseFloat(views.value);
    let c = parseFloat(cpm.value);

    if (!v || !c) return;

    let cpmEarnings = (v / 1000) * c;
    let rpm = c * 0.6 * 0.55;
    let rpmEarnings = (v / 1000) * rpm;

    let low = rpmEarnings * 0.7;
    let high = rpmEarnings * 1.3;

    result.innerText = `₹${cpmEarnings.toLocaleString("en-IN")}`;
    rpmResult.innerText = `₹${rpmEarnings.toLocaleString("en-IN")}`;
    rangeResult.innerText = `₹${low.toLocaleString("en-IN")} – ₹${high.toLocaleString("en-IN")}`;

    if (chart) chart.destroy();

    chart = new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: ["CPM", "RPM"],
        datasets: [
          {
            label: "Earnings ₹",
            data: [cpmEarnings, rpmEarnings],
            backgroundColor: ["#3b82f6", "#ef4444"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // =========================
  // EVENTS
  // =========================
  views.addEventListener("input", calcCPM);
  cpm.addEventListener("input", calcCPM);

  // =========================
  // DEFAULT STATE
  // =========================
  views.value = 100000;

  // Beginner mode default
  cpm.disabled = true;
  if (toggle) toggle.checked = false;

  // Auto-fill initial CPM (optional: set default niche)
  let defaultNiche = "entertainment";
  niche.value = defaultNiche;

  let data = nicheData[defaultNiche];
  cpm.value = ((data.min + data.max) / 2).toFixed(0);
  cpmRange.innerText = `Typical CPM Range: ₹${data.min} – ₹${data.max}`;

  calcCPM();
}

/* =========================================
   2. SHORTS CALCULATOR PAGE
========================================= */

function initShortsPage() {
  const views = document.getElementById("views");
  const category = document.getElementById("category");
  const minEl = document.getElementById("min");
  const avgEl = document.getElementById("avg");
  const maxEl = document.getElementById("max");

  if (!views || !category || !minEl || !avgEl || !maxEl) return;

  function getRPM(cat) {
    const map = {
      finance: { min: 6, max: 25 },
      education: { min: 4, max: 18 },
      tech: { min: 5, max: 20 },
      cooking: { min: 4, max: 15 },
      vlog: { min: 3, max: 12 },
      entertainment: { min: 2, max: 10 },
      funny: { min: 1.5, max: 8 },
      gaming: { min: 1, max: 6 },
      mix: { min: 2, max: 12 },
    };

    return map[cat] || map.entertainment;
  }

  function calc() {
    let v = Number(views.value || 0);
    let cat = category.value;

    let base = getRPM(cat);

    let minRPM = base.min;
    let maxRPM = base.max;

    // 🔥 make category difference more visible
    if (cat === "finance") {
      minRPM *= 1.2;
      maxRPM *= 1.4;
    }

    if (cat === "funny") {
      minRPM *= 0.9;
      maxRPM *= 1.0;
    }

    if (v > 1000000) {
      minRPM *= 1.3;
      maxRPM *= 1.5;
    }

    let min = (v / 1000) * minRPM;
    let max = (v / 1000) * maxRPM;
    let avg = (min + max) / 2;

    minEl.innerText = "₹" + min.toFixed(0);
    avgEl.innerText = "₹" + avg.toFixed(0);
    maxEl.innerText = "₹" + max.toFixed(0);
  }

  // 🔥 EVENTS (IMPORTANT FIX)
  views.addEventListener("input", calc);
  category.addEventListener("change", calc);

  // initial run
  views.value = views.value || 100000;
  calc();
}

/* =========================================
   3. YOUTUBE INCOME PAGE
========================================= */

function initIncomePage() {
  const views = document.getElementById("views");
  const category = document.getElementById("category");
  const type = document.getElementById("type");
  const ads = document.getElementById("ads");

  const minEl = document.getElementById("min");
  const avgEl = document.getElementById("avg");
  const maxEl = document.getElementById("max");

  const dailyEl = document.getElementById("daily");
  const monthlyEl = document.getElementById("monthly");
  const yearlyEl = document.getElementById("yearly");

  const per1000El = document.getElementById("per1000");
  const sixMonthEl = document.getElementById("sixMonth");
  const perVideoEl = document.getElementById("perVideo");

  const insight = document.getElementById("insight");
  const explain = document.getElementById("explain");
  const viewsValue = document.getElementById("viewsValue");

  const chartCanvas = document.getElementById("chart");

  if (!views || !category || !type || !ads) return;

  let chart;

  // ================================
  // 2026 INDIA REALISTIC CPM MAP
  // ================================
  const CPM_MAP = {
    entertainment: { min: 40, max: 120 },
    funny: { min: 30, max: 90 },
    vlog: { min: 45, max: 140 },
    cooking: { min: 60, max: 180 },

    gaming: { min: 35, max: 110 },
    tech: { min: 80, max: 250 },

    education: { min: 120, max: 320 },
    finance: { min: 250, max: 650 },

    travel: { min: 70, max: 200 },
    motivation: { min: 60, max: 160 },

    mix: { min: 40, max: 120 },
    all: { min: 50, max: 150 },
  };

  function format(num) {
    return "₹" + Number(num).toLocaleString("en-IN");
  }

  function getCPM() {
    let base = CPM_MAP[category.value] || CPM_MAP.entertainment;

    let min = base.min;
    let max = base.max;

    // Shorts adjustment
    if (type.value === "shorts") {
      min *= 0.2;
      max *= 0.3;
    }

    // Ad intensity adjustment
    if (ads.value === "low") {
      min *= 0.7;
      max *= 0.7;
    }

    if (ads.value === "high") {
      min *= 1.4;
      max *= 1.4;
    }

    return { min, max };
  }

  function calculate() {
    let v = Number(views.value);
    let { min, max } = getCPM();

    let minIncome = (v / 1000) * min;
    let maxIncome = (v / 1000) * max;
    let avgIncome = (minIncome + maxIncome) / 2;

    // ================================
    // MAIN OUTPUTS
    // ================================
    minEl.innerText = format(minIncome);
    avgEl.innerText = format(avgIncome);
    maxEl.innerText = format(maxIncome);

    // ================================
    // TIME BREAKDOWN
    // ================================
    let daily = avgIncome / 30;
    let monthly = avgIncome;
    let yearly = avgIncome * 12;

    dailyEl.innerText = format(daily);
    monthlyEl.innerText = format(monthly);
    yearlyEl.innerText = format(yearly);

    // ================================
    // PER VIDEO (FIXED)
    // ================================
    let videosPerMonth = 30;
    let perVideoIncome = avgIncome / videosPerMonth;
    perVideoEl.innerText = format(perVideoIncome);

    // ================================
    // PER 1000 VIEWS
    // ================================
    let per1000 = avgIncome / (v / 1000);
    per1000El.innerText = format(per1000);

    // ================================
    // 6 MONTH PROJECTION
    // ================================
    let projected = avgIncome;
    for (let i = 0; i < 6; i++) {
      projected += projected * 0.1;
    }
    sixMonthEl.innerText = format(projected);

    // ================================
    // INSIGHT
    // ================================
    if (avgIncome < 3000) {
      insight.innerText = "⚠️ Low earning potential niche";
    } else if (avgIncome < 15000) {
      insight.innerText = "📈 Medium earning potential";
    } else {
      insight.innerText = "🔥 High earning niche in India 2026";
    }

    // ================================
    // EXPLANATION
    // ================================
    if (category.value === "finance") {
      explain.innerText = "Finance niche has highest CPM in India.";
    } else if (type.value === "shorts") {
      explain.innerText = "Shorts earn less due to limited ad revenue.";
    } else {
      explain.innerText = "Earnings depend on CPM, niche and audience.";
    }

    // ================================
    // CHART
    // ================================
    updateChart(minIncome, avgIncome, maxIncome);

    // ================================
    // VIEW DISPLAY
    // ================================
    viewsValue.innerText = v.toLocaleString("en-IN") + " views";
  }

  function updateChart(min, avg, max) {
    if (chart) chart.destroy();

    chart = new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: ["Min", "Avg", "Max"],
        datasets: [
          {
            data: [min, avg, max],
            backgroundColor: ["#93c5fd", "#ff0000", "#60a5fa"],
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
      },
    });
  }

  // ================================
  // EVENTS
  // ================================
  ["input", "change"].forEach((event) => {
    if (views) views.addEventListener(event, calculate);
    if (category) category.addEventListener(event, calculate);
    if (type) type.addEventListener(event, calculate);
    if (ads) ads.addEventListener(event, calculate);
  });

  calculate();
}

document.addEventListener("DOMContentLoaded", initIncomePage);
