const textInput = document.getElementById("textInput");

/* MAIN FUNCTION */
function analyzeText() {
  const text = textInput.value || "";

  // BASIC COUNTS
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordCount = words.length;

  const uniqueWords = new Set(words).size;

  const charWithSpace = text.length;
  const charWithoutSpace = text.replace(/\s/g, "").length;

  const sentences = text.split(/[.!?]+/).filter(s => s.trim());
  const sentenceCount = sentences.length;

  const lines = text.split("\n").filter(l => l.trim()).length;
  const paragraphs = text.split(/\n+/).filter(p => p.trim()).length;

  const pages = wordCount > 0 ? (wordCount / 300).toFixed(1) : 0;
  const readingTime = Math.ceil(wordCount / 200);
  const speakingTime = Math.ceil(wordCount / 130);

  const avgSentence = sentenceCount ? wordCount / sentenceCount : 0;

  // SYLLABLE (simple)
  const syllables = words.reduce((c, w) => {
    return c + Math.max(1, w.replace(/[^aeiouy]/g, "").length);
  }, 0);

  // READABILITY
  const readability =
    wordCount > 0
      ? (206.835 - 1.015 * avgSentence - 84.6 * (syllables / wordCount)).toFixed(1)
      : 0;

  // PASSIVE VOICE
  const passiveMatches =
    text.match(/\b(is|was|were|are|been|being)\b\s+\w+ed\b/gi) || [];

  const passivePercent =
    wordCount > 0
      ? ((passiveMatches.length / wordCount) * 100).toFixed(1)
      : 0;

  // KEYWORDS
  const freq = {};
  words.forEach(w => {
    if (w.length > 3) freq[w] = (freq[w] || 0) + 1;
  });

  const topKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // SEO SCORE
  let seoScore = 0;
  if (wordCount > 300) seoScore += 25;
  if (avgSentence <= 20) seoScore += 25;
  if (readability > 50) seoScore += 25;
  if (passivePercent < 10) seoScore += 25;

  // -------------------------
  // SAFE UI UPDATES (IMPORTANT FIX)
  // -------------------------
  set("wordCount", wordCount);
  set("uniqueWords", uniqueWords);
  set("charWithSpace", charWithSpace);
  set("charWithoutSpace", charWithoutSpace);
  set("sentenceCount", sentenceCount);
  set("lineCount", lines);
  set("paragraphCount", paragraphs);
  set("pages", pages);
  set("readingTime", readingTime + " min");
  set("speakingTime", speakingTime + " min");

  set("readability", readability);
  set("avgSentence", avgSentence.toFixed(1));
  set("passive", passivePercent + "%");
  set("seoScore", seoScore);

  // SEO BAR
  const bar = document.getElementById("seoFill");
  if (bar) bar.style.width = seoScore + "%";

  // KEYWORDS LIST
  const list = document.getElementById("keywordList");
  if (list) {
    list.innerHTML = "";

    topKeywords.forEach(([word, count]) => {
      const li = document.createElement("li");
      li.textContent = `${word} (${count})`;
      list.appendChild(li);
    });
  }
}

/* CLEAR */
function clearText() {
  textInput.value = "";
  analyzeText();
}

/* SAFE SET FUNCTION */
function set(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

/* LIVE UPDATE */
textInput.addEventListener("input", analyzeText);

/* INITIAL RUN */
analyzeText();