function loadComponent(id, file, callback) {
  fetch(file)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById(id).innerHTML = data;

      // Run callback AFTER loading
      if (callback) callback();
    })
    .catch((err) => console.error("Error loading component:", err));
}

// DROPDOWN FUNCTION
function initDropdown() {
  const btn = document.querySelector(".dropbtn");
  const dropdown = document.getElementById("toolsDropdown");

  if (!btn || !dropdown) return; // prevents error

  btn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdown.classList.toggle("show");
  });

  window.addEventListener("click", function (e) {
    if (!btn.contains(e.target)) {
      dropdown.classList.remove("show");
    }
  });
}

// LOAD COMPONENTS
loadComponent("header", "/components/header.html", initDropdown);
loadComponent("footer", "/components/footer.html");