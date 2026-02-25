/* Command Injection Challenge Logic
   Handles:
   - Unsafe & Safe mode command simulation
   - Injection command detection
   - Fake system outputs for: ls, ip a, secret.txt
   - Quiz auto-marking
*/

// -----------------------------------------------
// Helper: Highlight dangerous characters
// -----------------------------------------------
function highlight(str) {
    return str.replace(/(;|&&|\|\||\||`|>|<)/g,
        m => `<span class="highlight">${m}</span>`);
}

// -----------------------------------------------
// Clear Output
// -----------------------------------------------
function clearOutput() {
    document.getElementById("cmd").innerHTML = "(nothing yet)";
    document.getElementById("result").innerHTML = "(no output)";
}



// -----------------------------------------------
// MAIN SIMULATION
// -----------------------------------------------
function runCommand() {
    const userInput = document.getElementById("host").value.trim();
    const safe = document.getElementById("safeMode").checked;

    const cmdBox = document.getElementById("cmd");
    const resultBox = document.getElementById("result");

    // Reset first
    cmdBox.innerHTML = "";
    resultBox.innerHTML = "";

    // Update mode info
    document.getElementById("modeInfo").innerHTML = safe
        ? "✔ Safe Mode Enabled — input is validated and executed safely."
        : "⚠ Unsafe Mode — raw input is passed into a shell command.";

    if (safe) {
        handleSafeMode(userInput, cmdBox, resultBox);
    } else {
        handleUnsafeMode(userInput, cmdBox, resultBox);
    }
}



// -----------------------------------------------
// SAFE MODE (no injection possible)
// -----------------------------------------------
function handleSafeMode(input, cmdBox, resultBox) {

    const constructed = `execFile("ping", ["${input}"])`;
    cmdBox.textContent = constructed;

    // Allow only letters, digits, hyphens and periods in safe mode
    const safePattern = /^[a-zA-Z0-9.\-]+$/;

    if (!safePattern.test(input)) {
        resultBox.innerHTML = `
            <span class="bad">❌ Unsafe characters blocked.</span>
            <br>Safe mode rejected this input.
        `;
        return;
    }

    // Simulated safe successful ping
    resultBox.innerHTML = `
        <span class="good">✔ Safe execution</span><br>
        Reply from ${input}: time=12ms (simulated)
    `;
}



// -----------------------------------------------
// UNSAFE MODE (vulnerable)
// -----------------------------------------------
function handleUnsafeMode(input, cmdBox, resultBox) {

    // Fake constructed command
    const constructed = `ping -c 2 ${input}`;
    cmdBox.innerHTML = highlight(constructed);

    const sepPattern = /(;;|&&|\|\||;|\||`|>|<)/;
    const found = input.match(sepPattern);

    if (!found) {
        resultBox.innerHTML = `
            <span class="good">✔ No injection detected</span><br>
            Ping response from ${input}: time=12ms
        `;
        return;
    }

    // Split on first injection operator
    const parts = input.split(sepPattern);
    const injected = (parts[2] || "").trim().toLowerCase();

    let output = `
        <span class="bad">🔥 Command Injection Detected!</span><br><br>
        Injected command → <strong>${injected}</strong><br><br>
    `;

    // -------------------------
    // Simulated command outputs
    // -------------------------

    // ls
    if (injected === "ls") {
        output += `
Simulated Directory Listing:
/home/student/
  Documents/
  Downloads/
  pictures/
  scripts/
  notes.md
  secret.txt
        `;
    }

    // ip a
    else if (injected === "ip a" || injected === "ipa") {
        output += `
Simulated Network Interfaces:
1: lo: <LOOPBACK,UP>
    inet 127.0.0.1/8
2: eth0: <UP,BROADCAST,RUNNING>
    inet 192.168.1.23/24
    inet6 fe80::abcd:1234:5678/64
        `;
    }

    // more secret.txt, cat secret.txt
    else if (injected === "more secret.txt" || injected === "cat secret.txt") {
        output += `
Simulated File (secret.txt):
--------------------------------
TOP SECRET
This is a classified file.
Property of ACME Secure Systems.
Do NOT distribute.
        `;
    }

    // Unknown commands
    else {
        output += `(Unknown command — simulated environment only)`;
    }

    resultBox.innerHTML = output;
}



// -----------------------------------------------
// QUIZ AUTO-MARKING
// -----------------------------------------------
function submitCommandAnswers() {

    let score = 0;

    const correct = {
        q1: "b",
        q2: "b",
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
        scoreBox.innerHTML = `You scored ${score}/3 — review the model answers below.`;
    }

    document.getElementById("modelAnswers").style.display = "block";
}
