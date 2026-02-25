/* CSRF Challenge Logic
   Handles:
   - Legitimate transfers
   - Forged CSRF attacks
   - Token checking
   - Auto‑marking quiz
*/

let csrfToken = generateToken();

function generateToken() {
    return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}

function logMessage(lines) {
    document.getElementById("serverLog").textContent = lines.join("\n");
}

// ---------------------------------------------------
// Legitimate Request
// ---------------------------------------------------
function sendLegitimate() {
    const useToken = document.getElementById("enableToken").checked;
    const amount = document.getElementById("amount").value;
    const recip = document.getElementById("recipient").value;

    let lines = [];
    lines.push("POST /transfer");
    lines.push("Cookie: session=abcd1234");
    if (useToken) lines.push("Form: csrf_token=" + csrfToken);
    lines.push(`Form: amount=${amount}, recipient=${recip}`);

    if (useToken) {
        lines.push("Decision: ✔ Request accepted (valid CSRF token)");
        document.getElementById("legitResult").className = "result good";
        document.getElementById("legitResult").innerHTML = "✔ Legitimate request successful.";
    } else {
        lines.push("Decision: ✔ Request accepted (no protection enabled)");
        document.getElementById("legitResult").className = "result good";
        document.getElementById("legitResult").innerHTML = "✔ Request accepted — but unsafe (token disabled)";
    }

    logMessage(lines);
}



// ---------------------------------------------------
// Forged Request (Attacker)
// ---------------------------------------------------
function sendForged() {
    const useToken = document.getElementById("enableToken").checked;

    let lines = [];
    lines.push("POST /transfer");
    lines.push("Cookie: session=abcd1234 (sent automatically by browser)");
    if (useToken) {
        lines.push("Form: csrf_token=(missing)");
        lines.push("Decision: ❌ Blocked — missing CSRF token");
        document.getElementById("attackResult").className = "result bad";
        document.getElementById("attackResult").innerHTML = "❌ CSRF Attack Blocked!";
    } else {
        lines.push("Form: csrf_token=(not required)");
        lines.push("Decision: ❗ Successful forged request (no protection enabled)");
        document.getElementById("attackResult").className = "result bad";
        document.getElementById("attackResult").innerHTML =
            "🔥 CSRF Attack Successful — forged request accepted!";
    }

    logMessage(lines);
}



// ---------------------------------------------------
// Quiz Auto-Marking
// ---------------------------------------------------
function submitCSRFAnswers() {

    let score = 0;

    const correct = {
        q1: "b",
        q2: "b",
        q3: "a"
    };

    Object.keys(correct).forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === correct[q]) score++;
    });

    const scoreBox = document.getElementById("score");

    if (score === 3) {
        scoreBox.className = "result good";
        scoreBox.innerHTML = `✔ Perfect score: ${score}/3!`;
    } else {
        scoreBox.className = "result bad";
        scoreBox.innerHTML =
            `You scored ${score}/3 — review the model answers below.`;
    }

    // Show model answers
    document.getElementById("modelAnswers").style.display = "block";
}
