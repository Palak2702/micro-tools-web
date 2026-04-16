/* =========================================
   GLOBAL INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initCPMPage();
  initShortsPage();
  initIncomePage();
  updateViewsDisplay();
});

/* =========================================
   1. CPM CALCULATOR PAGE
========================================= */

function initCPMPage() {
  const views = document.getElementById("views");
  const cpm = document.getElementById("cpm");
  const result = document.getElementById("result");
  const chartCanvas = document.getElementById("chart");

  if (!views || !cpm || !result) return; // only run on CPM page

  views.addEventListener("input", calcCPM);
  cpm.addEventListener("input", calcCPM);

  function calcCPM() {
    let v = views.value;
    let c = cpm.value;

    if (!v || !c) return;

    let earnings = (v / 1000) * c;
    result.innerText = "Estimated Earnings: ₹" + earnings.toFixed(0);
  }

  // Chart
  if (chartCanvas) {
    new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels: ["Gaming", "Entertainment", "Education", "Finance"],
        datasets: [
          {
            label: "CPM ₹",
            data: [80, 120, 250, 500],
          },
        ],
      },
    });
  }
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

  const monthly = document.getElementById("monthly");
  const yearly = document.getElementById("yearly");
  const insight = document.getElementById("insight");
  const viewsValue = document.getElementById("viewsValue");
  const chartCanvas = document.getElementById("chart");

  // ❌ FIRST CHECK EVERYTHING
  if (!views || !category || !type || !ads) return;

  let chart;

  const CPM_MAP_2026 = {
    gaming: { min: 30, max: 90 },
    entertainment: { min: 40, max: 120 },
    funny: { min: 35, max: 110 },
    vlog: { min: 45, max: 130 },
    cooking: { min: 60, max: 180 },
    mix: { min: 40, max: 120 },
    education: { min: 120, max: 300 },
    finance: { min: 250, max: 600 },
  };

  function formatNumber(num) {
    return Number(num).toLocaleString("en-IN");
  }

  function updateViewsDisplay() {
    if (!viewsValue) return;
    viewsValue.innerText = formatNumber(views.value) + " views";
  }

  function getCPM() {
    let base = CPM_MAP_2026[category.value] || CPM_MAP_2026.entertainment;

    let min = base.min;
    let max = base.max;

    if (type.value === "shorts") {
      min *= 0.15;
      max *= 0.25;
    }

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

    minEl.innerText = "₹" + minIncome.toFixed(0);
    avgEl.innerText = "₹" + avgIncome.toFixed(0);
    maxEl.innerText = "₹" + maxIncome.toFixed(0);

    monthly.innerText = "₹" + avgIncome.toFixed(0);
    yearly.innerText = "₹" + (avgIncome * 12).toFixed(0);

    if (insight) {
      insight.innerText =
        avgIncome < 2000
          ? "⚠️ Low earnings – Improve niche"
          : avgIncome < 10000
            ? "👍 Moderate income – Good growth"
            : "🔥 High earning niche";
    }

    updateChart(minIncome, avgIncome, maxIncome);
  }

  function updateChart(min, avg, max) {
    if (!chartCanvas) return;

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

  // ✅ EVENTS (SAFE NOW)
  views.addEventListener("input", () => {
    updateViewsDisplay();
    calculate();
  });

  category.addEventListener("change", calculate);
  type.addEventListener("change", calculate);
  ads.addEventListener("change", calculate);

  // 🔥 IMPORTANT: INITIAL LOAD
  updateViewsDisplay();
  calculate();
}
