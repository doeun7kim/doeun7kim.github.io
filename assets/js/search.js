(function () {
  "use strict";
  var trigger = document.querySelector("[data-search-open]");
  var modal = document.querySelector("[data-search-modal]");
  if (!trigger || !modal || typeof modal.showModal !== "function") return;
  var input = modal.querySelector("[data-search-input]");
  var results = modal.querySelector("[data-search-results]");
  var status = modal.querySelector("[data-search-status]");
  var pages = null;
  var pending = null;
  var previousFocus;
  trigger.hidden = false;
  function render() {
    results.replaceChildren();
    if (!pages) return;
    var terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    var matches = terms.length ? pages.filter(function (page) {
      var text = (page.title + " " + page.summary + " " + page.text).toLowerCase();
      return terms.every(function (term) { return text.indexOf(term) !== -1; });
    }) : pages.slice(0, 4);
    status.textContent = terms.length ? (matches.length ? matches.length + " result" + (matches.length === 1 ? "" : "s") : "No results. Try a project name, topic, or skill.") : "Explore the site";
    matches.forEach(function (page) {
      var link = document.createElement("a");
      link.className = "search-result";
      link.href = page.url;
      var title = document.createElement("strong");
      title.textContent = page.title;
      var description = document.createElement("span");
      description.textContent = page.summary;
      link.append(title, description);
      results.appendChild(link);
    });
  }
  function loadIndex() {
    if (pages) { render(); return; }
    if (pending) return;
    status.textContent = "Loading search…";
    pending = fetch(modal.dataset.searchIndex).then(function (response) {
      if (!response.ok) throw new Error("Search unavailable");
      return response.json();
    }).then(function (data) {
      pages = data;
      render();
    }).catch(function () {
      status.textContent = "Search is unavailable right now. Close and reopen to retry, or use the navigation above.";
    }).finally(function () { pending = null; });
  }
  function open() {
    if (modal.open) { input.focus(); return; }
    previousFocus = document.activeElement;
    input.value = "";
    modal.showModal();
    document.body.classList.add("search-is-open");
    input.focus();
    loadIndex();
  }
  trigger.addEventListener("click", open);
  modal.querySelector("[data-search-close]").addEventListener("click", function () { modal.close(); });
  input.addEventListener("input", render);
  modal.addEventListener("click", function (event) { if (event.target === modal) modal.close(); });
  modal.addEventListener("close", function () {
    document.body.classList.remove("search-is-open");
    if (previousFocus && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
  });
  results.addEventListener("click", function (event) { if (event.target.closest("a")) modal.close(); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.open) {
      event.preventDefault();
      modal.close();
      return;
    }
    if (event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      open();
    }
  });
}());
