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
    <p class="hero-bio">I study Mathematics and Computer Science at <strong>Sogang University</strong> and work as an undergraduate researcher in the <strong><a href="https://www.sanghacklee.me/members/">Causality Lab</a></strong> at Seoul National University.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="{{ '/research/' | relative_url }}">Explore my research <span aria-hidden="true">↗</span></a>
      <a class="button button-secondary" href="{{ site.cv_path | relative_url }}?v={{ site.cv_version }}" download>Download CV {% include icon.html name="download" %}</a>
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
  <div class="section-heading">
    <div><p class="eyebrow">02 / Background</p><h2 id="background-title">Education &amp; research.</h2></div>
    <a class="text-link" href="{{ '/cv/' | relative_url }}">View my full CV <span aria-hidden="true">&#8599;</span></a>
  </div>
  <p class="background-intro">Alongside my studies at Sogang University, I conduct research at SNU&rsquo;s Causality Lab.</p>
  <div class="background-grid">
    <section class="background-group" aria-labelledby="background-education-title">
      <h3 id="background-education-title">Education</h3>
      <article class="background-entry">
        <div class="background-entry-heading"><h4>{{ profile.education.institution }}</h4><span class="background-status">Currently enrolled</span></div>
        <p class="entry-date">{{ profile.education.period }}</p>
        <p>{{ profile.education.degree }}</p>
        <p class="background-graduation">Expected graduation: <strong>{{ profile.education.graduation }}</strong></p>
      </article>
    </section>
    <section class="background-group" aria-labelledby="background-research-title">
      <h3 id="background-research-title">Research experience</h3>
      {% for experience in profile.research_experience %}
      <article class="background-entry">
        <div class="background-entry-heading"><h4>{{ experience.lab }}</h4>{% if experience.period contains 'Present' %}<span class="background-status">Current role</span>{% else %}<span class="background-status background-status-past">Past role</span>{% endif %}</div>
        <p class="entry-date">{{ experience.period }}</p>
        <p class="background-role">{{ experience.role }}</p>
        <p>{{ experience.institution }}</p>
        <p class="entry-advisor">Advisor: {{ experience.advisor }}</p>
      </article>
      {% endfor %}
    </section>
  </div>
</section>

<section class="contact-section" aria-labelledby="contact-title"><div><p class="eyebrow">Get in touch</p><h2 id="contact-title">Let’s connect.</h2><p>For conversations about research, ideas, and collaboration.</p></div><a class="contact-link" href="mailto:{{ site.author.email }}">{{ site.author.email }} <span aria-hidden="true">↗</span></a></section>
