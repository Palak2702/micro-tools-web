const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const encodeBtn = document.getElementById("encodeBtn");
const decodeBtn = document.getElementById("decodeBtn");
const copyBtn = document.getElementById("copyBtn");

// SAFE ENCODE (handles Unicode)
function encodeBase64(text) {
    try {
        const bytes = new TextEncoder().encode(text);
        let binary = '';
        bytes.forEach(b => binary += String.fromCharCode(b));
        return btoa(binary);
    } catch (e) {
        return "Encoding failed";
    }
}

// SAFE DECODE
function decodeBase64(text) {
    try {
        const binary = atob(text);
        const bytes = new Uint8Array([...binary].map(char => char.charCodeAt(0)));
        return new TextDecoder().decode(bytes);
    } catch (e) {
        return "Invalid Base64 input";
    }
}

// ENCODE
function handleEncode() {
    let text = inputText.value.trim();

    if (!text) {
        outputText.value = "Enter text to encode";
        return;
    }

    outputText.value = encodeBase64(text);
}

// DECODE
function handleDecode() {
    let text = inputText.value.trim();

    if (!text) {
        outputText.value = "Enter Base64 to decode";
        return;
    }

    outputText.value = decodeBase64(text);
}

// COPY
function copyResult() {
    let result = outputText.value;

    if (!result) {
        alert("Nothing to copy");
        return;
    }

    navigator.clipboard.writeText(result)
        .then(() => alert("Copied!"))
        .catch(() => alert("Copy failed"));
}

// EVENTS
encodeBtn.addEventListener("click", handleEncode);
// inputText.addEventListener("input", handleEncode);
decodeBtn.addEventListener("click", handleDecode);
copyBtn.addEventListener("click", copyResult);