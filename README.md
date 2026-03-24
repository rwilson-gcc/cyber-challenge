***

# 🛡️ Cyber Challenge

A lightweight, browser‑based hub for hands‑on cyber security challenges.  
This project provides standalone practical exercises covering common web‑security vulnerabilities—ideal for teaching, demonstrations, and self‑directed practice.

***

## 📂 Repository Structure

The repository is organised as follows:

    cyber-challenge/
    │
    ├── challenges/
    │   ├── sql/
    │   │   ├── challenge.html
    │   │   └── logic.js
    │   ├── xss/
    │   │   ├── challenge.html
    │   │   └── logic.js
    │   ├── csrf/
    │   │   ├── challenge.html
    │   │   └── logic.js
    │   ├── command/
    │   │   ├── challenge.html
    │   │   └── logic.js
    │   └── cookie/
    │       ├── challenge.html
    │       └── logic.js
    │
    ├── index.html          ← Challenge Hub
    └── shared/
        └── challenge-style.css



***

## 🧩 Available Challenges

Each challenge folder contains a simple **HTML interface** and a **JavaScript-based logic layer**, enabling learners to explore how specific vulnerabilities work in practice.

| Challenge                             | Focus Area                                               |
| ------------------------------------- | -------------------------------------------------------- |
| **SQL Injection**                     | Exploiting unsanitised inputs to manipulate SQL queries  |
| **Cross‑Site Scripting (XSS)**        | Injecting malicious scripts into web pages               |
| **Cross‑Site Request Forgery (CSRF)** | Forcing unintended user actions through crafted requests |
| **Command Injection**                 | Injecting OS commands into insecure input handlers       |
| **Cookie Manipulation**               | Understanding client-side trust issues                   |

***

## 🚀 Getting Started

### **Run Locally (No Backend Required)**

1.  Clone the repository:
    ```bash
    git clone https://github.com/rwilson-gcc/cyber-challenge
    ```
2.  Open the main hub:
    ```text
    cyber-challenge/index.html
    ```
3.  Select any challenge from the menu to begin.

All challenges are **front‑end only**, so no server is required — simply open the HTML pages in any modern browser.

***

## 🎯 Learning Objectives

This project helps learners:

*   Understand how common vulnerabilities are introduced.
*   Practice exploiting insecure code paths safely.
*   Recognise weak design patterns in web applications.
*   Build intuition for secure coding and mitigation techniques.

***

## 🛡️ For Instructors

You can use this repo to:

*   Demonstrate vulnerabilities live in the classroom.
*   Assign practical cyber‑security tasks.
*   Encourage students to identify, exploit, and remediate issues.
*   Extend the challenges by modifying `logic.js`.

***

## 🧱 Technology Stack

*   **HTML5** (UI & challenge pages)
*   **CSS** (shared styling in `challenge-style.css`)
*   **JavaScript** (challenge logic and input validation)

***

## 🔧 Future Enhancements (Optional Ideas)

*   Add scoreboard / scoring engine
*   Add hints & solution walkthroughs
*   Add server‑side variations of each vulnerability
*   Gamification features (timers, ranking, badges)

***
