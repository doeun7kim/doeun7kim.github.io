---
layout: default
title: Projects
description: "Projects by Doeun Kim in machine learning, causal reasoning, computer graphics, data analysis, and software systems."
permalink: /projects/
---

<header class="page-heading"><p class="eyebrow">Selected work · 2024–2026</p><h1>Projects<span class="accent-period">.</span></h1><p>Putting ideas into practice, from causal models to everyday tools.</p></header>
<div class="project-toolbar" data-project-toolbar hidden><div class="filter-list" role="group" aria-label="Filter projects by area"><button type="button" class="filter-button" data-filter="all" aria-pressed="true">All work <span>{{ site.data.projects.size }}</span></button><button type="button" class="filter-button" data-filter="ml" aria-pressed="false">Machine learning</button><button type="button" class="filter-button" data-filter="systems" aria-pressed="false">Systems &amp; software</button><button type="button" class="filter-button" data-filter="data" aria-pressed="false">Data analysis</button></div><p class="sr-only" data-project-count role="status" aria-live="polite"></p></div>
<div class="project-list">
  {% for project in site.data.projects %}
  <article class="project-card" id="{{ project.id }}" data-project data-category="{{ project.category }}">
    <div class="project-card-meta"><span class="project-index">{% if forloop.index < 10 %}0{% endif %}{{ forloop.index }}</span><span>{{ project.period }}</span><span class="project-category">{{ project.category_label }}</span></div>
    <div class="project-card-content"><h2>{{ project.title }}</h2><ul class="project-description">{% for detail in project.details %}<li>{{ detail }}</li>{% endfor %}</ul><ul class="tag-list" aria-label="Technologies and topics">{% for tag in project.tags %}<li class="tag">{{ tag }}</li>{% endfor %}</ul></div>
  </article>
  {% endfor %}
</div>