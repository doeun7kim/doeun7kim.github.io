---
layout: default
title: Publications
description: "Publications by Doeun Kim: a manuscript under review and ICML 2026 workshop papers in causal machine learning."
permalink: /publications/
---

<header class="page-heading"><p class="eyebrow">Research &amp; writing</p><h1>Publications<span class="accent-period">.</span></h1><p>Manuscripts and workshop papers in causal machine learning.</p></header>

{% assign manuscripts = site.data.publications | where: 'kind', 'manuscript' %}
<section class="page-section" aria-labelledby="manuscripts-title"><div class="section-heading"><div><p class="eyebrow">Current work</p><h2 id="manuscripts-title">Manuscripts</h2></div><span class="section-count">{{ manuscripts.size }} manuscript</span></div><div class="paper-stack">{% for paper in manuscripts %}{% include publication.html %}{% endfor %}</div></section>

{% assign workshops = site.data.publications | where: 'kind', 'workshop' %}
<section class="page-section" aria-labelledby="workshop-title"><div class="section-heading"><div><p class="eyebrow">Conference workshops</p><h2 id="workshop-title">Workshop papers</h2></div><span class="section-count">2026 · {{ workshops.size }} papers</span></div><div class="paper-stack">{% for paper in workshops %}{% include publication.html %}{% endfor %}</div></section>
<p class="fine-print publication-notes">* Equal contribution. † Corresponding author. Workshop papers were presented as non-archival posters at ICML 2026.</p>