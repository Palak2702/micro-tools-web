const textInput = document.getElementById("textInput");
const countBtn = document.getElementById("countBtn");

const wordCount = document.getElementById("wordCount");
const charWithSpace = document.getElementById("charWithSpace");
const charWithoutSpace = document.getElementById("charWithoutSpace");

// Core function
function calculateCounts() {
  let text = textInput.value;

  // Words
  let words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  // Counts
  wordCount.textContent = words.length;
  charWithSpace.textContent = text.length;
  charWithoutSpace.textContent = text.replace(/\s/g, "").length;
  // LINES
  let lines = text.split(/\n/).filter((line) => line.trim() !== "").length;

  // SENTENCES
  let sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  // READING TIME (avg 200 words/min)
  let readingTime = (words.length / 200).toFixed(2);

  // OUTPUT
  document.getElementById("lineCount").textContent = lines;
  document.getElementById("sentenceCount").textContent = sentences.length;
  document.getElementById("readingTime").textContent = readingTime;
}

// Button click
countBtn.addEventListener("click", calculateCounts);

// Live typing (IMPORTANT for UX)
textInput.addEventListener("input", calculateCounts);
