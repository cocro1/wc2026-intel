(function () {
  var DATA = window.SITE_DATA || { articles: [] };
  var page = document.body.dataset.page;
  var app = document.getElementById("app");

  function init() {
    setupNav();
    setUpdatedAt();

    if (!app) return;

    if (page === "dashboard") renderDashboard();
    if (page === "predictions") renderList("prediction");
    if (page === "reviews") renderList("review");
    if (page === "features") renderList("feature");
    if (page === "article") renderArticle();
  }

  function setupNav() {
    var navKey = page;
    if (page === "article") {
      var article = getArticleFromUrl();
      navKey = article ? navKeyFromType(article.type) : "dashboard";
    }

    document.querySelectorAll("[data-nav]").forEach(function (link) {
      if (link.dataset.nav === navKey) link.classList.add("active");
    });

    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  function setUpdatedAt() {
    document.querySelectorAll("[data-updated-at]").forEach(function (node) {
      node.textContent = DATA.updatedAt || "";
    });
  }

  function renderDashboard() {
    var d = DATA.dashboard;
    var latest = DATA.articles.slice(0, 4);

    app.innerHTML = [
      '<section class="hero">',
        '<div class="hero-panel">',
          '<p class="eyebrow">World Cup 2026</p>',
          '<h1>' + escapeHtml(d.headline) + '</h1>',
          '<p class="lead">' + escapeHtml(d.subtitle) + '</p>',
          '<div class="button-row">',
            '<a class="button" href="predictions.html">查看赛前预测</a>',
            '<a class="button secondary" href="features.html">进入专题研究</a>',
          '</div>',
        '</div>',
        renderHeroStack(d.today, d.reviewCards || []),
      '</section>',
      renderMetricSection("核心仪表盘", "先看站点当前样本、模型表现和最新风险信号。", d.metrics),
      renderModelSection(d.model),
      renderSignalSection(d.signals),
      renderWorkflow(d.workflow),
      renderLatestSection(latest)
    ].join("");
  }

  function renderHeroStack(today, reviewCards) {
    return [
      '<div class="hero-stack">',
        renderTodayCard(today),
        reviewCards.length ? renderReviewCards(reviewCards) : "",
      '</div>'
    ].join("");
  }

  function renderTodayCard(today) {
    return [
      '<aside class="today-card hero-panel">',
        '<span class="pill gold">' + escapeHtml(today.title) + '</span>',
        '<div class="today-match">',
          '<div>',
            '<h2>' + escapeHtml(today.match) + '</h2>',
            '<p class="metric-note">' + escapeHtml(today.time) + '</p>',
          '</div>',
          '<span class="pill">置信度：' + escapeHtml(today.confidence) + '</span>',
        '</div>',
        '<div class="today-score">' + escapeHtml(today.score) + '</div>',
        '<div class="prob-list">',
          today.probabilities.map(renderProbability).join(""),
        '</div>',
        '<ol class="reason-list">',
          today.reasons.map(function (reason) {
            return '<li>' + escapeHtml(reason) + '</li>';
          }).join(""),
        '</ol>',
        '<div class="button-row">',
          '<a class="button" href="' + articleUrl(today.articleId) + '">阅读完整预测</a>',
        '</div>',
      '</aside>'
    ].join("");
  }

  function renderReviewCards(items) {
    return [
      '<div class="side-card-grid">',
        items.map(renderReviewCard).join(""),
      '</div>'
    ].join("");
  }

  function renderReviewCard(item) {
    return [
      '<article class="side-card section-panel">',
        '<div class="side-card-head">',
          '<span class="pill gold">' + escapeHtml(item.label) + '</span>',
          '<span class="metric-note">' + escapeHtml(item.result) + '</span>',
        '</div>',
        '<h3>' + escapeHtml(item.match) + '</h3>',
        '<p class="side-card-note">' + escapeHtml(item.note) + '</p>',
        '<a class="text-link" href="' + articleUrl(item.articleId) + '">阅读复盘</a>',
      '</article>'
    ].join("");
  }

  function renderProbability(item) {
    return [
      '<div class="prob-row">',
        '<span>' + escapeHtml(item.label) + '</span>',
        '<div class="track"><div class="bar ' + escapeHtml(item.tone || "") + '" style="width:' + Number(item.value) + '%"></div></div>',
        '<strong>' + Number(item.value) + '%</strong>',
      '</div>'
    ].join("");
  }

  function renderMetricSection(title, desc, items) {
    return [
      '<section class="section-panel">',
        '<div class="section-head">',
          '<div><h2>' + escapeHtml(title) + '</h2><p>' + escapeHtml(desc) + '</p></div>',
        '</div>',
        '<div class="metric-grid">',
          items.map(function (item) {
            return [
              '<article class="metric-card">',
                '<div class="metric-value">' + escapeHtml(item.value) + '</div>',
                '<div class="metric-label">' + escapeHtml(item.label) + '</div>',
                '<div class="metric-note">' + escapeHtml(item.note) + '</div>',
              '</article>'
            ].join("");
          }).join(""),
        '</div>',
      '</section>'
    ].join("");
  }

  function renderModelSection(items) {
    return [
      '<section class="section-panel">',
        '<div class="section-head">',
          '<div><h2>模型战绩</h2><p>当前只统计已复盘样本，数字会随着比赛推进自动扩展。</p></div>',
          '<a class="button secondary" href="reviews.html">查看复盘库</a>',
        '</div>',
        '<div class="model-grid">',
          items.map(function (item) {
            var pct = item.total ? Math.round((item.value / item.total) * 100) : 0;
            return [
              '<article class="metric-card gauge">',
                '<div class="metric-label">' + escapeHtml(item.label) + '</div>',
                '<strong>' + pct + '%</strong>',
                '<div class="track"><div class="bar ' + escapeHtml(item.tone || "") + '" style="width:' + pct + '%"></div></div>',
                '<div class="metric-note">' + item.value + '/' + item.total + '</div>',
              '</article>'
            ].join("");
          }).join(""),
        '</div>',
      '</section>'
    ].join("");
  }

  function renderSignalSection(items) {
    return [
      '<section class="section-panel">',
        '<div class="section-head">',
          '<div><h2>趋势信号</h2><p>把专题研究里最有用的判断提炼到首页，帮助当天预测快速定位风险。</p></div>',
        '</div>',
        '<div class="signal-grid">',
          items.map(function (item) {
            return [
              '<article class="signal-card">',
                '<span class="pill gold">' + escapeHtml(item.label) + '</span>',
                '<div class="metric-value">' + escapeHtml(item.value) + '</div>',
                '<div class="metric-note">' + escapeHtml(item.note) + '</div>',
              '</article>'
            ].join("");
          }).join(""),
        '</div>',
      '</section>'
    ].join("");
  }

  function renderWorkflow(items) {
    return [
      '<section class="section-panel">',
        '<div class="section-head">',
          '<div><h2>日更工作流</h2><p>每天新增文章时，保持同一套输入结构，站点就能稳定生长。</p></div>',
        '</div>',
        '<ol class="workflow-list">',
          items.map(function (item) {
            return '<li>' + escapeHtml(item) + '</li>';
          }).join(""),
        '</ol>',
      '</section>'
    ].join("");
  }

  function renderLatestSection(items) {
    return [
      '<section class="section-panel">',
        '<div class="section-head">',
          '<div><h2>最新内容</h2><p>预测、复盘和专题按时间汇总，形成一条可回看的判断链。</p></div>',
        '</div>',
        '<div class="article-grid">',
          items.map(renderArticleCard).join(""),
        '</div>',
      '</section>'
    ].join("");
  }

  function renderList(type) {
    var pageInfo = {
      prediction: {
        eyebrow: "Daily Forecast",
        title: "赛前预测",
        desc: "每天输出比分、胜平负概率、大小球倾向、置信度和关键变量。"
      },
      review: {
        eyebrow: "Post Match Review",
        title: "赛后复盘",
        desc: "把每场预测拆成命中、偏差和模型修正，避免只记住猜对或猜错。"
      },
      feature: {
        eyebrow: "Research Library",
        title: "专题研究",
        desc: "沉淀魔咒、历史规律、进球趋势、小组赛观察和方法论。"
      }
    }[type];

    var articles = DATA.articles.filter(function (article) { return article.type === type; });
    var filters = unique(articles.map(function (article) {
      return type === "feature" ? article.subtype : article.section;
    }).filter(Boolean));

    app.innerHTML = [
      '<section class="hero-panel">',
        '<p class="eyebrow">' + escapeHtml(pageInfo.eyebrow) + '</p>',
        '<h1>' + escapeHtml(pageInfo.title) + '</h1>',
        '<p class="lead">' + escapeHtml(pageInfo.desc) + '</p>',
      '</section>',
      '<section class="section-panel">',
        filters.length > 1 ? renderFilters(filters) : "",
        '<div class="article-grid" id="article-list">',
          articles.map(renderArticleCard).join(""),
        '</div>',
      '</section>'
    ].join("");

    setupFilters(articles, type);
  }

  function renderFilters(filters) {
    return [
      '<div class="filter-row" role="toolbar" aria-label="内容筛选">',
        '<button class="filter-chip active" type="button" data-filter="all">全部</button>',
        filters.map(function (filter) {
          return '<button class="filter-chip" type="button" data-filter="' + escapeHtml(filter) + '">' + escapeHtml(filter) + '</button>';
        }).join(""),
      '</div>'
    ].join("");
  }

  function setupFilters(articles, type) {
    var list = document.getElementById("article-list");
    var chips = Array.prototype.slice.call(document.querySelectorAll(".filter-chip"));
    if (!list || chips.length === 0) return;

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (item) { item.classList.remove("active"); });
        chip.classList.add("active");
        var filter = chip.dataset.filter;
        var filtered = filter === "all"
          ? articles
          : articles.filter(function (article) {
              return type === "feature" ? article.subtype === filter : article.section === filter;
            });
        list.innerHTML = filtered.map(renderArticleCard).join("");
      });
    });
  }

  function renderArticleCard(article) {
    return [
      '<a class="article-card" href="' + articleUrl(article.id) + '">',
        '<div class="article-meta">',
          '<span class="pill">' + escapeHtml(article.section) + '</span>',
          article.subtype ? '<span class="pill gold">' + escapeHtml(article.subtype) + '</span>' : "",
          '<span class="pill secondary">' + escapeHtml(article.date) + '</span>',
        '</div>',
        '<h3>' + escapeHtml(article.title) + '</h3>',
        '<p>' + escapeHtml(article.summary) + '</p>',
        article.stats ? '<div class="mini-stats">' + article.stats.slice(0, 4).map(function (stat) {
          return '<div class="mini-stat"><span>' + escapeHtml(stat.label) + '</span><strong>' + escapeHtml(stat.value) + '</strong></div>';
        }).join("") + '</div>' : "",
      '</a>'
    ].join("");
  }

  function renderArticle() {
    var article = getArticleFromUrl();
    if (!article) {
      app.innerHTML = '<div class="error-state">没有找到这篇文章。<a href="index.html">返回首页</a></div>';
      return;
    }

    document.title = article.title + " · 2026 世界杯预测中枢";

    app.innerHTML = [
      '<nav class="breadcrumb" aria-label="面包屑">',
        '<a href="index.html">首页</a><span>/</span>',
        '<a href="' + sectionUrl(article.type) + '">' + escapeHtml(article.section) + '</a><span>/</span>',
        '<span>' + escapeHtml(article.title) + '</span>',
      '</nav>',
      '<header class="article-hero">',
        '<div class="article-meta">',
          '<span class="pill">' + escapeHtml(article.section) + '</span>',
          article.subtype ? '<span class="pill gold">' + escapeHtml(article.subtype) + '</span>' : "",
          '<span class="pill secondary">' + escapeHtml(article.date) + '</span>',
        '</div>',
        '<h1>' + escapeHtml(article.title) + '</h1>',
        '<p class="lead">' + escapeHtml(article.summary) + '</p>',
        article.stats ? '<div class="mini-stats">' + article.stats.map(function (stat) {
          return '<div class="mini-stat"><span>' + escapeHtml(stat.label) + '</span><strong>' + escapeHtml(stat.value) + '</strong></div>';
        }).join("") + '</div>' : "",
      '</header>',
      '<article class="article-body" id="article-body"><p>正在加载正文...</p></article>',
      '<section class="section-panel" id="related-panel"></section>'
    ].join("");

    fetch("content/" + encodeURIComponent(article.file))
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.text();
      })
      .then(function (markdown) {
        document.getElementById("article-body").innerHTML = markdownToHtml(stripFirstHeading(markdown));
        renderRelated(article);
      })
      .catch(function (error) {
        document.getElementById("article-body").innerHTML = '<div class="error-state">正文加载失败：' + escapeHtml(error.message) + '</div>';
      });
  }

  function renderRelated(article) {
    var panel = document.getElementById("related-panel");
    if (!panel) return;
    var related = (article.related || [])
      .map(function (id) { return DATA.articles.find(function (item) { return item.id === id; }); })
      .filter(Boolean);

    if (!related.length) {
      panel.remove();
      return;
    }

    panel.innerHTML = [
      '<div class="section-head"><div><h2>关联阅读</h2><p>把预测、复盘和专题串起来看，判断链会更完整。</p></div></div>',
      '<div class="article-grid">',
        related.map(renderArticleCard).join(""),
      '</div>'
    ].join("");
  }

  function markdownToHtml(markdown) {
    var lines = markdown.replace(/\r\n/g, "\n").split("\n");
    var html = [];
    var paragraph = [];
    var i = 0;

    function flushParagraph() {
      if (!paragraph.length) return;
      html.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>");
      paragraph = [];
    }

    while (i < lines.length) {
      var line = lines[i];
      var trimmed = line.trim();

      if (!trimmed) {
        flushParagraph();
        i += 1;
        continue;
      }

      if (trimmed.startsWith("```")) {
        flushParagraph();
        var code = [];
        i += 1;
        while (i < lines.length && !lines[i].trim().startsWith("```")) {
          code.push(lines[i]);
          i += 1;
        }
        html.push("<pre><code>" + escapeHtml(code.join("\n")) + "</code></pre>");
        i += 1;
        continue;
      }

      if (/^---+$/.test(trimmed)) {
        flushParagraph();
        html.push("<hr>");
        i += 1;
        continue;
      }

      if (/^#{1,6}\s+/.test(trimmed)) {
        flushParagraph();
        var level = Math.min((trimmed.match(/^#+/) || [""])[0].length, 3);
        var text = trimmed.replace(/^#{1,6}\s+/, "");
        html.push("<h" + level + ">" + inlineMarkdown(text) + "</h" + level + ">");
        i += 1;
        continue;
      }

      if (trimmed.startsWith("|") && tableLine(lines[i + 1])) {
        flushParagraph();
        var tableLines = [];
        while (i < lines.length && tableLine(lines[i])) {
          tableLines.push(lines[i]);
          i += 1;
        }
        html.push(renderTable(tableLines));
        continue;
      }

      if (trimmed.startsWith(">")) {
        flushParagraph();
        var quote = [];
        while (i < lines.length && lines[i].trim().startsWith(">")) {
          quote.push(lines[i].trim().replace(/^>\s?/, ""));
          i += 1;
        }
        html.push("<blockquote>" + quote.map(inlineMarkdown).join("<br>") + "</blockquote>");
        continue;
      }

      if (/^[-*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
        flushParagraph();
        var ordered = /^\d+\.\s+/.test(trimmed);
        var tag = ordered ? "ol" : "ul";
        var items = [];
        while (i < lines.length) {
          var item = lines[i].trim();
          var matches = ordered ? /^\d+\.\s+/.test(item) : /^[-*]\s+/.test(item);
          if (!matches) break;
          items.push("<li>" + inlineMarkdown(item.replace(ordered ? /^\d+\.\s+/ : /^[-*]\s+/, "")) + "</li>");
          i += 1;
        }
        html.push("<" + tag + ">" + items.join("") + "</" + tag + ">");
        continue;
      }

      paragraph.push(trimmed);
      i += 1;
    }

    flushParagraph();
    return html.join("\n");
  }

  function renderTable(lines) {
    var rows = lines
      .map(splitTableRow)
      .filter(function (row) {
        return row.length && !row.every(function (cell) { return /^:?-{3,}:?$/.test(cell.trim()); });
      });

    if (!rows.length) return "";

    var head = rows[0];
    var body = rows.slice(1);
    return [
      '<div class="table-wrap"><table>',
        '<thead><tr>' + head.map(function (cell) { return "<th>" + inlineMarkdown(cell.trim()) + "</th>"; }).join("") + '</tr></thead>',
        '<tbody>',
          body.map(function (row) {
            return "<tr>" + row.map(function (cell) { return "<td>" + inlineMarkdown(cell.trim()) + "</td>"; }).join("") + "</tr>";
          }).join(""),
        '</tbody>',
      '</table></div>'
    ].join("");
  }

  function splitTableRow(line) {
    return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|");
  }

  function tableLine(line) {
    return line && line.trim().startsWith("|") && line.trim().endsWith("|");
  }

  function inlineMarkdown(text) {
    return escapeHtml(text)
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  }

  function stripFirstHeading(markdown) {
    return markdown.replace(/^# .*(\n|$)/, "");
  }

  function getArticleFromUrl() {
    var id = new URLSearchParams(window.location.search).get("id");
    return DATA.articles.find(function (article) { return article.id === id; });
  }

  function articleUrl(id) {
    return "article.html?id=" + encodeURIComponent(id);
  }

  function sectionUrl(type) {
    return {
      prediction: "predictions.html",
      review: "reviews.html",
      feature: "features.html"
    }[type] || "index.html";
  }

  function navKeyFromType(type) {
    return {
      prediction: "predictions",
      review: "reviews",
      feature: "features"
    }[type] || "dashboard";
  }

  function unique(items) {
    return Array.from(new Set(items));
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  document.addEventListener("DOMContentLoaded", init);
})();
