
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll(".offer-row, .pc-grid, .register-list").forEach(function (track) {
    var down = false, sx = 0, sl = 0;
    track.addEventListener("mousedown", function (e) { down = true; sx = e.pageX; sl = track.scrollLeft; track.classList.add("dragging"); });
    window.addEventListener("mouseup", function () { down = false; track.classList.remove("dragging"); });
    window.addEventListener("mousemove", function (e) { if (down) track.scrollLeft = sl - (e.pageX - sx); });
  });
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (es) { es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); } }); }, { threshold: 0.08 });
  document.querySelectorAll(".hero, .offers, .best, .new-arrivals, .sam, .model-picker, .reviews, .journal, .trust").forEach(function (el) { io.observe(el); });
})();
