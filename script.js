/* ============================================================
   SOVRANO — script.js
   Two small jobs, both progressive enhancements:
     1. Toggle the header's "scrolled" background state.
     2. Submit the signup form via fetch with inline status messaging.
   The page is fully functional with JavaScript disabled.
   ============================================================ */
(function () {
  "use strict";

  /* ---- 1. Header scroll state ----------------------------- */
  var header = document.querySelector("[data-header]");
  if (header) {
    var SCROLLED_AT = 24; // px
    var ticking = false;

    var setState = function () {
      header.classList.toggle("is-scrolled", window.scrollY > SCROLLED_AT);
      ticking = false;
    };

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          window.requestAnimationFrame(setState);
          ticking = true;
        }
      },
      { passive: true }
    );

    setState(); // honour the initial scroll position (e.g. on reload)
  }

  /* ---- 2. Signup form ------------------------------------- */
  var form = document.querySelector("[data-signup]");
  if (!form) return;

  var status = form.querySelector("[data-signup-status]");
  var input = form.querySelector("#email");
  var honeypot = form.querySelector("#company");
  var submit = form.querySelector('button[type="submit"]');

  var setStatus = function (message, kind) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove("is-success", "is-error");
    if (kind) status.classList.add("is-" + kind);
  };

  // Basic, forgiving email shape check (the input is type=email too).
  var looksLikeEmail = function (value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  form.addEventListener("submit", function (event) {
    var action = form.getAttribute("action");

    // If the form endpoint hasn't been wired up yet, don't pretend to send.
    // Let the author know in the console and stop the placeholder POST.
    var endpointReady = action && action.indexOf("[FORM_ENDPOINT]") === -1;

    // Honeypot tripped → silently accept and do nothing (likely a bot).
    if (honeypot && honeypot.value) {
      event.preventDefault();
      setStatus("Thank you — your copy is reserved.", "success");
      form.reset();
      return;
    }

    var email = input ? input.value.trim() : "";
    if (!looksLikeEmail(email)) {
      event.preventDefault();
      setStatus("Please enter a valid email address.", "error");
      if (input) input.focus();
      return;
    }

    if (!endpointReady) {
      event.preventDefault();
      setStatus(
        "Almost there — the signup list isn't connected yet. Please check back shortly.",
        "error"
      );
      // Helpful nudge for whoever is configuring the site.
      if (window.console) {
        console.warn(
          "[Sovrano] No form endpoint set. Replace action=\"[FORM_ENDPOINT]\" in index.html with your Formspree/Buttondown/Mailchimp URL."
        );
      }
      return;
    }

    // From here we progressively enhance: intercept and send via fetch so the
    // visitor stays on the page. If fetch fails we fall back gracefully.
    if (!window.fetch) return; // let the native POST proceed

    event.preventDefault();

    var data = new FormData(form);
    if (submit) {
      submit.disabled = true;
      submit.dataset.label = submit.textContent;
      submit.textContent = "Reserving…";
    }
    setStatus("One moment…", null);

    fetch(action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          setStatus("Thank you — we'll write once, when Issue 01 is ready.", "success");
        } else {
          return response.json().then(
            function (body) {
              var msg =
                body && body.errors && body.errors.length
                  ? body.errors.map(function (e) { return e.message; }).join(", ")
                  : "Something went wrong. Please try again.";
              setStatus(msg, "error");
            },
            function () {
              setStatus("Something went wrong. Please try again.", "error");
            }
          );
        }
      })
      .catch(function () {
        setStatus(
          "We couldn't reach the server. Please check your connection and try again.",
          "error"
        );
      })
      .finally(function () {
        if (submit) {
          submit.disabled = false;
          if (submit.dataset.label) submit.textContent = submit.dataset.label;
        }
      });
  });
})();
