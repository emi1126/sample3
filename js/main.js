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
      : "購入ページのURLは確認中です。ボタンはInstagram（@white_muscat）を開きます。2026年7月22日の投稿では、DMでのご注文が案内されていました。";
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
})();
