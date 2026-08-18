const questions = [
    {
        level: "Fase 1: El Despertar del Código",
        question: "🚨 DR. SILICIO: 'He infectado Neón-City. Sus ciudadanos están borrándose. Solo tus habilidades de código pueden salvarnos. ¿Qué es exactamente el Software, héroe?'",
        options: [
            "El conjunto de componentes físicos como la CPU, memoria RAM y tarjetas gráficas.",
            "El conjunto de programas, instrucciones, reglas informáticas y datos para ejecutar tareas en un sistema.",
            "Los cables y fibra óptica que transportan los datos de internet.",
            "Un tipo de virus diseñado para dañar la memoria RAM."
        ],
        correct: 1,
        explanation: "¡ATAQUE DE CÓDIGO EXITOSO! El Software es la parte intangible que le indica al hardware qué tareas debe realizar. La ciudad se estabiliza."
    },
    {
        level: "Fase 2: El Pacto de la Justicia",
        question: "⚖️ DR. SILICIO: 'Ja, ja! Pero no tienes permiso de uso. El 'Abogado Bot' corporativo te detendrá. ¿Qué representa realmente una Licencia de Software?'",
        options: [
            "El derecho de propiedad total y absoluta sobre tu empresa.",
            "Un contrato legal que define los derechos, restricciones y condiciones bajo las cuales se puede usar el software.",
            "Un certificado de garantía de hardware ilimitado por 10 años.",
            "Un archivo ejecutable que elimina el código fuente."
        ],
        correct: 1,
        explanation: "¡CONTRAPARTE LEGAL MASTERIZADA! Una licencia no vende el código en sí, otorga permisos y condiciones sin transferir la autoría."
    },
    {
        level: "Fase 3: El Grito del Copyleft",
        question: "🛡️ DR. SILICIO: 'Has superado a mis abogados, pero mis copias malvadas te superan. Quiero que mi código sea abierto para siempre y que si alguien lo modifica, DEBA compartir sus cambios públicamente. ¿Qué tipo de licencia usas, Guardián?'",
        options: [
            "Licencia Propietaria o Privativa (Closed Source)",
            "Licencia Permisiva (Ejemplo: MIT)",
            "Licencia Copyleft / Fuerte (Ejemplo: GNU GPL)",
            "Dominio Público sin derechos reservados"
        ],
        correct: 2,
        explanation: "¡GRITO DEL COPYLEFT! Las licencias GPL obligan a que las obras derivadas mantengan la misma libertad. Has creado un ejército de código."
    },
    {
        level: "Fase 4: La Batalla Final: La Alianza de la Libertad",
        question: "🎯 DR. SILICIO: 'Imposible... pero mi último plan no falla. Vas a crear una Startup de tecnología rápida, quieres máxima adopción comercial, que grandes empresas usen tu librería sin restricciones y te financien. ¿Cuál es la más adecuada?'",
        options: [
            "GNU GPL, porque obliga a los bancos a liberar todo su código privado.",
            "Licencia MIT / Apache 2.0, porque son permisivas, atraen a la industria y permiten integrarlo en productos comerciales.",
            "Licencia Propietaria estricta, cobrando por cada descarga desde el primer día.",
            "No incluir ninguna licencia para evitar trámites."
        ],
        correct: 1,
        explanation: "¡ESTRATEGIA MAESTRA! Las licencias permisivas (MIT / Apache) son ideales para startups porque permiten que terceros adopten tu código sin fricciones rígidas. Has salvado el futuro."
    }
];

let currentQ = 0;
let health = 100;
let score = 0;
let combo = 1;
let shieldActive = false;

function loadQuestion() {
    if (currentQ >= questions.length) {
        endGame(true);
        return;
    }

    const q = questions[currentQ];
    document.getElementById("level-badge").innerText = q.level;
    document.getElementById("question-text").innerText = q.question;
    
    const container = document.getElementById("options-container");
    container.innerHTML = "";

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.className = "btn-option";
        btn.innerText = opt;
        btn.onclick = (e) => selectAnswer(index, e.target);
        container.appendChild(btn);
    });

    document.getElementById("feedback").classList.add("hidden");
}

function selectAnswer(index, targetElement) {
    const q = questions[currentQ];
    const feedback = document.getElementById("feedback");
    feedback.classList.remove("hidden");

    if (index === q.correct) {
        score += 100 * combo;
        combo++;
        feedback.className = "feedback-msg correct";
        feedback.innerText = "⚡️ " + q.explanation;
        targetElement.classList.add('correct-effect');
        document.body.style.backgroundColor = "rgba(0, 30, 0, 1)"; // Flash verde
    } else {
        if (shieldActive) {
            feedback.className = "feedback-msg correct";
            feedback.innerText = "🛡️ ¡El Escudo de Código absorbió el ataque! No pierdes energía.";
            shieldActive = false;
            document.body.style.backgroundColor = "rgba(100, 100, 100, 1)"; // Flash gris
        } else {
            health -= 25;
            combo = 1;
            feedback.className = "feedback-msg incorrect";
            feedback.innerText = "❌ EL DR. SILICIO TE GOLPEA. " + q.explanation;
            targetElement.classList.add('incorrect-effect');
            document.body.style.backgroundColor = "rgba(30, 0, 0, 1)"; // Flash rojo
        }
    }

    updateHUD();

    if (health <= 0) {
        endGame(false);
        return;
    }

    setTimeout(() => {
        currentQ++;
        loadQuestion();
    }, 3200);
}

function updateHUD() {
    const healthBar = document.getElementById("health-bar");
    healthBar.style.width = health + "%";
    
    if (health <= 30) {
        healthBar.style.backgroundColor = "var(--neon-pink)";
        healthBar.style.boxShadow = "0 0 20px var(--neon-pink)";
    } else {
        healthBar.style.backgroundColor = "var(--neon-green)";
        healthBar.style.boxShadow = "0 0 10px var(--neon-green)";
    }
    
    document.getElementById("score").innerText = score;
    document.getElementById("combo").innerText = "x" + combo;
}

function usePowerup(type) {
    if (type === 'shield') {
        shieldActive = true;
        alert("🛡️ Escudo de Código Activo para la siguiente pregunta.");
    } else if (type === 'oracle') {
        const q = questions[currentQ];
        const buttons = document.querySelectorAll(".btn-option");
        let removed = 0;
        buttons.forEach((btn, idx) => {
            if (idx !== q.correct && removed < 2) {
                btn.style.visibility = "hidden";
                removed++;
            }
        });
    }
}

function endGame(win) {
    const screen = document.getElementById("game-screen");
    if (win) {
        screen.innerHTML = `
            <h2>🏆 ¡HÉROE DE NEÓN-CITY!</h2>
            <p>Has derrotado al Dr. Silicio y has masterizado los misterios del software. La ciudad es libre.</p>
            <h3>PUNTUACIÓN DE HÉROE FINAL: ${score}</h3>
            <button class="btn-option" onclick="location.reload()">Jugar de nuevo (Dificultad Épica)</button>
        `;
        document.body.style.backgroundColor = "var(--hero-gold)"; // Final de oro
    } else {
        screen.innerHTML = `
            <h2>💥 NEÓN-CITY HA CAÍDO</h2>
            <p>El Dr. Silicio ha borrado el sistema. Tus habilidades no fueron suficientes.</p>
            <button class="btn-option" onclick="location.reload()">Reintentar</button>
        `;
        document.body.style.backgroundColor = "var(--bg-color)"; // Final oscuro
    }
}

// Iniciar juego
loadQuestion();
