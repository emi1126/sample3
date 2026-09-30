(function () {
  var config = (typeof siteConfig !== "undefined" ? siteConfig : window.siteConfig) || {};
  var purchaseUrl = typeof config.purchaseUrl === "string" ? config.purchaseUrl.trim() : "";
  var instagramUrl = config.instagramUrl || "https://www.instagram.com/white_muscat/";
  var hasPurchaseUrl = /^https?:\/\//i.test(purchaseUrl);
  var purchaseHref = hasPurchaseUrl ? purchaseUrl : instagramUrl;

  document.querySelectorAll("[data-purchase]").forEach(function (link) {
    link.href = purchaseHref;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (hasPurchaseUrl) {
      link.removeAttribute("aria-describedby");
    } else {
      link.setAttribute("aria-describedby", "purchase-fallback-note");
    }
  });

  document.querySelectorAll("[data-instagram]").forEach(function (link) {
    link.href = instagramUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  var orderNote = document.getElementById("purchase-fallback-note");
  if (orderNote) {
    orderNote.textContent = hasPurchaseUrl
      ? "購入ボタンから、注文フォームが開きます。"
      : "ご注文はInstagramからご案内します。";
  }

  document.querySelectorAll(".faq-item").forEach(function (item) {
    var button = item.querySelector("button");
    var panel = item.querySelector(".faq-panel");
    if (!button || !panel) {
      return;
    }
    button.addEventListener("click", function () {
      var open = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", open ? "false" : "true");
      panel.hidden = open;
    });
  });

  var motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  var hero = document.querySelector(".hero");
  var motionNodes = document.querySelectorAll(".reveal, .image-reveal");
  function showMotion() {
    if (hero) {
      hero.classList.add("is-ready");
    }
    motionNodes.forEach(function (node) {
      node.classList.add("is-visible");
    });
  }

  if (motionQuery.matches || !("IntersectionObserver" in window)) {
    showMotion();
  } else {
    if (hero) {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          hero.classList.add("is-ready");
        });
      });
    }

    if (motionNodes.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
              return;
            }
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px 12% 0px" }
      );
      motionNodes.forEach(function (node) {
        observer.observe(node);
      });
    }

  }

})();
