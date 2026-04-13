const lengthInput = document.getElementById("length");

const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("generateBtn");
const passwordResult = document.getElementById("passwordResult");
const copyBtn = document.getElementById("copyBtn");

// CHARACTER SETS
const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+";

function generatePassword() {
    let length = parseInt(lengthInput.value);

    if (length < 4 || length > 50) {
        alert("Password length must be between 4 and 50");
        return;
    }

    let chars = "";

    if (uppercaseEl.checked) chars += upper;
    if (lowercaseEl.checked) chars += lower;
    if (numbersEl.checked) chars += numbers;
    if (symbolsEl.checked) chars += symbols;

    if (!chars) {
        alert("Select at least one option");
        return;
    }

    let password = "";

    for (let i = 0; i < length; i++) {
        // let randomIndex = Math.floor(Math.random() * chars.length);
        let randomIndex = crypto.getRandomValues(new Uint32Array(1))[0] % chars.length;
        password += chars[randomIndex];
    }

    passwordResult.textContent = password;
}

function copyPassword() {
    let pass = passwordResult.textContent;

    if (!pass || pass === "Your password will appear here") {
        alert("Generate password first");
        return;
    }

    navigator.clipboard.writeText(pass)
        .then(() => alert("Copied!"))
        .catch(() => alert("Copy failed"));
}

generateBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);