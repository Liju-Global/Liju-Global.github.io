// ===============================
// LIJU GLOBAL ENTERPRISES
// script.js
// ===============================

// -------------------------------
// Mobile nav toggle
// -------------------------------
const navToggle = document.getElementById("navToggle");
const navList = document.getElementById("navList");

if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("open");
            navToggle.setAttribute("aria-expanded", "false");
        });
    });
}

// -------------------------------
// Active navigation link on scroll
// -------------------------------
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

// -------------------------------
// Build catalog swatch codes + color cycle
// -------------------------------
function buildSwatchGrid(gridId, prefix) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const items = grid.querySelectorAll(".item");

    items.forEach((item, index) => {
        const swatchNum = (index % 4) + 1;
        const code = `${prefix}-${String(index + 1).padStart(2, "0")}`;

        const swatch = document.createElement("div");
        swatch.className = `swatch swatch-${swatchNum}`;
        item.prepend(swatch);

        const codeEl = document.createElement("span");
        codeEl.className = "code";
        codeEl.textContent = code;
        item.appendChild(codeEl);
    });
}

buildSwatchGrid("nylonGrid", "NYL");
buildSwatchGrid("giftGrid", "GFT");
buildSwatchGrid("printGrid", "PRT");

// -------------------------------
// Scroll reveal animation
// -------------------------------
const revealTargets = document.querySelectorAll(
    ".about-box, .service, .item, .why-us li, .contact-card"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});

// -------------------------------
// Back to top button
// -------------------------------
const topButton = document.createElement("button");
topButton.innerHTML = "&uarr;";
topButton.id = "topBtn";
topButton.setAttribute("aria-label", "Back to top");
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    topButton.style.display = window.scrollY > 400 ? "block" : "none";
});

topButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// -------------------------------
// Footer year
// -------------------------------
const footerText = document.querySelector("footer .foot-row span:first-child");
if (footerText) {
    footerText.textContent = `© ${new Date().getFullYear()} Liju Global Enterprises. All Rights Reserved.`;
}
