---
layout: default
title: CV
description: "Curriculum vitae of Doeun Kim: education, research, honors, academic service, and technical skills. Updated September 2026."
permalink: /cv/
---

{% assign profile = site.data.profile %}
<header class="page-heading cv-page-heading"><div><p class="eyebrow">The story so far</p><h1>Curriculum vitae<span class="accent-period">.</span></h1><p>Education, research, and the experiences in between.</p></div><a class="button button-primary" href="{{ site.cv_path | relative_url }}" download>Download CV {% include icon.html name="download" %}</a></header>
<div class="cv-layout">
  <aside class="cv-sidebar"><p class="eyebrow">On this page</p><nav aria-label="CV sections"><a href="#education">Education</a><a href="#research-experience">Research experience</a><a href="#papers">Workshop papers</a><a href="#honors">Honors &amp; scholarships</a><a href="#service">Academic service</a><a href="#skills">Skills &amp; languages</a></nav><div class="cv-update"><span class="status-dot" aria-hidden="true"></span> Updated {{ site.cv_updated }}</div><a class="text-link cv-view-link" href="{{ site.cv_path | relative_url }}">View PDF <span aria-hidden="true">↗</span></a></aside>
  <div class="cv-main">
    <section class="cv-section" id="education"><h2>Education</h2><div class="entry-heading"><h3>{{ profile.education.institution }}</h3><span class="entry-date">{{ profile.education.period }}</span></div><p>{{ profile.education.degree }}</p><div class="education-facts"><div><span>Expected graduation</span><strong>{{ profile.education.graduation }}</strong></div></div><p class="muted">Leave of absence for mandatory military service, Oct 2022 – Apr 2024.<br>KATUSA (Korean Augmentation to the U.S. Army).</p></section>
    <section class="cv-section" id="research-experience"><h2>Research experience</h2>{% include research-experience.html %}<p class="muted">Research interests: {{ profile.interests | join: '; ' }}.</p></section>
    <section class="cv-section" id="papers"><h2>Workshop papers</h2>{% for paper in site.data.publications %}<article class="cv-paper"><h3><a href="{{ paper.url }}">{{ paper.title }} <span aria-hidden="true">↗</span></a></h3><p class="paper-authors">{% include authors.html %}</p><p class="muted">{{ paper.venue }} · Poster (non-archival)</p></article>{% endfor %}<p class="fine-print">* Equal contribution. † Corresponding author.</p><a class="text-link" href="{{ '/projects/' | relative_url }}">Explore all {{ site.data.projects.size }} projects <span aria-hidden="true">↗</span></a></section>
    <section class="cv-section" id="honors"><h2>Honors &amp; scholarships</h2><ul class="cv-entry-list">{% for honor in profile.honors %}<li><div class="entry-heading"><h3>{{ honor.title }}</h3><span class="entry-date">{{ honor.period }}</span></div><p class="muted">{{ honor.description }}</p></li>{% endfor %}</ul></section>
    <section class="cv-section" id="service"><h2>Academic service</h2><ul class="cv-entry-list">{% for service in profile.service %}<li><div class="entry-heading"><h3>{{ service.title }}</h3><span class="entry-date">{{ service.period }}</span></div><p class="entry-advisor">{{ service.institution }}</p><p>{{ service.description }}</p></li>{% endfor %}</ul></section>
    <section class="cv-section" id="skills"><h2>Skills &amp; languages</h2><dl class="skills-list">{% for skill in profile.skills %}<div><dt>{{ skill.label }}</dt><dd>{{ skill.items | join: ', ' }}</dd></div>{% endfor %}</dl></section>
  </div>
</div>
