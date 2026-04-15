function analyzeTyping() {
  const text = document.getElementById("textInput").value;
  const resultBox = document.getElementById("result");

  if (text.length < 10) {
    resultBox.innerHTML = "Type a bit more to analyze your personality.";
    return;
  }

  let traits = [];

  if (text.length > 100) traits.push("🧠 Deep Thinker");
  if (text.includes(",")) traits.push("🎯 Detail Oriented");
  if (text === text.toUpperCase()) traits.push("🔥 Bold Personality");
  if (text.length < 50) traits.push("⚡ Fast Decision Maker");

  if (traits.length === 0) traits.push("😎 Balanced Personality");

  resultBox.innerHTML = `
    <h3>Your Personality:</h3>
    <p>${traits.join("<br>")}</p>
  `;
}