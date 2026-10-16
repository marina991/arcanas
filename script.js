// ARCANA — INTERACCIONES

const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menuToggle");
const modal = document.getElementById("magicModal");
const modalTitle = document.getElementById("modalTitle");
const modalContent = document.getElementById("modalContent");
const modalClose = document.getElementById("modalClose");
const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");

// Menú para celulares
menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    menuToggle.textContent = isOpen ? "×" : "☰";
});

navigation.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
    });
});

// Contenido de las secciones interactivas
const magicContent = {
    spells: {
        title: "El Grimorio",
        html: `
            <p>Bienvenido al archivo de hechizos de ARCANA. Cada fórmula pertenece a un universo de fantasía.</p>
            <div class="spell-result">
                <h3>✦ LUMEN AETERNA</h3>
                <p><strong>Elemento:</strong> Luz.</p>
                <p><strong>Descripción:</strong> una pequeña esfera luminosa que revela los detalles ocultos de la oscuridad.</p>
                <p><strong>Fórmula ficticia:</strong> "Lumen, revela lo invisible".</p>
                <button class="modal-action" data-action="light">INVOCAR LUZ ✧</button>
                <div id="spellFeedback" aria-live="polite"></div>
            </div>
            <div class="spell-result">
                <h3>✦ AEGIS NOCTIS</h3>
                <p><strong>Elemento:</strong> Protección.</p>
                <p>Una barrera de energía imaginaria que envuelve al mago en luz azul.</p>
            </div>`
    },
    potions: {
        title: "El laboratorio de alquimia",
        html: `
            <p>Experimenta con ingredientes mágicos y descubre nuevas combinaciones.</p>
            <label for="ingredientOne">Primer ingrediente</label>
            <select id="ingredientOne">
                <option value="moon">Flor lunar</option>
                <option value="shadow">Raíz de sombra</option>
                <option value="crystal">Cristal de escarcha</option>
                <option value="star">Polvo de estrella</option>
            </select>
            <br><br>
            <label for="ingredientTwo">Segundo ingrediente</label>
            <select id="ingredientTwo">
                <option value="star">Polvo de estrella</option>
                <option value="moon">Flor lunar</option>
                <option value="shadow">Raíz de sombra</option>
                <option value="crystal">Cristal de escarcha</option>
            </select>
            <br>
            <button class="modal-action" data-action="brew">PREPARAR POCIÓN</button>
            <div id="potionFeedback" class="spell-result" aria-live="polite">El caldero espera tus ingredientes.</div>`
    },
    creatures: {
        title: "El bestiario",
        html: `
            <p>No todas las criaturas desean ser encontradas. Algunas protegen secretos antiguos.</p>
            <div class="spell-result">
                <h3>✦ DRACONIS LUNAR</h3>
                <p><strong>Clasificación:</strong> Guardián ancestral.</p>
                <p><strong>Hábitat:</strong> Montañas cubiertas de niebla.</p>
                <p>Sus escamas reflejan la luz de la luna. Según las leyendas de ARCANA, puede detectar los objetos mágicos escondidos.</p>
            </div>
            <div class="spell-result">
                <h3>✦ CORVUS UMBRA</h3>
                <p><strong>Clasificación:</strong> Espíritu mensajero.</p>
                <p>Un cuervo de plumaje oscuro que aparece en los caminos de quienes buscan respuestas.</p>
            </div>`
    },
    relics: {
        title: "La bóveda de reliquias",
        html: `
            <p>Estos objetos forman parte de la historia ficticia del universo ARCANA.</p>
            <div class="spell-result">
                <h3>✦ EL ORBE DEL ECLIPSE</h3>
                <p>Un cristal oscuro que parece contener un cielo estrellado en su interior.</p>
                <p><strong>Propiedad legendaria:</strong> mostrar recuerdos olvidados.</p>
            </div>
            <div class="spell-result">
                <h3>✦ EL RELOJ DE LAS HORAS PERDIDAS</h3>
                <p>Un antiguo reloj detenido a una hora que nadie ha conseguido descifrar.</p>
            </div>`
    },
    practice: {
        title: "Tu primera lección",
        html: `
            <p>Concéntrate. Elige el símbolo que representa la luz en el grimorio de ARCANA.</p>
            <button class="modal-action" data-action="wrong">☾ SOMBRA</button>
            <button class="modal-action" data-action="correct">✧ LUZ</button>
            <button class="modal-action" data-action="wrong">❄ ESCARCHA</button>
            <div id="practiceFeedback" class="spell-result" aria-live="polite">Esperando tu elección...</div>`
    }
};

// Abrir y cerrar ventanas
function openModal(key) {
    const item = magicContent[key];
    if (!item) return;
    modalTitle.textContent = item.title;
    modalContent.innerHTML = item.html;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modalClose.focus();
}

function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
}

document.querySelectorAll("[data-modal]").forEach(button => {
    button.addEventListener("click", () => openModal(button.dataset.modal));
});

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", event => {
    if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) closeModal();
});

// Acciones dentro de las ventanas
modalContent.addEventListener("click", event => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const action = button.dataset.action;

    if (action === "light") {
        document.getElementById("spellFeedback").innerHTML = `
            <p>✨ ¡LUMEN AETERNA!</p>
            <p>Una esfera de luz imaginaria ilumina las páginas del grimorio.</p>`;
        modal.classList.add("magic-flash");
        setTimeout(() => modal.classList.remove("magic-flash"), 500);
    }

    if (action === "brew") {
        const first = document.getElementById("ingredientOne").value;
        const second = document.getElementById("ingredientTwo").value;
        const feedback = document.getElementById("potionFeedback");
        const ingredients = [first, second].sort();

        const recipes = {
            "moon,star": { name: "Elixir de Aurora", description: "Una poción luminosa que libera partículas doradas." },
            "shadow,star": { name: "Esencia del Eclipse", description: "Una mezcla oscura que brilla con destellos violetas." },
            "crystal,star": { name: "Lágrima Celestial", description: "Una poción cristalina cubierta de pequeñas luces." },
            "moon,shadow": { name: "Niebla de los Sueños", description: "Una mezcla misteriosa que produce una nube plateada." },
            "crystal,moon": { name: "Escarcha Lunar", description: "Una poción azulada que parece contener diminutos cristales." },
            "crystal,shadow": { name: "Sombra Glacial", description: "Una poción oscura rodeada de un brillo helado." }
        };

        if (first === second) {
            feedback.innerHTML = `<h3>☁ Mezcla inestable</h3><p>Los ingredientes son demasiado similares. El caldero necesita una combinación diferente.</p>`;
            return;
        }

        const recipe = recipes[ingredients.join(",")];
        feedback.innerHTML = `<h3>✧ ${recipe.name}</h3><p>${recipe.description}</p><p>¡Has descubierto una receta ficticia del laboratorio de ARCANA!</p>`;
    }

    if (action === "correct") {
        document.getElementById("practiceFeedback").innerHTML = `
            <h3>✧ ¡HECHIZO COMPLETADO!</h3>
            <p>Has invocado LUMEN AETERNA. Una luz azul ilumina tu primer paso dentro del mundo arcano.</p>`;
    }

    if (action === "wrong") {
        document.getElementById("practiceFeedback").innerHTML = `
            <p>✦ El símbolo no coincide con la fórmula. Inténtalo nuevamente.</p>`;
    }
});

// Mensaje secreto
secretButton.addEventListener("click", () => {
    secretMessage.hidden = false;
    secretButton.textContent = "✦ EL SECRETO HA SIDO REVELADO ✦";
    secretButton.disabled = true;
});
/* =====================================
   ARCANA — PARTÍCULAS MÁGICAS
===================================== */

(function iniciarMagiaAmbiental() {
    if (window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches) {
        return;
    }

    let capa = document.getElementById("arcana-particulas");

    if (!capa) {
        capa = document.createElement("div");
        capa.id = "arcana-particulas";
        capa.setAttribute("aria-hidden", "true");
        document.body.appendChild(capa);
    }

    function crearDestello() {
        if (document.hidden) return;

        const destello = document.createElement("span");
        destello.className = "arcana-destello";

        const tamano = Math.random() * 4 + 2;

        destello.style.width = tamano + "px";
        destello.style.height = tamano + "px";
        destello.style.left = Math.random() * 100 + "%";
        destello.style.top = Math.random() * 100 + "%";
        destello.style.animationDuration =
            (Math.random() * 4 + 4) + "s";

        capa.appendChild(destello);

        destello.addEventListener("animationend", function () {
            destello.remove();
        }, { once: true });
    }

    setInterval(crearDestello, 450);
})();