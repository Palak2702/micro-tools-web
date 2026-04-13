const minEl = document.getElementById("min");
const maxEl = document.getElementById("max");
const resultEl = document.getElementById("result");

function generateNumber() {
    let min = parseInt(minEl.value);
    let max = parseInt(maxEl.value);

    if (isNaN(min) || isNaN(max) || min > max) {
        alert("Invalid range");
        return;
    }

    let num = Math.floor(Math.random() * (max - min + 1)) + min;
    resultEl.textContent = num;
}

document.getElementById("generateBtn").addEventListener("click", generateNumber);

document.getElementById("copyBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(resultEl.textContent);
});