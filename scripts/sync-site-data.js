const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const sourceDir = process.env.SRC_DIR || "D:\\我的坚果云\\OB笔记\\自媒体\\fwc2026";
const contentDir = path.join(repoRoot, "content");
const siteDataPath = path.join(repoRoot, "data", "site-data.js");
const currentDate = process.env.SITE_DATE || new Date().toISOString().slice(0, 10);

const FEATURE_OVERRIDES = {
  "魔咒分析与冠军预测.md": {
    id: "feature-curses-champion",
    file: "feature-curses-champion.md",
    subtype: "魔咒与历史规律"
  },
  "小组赛第一轮分析.md": {
    id: "feature-group-round-one",
    file: "feature-group-round-one.md",
    subtype: "小组赛观察"
  },
  "大小球博彩分析.md": {
    id: "feature-over-under-round-one",
    file: "feature-over-under-round-one.md",
    subtype: "进球趋势"
  },
  "前3场进球历史数据.md": {
    id: "feature-first-three-goals",
    file: "feature-first-three-goals.md",
    subtype: "进球趋势"
  },
  "goal-forecast-2026-06-13.md": {
    id: "feature-first-five-goals",
    file: "feature-first-five-goals.md",
    subtype: "进球趋势"
  },
  "world_cup_blowout_analysis.md.md": {
    id: "feature-blowout-analysis",
    file: "feature-blowout-analysis.md",
    subtype: "强弱差模型"
  },
  "2026世界杯战报与预测_0616.md": {
    id: "feature-daily-brief-2026-06-16",
    file: "feature-daily-brief-2026-06-16.md",
    subtype: "赛程观察"
  },
  "2026世界杯主教练分析_报告一_AD组.md": {
    id: "feature-coach-analysis-groups-ad",
    file: "feature-coach-analysis-groups-ad.md",
    subtype: "教练研究"
  },
  "2026世界杯主教练分析_报告二_EH组.md": {
    id: "feature-coach-analysis-groups-eh",
    file: "feature-coach-analysis-groups-eh.md",
    subtype: "教练研究"
  },
  "2026世界杯主教练分析_报告三_IL组.md": {
    id: "feature-coach-analysis-groups-il",
    file: "feature-coach-analysis-groups-il.md",
    subtype: "教练研究"
  },
  "wc2026_blowout_prediction.md": {
    id: "feature-wc2026-blowout-prediction",
    file: "feature-wc2026-blowout-prediction.md",
    subtype: "大比分模型"
  }
};

const FEATURE_FALLBACKS = [
  "feature-blowout-analysis",
  "feature-over-under-round-one",
  "feature-group-round-one"
];

function main() {
  const sourceFiles = fs.readdirSync(sourceDir)
    .filter((name) => name.endsWith(".md"))
    .sort((a, b) => fileMtime(sourcePath(b)) - fileMtime(sourcePath(a)));

  const existingAsciiFiles = new Set(fs.readdirSync(contentDir).filter((name) => /^[\x00-\x7F]+$/.test(name)));
  const changedFiles = [];
  const newFiles = [];

  const articles = sourceFiles.map((name) => {
    const article = buildArticle(name);
    syncContent(article, existingAsciiFiles, changedFiles, newFiles);
    return article;
  });

  articles.sort(sortArticles);
  attachRelated(articles);

  const siteData = buildSiteData(articles);
  const siteDataText = "window.SITE_DATA = " + JSON.stringify(siteData, null, 2) + ";\n";
  writeIfChanged(siteDataPath, siteDataText);

  const report = {
    updatedAt: siteData.updatedAt,
    currentDate,
    totalArticles: articles.length,
    newFiles,
    changedFiles,
    todayArticleId: siteData.dashboard.today.articleId,
    todayMatch: siteData.dashboard.today.match,
    metrics: siteData.dashboard.metrics,
    model: siteData.dashboard.model
  };

  process.stdout.write(JSON.stringify(report, null, 2));
}

function sourcePath(name) {
  return path.join(sourceDir, name);
}

function fileMtime(target) {
  return fs.statSync(target).mtimeMs;
}

function buildArticle(name) {
  const fullPath = sourcePath(name);
  const raw = fs.readFileSync(fullPath, "utf8").replace(/\u0000/g, "");
  const lines = raw.split(/\r?\n/);
  const type = detectType(name);
  const date = detectDate(name, raw);
  const title = cleanTitle(extractHeading(lines) || stripExtension(name));
  const match = detectMatch(title, raw, name);
  const meta = buildIdentity(type, name);

  const article = {
    id: meta.id,
    type,
    section: sectionName(type),
    title,
    date,
    summary: extractSummary(raw, type, match),
    file: meta.file,
    tags: extractTags(raw, type),
    stats: extractStats(raw, type, match),
    related: [],
    sourceName: name,
    sourceMtime: fs.statSync(fullPath).mtimeMs,
    markdown: raw
  };

  if (type === "feature" && meta.subtype) {
    article.subtype = meta.subtype;
  }

  if (match) {
    article.match = match;
  }

  return article;
}

function detectType(name) {
  if (FEATURE_OVERRIDES[name]) return "feature";
  if (name.startsWith("review-")) return "review";
  if (name.includes("prediction")) return "prediction";
  return "feature";
}

function buildIdentity(type, name) {
  if (type === "feature") {
    const override = FEATURE_OVERRIDES[name];
    if (override) return override;
    const slug = slugify(stripExtension(name));
    return { id: "feature-" + slug, file: "feature-" + slug + ".md" };
  }

  const base = stripExtension(name)
    .replace(/^review-/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/-prediction$/, "")
    .replace(/^review-\d{4}-\d{2}-\d{2}-/, "");
  const slug = slugify(base);

  if (type === "prediction") {
    return { id: "prediction-" + slug, file: "prediction-" + slug + ".md" };
  }

  return { id: "review-" + slug, file: "review-" + slug + ".md" };
}

function slugify(input) {
  return String(input)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function sectionName(type) {
  return {
    prediction: "赛前预测",
    review: "赛后复盘",
    feature: "专题研究"
  }[type];
}

function stripExtension(name) {
  return name.replace(/\.md$/i, "");
}

function extractHeading(lines) {
  const line = lines.find((item) => item.startsWith("# "));
  return line ? line.slice(2).trim() : "";
}

function cleanTitle(title) {
  return title
    .replace(/^[\p{Extended_Pictographic}\u2600-\u27BF\s]+/u, "")
    .replace(/\s+/g, " ")
    .trim();
}

function detectDate(name, raw) {
  const fileMatch = name.match(/\d{4}-\d{2}-\d{2}/);
  if (fileMatch) return fileMatch[0];
  const textMatch = raw.match(/20\d{2}-\d{2}-\d{2}/);
  if (textMatch) return textMatch[0];
  const cnMatch = raw.match(/(20\d{2})年(\d{1,2})月(\d{1,2})日/);
  if (cnMatch) {
    return [
      cnMatch[1],
      cnMatch[2].padStart(2, "0"),
      cnMatch[3].padStart(2, "0")
    ].join("-");
  }
  return currentDate;
}

function detectMatch(title, raw, name) {
  const titleSegments = title.split(/[·—:：|]/).map((item) => item.trim()).filter(Boolean);
  for (const segment of titleSegments.reverse()) {
    const hit = segment.match(/([A-Za-z\u4e00-\u9fff\- ]+?)\s+vs\s+([A-Za-z\u4e00-\u9fff\- ]+?)(?:[\s（(]|$)/i);
    if (hit) {
      return normalizeMatch(hit[1], hit[2]);
    }
  }

  const quoteMatch = raw.match(/>\s*([A-Za-z\u4e00-\u9fff·\- ]+?)\s+vs\s+([A-Za-z\u4e00-\u9fff·\- ]+?)\s*[·|｜]/i);
  if (quoteMatch) {
    return normalizeMatch(quoteMatch[1], quoteMatch[2]);
  }

  const row = raw.split(/\r?\n/).find((line) => /^\|/.test(line) && /vs/i.test(line));
  if (row) {
    const cells = splitTableRow(row);
    const hit = cells.find((cell) => /\bvs\b/i.test(cell));
    if (hit) {
      const parts = hit.split(/\bvs\b/i);
      if (parts.length === 2) return normalizeMatch(parts[0], parts[1]);
    }
  }

  const fileMatch = name.match(/(?:review-\d{4}-\d{2}-\d{2}-|^\d{4}-\d{2}-\d{2}-)?([a-z0-9-]+)-([a-z0-9-]+)-(?:prediction)?/i);
  if (!fileMatch) return "";
  return fileMatch[1].replace(/-/g, " ") + " vs " + fileMatch[2].replace(/-/g, " ");
}

function normalizeMatch(home, away) {
  return cleanupInline(home) + " vs " + cleanupInline(away);
}

function cleanupInline(text) {
  return String(text)
    .replace(/[\p{Extended_Pictographic}\u2600-\u27BF]/gu, "")
    .replace(/[🇦-🇿]/gu, "")
    .replace(/[`*_]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSummary(raw, type, match) {
  const summaryKeys = {
    prediction: ["一句话结论", "核心预测结论", "最终结论", "核心结论", "预测结论"],
    review: ["最终结论", "核心结论"],
    feature: ["核心摘要", "执行摘要", "核心结论"]
  }[type];

  const sectionSummary = findParagraphAfterHeading(raw, summaryKeys);
  if (sectionSummary) return clipSummary(sectionSummary);

  const paragraphs = raw
    .split(/\r?\n\r?\n/)
    .map((item) => item.trim())
    .filter((item) => item && item !== "---" && !item.startsWith("#") && !item.startsWith(">") && !item.startsWith("|"));

  if (paragraphs.length) return clipSummary(paragraphs[0]);
  if (match) return clipSummary(match + " 相关内容已同步。");
  return "世界杯研究内容已同步到站点。";
}

function clipSummary(text) {
  const clean = cleanupInline(text).replace(/\s+/g, " ").trim();
  if (clean.length <= 120) return clean;
  return clean.slice(0, 118).trimEnd() + "…";
}

function findParagraphAfterHeading(raw, headingKeywords) {
  const lines = raw.split(/\r?\n/);
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();
    if (!/^##+ /.test(line)) continue;
    if (!headingKeywords.some((keyword) => line.includes(keyword))) continue;

    const bucket = [];
    const bullets = [];
    for (let j = i + 1; j < lines.length; j += 1) {
      const next = lines[j].trim();
      if (/^##+ /.test(next)) break;
      if (!next || next === "---") {
        if (bucket.length) break;
        continue;
      }
      if (/^\|/.test(next)) {
        if (bucket.length) break;
        continue;
      }
      if (/^[-*]\s+/.test(next) || /^\d+\.\s+/.test(next)) {
        bullets.push(next.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, ""));
        if (bucket.length) break;
        continue;
      }
      bucket.push(next.replace(/^>\s?/, ""));
    }
    if (bucket.length) return bucket.join(" ");
    if (bullets.length) return bullets[0];
  }
  return "";
}

function extractTags(raw, type) {
  if (type === "feature") {
    const tags = [];
    if (raw.includes("魔咒")) tags.push("魔咒");
    if (raw.includes("进球")) tags.push("进球趋势");
    if (raw.includes("小组赛")) tags.push("小组赛");
    if (raw.includes("大比分")) tags.push("大比分");
    return unique(tags).slice(0, 4);
  }

  const tags = [];
  if (type === "prediction") tags.push("赛前预测");
  if (type === "review") tags.push("赛后复盘");
  if (raw.includes("xG")) tags.push("xG");
  if (raw.includes("世界杯")) tags.push("世界杯");
  return unique(tags);
}

function extractStats(raw, type, match) {
  if (type === "prediction") return extractPredictionStats(raw, match);
  if (type === "review") return extractReviewStats(raw, match);
  return extractFeatureStats(raw);
}

function extractPredictionStats(raw, match) {
  const probabilities = extractPredictionProbabilities(raw, match);
  const score = firstMatch(raw, [
    /最可能比分[^：:\n]*[:：]\s*\**([^*\n|]+)\**/u,
    /最终结论[\s\S]{0,240}?\*\*([^*\n]*\d+\s*-\s*\d+[^*\n]*)\*\*/u,
    /预测结论[\s\S]{0,240}?\*\*([^*\n]*\d+\s*-\s*\d+[^*\n]*)\*\*/u,
    /\|\s*(?:预测比分|最可能比分)\s*\|\s*([^|]+)\|/u
  ]);
  const totalGoals = firstMatch(raw, [
    /总进球[^：:\n]*[:：]\s*([^\n]+)/u,
    /\|\s*(?:总进球|总 xG区间|预计总xG区间)\s*\|\s*([^|]+)\|/u
  ]);
  const confidence = firstMatch(raw, [
    /置信度\s*\|\s*\**([^\n|*]+)\**/u,
    /置信度[^：:\n]*[:：]\s*([^\n*]+)/u,
    /概率置信度梯级[:：]\s*([^\n]+)/u
  ]) || "中";

  return [
    { label: "预测比分", value: cleanupInline(score || "待补充") },
    { label: "胜平负", value: probabilities.length ? probabilities.map((item) => item.value).join("/") : "待补充" },
    { label: "总进球", value: cleanupInline(totalGoals || "待补充") },
    { label: "置信度", value: cleanupInline(confidence || "中") }
  ];
}

function extractPredictionProbabilities(raw, match) {
  const sections = ["概率预测", "胜/平/负概率", "AI预测与市场赔率分析", "综合预测"];
  for (const section of sections) {
    const sectionText = extractSection(raw, section);
    const parsed = parseProbabilityRows(sectionText, match);
    if (parsed.length >= 3) return parsed.slice(0, 3);
  }
  return [];
}

function parseProbabilityRows(sectionText, match) {
  if (!sectionText) return [];
  const rows = sectionText.split(/\r?\n/).filter((line) => /^\|/.test(line));
  const parsed = [];

  for (const row of rows) {
    if (/---/.test(row)) continue;
    const cells = splitTableRow(row);
    const labelCell = cells[0] || "";
    const percentCell = cells.find((cell) => /\d{1,3}(?:\.\d+)?%/.test(cell));
    if (!percentCell) continue;
    const value = Number((percentCell.match(/\d{1,3}(?:\.\d+)?/) || [])[0]);
    if (!Number.isFinite(value)) continue;
    parsed.push({
      label: probabilityLabel(labelCell, match, parsed.length),
      value,
      tone: parsed.length === 0 ? "green" : parsed.length === 1 ? "gold" : "red"
    });
  }

  return parsed;
}

function probabilityLabel(label, match, index) {
  const clean = cleanupInline(label);
  if (clean.includes("平")) return "平局";
  if (match) {
    const [home, away] = match.split(/\s+vs\s+/i);
    if (clean.includes(home)) return home + "胜";
    if (clean.includes(away)) return away + "胜";
  }
  return ["主胜", "平局", "客胜"][index] || clean || "结果";
}

function extractReviewStats(raw, match) {
  const actualScore = firstMatch(raw, [
    /实际比分[:：]\s*\**([^\n*]+)\**/u,
    /\|\s*\**(?:最终比分|实际比分)\**\s*\|\s*[^|]+\|\s*([^|]+)\|/u,
    /\|\s*\**最终比分\**\s*\|\s*([^|]+)\|/u,
    /\|\s*比分\s*\|\s*[^|]+\|\s*([^|]+)\|/u
  ]);
  const outcome = firstMatch(raw, [
    /胜平负命中（[^）]+）\s*\|\s*([^\n|]+)/u,
    /\|\s*胜平负命中[^|]*\|\s*([^\|]+)\|/u,
    /\|\s*(?:赛果|胜平负|赛果方向)\s*\|\s*[^|]+\|\s*([^|]+)\|/u
  ]);
  const overUnder = firstMatch(raw, [
    /大小球[判断命中（][^|）]*[）]?\s*\|\s*([^\n|]+)/u,
    /\|\s*大小球判断[^|]*\|\s*([^\|]+)\|/u,
    /\|\s*\**大小球\**\s*\|\s*[^|]+\|\s*([^|]+)\|/u
  ]);
  const reviewScore = firstMatch(raw, [
    /整体评分[:：]\**\s*([0-9.]+\s*\/\s*10)\**/u,
    /综合评分[:：]\s*([0-9.]+\s*\/\s*10)/u,
    /复盘给分[:：]\s*([0-9.]+\s*\/\s*10)/u,
    /总体评价[:：].*?([0-9.]+\s*\/\s*10)/u
  ]) || "待补充";

  return [
    { label: "实际比分", value: cleanupInline(actualScore || match || "待补充") },
    { label: "胜平负", value: normalizeHitLabel(outcome) },
    { label: "大小球", value: normalizeHitLabel(overUnder) },
    { label: "复盘评分", value: cleanupInline(reviewScore) }
  ];
}

function normalizeHitLabel(value) {
  const clean = cleanupInline(value || "");
  if (!clean) return "待补充";
  if (clean.includes("✅") || clean.includes("命中") || clean.includes("方向对")) return "命中";
  if (clean.includes("⚠️") || clean.includes("部分")) return "部分命中";
  if (clean.includes("❌") || clean.includes("未")) return "未中";
  return clean;
}

function extractFeatureStats(raw) {
  const rows = raw.split(/\r?\n/).filter((line) => /^\|/.test(line) && !/---/.test(line)).slice(0, 5);
  const stats = [];
  for (const row of rows.slice(1)) {
    const cells = splitTableRow(row);
    if (cells.length < 2) continue;
    stats.push({
      label: cleanupInline(cells[0]),
      value: cleanupInline(cells[1])
    });
    if (stats.length === 4) break;
  }
  return stats;
}

function extractSection(raw, headingKeyword) {
  const lines = raw.split(/\r?\n/);
  let collecting = false;
  const bucket = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^##+ /.test(trimmed)) {
      if (collecting) break;
      if (trimmed.includes(headingKeyword)) {
        collecting = true;
      }
      continue;
    }
    if (collecting) bucket.push(line);
  }

  return bucket.join("\n");
}

function splitTableRow(row) {
  return row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const matched = text.match(pattern);
    if (matched && matched[1]) return matched[1].trim();
  }
  return "";
}

function unique(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function attachRelated(articles) {
  const articleMap = new Map(articles.map((article) => [article.id, article]));
  const features = articles.filter((article) => article.type === "feature");
  const latestFeatures = FEATURE_FALLBACKS
    .map((id) => articleMap.get(id))
    .filter(Boolean);

  for (const article of articles) {
    const related = [];
    const counterpartId = article.type === "prediction"
      ? article.id.replace(/^prediction-/, "review-")
      : article.type === "review"
        ? article.id.replace(/^review-/, "prediction-")
        : "";
    if (counterpartId && articleMap.has(counterpartId)) {
      related.push(counterpartId);
    }

    if (article.type === "feature") {
      related.push(...features.filter((item) => item.id !== article.id).slice(0, 3).map((item) => item.id));
    } else {
      related.push(...latestFeatures.map((item) => item.id));
    }

    article.related = unique(related).slice(0, 4);
  }
}

function buildSiteData(articles) {
  const predictions = articles.filter((article) => article.type === "prediction");
  const reviews = articles.filter((article) => article.type === "review");
  const features = articles.filter((article) => article.type === "feature");
  const todayCandidates = predictions
    .filter((article) => article.date === currentDate)
    .sort((a, b) => b.sourceMtime - a.sourceMtime);
  const today = todayCandidates[0] || predictions[0] || { stats: [] };
  const reviewCards = reviews.slice(0, 2).map((article) => ({
    label: "最新复盘",
    match: article.match || article.title,
    result: article.stats.find((stat) => stat.label === "实际比分")?.value || article.date,
    note: article.summary,
    articleId: article.id
  }));

  const model = buildModelStats(reviews);
  const metrics = [
    {
      label: "站内文章",
      value: String(articles.length),
      note: "四大板块统一索引，按时间倒序更新"
    },
    {
      label: "已复盘场次",
      value: String(reviews.length),
      note: "复盘样本扩大后，模型判断更可校准"
    },
    {
      label: "胜平负命中",
      value: percent(model[0].value, model[0].total),
      note: `${model[0].value}/${model[0].total}，先看方向稳定性`
    },
    {
      label: "复盘评分",
      value: averageReviewScore(reviews),
      note: "根据复盘文中的自评分动态更新"
    }
  ];

  return {
    updatedAt: formatTimestamp(new Date()),
    dashboard: {
      headline: "2026 世界杯预测、复盘与专题研究中枢",
      subtitle: "把赛前判断、赛后校准、专题模型和趋势信号放进同一套静态结构里，方便日更追踪。",
      today: buildTodayCard(today),
      reviewCards,
      metrics,
      model,
      signals: buildSignals(today, reviews, features, predictions),
      workflow: [
        "赛前：同步新预测，提取比分、概率、置信度和关键变量。",
        "赛后：新增复盘，回填命中情况、偏差根因和模型评分。",
        "专题：沉淀魔咒、进球趋势、大比分模型和赛程观察。",
        "仪表盘：聚合最新文章、模型战绩和当天重点信号。"
      ]
    },
    articles: articles.map(stripInternalFields)
  };
}

function buildTodayCard(article) {
  const probabilities = extractPredictionProbabilities(article.markdown || "", article.match);
  const scoreStat = article.stats.find((stat) => stat.label === "预测比分")?.value || article.summary;
  const confidence = article.stats.find((stat) => stat.label === "置信度")?.value || "中";
  const reasons = extractReasons(article.markdown || "", article.summary);
  return {
    title: "今日主推",
    match: article.match || article.title,
    time: article.date || currentDate,
    score: scoreStat,
    confidence,
    probabilities: probabilities.length ? probabilities : [
      { label: "主胜", value: 50, tone: "green" },
      { label: "平局", value: 28, tone: "gold" },
      { label: "客胜", value: 22, tone: "red" }
    ],
    reasons,
    articleId: article.id
  };
}

function extractReasons(raw, fallback) {
  const section = extractSection(raw, "预测逻辑") || extractSection(raw, "关键假设");
  const items = section
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))
    .map((line) => cleanupInline(line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")));
  if (items.length >= 3) return items.slice(0, 3);

  const sentences = cleanupInline(fallback).split(/(?<=[。！？])/).map((item) => item.trim()).filter(Boolean);
  return sentences.slice(0, 3);
}

function buildSignals(today, reviews, features, predictions) {
  const futureCount = predictions.filter((article) => article.date > currentDate).length;
  const latestFeature = features[0];
  const latestReview = reviews[0];
  return [
    {
      label: "今日主推",
      value: today.match || today.title,
      note: today.summary || "当天主推预测已同步"
    },
    {
      label: "最新专题",
      value: latestFeature ? latestFeature.title : "暂无",
      note: latestFeature ? latestFeature.summary : "专题研究待补充"
    },
    {
      label: "最新复盘",
      value: latestReview ? (latestReview.match || latestReview.title) : "暂无",
      note: latestReview ? latestReview.summary : "赛后复盘待补充"
    },
    {
      label: "预测储备",
      value: `${futureCount} 场`,
      note: "已提前写入后续赛程的赛前预测"
    }
  ];
}

function buildModelStats(reviews) {
  const counters = {
    outcome: 0,
    exact: 0,
    altScore: 0,
    overUnder: 0
  };

  for (const article of reviews) {
    const raw = article.markdown || "";
    if (
      /\|\s*胜平负命中[^|]*\|\s*[^\n|]*✅/u.test(raw) ||
      /\|\s*(?:赛果|胜平负|赛果方向)\s*\|[^\n|]+\|[^\n|]*✅/u.test(raw) ||
      /\|\s*(?:赛果|胜平负|赛果方向)\s*\|[^\n|]+\|[^\n|]*命中/u.test(raw) ||
      /方向[:：]\s*✅/u.test(raw) ||
      /✅\s*赛果方向[:：]/u.test(raw)
    ) {
      counters.outcome += 1;
    }
    if (/\|\s*比分命中[^|]*\|\s*[^\n|]*✅/u.test(raw) || /主推比分[:：]\s*✅/u.test(raw)) {
      counters.exact += 1;
    }
    if (
      /\|\s*(?:备选比分覆盖|备选比分命中)[^|]*\|\s*[^\n|]*✅/u.test(raw) ||
      /第 3 预测[:：]\s*✅/u.test(raw) ||
      /✅\s*比分备选命中[:：]/u.test(raw)
    ) {
      counters.altScore += 1;
    }
    if (
      /\|\s*大小球判断[^|]*\|\s*[^\n|]*✅/u.test(raw) ||
      /\|\s*\**大小球\**\s*\|[^\n|]+\|[^\n|]*✅/u.test(raw) ||
      /大小球[:：]\s*✅/u.test(raw) ||
      /小球命中\s*✅/u.test(raw)
    ) {
      counters.overUnder += 1;
    }
  }

  return [
    { label: "胜平负命中", value: counters.outcome, total: reviews.length, tone: gaugeTone(counters.outcome, reviews.length) },
    { label: "精确比分命中", value: counters.exact, total: reviews.length, tone: gaugeTone(counters.exact, reviews.length) },
    { label: "备选比分覆盖", value: counters.altScore, total: reviews.length, tone: gaugeTone(counters.altScore, reviews.length) },
    { label: "大小球命中", value: counters.overUnder, total: reviews.length, tone: gaugeTone(counters.overUnder, reviews.length) }
  ];
}

function gaugeTone(value, total) {
  const ratio = total ? value / total : 0;
  if (ratio >= 0.6) return "green";
  if (ratio >= 0.35) return "gold";
  return "red";
}

function percent(value, total) {
  if (!total) return "0%";
  return Math.round((value / total) * 100) + "%";
}

function averageReviewScore(reviews) {
  const values = reviews
    .map((article) => {
      const stat = article.stats.find((item) => item.label === "复盘评分");
      const matched = stat && stat.value.match(/[0-9.]+/);
      return matched ? Number(matched[0]) : NaN;
    })
    .filter((value) => Number.isFinite(value));
  if (!values.length) return "暂无";
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  return avg.toFixed(1);
}

function stripInternalFields(article) {
  const output = {
    id: article.id,
    type: article.type,
    section: article.section,
    title: article.title,
    date: article.date,
    summary: article.summary,
    file: article.file,
    tags: article.tags,
    stats: article.stats,
    related: article.related
  };

  if (article.subtype) output.subtype = article.subtype;
  if (article.match) output.match = article.match;
  return output;
}

function sortArticles(a, b) {
  if (a.date !== b.date) return b.date.localeCompare(a.date);
  if (a.type !== b.type) return typePriority(a.type) - typePriority(b.type);
  return b.sourceMtime - a.sourceMtime;
}

function typePriority(type) {
  return { review: 0, prediction: 1, feature: 2 }[type] ?? 9;
}

function formatTimestamp(date) {
  const pad = (value) => String(value).padStart(2, "0");
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate())
  ].join("-") + " " + [pad(date.getHours()), pad(date.getMinutes())].join(":");
}

function syncContent(article, existingAsciiFiles, changedFiles, newFiles) {
  const target = path.join(contentDir, article.file);
  const changed = writeIfChanged(target, article.markdown.endsWith("\n") ? article.markdown : article.markdown + "\n");
  if (changed && existingAsciiFiles.has(article.file)) {
    changedFiles.push(article.file);
  } else if (changed) {
    newFiles.push(article.file);
  }
}

function writeIfChanged(target, text) {
  if (fs.existsSync(target)) {
    const current = fs.readFileSync(target, "utf8");
    if (current === text) return false;
  }
  fs.writeFileSync(target, text, "utf8");
  return true;
}

main();
