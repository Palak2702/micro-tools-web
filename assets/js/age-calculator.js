const dobInput = document.getElementById("dob");
const calcBtn = document.getElementById("calcBtn");

const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");

// SAFE INPUT CHECK
function sanitizeDate(input) {
    // Only allow valid date format
    return /^\d{4}-\d{2}-\d{2}$/.test(input);
}

function calculateAge() {
    const dobValue = dobInput.value;

    if (!sanitizeDate(dobValue)) {
        alert("Please enter a valid date");
        return;
    }

    const dob = new Date(dobValue);
    const today = new Date();

    if (dob > today) {
        alert("Date cannot be in the future");
        return;
    }

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    let days = today.getDate() - dob.getDate();

    // Adjust if negative
    if (days < 0) {
        months--;
        const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += prevMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // OUTPUT SAFE (no innerHTML)
    yearsEl.textContent = years;
    monthsEl.textContent = months;
    daysEl.textContent = days;
}

calcBtn.addEventListener("click", calculateAge);