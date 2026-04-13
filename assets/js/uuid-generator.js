const uuidEl = document.getElementById("uuidResult");

function generateUUID() {
    const uuid = crypto.randomUUID();
    uuidEl.textContent = uuid;
}

document.getElementById("generateBtn").addEventListener("click", generateUUID);

document.getElementById("copyBtn").addEventListener("click", () => {
    navigator.clipboard.writeText(uuidEl.textContent);
});