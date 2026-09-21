const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Barra de progreso */
const progress = document.querySelector(".progress");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* Brillo que sigue al cursor */
const glow = document.querySelector(".cursor-glow");
if (glow && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", e => {
    glow.style.opacity = "1";
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

/* Efecto 3D suave en tarjetas */
if (window.matchMedia("(pointer:fine)").matches) {
  document.querySelectorAll(".tilt").forEach(card => {
    card.addEventListener("mousemove", e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* Texto rotatorio del hero */
const typing = document.querySelector(".typing");
const words = ["de Plugins", "de Bots", "Web", "de Sistemas"];
let wordIndex = 0;
let charIndex = words[0].length;
let deleting = true;

function typeLoop() {
  if (!typing) return;
  const current = words[wordIndex];

  if (!deleting) {
    charIndex++;
    typing.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    charIndex--;
    typing.textContent = current.slice(0, Math.max(0, charIndex));
    if (charIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      charIndex = 0;
    }
  }
  setTimeout(typeLoop, deleting ? 55 : 85);
}
setTimeout(typeLoop, 1800);
