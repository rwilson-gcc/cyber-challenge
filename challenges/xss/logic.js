/* XSS Challenge Logic
   Handles:
   - Simulated comments
   - XSS detection
   - Auto-marking quiz
*/

// -------------------------------
// 1. Comment Posting + XSS Detection
// -------------------------------

function addComment() {
    const input = document.getElementById("commentInput");
    const warning = document.getElementById("xssWarning");
    const comments = document.getElementById("comments");

    const text = input.value.trim();
    warning.innerHTML = "";

    if (!text) return;

    // Detect common XSS patterns
    const xssPatterns = [
        /<script.*?>.*?<\/script>/gi,
        /on\w+=/gi,
        /javascript:/gi
    ];

    let isXSS = xssPatterns.some(pattern => pattern.test(text));

    if (isXSS) {
        warning.className = "result bad";
        warning.innerHTML = "⚠️ XSS Detected! Your input contained a potentially dangerous script payload.";
    } else {
        warning.className = "";
    }

    // Escape output so nothing actually runs
    const safe = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    const div = document.createElement("div");
    div.className = "panel";
    div.textContent = safe;

    comments.prepend(div);

    input.value = "";
}



// -------------------------------
// 2. Auto‑Marking Quiz Logic
// -------------------------------

function submitXSSAnswers() {
    let score = 0;

    const correct = {
        q1: "b",
        q2: "b",
        q3: "b"
    };

    Object.keys(correct).forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === correct[q]) {
            score++;
        }
    });

    const scoreBox = document.getElementById("score");

    if (score === 3) {
        scoreBox.className = "result good";
        scoreBox.innerHTML = `✔ Perfect score: ${score}/3`;
    } else {
        scoreBox.className = "result bad";
        scoreBox.innerHTML = `You scored ${score}/3 — review the model answers below.`;
    }

    document.getElementById("modelAnswers").style.display = "block";
}
