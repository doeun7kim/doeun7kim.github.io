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

The home, research, projects, CV, and search views reuse this data. Keep the data and PDF synchronized when updating the CV. Local CV sources, review archives, transcripts, and temporary files are excluded from the published site.

## Design and interactions

The shared layout and stylesheet provide responsive layouts, light and dark themes, keyboard-accessible search, and project filters. Search is generated from the same content data at `/search.json`. Without JavaScript, navigation, all project content, paper links, and CV downloads remain available.

The site uses local assets and system fonts; no external font or JavaScript services are required.

## Publishing

Push the reviewed website changes to `main`. GitHub Pages builds and publishes the repository root to the existing website address.
