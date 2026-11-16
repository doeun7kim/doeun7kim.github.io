---
layout: default
title: Home
description: "Doeun Kim — Mathematics and Computer Science at Sogang University. Undergraduate researcher in causal machine learning at Seoul National University."
body_class: home
---

{% assign profile = site.data.profile %}
<section class="hero" aria-labelledby="intro-title">
  <div class="hero-copy">
    <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span> Student &amp; researcher · Seoul</p>
    <h1 id="intro-title">Hi, I’m<br><em>Doeun Kim.</em></h1>
    <p class="hero-lead">Exploring machine learning<br>through a causal lens.</p>
    <p class="hero-bio">I study Mathematics and Computer Science at <strong>Sogang University</strong> and work as an undergraduate researcher in the <strong><a class="lab-link" href="https://www.sanghacklee.me/members/"><span>Causality Lab</span><img class="lab-logo" src="{{ '/assets/img/causality-lab.png' | relative_url }}" alt="" width="743" height="233"></a></strong> at Seoul National University.</p>
    <div class="hero-actions">
      <a class="button button-primary" href="#cv">View my CV <span aria-hidden="true">↘</span></a>
      <a class="button button-secondary" href="{{ site.cv_path | relative_url }}?v={{ site.cv_version }}" download>Download CV {% include icon.html name="download" %}</a>
    </div>
  </div>
  <figure class="hero-portrait" data-photo-flip>
    <div class="portrait-stage" id="profile-photos">
      <div class="portrait-flipper">
        <div class="portrait-face portrait-front" data-photo-front aria-hidden="false"><img src="{{ '/assets/img/icml-workshop.jpg' | relative_url }}" alt="Doeun Kim presenting a research poster at an ICML 2026 workshop" width="3024" height="4032" fetchpriority="high"></div>
        <div class="portrait-face portrait-back" data-photo-back aria-hidden="true"><img src="{{ '/assets/img/profile.jpg' | relative_url }}" alt="Portrait of Doeun Kim" width="496" height="638" decoding="async"></div>
      </div>
    </div>
    <figcaption>
      <span class="portrait-caption-name">Doeun Kim</span>
      <span class="photo-description" data-photo-description role="status" aria-live="polite">At an ICML 2026 workshop</span>
      <button class="flip-photo" type="button" data-photo-toggle aria-controls="profile-photos" aria-pressed="false" aria-label="Show profile portrait" hidden>{% include icon.html name="flip" %}<span>Flip photo</span></button>
    </figcaption>
  </figure>
</section>

<section class="interest-strip" aria-label="Research interests">
  <p class="eyebrow">What I’m interested in</p>
  <ul>{% for interest in profile.interests %}<li>{{ interest }}</li>{% endfor %}</ul>
</section>

<section class="home-section home-cv" id="cv" aria-labelledby="cv-title">
  <div class="section-heading"><div><p class="eyebrow">01 / CV</p><h2 id="cv-title">Curriculum vitae.</h2></div><p class="cv-heading-note">PDF updated {{ site.cv_updated }}</p></div>
  {% include cv-content.html %}
</section>

<section class="contact-section" aria-labelledby="contact-title"><div><p class="eyebrow">Get in touch</p><h2 id="contact-title">Let’s connect.</h2><p>For conversations about research, ideas, and collaboration.</p></div><a class="contact-link" href="mailto:{{ site.author.email }}">{{ site.author.email }} <span aria-hidden="true">↗</span></a></section>