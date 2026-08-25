document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Mobile nav toggle */
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");

navToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mobileNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

/* Scroll reveal */
const revealEls = document.querySelectorAll(".reveal");
if (reduceMotion) {
  revealEls.forEach((el) => el.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));
}

/* Active nav link on scroll */
const sections = ["inicio", "servicios", "proceso", "contacto"]
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = document.querySelectorAll("[data-nav]");

const setActive = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.dataset.nav === id);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((section) => sectionObserver.observe(section));

/* Hero chat demo reveal */
const chatReply = document.getElementById("chatReply");
if (chatReply) {
  const revealReply = () => {
    chatReply.classList.remove("is-typing");
    chatReply.textContent = "¡Sí! Entregamos sábados y domingos de 9am a 6pm 🚀";
  };
  if (reduceMotion) {
    revealReply();
  } else {
    setTimeout(revealReply, 1800);
  }
}
