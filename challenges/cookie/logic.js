/* Cookie Tampering Challenge Logic
   Handles:
   - Signed vs unsigned mode
   - Fake signature generation
   - Tamper detection
   - Server log output
   - Quiz auto-marking
*/

// -----------------------------------------------------
// INTERNAL SECRET (server-only in real life)
// -----------------------------------------------------
const SECRET = "super-secret-key"; // simulated


// -----------------------------------------------------
// Helper: Simulated Signature Function (Fake HMAC)
// -----------------------------------------------------
function fakeSign(role) {
    // NOT real crypto – teaching simulation only
    return btoa(role + "|" + SECRET);
}


// -----------------------------------------------------
// Initial mode update
// -----------------------------------------------------
document.getElementById("signedMode").addEventListener("change", () => {
    updateModeInfo();
    refreshSignature();
});

updateModeInfo();
refreshSignature();


// -----------------------------------------------------
// Update mode description
// -----------------------------------------------------
function updateModeInfo() {
    const signed = document.getElementById("signedMode").checked;
    const infoBox = document.getElementById("modeInfo");

    if (signed) {
        infoBox.innerHTML = `
            <strong>Signed Mode Enabled:</strong><br>
            The server verifies the signature. If the cookie is modified,
            the signature will no longer match and the request will be rejected.
        `;
        document.getElementById("sig").setAttribute("readonly", "true");
    } else {
        infoBox.innerHTML = `
            <strong>Unsigned Mode (Vulnerable):</strong><br>
            The server trusts the cookie exactly as the browser sends it — even if it was modified.
        `;
        document.getElementById("sig").removeAttribute("readonly");
        document.getElementById("sig").value = "";
    }
}


// -----------------------------------------------------
// Update signature when role changes
// -----------------------------------------------------
function refreshSignature() {
    const role = document.getElementById("role").value.trim();
    const signed = document.getElementById("signedMode").checked;

    const sigBox = document.getElementById("sig");

    if (signed) {
        sigBox.value = fakeSign(role);
    } else {
        sigBox.value = "";
    }
}


// -----------------------------------------------------
// Apply the Cookie (Simulated Server Decision)
// -----------------------------------------------------
function applyCookie() {
    const role = document.getElementById("role").value.trim();
    const sig = document.getElementById("sig").value;
    const signed = document.getElementById("signedMode").checked;

    let log = "";
    let allowed = false;

    log += `Received Cookie:\nrole=${role}\nsignature=${sig || "(none)"}\n\n`;

    if (!signed) {
        log += "Unsigned Mode → trusting cookie.\n";
        allowed = (role === "admin");
    } else {
        const expectedSig = fakeSign(role);
        log += `Expected Signature: ${expectedSig}\n`;

        if (sig === expectedSig) {
            log += "Signature valid.\n";
            allowed = (role === "admin");
        } else {
            log += "❌ Signature mismatch — cookie tampered with.\n";
            allowed = false;
        }
    }

    // Output access result
    const accessBox = document.getElementById("access");
    if (allowed) {
        accessBox.className = "result good";
        accessBox.innerHTML = "✔ Access Granted (Admin)";
    } else {
        accessBox.className = "result bad";
        accessBox.innerHTML = "❌ Access Denied";
    }

    // Output server log
    document.getElementById("log").textContent = log;
}


// -----------------------------------------------------
// QUIZ AUTO-MARKING
// -----------------------------------------------------
function submitCookieAnswers() {

    let score = 0;

    const correct = {
        q1: "a",
        q2: "a",
        q3: "b"
    };

    Object.keys(correct).forEach(q => {
        const selected = document.querySelector(`input[name="${q}"]:checked`);
        if (selected && selected.value === correct[q]) score++;
    });

    const scoreBox = document.getElementById("score");

    if (score === 3) {
        scoreBox.className = "result good";
        scoreBox.innerHTML = `✔ Perfect score: ${score}/3`;
    } else {
        scoreBox.className = "result bad";
        scoreBox.innerHTML =
            `You scored ${score}/3 — check the model answers below.`;
    }

    document.getElementById("modelAnswers").style.display = "block";
}
