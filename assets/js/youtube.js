/* =========================================
   GLOBAL INIT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initCPMPage();
  initShortsPage();
  initIncomePage();
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
  const minEl = document.getElementById("min");
  const avgEl = document.getElementById("avg");
  const maxEl = document.getElementById("max");

  if (!views || !minEl || !avgEl || !maxEl) return;

  views.addEventListener("input", calcShorts);

  function calcShorts() {
    let v = views.value;
    if (!v) return;

    let min = (v / 1000) * 5;
    let max = (v / 1000) * 20;
    let avg = (min + max) / 2;

    minEl.innerText = "₹" + min.toFixed(0);
    avgEl.innerText = "₹" + avg.toFixed(0);
    maxEl.innerText = "₹" + max.toFixed(0);
  }
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

  const chartCanvas = document.getElementById("chart");

  if (!views || !category || !type || !ads) return;

  let chart;

  views.addEventListener("input", calculate);
  category.addEventListener("change", calculate);
  type.addEventListener("change", calculate);
  ads.addEventListener("change", calculate);

  function calculate() {
    let v = views.value;

    let min = 40,
      max = 80;

    if (category.value === "education") {
      min = 100;
      max = 250;
    }

    if (category.value === "finance") {
      min = 200;
      max = 500;
    }

    if (type.value === "shorts") {
      min = 5;
      max = 20;
    }

    if (ads.value === "low") {
      min *= 0.7;
      max *= 0.7;
    }

    if (ads.value === "high") {
      min *= 1.5;
      max *= 1.5;
    }

    let minIncome = (v / 1000) * min;
    let maxIncome = (v / 1000) * max;
    let avgIncome = (minIncome + maxIncome) / 2;

    minEl.innerText = "₹" + minIncome.toFixed(0);
    avgEl.innerText = "₹" + avgIncome.toFixed(0);
    maxEl.innerText = "₹" + maxIncome.toFixed(0);

    monthly.innerText = "₹" + avgIncome.toFixed(0);
    yearly.innerText = "₹" + (avgIncome * 12).toFixed(0);

    if (avgIncome < 2000)
      insight.innerText = "⚠️ Low earnings – Improve niche";
    else if (avgIncome < 10000)
      insight.innerText = "👍 Moderate income – Optimize content";
    else insight.innerText = "🔥 High earning potential";

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

  calculate();
}