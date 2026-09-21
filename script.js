const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const hero = document.querySelector(".hero-art");
if (hero && window.matchMedia("(pointer:fine)").matches) {
  hero.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    const card = hero.querySelector(".hero-card");
    card.style.transform = `rotate(${2 + x * 3}deg) translate(${x * 7}px, ${y * 7}px)`;
  });
  hero.addEventListener("mouseleave", () => {
    hero.querySelector(".hero-card").style.transform = "rotate(2deg)";
  });
}
