# 2026 World Cup Prediction Intel Hub

Static website for daily 2026 World Cup prediction reports, post-match reviews, research features, and model dashboards.

## Structure

- `index.html`: dashboard
- `predictions.html`: prediction archive
- `reviews.html`: review archive
- `features.html`: research archive
- `article.html?id=...`: Markdown article renderer
- `content/`: source Markdown articles
- `data/site-data.js`: structured metadata for pages and dashboard
- `assets/`: styles and client-side rendering code

## Update Flow

1. Add a Markdown article to `content/`.
2. Add its metadata to `data/site-data.js`.
3. Commit and publish.
