
/* V1.5 signature motion: rw-track horizontal rail + scroll reveal.
   Adapted from the MagicUI Marquee concept; local vanilla implementation.
   Reduced-motion is respected: all animation is skipped for those users. */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.querySelectorAll(".rw-track").forEach(function (track) {
    var down = false, startX = 0, startLeft = 0;
    track.addEventListener("mousedown", function (e) {
      down = true;
      startX = e.pageX;
      startLeft = track.scrollLeft;
      track.classList.add("dragging");
    });
    window.addEventListener("mouseup", function () {
      if (down) {
        down = false;
        track.classList.remove("dragging");
      }
    });
    window.addEventListener("mousemove", function (e) {
      if (!down) return;
      track.scrollLeft = startLeft - (e.pageX - startX);
    });
  });

  var revealTargets = document.querySelectorAll(".chapter, .ledger-section, .quote-section, .cert-section, .audit-section, .journal-section");
  if (!("IntersectionObserver" in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("in-view");
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08 });
  revealTargets.forEach(function (el) { io.observe(el); });
})();
