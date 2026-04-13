function loadComponent(id, file) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error("Error loading component:", err));
}

// FIX PATHS
loadComponent("header", "/components/header.html");
loadComponent("footer", "/components/footer.html");