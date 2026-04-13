const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

const openBtn = document.getElementById("openBtn");
const copyBtn = document.getElementById("copyBtn");

const resultPreview = document.getElementById("resultPreview");
const fullLinkEl = document.getElementById("fullLink");

let finalLink = "";

// SANITIZE PHONE (only numbers)
function sanitizePhone(input) {
  return input.replace(/[^0-9]/g, "");
}

// SANITIZE MESSAGE
function sanitizeMessage(input) {
  return encodeURIComponent(input);
}

function generateLink() {
  let rawPhone = phoneInput.value.trim();
  let rawMessage = messageInput.value.trim();

  let phone = sanitizePhone(rawPhone);

  // VALIDATION
  if (!phone || phone.length < 10) {
    resultPreview.textContent = "Enter valid phone number";
    finalLink = "";
    return;
  }

  // UX WARNING (check RAW message, not encoded)
  if (rawMessage.length > 200) {
    console.warn("Long message → long link");
  }

  let message = sanitizeMessage(rawMessage);

  // GENERATE LINK
  finalLink = rawMessage
    ? `https://wa.me/${phone}?text=${message}`
    : `https://wa.me/${phone}`;

  // PREVIEW (clean UI)
  let preview =
    finalLink.length > 60
      ? finalLink.substring(0, 60) + "..."
      : finalLink;

  resultPreview.textContent = preview;
  fullLinkEl.textContent = finalLink;
}

// OPEN LINK
function openWhatsApp() {
  if (!finalLink) {
    alert("Generate link first");
    return;
  }
  window.open(finalLink, "_blank");
}

// COPY LINK (robust)
function copyLink() {
  if (!finalLink) {
    alert("Generate link first");
    return;
  }

  const full = fullLinkEl.textContent;

  navigator.clipboard.writeText(full)
    .then(() => {
      alert("Link copied!");
    })
    .catch(() => {
      alert("Copy failed. Please copy manually.");
    });
}

// LIVE GENERATION (better UX)
phoneInput.addEventListener("input", generateLink);
messageInput.addEventListener("input", generateLink);

openBtn.addEventListener("click", openWhatsApp);
copyBtn.addEventListener("click", copyLink);