const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");
const backToTop = document.getElementById("backToTop");
const reveals = document.querySelectorAll(".reveal");

function setTheme(theme) {
  root.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Mode: Dark" : "Mode: Light";
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  setTheme("dark");
} else {
  setTheme("light");
}

themeToggle.addEventListener("click", () => {
  const nextTheme = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  setTheme(nextTheme);
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 360) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((element) => observer.observe(element));
