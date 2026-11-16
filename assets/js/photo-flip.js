(function () {
  "use strict";
  var figure = document.querySelector("[data-photo-flip]");
  if (!figure) return;
  var button = figure.querySelector("[data-photo-toggle]");
  var front = figure.querySelector("[data-photo-front]");
  var back = figure.querySelector("[data-photo-back]");
  if (!button || !front || !back) return;
  var flipped = false;
  button.hidden = false;
  button.addEventListener("click", function () {
    flipped = !flipped;
    figure.classList.toggle("is-flipped", flipped);
    front.setAttribute("aria-hidden", String(flipped));
    back.setAttribute("aria-hidden", String(!flipped));
    button.setAttribute("aria-pressed", String(flipped));
    button.setAttribute("aria-label", flipped ? "Show ICML workshop photo" : "Show profile portrait");
  });
}());
