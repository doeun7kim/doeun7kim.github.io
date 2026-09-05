(function () {
  "use strict";
  var toolbar = document.querySelector("[data-project-toolbar]");
  if (!toolbar) return;
  var buttons = Array.from(toolbar.querySelectorAll("[data-filter]"));
  var projects = Array.from(document.querySelectorAll("[data-project]"));
  var count = toolbar.querySelector("[data-project-count]");
  toolbar.hidden = false;
  function filter(category) {
    var visible = 0;
    buttons.forEach(function (button) { button.setAttribute("aria-pressed", String(button.dataset.filter === category)); });
    projects.forEach(function (project) {
      project.hidden = category !== "all" && project.dataset.category !== category;
      if (!project.hidden) visible += 1;
    });
    count.textContent = visible + " project" + (visible === 1 ? "" : "s") + " shown";
  }
  buttons.forEach(function (button) { button.addEventListener("click", function () { filter(button.dataset.filter); }); });
  function showLinkedProject(hash) {
    var id;
    try { id = decodeURIComponent((typeof hash === "string" ? hash : window.location.hash).slice(1)); } catch (error) { return; }
    var project = document.getElementById(id);
    if (project && project.hasAttribute("data-project") && project.hidden) {
      filter("all");
      project.scrollIntoView({ block: "start" });
    }
  }
  window.addEventListener("hashchange", showLinkedProject);
  document.addEventListener("click", function (event) {
    var link = event.target.closest("a[href]");
    if (!link) return;
    var target = new URL(link.href, window.location.href);
    if (target.origin === window.location.origin && target.pathname === window.location.pathname && target.hash) {
      showLinkedProject(target.hash);
    }
  });
  filter("all");
  showLinkedProject();
}());
