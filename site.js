/* Auntie Chelle's — the only JavaScript on the site.
   Two things: the phone menu, and the photo carousel on the home page.
   The site works fine without this file; it just gets less interactive. */

(function () {
  "use strict";

  /* ---------------------------------------------------- phone menu ---- */

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.setAttribute("data-open", String(!open));
    });

    // Tapping a link closes the menu again.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        toggle.setAttribute("aria-expanded", "false");
        nav.setAttribute("data-open", "false");
      }
    });
  }

  /* ------------------------------------------------------ carousel ---- */

  var root = document.querySelector("[data-gallery]");
  if (!root) return;

  var track = root.querySelector("[data-gallery-track]");
  var slides = Array.prototype.slice.call(root.querySelectorAll(".gallery__slide"));
  var dotsBox = root.querySelector("[data-gallery-dots]");
  var captionEl = root.querySelector("[data-gallery-caption]");
  var prevBtn = document.querySelector("[data-gallery-prev]");
  var nextBtn = document.querySelector("[data-gallery-next]");

  if (!track || slides.length === 0) return;

  var index = 0;
  var timer = null;
  var DELAY = 5000;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build one dot per slide, so adding a slide in the HTML just works.
  var dots = slides.map(function (slide, i) {
    var dot = document.createElement("button");
    dot.type = "button";
    dot.className = "gallery__dot";
    dot.setAttribute("aria-label", "Show photo " + (i + 1));
    dot.addEventListener("click", function () {
      go(i);
      restart();
    });
    if (dotsBox) dotsBox.appendChild(dot);
    return dot;
  });

  function go(n) {
    index = (n + slides.length) % slides.length;
    track.style.transform = "translateX(-" + index * 100 + "%)";
    dots.forEach(function (dot, i) {
      dot.setAttribute("aria-current", String(i === index));
    });
    if (captionEl) {
      captionEl.textContent = slides[index].getAttribute("data-caption") || "";
    }
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  function start() {
    if (reduceMotion || timer) return;
    timer = setInterval(next, DELAY);
  }
  function stop() {
    clearInterval(timer);
    timer = null;
  }
  function restart() { stop(); start(); }

  if (nextBtn) nextBtn.addEventListener("click", function () { next(); restart(); });
  if (prevBtn) prevBtn.addEventListener("click", function () { prev(); restart(); });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);

  // Pause while the tab is in the background.
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) { stop(); } else { start(); }
  });

  // Swipe on phones.
  var startX = null;
  root.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    stop();
  }, { passive: true });

  root.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
    startX = null;
    start();
  }, { passive: true });

  go(0);
  start();
})();
