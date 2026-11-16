# Doeun Kim Academic Homepage

Academic website at https://doeun7kim.github.io, built with Jekyll and published from the `main` branch through GitHub Pages.

## Local development

With Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll serve
```

Open http://127.0.0.1:4000. To build without serving, run `bundle exec jekyll build`.

## Updating content

The published CV is based on the November 12, 2026 versions of `CV/main.tex` and `CV/main.pdf` in the local workspace.

- `_data/profile.yml`: education, interests, research experience, honors, academic service, and skills.
- `_data/publications.yml`: workshop titles, author order and contribution marks, venues, and paper links.
- `_data/projects.yml`: project descriptions, dates, and topics for the Projects page.
- `assets/pdf/CV_Doeun_Kim.pdf`: the downloadable CV. Replace this with the latest compiled PDF, then update `cv_updated` and `cv_version` in `_config.yml`. The version is included in PDF links so visitors receive the updated file.

The Home CV, Publications, Projects, and search views reuse this data. Keep the data and PDF synchronized when updating the CV. Local CV sources, review archives, transcripts, and temporary files are excluded from the published site.

## Design and interactions

The shared layout and stylesheet provide responsive layouts, light and dark themes, keyboard-accessible search, project filters, and a button-operated photo flip on Home. Search is generated from the same content data at `/search.json`. Without JavaScript, navigation, all project content, paper links, and CV downloads remain available.

The site uses local assets and system fonts; no external font or JavaScript services are required.

## Pages and assets

- Home includes the CV and the only CV download button. The previous CV URL redirects to the Home CV section.
- Publications uses a compact list without cards or category headings. Add paper type and status in the shared publications data; omit URLs when a paper link is not available.
- The previous Research URL redirects to Publications, preserving linked paper anchors.
- `assets/img/icml-workshop.jpg` is the default Home photo, displayed with a square CSS crop around the poster and presenter. The Flip photo button switches to `assets/img/profile.jpg`; reduced-motion preferences are respected. Original image files are preserved.
- `assets/img/causality-lab.png` is the supplied lab logo, shown beside the lab name. The circular site monogram and favicon use uppercase DK.

## Publishing

Push the reviewed website changes to `main`. GitHub Pages builds and publishes the repository root to the existing website address.
