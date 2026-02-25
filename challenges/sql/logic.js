/* SQL Injection Challenge Logic
   This script powers the interactive login simulation
   and auto‑marks the quiz section.
*/

// -------------------------------
// 1. SQL Injection Login Simulation
// -------------------------------

function attemptLogin() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    // Generate fake SQL
    const sql = `
SELECT * FROM users
WHERE username = '${user}'
AND password = '${pass}';
    `;

    document.getElementById("sqlPreview").textContent = sql.trim();

    // Vulnerable logic — any use of ' OR '1'='1 bypasses login
    const injectionPattern = /' ?or ?'1'='1/i;

    if (user === "admin" && pass === "admin123") {
        document.getElementById("loginResult").textContent =
            "✔ Login successful (real credentials)";
        document.getElementById("loginResult").className = "result good";
        return;
    }

    if (injectionPattern.test(user) || injectionPattern.test(pass)) {
        document.getElementById("loginResult").innerHTML =
            "🔥 <strong>SQL Injection successful!</strong> You bypassed the login.";
        document.getElementById("loginResult").className = "result good";
        return;
    }

    document.getElementById("loginResult").textContent =
        "❌ Login failed. Try SQL Injection to bypass authentication.";
    document.getElementById("loginResult").className = "result bad";
}



// -------------------------------
// 2. Quiz Auto‑Marking
// -------------------------------
function submitAnswers() {

    let score = 0;

    // Correct answers
    const answers = {
        q1: "b",
        q2: "b",
        q3: "a"
    };

    // Check MCQs
    Object.keys(answers).forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === answers[q]) score++;
    });

    // Score output
    const scoreBox = document.getElementById("score");

    if (score === 3) {
        scoreBox.innerHTML = `✔ Perfect score: ${score}/3`;
        scoreBox.className = "result good";
    } else {
        scoreBox.innerHTML = `You scored ${score}/3 — check the model answers below.`;
        scoreBox.className = "result bad";
    }

    // Show model answers
    document.getElementById("modelAnswers").style.display = "block";
}
