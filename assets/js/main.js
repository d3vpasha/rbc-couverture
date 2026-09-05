/* RBC Couverture - interactions minimales */
(function () {
  "use strict";

  var DESTINATAIRE = "dubal.rbccouverture@gmail.com"; // TODO: contact@rbc-couverture.fr apres achat du domaine

  /* ---- menu mobile ---- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  burger.addEventListener("click", function () {
    var ouvert = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!ouvert));
    burger.setAttribute("aria-label", ouvert ? "Ouvrir le menu" : "Fermer le menu");
    nav.classList.toggle("ouvert", !ouvert);
  });

  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      nav.classList.remove("ouvert");
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", "Ouvrir le menu");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("ouvert")) {
      nav.classList.remove("ouvert");
      burger.setAttribute("aria-expanded", "false");
      burger.focus();
    }
  });

  /* ---- lien actif dans le header ---- */
  var liens = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var sections = liens
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var obsNav = new IntersectionObserver(function (entrees) {
      entrees.forEach(function (entree) {
        if (!entree.isIntersecting) return;
        liens.forEach(function (a) {
          a.classList.toggle("actif", a.getAttribute("href") === "#" + entree.target.id);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { obsNav.observe(s); });

    /* ---- apparition au scroll ---- */
    var obsRev = new IntersectionObserver(function (entrees, obs) {
      entrees.forEach(function (entree) {
        if (!entree.isIntersecting) return;
        entree.target.classList.add("vu");
        obs.unobserve(entree.target);
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    document.querySelectorAll(".rev").forEach(function (el) { obsRev.observe(el); });
  } else {
    document.querySelectorAll(".rev").forEach(function (el) { el.classList.add("vu"); });
  }

  /* ---- FAQ ---- */
  document.querySelectorAll(".faq-q").forEach(function (bouton) {
    bouton.addEventListener("click", function () {
      var ouvert = bouton.getAttribute("aria-expanded") === "true";
      bouton.setAttribute("aria-expanded", String(!ouvert));
    });
  });

  /* ---- formulaire -> mailto prerempli ---- */
  var form = document.getElementById("form-devis");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var v = function (id) { return (document.getElementById(id).value || "").trim(); };
    var nom = v("nom");
    var tel = v("tel");

    var sujet = "Demande de devis - " + v("travaux") + " - " + nom;
    var corps = [
      "Bonjour,",
      "",
      "Je souhaite un devis pour : " + v("travaux"),
      "",
      "Nom : " + nom,
      "Téléphone : " + tel,
      "E-mail : " + (v("email") || "-"),
      "Commune du chantier : " + (v("ville") || "-"),
      "",
      "Demande :",
      v("message") || "-",
      "",
      "Cordialement,",
      nom
    ].join("\n");

    window.location.href =
      "mailto:" + DESTINATAIRE +
      "?subject=" + encodeURIComponent(sujet) +
      "&body=" + encodeURIComponent(corps);
  });

  /* ---- annee du footer ---- */
  document.getElementById("annee").textContent = new Date().getFullYear();
})();
