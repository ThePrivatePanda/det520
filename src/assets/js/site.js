(function () {
  "use strict";

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var close = document.querySelector(".nav-close");
  function isMobile() { return window.matchMedia("(max-width: 900px)").matches; }
  function setNav(open) {
    if (nav) nav.hidden = !open && isMobile();
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { setNav(nav.hidden); });
    if (close) close.addEventListener("click", function () { setNav(false); });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") setNav(false);
    });
    window.addEventListener("resize", function () {
      nav.hidden = isMobile() && toggle.getAttribute("aria-expanded") !== "true";
    });
    nav.hidden = isMobile();
  }

  // Scroll reveal
  if ("IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  }
})();
