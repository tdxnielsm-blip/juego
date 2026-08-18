const questions = [
    {
        level: "Nivel 1: Concepto Fundamental",
        question: "🚨 ¡ALERTA DE SERVIDORES! El sistema exige definir la infraestructura. ¿Qué es exactamente el Software?",
        options: [
            "El conjunto de componentes físicos como tarjetas de video, cables y procesadores.",
            "El conjunto de programas, datos, instrucciones y reglas informáticas para ejecutar tareas en un sistema.",
            "La velocidad de conexión que entrega tu proveedor de Internet.",
            "Un tipo de virus diseñado para dañar la memoria RAM."
        ],
        correct: 1,
        explanation: "¡Correcto! El software es la parte intangible o lógica que le indica al hardware qué tareas debe realizar."
    },
    {
        level: "Nivel 2: El Escudo Legal",
        question: "⚖️ Un cliente corporativo quiere tu aplicación pero exige una Licencia de Software. ¿Qué representa realmente este documento?",
        options: [
            "La venta de la propiedad absoluta y total de tu empresa.",
            "Un contrato legal que otorga derechos, permisos y establece restricciones de uso sobre el software.",
            "Un certificado de garantía de hardware ilimitado por 10 años.",
            "Un archivo ejecutable que elimina el código fuente."
        ],
        correct: 1,
        explanation: "¡Exacto! La licencia regula el derecho de uso, distribución o modificación sin transferir la autoría del código."
    },
    {
        level: "Nivel 3: El Arsenal de Licencias",
        question: "🛡️ Quieres que tu código sea abierto para siempre y que si alguien lo modifica, obligatoriamente deba liberar sus mejoras. ¿Qué tipo de licencia usas?",
        options: [
            "Licencia Propietaria o Privativa (Closed Source)",
            "Licencia Permisiva (Ejemplo: MIT)",
            "Licencia Copyleft / Fuerte (Ejemplo: GNU GPL)",
            "Dominio Público sin derechos reservados"
        ],
        correct: 2,
        explanation: "¡Gran decisión! Las licencias Copyleft (como GPL) garantizan que las obras derivadas sigan siendo libres y de código abierto."
    },
    {
        level: "Nivel 4: Estrategia de Arquitecto",
        question: "🎯 CASO REAL: Vas a lanzar una Startup de tecnología rápida. Buscas máxima adopción, que grandes empresas usen tu librería sin miedo y colaboren. ¿Cuál es la más adecuada?",
        options: [
            "GNU GPL, porque obliga a los bancos a publicar todo su código privado.",
            "Licencia Permisiva (MIT / Apache 2.0), porque reduce la fricción legal y facilita la integración comercial.",
            "Licencia Propietaria estricta, cobrando por cada descarga desde el primer día.",
            "No incluir ninguna licencia para evitar trámites."
        ],
        correct: 1,
        explanation: "¡Estrategia Maestra! Las licencias permisivas (MIT / Apache) son ideales para startups porque permiten que terceros adopten tu código sin restricciones rígidas."
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
        btn.onclick = () => selectAnswer(index);
        container.appendChild(btn);
    });

    document.getElementById("feedback").classList.add("hidden");
}

function selectAnswer(index) {
    const q = questions[currentQ];
    const feedback = document.getElementById("feedback");
    feedback.classList.remove("hidden");

    if (index === q.correct) {
        score += 100 * combo;
        combo++;
        feedback.className = "feedback-msg correct";
        feedback.innerText = "💥 " + q.explanation;
    } else {
        if (shieldActive) {
            feedback.className = "feedback-msg correct";
            feedback.innerText = "🛡️ ¡El Escudo Legal absorbió el impacto! No sufres daño.";
            shieldActive = false;
        } else {
            health -= 25;
            combo = 1;
            feedback.className = "feedback-msg incorrect";
            feedback.innerText = "❌ ERROR EN EL SISTEMA. " + q.explanation;
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
    }, 2800);
}

function updateHUD() {
    const healthBar = document.getElementById("health-bar");
    healthBar.style.width = health + "%";
    
    if (health <= 30) {
        healthBar.style.backgroundColor = "var(--neon-pink)";
    } else {
        healthBar.style.backgroundColor = "var(--neon-green)";
    }
    
    document.getElementById("score").innerText = score;
    document.getElementById("combo").innerText = "x" + combo;
}

function usePowerup(type) {
    if (type === 'shield') {
        shieldActive = true;
        alert("🛡️ Escudo Activo para la siguiente pregunta.");
    } else if (type === 'stack') {
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
            <h2>🎉 ¡SISTEMA LANZADO CON ÉXITO!</h2>
            <p>Has demostrado un dominio total del software y sus licencias legalmente sólidas.</p>
            <h3>PUNTUACIÓN FINAL: ${score} Puntos</h3>
            <button class="btn-option" onclick="location.reload()">Jugar de nuevo</button>
        `;
    } else {
        screen.innerHTML = `
            <h2>💥 SERVIDOR COLAPSADO</h2>
            <p>Tu aplicación sufrió un bloqueo legal severo debido a errores conceptuales.</p>
            <button class="btn-option" onclick="location.reload()">Reintentar</button>
        `;
    }
}

// Iniciar juego
loadQuestion();
