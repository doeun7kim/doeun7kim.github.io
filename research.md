---
layout: default
title: Research
description: "Research interests, ICML 2026 workshop papers, and research experience of Doeun Kim."
permalink: /research/
---

<header class="page-heading"><p class="eyebrow">Ideas &amp; inquiry</p><h1>Research<span class="accent-period">.</span></h1><p>Studying machine learning through the lens of causal structure.</p></header>
<section class="research-interests" aria-labelledby="interests-title"><h2 id="interests-title" class="eyebrow">Research interests</h2><div class="tag-list">{% for interest in site.data.profile.interests %}<span class="tag">{{ interest }}</span>{% endfor %}</div></section>
<section class="page-section" aria-labelledby="workshop-title"><div class="section-heading"><div><p class="eyebrow">Selected writing</p><h2 id="workshop-title">Workshop papers</h2></div><span class="section-count">2026 · 2 papers</span></div><div class="paper-stack">{% for paper in site.data.publications %}{% include publication.html %}{% endfor %}</div><p class="fine-print">* Equal contribution. † Corresponding author. Both papers were presented as posters at non-archival ICML 2026 workshops.</p></section>
<section class="page-section" aria-labelledby="experience-title"><div class="section-heading"><div><p class="eyebrow">Where I’ve been</p><h2 id="experience-title">Research experience</h2></div></div>{% include research-experience.html %}</section>