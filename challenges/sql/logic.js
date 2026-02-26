/* SQL Injection Challenge Logic (No Quiz Version)
   Powers:
   - SQL preview
   - Login bypass detection
   - Fake DB dump
*/

function attemptLogin() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    // SQL Preview ---------------------------------
    const sql = `
SELECT * FROM users
WHERE username = '${user}'
AND password = '${pass}';
    `;
    document.getElementById("sqlPreview").textContent = sql.trim();

    const resultBox = document.getElementById("loginResult");
    const dbDump = document.getElementById("dbDump");
    dbDump.textContent = "";

    // Injection pattern ----------------------------
    const injection = /' ?or ?'1'='1/i;

    if (injection.test(user) || injection.test(pass)) {
        // Injection success
        resultBox.className = "result good";
        resultBox.innerHTML = "🔥 SQL Injection Successful — Login Bypassed";

        dbDump.textContent = `
FAKE USER DATABASE
--------------------------------
id | username | password
1  | admin    | password123
2  | alice    | qwerty
3  | bob      | letmein
        `;
        return;
    }

    // Normal login
    if (user === "admin" && pass === "admin123") {
        resultBox.className = "result good";
        resultBox.innerHTML = "✔ Login successful (valid credentials)";
    } else {
        resultBox.className = "result bad";
        resultBox.innerHTML = "❌ Login failed — try an SQL Injection payload.";
    }
}
