const input = document.getElementById("inputText");

const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const titleEl = document.getElementById("title");
const sentenceEl = document.getElementById("sentence");

function toTitleCase(text) {
    return text
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

function toSentenceCase(text) {
    return text
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
}

function convertText() {
    let text = input.value;

    if (!text) {
        upperEl.textContent = "";
        lowerEl.textContent = "";
        titleEl.textContent = "";
        sentenceEl.textContent = "";
        return;
    }

    // SAFE OUTPUT
    upperEl.textContent = text.toUpperCase();
    lowerEl.textContent = text.toLowerCase();
    titleEl.textContent = toTitleCase(text);
    sentenceEl.textContent = toSentenceCase(text);
}

// LIVE UPDATE
input.addEventListener("input", convertText);
// COPY HANDLER
document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const text = document.getElementById(targetId).textContent;

        if (!text) {
            alert("Nothing to copy");
            return;
        }

        navigator.clipboard.writeText(text)
            .then(() => {
                btn.textContent = "✓";
                setTimeout(() => btn.textContent = "📋", 1000);
            })
            .catch(() => alert("Copy failed"));
    });
});