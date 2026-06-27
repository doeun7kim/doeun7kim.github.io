(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector("[data-theme-toggle]");

  if (!toggle) {
    return;
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyTheme(theme) {
    var normalized = theme === "dark" ? "dark" : "light";
    root.setAttribute("data-theme", normalized);
    toggle.setAttribute("aria-pressed", normalized === "dark" ? "true" : "false");
    toggle.setAttribute(
      "aria-label",
      normalized === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );

    try {
      localStorage.setItem("theme", normalized);
    } catch (error) {
      // The visual theme can still work when storage is unavailable.
    }

    window.dispatchEvent(new CustomEvent("themechange", {
      detail: { theme: normalized }
    }));
  }

  toggle.addEventListener("click", function () {
    applyTheme(currentTheme() === "dark" ? "light" : "dark");
  });

  applyTheme(currentTheme());
}());
