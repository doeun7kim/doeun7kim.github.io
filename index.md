---
layout: default
title: About
description: "Doeun Kim — Mathematics and Computer Science at Sogang University. Undergraduate researcher in causal machine learning at Seoul National University."
body_class: home
---

{% assign profile = site.data.profile %}
<section class="hero" aria-labelledby="intro-title">
  <div class="hero-copy">
    <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> Student &amp; researcher · Seoul</p>
    <h1 id="intro-title">Hi, I’m<br><em>Doeun Kim.</em></h1>
    <p class="hero-lead">Exploring machine learning<br>through a causal lens.</p>
    <p class="hero-bio">I study Mathematics and Computer Science at <strong>Sogang University</strong> and work as an undergraduate researcher in the <strong>Causality Lab</strong> at Seoul National University.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="{{ '/research/' | relative_url }}">Explore my research <span aria-hidden="true">↗</span></a>
      <a class="button button-secondary" href="{{ site.cv_path | relative_url }}" download>Download CV {% include icon.html name="download" %}</a>
    </div>
  </div>
  <figure class="hero-portrait">
    <div class="portrait-mat"><img src="{{ '/assets/img/profile.jpg' | relative_url }}" alt="Doeun Kim" width="496" height="638" fetchpriority="high"></div>
    <figcaption><span class="portrait-caption-name">Doeun Kim</span><span>Mathematics &amp; Computer Science</span><span>Sogang University</span></figcaption>
    <span class="portrait-note" aria-hidden="true">A little curiosity, every day.</span>
  </figure>
</section>

<section class="interest-strip" aria-label="Research interests">
  <p class="eyebrow">What I’m interested in</p>
  <ul>{% for interest in profile.interests %}<li>{{ interest }}</li>{% endfor %}</ul>
</section>

<section class="home-section" aria-labelledby="selected-research">
  <div class="section-heading"><div><p class="eyebrow">01 / Research</p><h2 id="selected-research">Asking better questions.</h2></div><a class="text-link" href="{{ '/research/' | relative_url }}">All research <span aria-hidden="true">↗</span></a></div>
  <div class="paper-grid">{% for paper in site.data.publications %}{% include publication.html compact=true %}{% endfor %}</div>
  <p class="fine-print">* Equal contribution. † Corresponding author. Both papers are non-archival workshop posters.</p>
</section>

<section class="home-section background-section" aria-labelledby="background-title">
  <div><p class="eyebrow">02 / Background</p><h2 id="background-title">Learning,<br>with purpose.</h2><p class="section-intro">A foundation in mathematics and computer science, with a growing focus on causal machine learning.</p><a class="text-link" href="{{ '/cv/' | relative_url }}">View my full CV <span aria-hidden="true">↗</span></a></div>
  <div class="background-entries">
    <article class="background-entry"><span class="timeline-dot" aria-hidden="true"></span><p class="entry-date">{{ profile.education.period }}</p><h3>{{ profile.education.institution }}</h3><p>{{ profile.education.degree }}</p><div class="inline-facts"><span>Expected <strong>{{ profile.education.graduation }}</strong></span></div></article>
    {% for experience in profile.research_experience %}<article class="background-entry"><span class="timeline-dot" aria-hidden="true"></span><p class="entry-date">{{ experience.period }}</p><h3>{{ experience.lab }}</h3><p>{{ experience.role }} · {{ experience.institution }}</p><p class="entry-advisor">Advisor: {{ experience.advisor }}</p></article>{% endfor %}
  </div>
</section>

<section class="contact-section" aria-labelledby="contact-title"><div><p class="eyebrow">Get in touch</p><h2 id="contact-title">Let’s connect.</h2><p>For conversations about research, ideas, and collaboration.</p></div><a class="contact-link" href="mailto:{{ site.author.email }}">{{ site.author.email }} <span aria-hidden="true">↗</span></a></section>
