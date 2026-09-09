
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("in-view"); });
    return;
  }
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll("[data-reveal]").forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in-view"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  }
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".ksd-visual .img, .ksu-scene").forEach(function (el) {
      gsap.fromTo(el, { y: 40, opacity: 0.4 }, {
        y: 0, opacity: 1, duration: 1.1, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 88%" }
      });
    });
  }
  document.querySelectorAll(".offer-row, .rail-products, .film-strip, .bottle-rack").forEach(function (track) {
    var down = false, sx = 0, sl = 0;
    track.addEventListener("mousedown", function (e) { down = true; sx = e.pageX; sl = track.scrollLeft; track.classList.add("dragging"); });
    window.addEventListener("mouseup", function () { down = false; track.classList.remove("dragging"); });
    window.addEventListener("mousemove", function (e) { if (down) track.scrollLeft = sl - (e.pageX - sx); });
  });
  var header = document.querySelector(".header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
})();
