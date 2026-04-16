function checkPassword() {
  const pass = document.getElementById("passwordInput").value;
  const result = document.getElementById("result");

  if (!pass) {
    result.innerHTML = "Enter a password first";
    return;
  }

  let strength = "Weak";
  let time = "2 minutes";

  if (pass.length > 8) {
    strength = "Medium";
    time = "2 hours";
  }

  if (pass.length > 12 && /[A-Z]/.test(pass) && /[0-9]/.test(pass)) {
    strength = "Strong";
    time = "200 years";
  }

  result.innerHTML = `
    <h3>${strength} Password</h3>
    <p>⏱ Crack Time: ${time}</p>
  `;
}