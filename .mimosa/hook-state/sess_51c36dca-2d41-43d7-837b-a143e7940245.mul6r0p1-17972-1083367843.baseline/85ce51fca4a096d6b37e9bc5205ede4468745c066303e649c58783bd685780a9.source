
document.addEventListener("DOMContentLoaded", function () {
  var page = (location.pathname.split("/").pop() || "index.html");
  document.querySelectorAll(".nav a, .mobile-nav a").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    if (href.indexOf(".html") > -1 && href.indexOf("#") > -1) href = href.split("#")[0];
    if (href === page || (href === "products.html#compare" && page === "products.html")) {
      a.classList.add("active");
    }
  });

  var langBtn = document.querySelector(".lang > button");
  var langWrap = document.querySelector(".lang");
  if (langBtn && langWrap) {
    langBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      langWrap.classList.toggle("open");
    });
    document.addEventListener("click", function () {
      langWrap.classList.remove("open");
    });
    langWrap.querySelectorAll(".menu button").forEach(function (b) {
      b.addEventListener("click", function () {
        var code = b.getAttribute("data-lang");
        if (code) {
          var label = b.textContent.trim();
          langBtn.innerHTML = label + '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>';
          showToast("Preview language set to " + code.toUpperCase());
        }
        langWrap.classList.remove("open");
      });
    });
  }

  var burger = document.querySelector(".burger");
  var mobileNav = document.querySelector(".mobile-nav");
  if (burger && mobileNav) {
    burger.addEventListener("click", function () {
      mobileNav.classList.toggle("open");
    });
    mobileNav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileNav.classList.remove("open");
      });
    });
  }

  var count = document.querySelector(".cart-btn .count");
  var total = 0;
  document.querySelectorAll("[data-add]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      total += 1;
      if (count) count.textContent = total;
      showToast("Added to cart (preview)");
    });
  });

  document.querySelectorAll("[data-tab]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var name = btn.getAttribute("data-tab");
      var wrap = btn.closest("[data-tabs-wrap]");
      if (!wrap) return;
      wrap.querySelectorAll("[data-tab]").forEach(function (b) {
        b.classList.toggle("on", b === btn);
      });
      wrap.querySelectorAll("[data-panel]").forEach(function (p) {
        p.classList.toggle("on", p.getAttribute("data-panel") === name);
      });
    });
  });

  document.querySelectorAll("[data-filter]").forEach(function (chip) {
    chip.addEventListener("click", function () {
      var group = chip.closest(".filter-bar");
      var f = chip.getAttribute("data-filter");
      if (group) {
        group.querySelectorAll("[data-filter]").forEach(function (c) {
          c.classList.toggle("on", c === chip);
        });
      }
      document.querySelectorAll("[data-cat]").forEach(function (card) {
        card.style.display = f === "all" || card.getAttribute("data-cat") === f ? "" : "none";
      });
    });
  });

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      showToast("Request received (preview)");
      form.reset();
    });
  });
});

function showToast(msg) {
  var t = document.querySelector(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(function () {
    t.classList.remove("show");
  }, 2200);
}
