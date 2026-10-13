(function () {
  var header = document.getElementById("header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var main = document.getElementById("main");
  var footer = document.querySelector(".footer");
  var hero = document.querySelector(".hero");
  var dialog = document.getElementById("detail-dialog");
  var closeButton = document.getElementById("detail-close");
  var submitButton = document.getElementById("contact-submit");
  var status = document.getElementById("form-status");
  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var mobileQuery = window.matchMedia("(max-width: 1023px)");
  var lastFocus = null;
  var parallaxNodes = document.querySelectorAll("[data-parallax]");
  var ticking = false;

  function setReady() {
    if (hero) hero.classList.add("is-ready");
  }

  function showAllReveals() {
    document.querySelectorAll(".reveal").forEach(function (node) {
      node.classList.add("is-visible");
    });
  }

  if (motionQuery.matches || !("IntersectionObserver" in window)) {
    setReady();
    showAllReveals();
  } else {
    requestAnimationFrame(function () {
      requestAnimationFrame(setReady);
    });
    var reveals = document.querySelectorAll(".reveal");
    if (reveals.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      reveals.forEach(function (node) { observer.observe(node); });
    }
  }

  function closeMenu() {
    if (!header || !toggle || !nav) return;
    header.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "メニューを開く");
    if (main) main.removeAttribute("inert");
    if (footer) footer.removeAttribute("inert");
    if (mobileQuery.matches) nav.setAttribute("inert", "");
  }

  function openMenu() {
    if (!header || !toggle || !nav) return;
    header.classList.add("is-open");
    document.body.classList.add("nav-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "メニューを閉じる");
    nav.removeAttribute("inert");
    if (main) main.setAttribute("inert", "");
    if (footer) footer.setAttribute("inert", "");
    var first = nav.querySelector("a");
    if (first) first.focus();
  }

  function syncNav() {
    if (!nav) return;
    if (!mobileQuery.matches) {
      closeMenu();
      nav.removeAttribute("inert");
      return;
    }
    if (!header.classList.contains("is-open")) nav.setAttribute("inert", "");
  }

  if (toggle && nav) {
    syncNav();
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
        toggle.focus();
      } else {
        openMenu();
      }
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (mobileQuery.matches) {
          closeMenu();
        }
      });
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });
    if (mobileQuery.addEventListener) {
      mobileQuery.addEventListener("change", syncNav);
    } else if (mobileQuery.addListener) {
      mobileQuery.addListener(syncNav);
    }
  }

  function updateParallax() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (motionQuery.matches || mobileQuery.matches) {
      parallaxNodes.forEach(function (node) { node.style.transform = ""; });
      return;
    }
    var view = window.innerHeight || 1;
    parallaxNodes.forEach(function (node) {
      var rect = node.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > view) return;
      var progress = (rect.top + rect.height / 2 - view / 2) / view;
      var shift = Math.max(-16, Math.min(16, progress * -20));
      node.style.transform = "translate3d(0," + shift.toFixed(1) + "px,0)";
    });
  }

  function onScroll() {
    ticking = false;
    updateParallax();
  }

  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  updateParallax();

  function fillDialog(button) {
    document.getElementById("detail-en").textContent = button.getAttribute("data-en") || "";
    document.getElementById("detail-title").textContent = button.getAttribute("data-name") || "";
    document.getElementById("detail-text").textContent = button.getAttribute("data-text") || "";
    var price = document.getElementById("detail-price");
    price.textContent = "";
    var label = document.createElement("span");
    label.className = "price-label";
    label.textContent = "参考価格";
    var num = document.createElement("span");
    num.className = "price-num";
    num.textContent = button.getAttribute("data-price") || "";
    price.appendChild(label);
    price.appendChild(num);
  }

  document.querySelectorAll("[data-detail]").forEach(function (button) {
    button.addEventListener("click", function () {
      if (!dialog || typeof dialog.showModal !== "function") return;
      lastFocus = button;
      fillDialog(button);
      dialog.showModal();
    });
  });

  if (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", function () {
      if (lastFocus) lastFocus.focus();
    });
  }
  if (closeButton && dialog) {
    closeButton.addEventListener("click", function () { dialog.close(); });
  }

  if (submitButton && status) {
    submitButton.addEventListener("click", function () {
      status.textContent = "送信は行われていません。このフォームはデモです。";
    });
  }
})();
