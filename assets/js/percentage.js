// SAFE NUMBER PARSER
function getNumber(id) {
    const val = document.getElementById(id).value;
    return parseFloat(val);
}

// TYPE 1: X% of Y
function calc1() {
    let x = getNumber("p1");
    let y = getNumber("p2");

    if (isNaN(x) || isNaN(y)) return;

    let result = (x / 100) * y;

    document.getElementById("r1").textContent = result.toFixed(2);
}

// TYPE 2: X is what % of Y
function calc2() {
    let x = getNumber("p3");
    let y = getNumber("p4");

    if (isNaN(x) || isNaN(y) || y === 0) return;

    let result = (x / y) * 100;

    document.getElementById("r2").textContent = result.toFixed(2);
}

// TYPE 3: Increase X by Y%
function calc3() {
    let x = getNumber("p5");
    let y = getNumber("p6");

    if (isNaN(x) || isNaN(y)) return;

    let result = x + (x * y / 100);

    document.getElementById("r3").textContent = result.toFixed(2);
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        calc1();
        calc2();
        calc3();
    });
});