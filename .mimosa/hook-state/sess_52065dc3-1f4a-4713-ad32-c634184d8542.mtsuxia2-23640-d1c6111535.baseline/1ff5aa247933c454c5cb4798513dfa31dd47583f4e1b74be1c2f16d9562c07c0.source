
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".offer-row, .rail-products").forEach(function (track) {
    var down = false, sx = 0, sl = 0;
    track.addEventListener("mousedown", function (e) { down = true; sx = e.pageX; sl = track.scrollLeft; track.classList.add("dragging"); });
    window.addEventListener("mouseup", function () { down = false; track.classList.remove("dragging"); });
    window.addEventListener("mousemove", function (e) { if (down) track.scrollLeft = sl - (e.pageX - sx); });
  });
  document.querySelectorAll("[data-seal]").forEach(function (seal) {
    seal.addEventListener("mouseenter", function () { seal.classList.add("press"); });
    seal.addEventListener("mouseleave", function () { seal.classList.remove("press"); });
  });
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); } }); }, { threshold: 0.08 });
  document.querySelectorAll(".hero, .offers, .best, .new-arrivals, .sam, .model-picker, .reviews, .journal, .trust").forEach(function (el) { io.observe(el); });
})();

(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // paper motion signature: monolith index rows, blueprint tiles, elevation reveal
  document.querySelectorAll(".mono-row, .blue-tile, .prod-card").forEach(function (el) {
    el.style.transition = "opacity .35s ease, transform .35s ease";
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
  });
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".mono-row, .blue-tile, .prod-card").forEach(function (el) {
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    return;
  }
  var io2 = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.style.opacity = "1";
        en.target.style.transform = "none";
        io2.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".mono-row, .blue-tile, .prod-card").forEach(function (el) { io2.observe(el); });
  document.querySelectorAll("[data-craft] svg").forEach(function (svg) {
    svg.style.strokeDasharray = "800";
    svg.style.strokeDashoffset = "800";
  });
  var io3 = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.style.transition = "stroke-dashoffset 1.1s ease";
        en.target.style.strokeDashoffset = "0";
        io3.unobserve(en.target);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll("[data-craft] svg").forEach(function (svg) { io3.observe(svg); });
})();
