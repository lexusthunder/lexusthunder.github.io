/* The Lantern Hour — page behaviour. Everything configurable lives in config.js. */
(function () {
  var S = window.SITE || {};
  var price = S.PRICE || "€14.99";
  var $ = function (id) { return document.getElementById(id); };

  document.querySelectorAll("[data-price]").forEach(function (e) { e.textContent = price; });

  // --- Checkout: a hosted checkout link (Stripe / Payhip / Gumroad) wins over the bank fallback ---
  var btn = $("buyBtn"), fine = $("buyFine");
  if (btn && /^https:\/\/(buy\.stripe\.com|checkout\.stripe\.com|payhip\.com|[a-z0-9-]+\.gumroad\.com|gum\.co)\//.test(S.PAYMENT_LINK || "")) {
    btn.href = S.PAYMENT_LINK;
    btn.textContent = "Buy now — " + price;
    fine.textContent = "Secure checkout by our payment provider. Your PDF and EPUB are delivered right after payment.";
  }
  var b = S.BANK || {};
  var bank = $("bank");
  if (bank && /^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$/.test((b.iban || "").replace(/\s+/g, ""))) {
    $("bName").textContent = b.name || "";
    $("bIban").textContent = b.iban;
    $("bBic").textContent = b.bic || "";
    bank.style.display = "block";
    if (btn && !/^https:\/\//.test(btn.href)) {
      btn.textContent = "Pay by bank transfer ↓";
      btn.href = "#bank";
      fine.textContent = "Pay by SEPA transfer, then email us your confirmation. The book is sent within one business day.";
    }
  }

  // --- Email list: shown only when an endpoint is configured; consent checkbox is required in the markup ---
  var form = $("subForm");
  if (form && /^https:\/\//.test(S.SUBSCRIBE_URL || "")) {
    form.action = S.SUBSCRIBE_URL;
    form.hidden = false;
  }

  // --- Privacy-friendly analytics (cookieless, aggregate; Plausible). Off unless a domain is set ---
  var A = S.ANALYTICS || {};
  if (A.domain) {
    window.plausible = window.plausible || function () { (window.plausible.q = window.plausible.q || []).push(arguments); };
    var s = document.createElement("script");
    s.defer = true;
    s.setAttribute("data-domain", A.domain);
    s.src = A.src || "https://plausible.io/js/script.js";
    document.head.appendChild(s);
  }
  document.addEventListener("click", function (e) {
    var el = e.target.closest && e.target.closest("[data-evt]");
    if (el && window.plausible) window.plausible(el.getAttribute("data-evt"));
  });
  if (form) form.addEventListener("submit", function () { if (window.plausible) window.plausible("Email Signup"); });

  // --- Mobile sticky buy bar: visible after the hero, hidden once the buy section is on screen ---
  var sticky = $("stickyBuy"), buy = $("buy"), hero = document.querySelector(".hero");
  if (sticky && buy && hero && "IntersectionObserver" in window) {
    var heroGone = false, buyVisible = false;
    var update = function () {
      var on = heroGone && !buyVisible;
      sticky.classList.toggle("on", on);
      sticky.setAttribute("aria-hidden", on ? "false" : "true");
      var a = sticky.querySelector("a"); if (a) a.tabIndex = on ? 0 : -1;
    };
    new IntersectionObserver(function (en) { heroGone = !en[0].isIntersecting; update(); }).observe(hero);
    new IntersectionObserver(function (en) { buyVisible = en[0].isIntersecting; update(); }, { threshold: 0.15 }).observe(buy);
  }
})();
