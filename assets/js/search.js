(function () {
  "use strict";

  var openButton = document.querySelector("[data-search-open]");
  var modal = document.querySelector("[data-search-modal]");
  var input = document.querySelector("[data-search-input]");
  var closeButton = document.querySelector("[data-search-close]");
  var results = document.querySelector("[data-search-results]");

  if (!openButton || !modal || !input || !closeButton || !results) {
    return;
  }

  var pages = [
    {
      title: "About",
      url: "/",
      summary: "Homepage, profile, location, email, current position, research interests.",
      text: "Doeun Kim Mathematics Computer Science Sogang University Causality Lab Seoul causal machine learning causal foundation models graph representation learning natural language processing"
    },
    {
      title: "Research",
      url: "/research/",
      summary: "Publications and workshop papers.",
      text: "publications ICML 2026 query misspecification causal foundation models post-treatment variables structured probabilistic inference generative modeling foundation models structured data"
    },
    {
      title: "Projects",
      url: "/projects/",
      summary: "Selected academic and technical projects.",
      text: "projects Do-PFN FA-AL-MOT DIGIRO GPT-2 RAG object detection graph representation learning transformer retrieval augmented generation"
    },
    {
      title: "CV",
      url: "/cv/",
      summary: "Downloadable CV, education, experience, awards, service, and skills.",
      text: "CV PDF education research experience Sogang University Causality Lab SNU GSDS teaching service scholarships awards skills Python C++ MATLAB SAS MySQL"
    }
  ];

  function normalize(value) {
    return value.toLowerCase().trim();
  }

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function resultMarkup(items, query) {
    if (!items.length) {
      return '<p class="search-result-empty">No results for "' + escapeHtml(query) + '".</p>';
    }

    return items.map(function (item) {
      return '<a class="search-result" href="' + item.url + '">' +
        "<strong>" + item.title + "</strong>" +
        "<span>" + item.summary + "</span>" +
        "</a>";
    }).join("");
  }

  function render() {
    var query = normalize(input.value);
    var terms = query.split(/\s+/).filter(Boolean);
    var items = pages;

    if (terms.length) {
      items = pages.filter(function (item) {
        var haystack = normalize(item.title + " " + item.summary + " " + item.text);
        return terms.every(function (term) {
          return haystack.indexOf(term) !== -1;
        });
      });
    }

    results.innerHTML = resultMarkup(items, input.value.trim());
  }

  function openSearch() {
    modal.hidden = false;
    input.value = "";
    render();
    window.setTimeout(function () {
      input.focus();
    }, 0);
  }

  function closeSearch() {
    modal.hidden = true;
    openButton.focus();
  }

  openButton.addEventListener("click", openSearch);
  closeButton.addEventListener("click", closeSearch);
  input.addEventListener("input", render);

  results.addEventListener("click", function (event) {
    var target = event.target && event.target.nodeType === 3
      ? event.target.parentNode
      : event.target;

    if (target && target.closest && target.closest("a")) {
      modal.hidden = true;
    }
  });

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeSearch();
    }
  });

  document.addEventListener("keydown", function (event) {
    var key = event.key.toLowerCase();
    var wantsSearch = key === "k" && (event.ctrlKey || event.metaKey);

    if (wantsSearch) {
      event.preventDefault();
      openSearch();
      return;
    }

    if (key === "escape" && !modal.hidden) {
      closeSearch();
    }
  });
}());
