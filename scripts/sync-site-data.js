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
  },
  "2026_wc_round2_prediction.md": {
    id: "feature-round2-matchday2-prediction",
    file: "feature-round2-matchday2-prediction.md",
    subtype: "赛程观察"
  },
  "2026世界杯大小球分析.md": {
    id: "feature-over-under-2026-tournament",
    file: "feature-over-under-2026-tournament.md",
    subtype: "杩涚悆瓒嬪娍"
  },
  "turkey-vs-paraguay-2026-prediction.md.md": {
    id: "prediction-turkey-paraguay",
    file: "prediction-turkey-paraguay.md"
  }
};

const FEATURE_FALLBACKS = [
  "feature-round2-matchday2-prediction",
  "feature-wc2026-blowout-prediction",
  "feature-blowout-analysis"
];

function main() {
  const sourceFiles = fs.readdirSync(sourceDir)
    .filter((name) => name.endsWith(".md"))
    .sort((a, b) => fileMtime(sourcePath(b)) - fileMtime(sourcePath(a)));

  const existingAsciiFiles = new Set(
    fs.readdirSync(contentDir).filter((name) => /^[\x00-\x7F]+$/.test(name))
  );
  const changedFiles = [];
  const newFiles = [];

  const latestById = new Map();
  for (const name of sourceFiles) {
    const article = buildArticle(name);
    const current = latestById.get(article.id);
    if (!current || article.sourceMtime >= current.sourceMtime) {
      latestById.set(article.id, article);
    }
  }
  const articles = Array.from(latestById.values());
  for (const article of articles) {
    syncContent(article, existingAsciiFiles, changedFiles, newFiles);
  }

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
  const markdown = fs.readFileSync(fullPath, "utf8").replace(/\u0000/g, "");
  const lines = markdown.split(/\r?\n/);
  const type = detectType(name);
  const identity = buildIdentity(type, name);
  const title = cleanTitle(extractHeading(lines) || stripExtension(name));
  const date = detectDate(name, markdown);
  const match = detectMatch(title, markdown, name, type);
  const summary = extractSummary(markdown, type, match, title);

  const article = {
    id: identity.id,
    type,
    section: sectionName(type),
    title,
    date,
    summary,
    file: identity.file,
    tags: extractTags(markdown, type),
    stats: extractStats(markdown, type, match, summary),
    related: [],
    sourceName: name,
    sourceMtime: fs.statSync(fullPath).mtimeMs,
    markdown
  };

  if (identity.subtype) article.subtype = identity.subtype;
  if (match) article.match = match;
  return article;
}

function detectType(name) {
  if (FEATURE_OVERRIDES[name]) return "feature";
  if (/(^review-)|(-review\.md$)/i.test(name)) return "review";
  if (name.includes("prediction")) return "prediction";
  return "feature";
}

function buildIdentity(type, name) {
  if (FEATURE_OVERRIDES[name]) return FEATURE_OVERRIDES[name];

  if (type === "feature") {
    const slug = slugify(stripExtension(name));
    return { id: "feature-" + slug, file: "feature-" + slug + ".md" };
  }

  const base = stripExtension(name)
    .replace(/^review-/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/-prediction(?:\.md)?$/i, "")
    .replace(/-review(?:\.md)?$/i, "")
    .replace(/^review-\d{4}-\d{2}-\d{2}-/, "");
  const slug = slugify(base);

  if (type === "prediction") {
    return { id: "prediction-" + slug, file: "prediction-" + slug + ".md" };
  }
  return { id: "review-" + slug, file: "review-" + slug + ".md" };
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

function slugify(input) {
  return String(input)
    .normalize("NFKD")
    .replace(/[^\x00-\x7F]/g, " ")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function extractHeading(lines) {
  const line = lines.find((item) => item.startsWith("# "));
  return line ? line.slice(2).trim() : "";
}

function cleanTitle(value) {
  return String(value)
    .replace(/^[\p{Extended_Pictographic}\u2600-\u27BF\s]+/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function detectDate(name, markdown) {
  const fileMatch = name.match(/\d{4}-\d{2}-\d{2}/);
  if (fileMatch) return fileMatch[0];

  const textMatch = markdown.match(/20\d{2}-\d{2}-\d{2}/);
  if (textMatch) return textMatch[0];

  const cnMatch = markdown.match(/(20\d{2})年(\d{1,2})月(\d{1,2})日/);
  if (cnMatch) {
    return [
      cnMatch[1],
      cnMatch[2].padStart(2, "0"),
      cnMatch[3].padStart(2, "0")
    ].join("-");
  }

  return currentDate;
}

function detectMatch(title, markdown, name, type) {
  if (type === "feature") {
    const hit = findFirstVs(textChunks(title, markdown));
    return hit || "";
  }

  const hit = findFirstVs(textChunks(title, markdown));
  if (hit) return hit;

  const matchFromName = stripExtension(name)
    .replace(/^review-/, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .replace(/-prediction$/, "");
  const pieces = matchFromName.split("-");
  if (pieces.length >= 2) {
    const mid = Math.floor(pieces.length / 2);
    return cleanupInline(pieces.slice(0, mid).join(" ")) + " vs " + cleanupInline(pieces.slice(mid).join(" "));
  }
  return "";
}

function textChunks(title, markdown) {
  const tableRows = markdown.split(/\r?\n/).filter((line) => /^\|/.test(line));
  const rows = tableRows.map((row) => splitTableRow(row).join(" "));
  const quoted = markdown.match(/>\s*(.+)/g) || [];
  return [title, ...rows, ...quoted];
}

function findFirstVs(chunks) {
  for (const chunk of chunks) {
    const hit = chunk.match(/([A-Za-z\u4e00-\u9fff().\- ]+?)\s+vs\s+([A-Za-z\u4e00-\u9fff().\- ]+?)(?:\s|$|\||，|。)/i);
    if (hit) {
      return normalizeMatch(hit[1], hit[2]);
    }
  }
  return "";
}

function normalizeMatch(home, away) {
  return cleanupInline(home) + " vs " + cleanupInline(away);
}

function cleanupInline(text) {
  return String(text)
    .replace(/[\p{Extended_Pictographic}\u2600-\u27BF]/gu, "")
    .replace(/[`*_>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractSummary(markdown, type, match, title) {
  const sections = markdown
    .split(/\r?\n\r?\n/)
    .map((item) => cleanupInline(item))
    .filter((item) => item && !item.startsWith("#") && !item.startsWith("|"));

  const bullets = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))
    .map((line) => cleanupInline(line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")));

  const preferred = [...bullets, ...sections].find((item) => item.length > 12 && !/Disclaimer/i.test(item));
  if (preferred) return clipSummary(preferred);
  if (match) return clipSummary(match + " 相关内容已同步到站点。");
  return clipSummary(title);
}

function clipSummary(text) {
  const clean = cleanupInline(text);
  if (clean.length <= 140) return clean;
  return clean.slice(0, 137).trimEnd() + "...";
}

function extractTags(markdown, type) {
  const tags = [];
  if (type === "prediction") tags.push("赛前预测");
  if (type === "review") tags.push("赛后复盘");
  if (type === "feature") tags.push("专题研究");
  if (/xG/i.test(markdown)) tags.push("xG");
  if (/世界杯|World Cup/i.test(markdown)) tags.push("世界杯");
  if (/大比分|blowout/i.test(markdown)) tags.push("大比分");
  if (/进球|goal/i.test(markdown)) tags.push("进球趋势");
  return unique(tags).slice(0, 4);
}

function extractStats(markdown, type, match, summary) {
  if (type === "prediction") return extractPredictionStats(markdown, match, summary);
  if (type === "review") return extractReviewStats(markdown, match);
  return extractFeatureStats(markdown);
}

function extractPredictionStats(markdown, match, summary) {
  const probs = extractProbabilityTriplet(markdown, match);
  const score = extractFirstScoreLine(markdown, summary);
  const totalGoals = extractTotalGoals(markdown);
  const confidence = extractConfidence(markdown);

  return [
    { label: "预测比分", value: score || "待补充" },
    { label: "胜平负", value: probs.length ? probs.map((item) => item.value).join("/") : "待补充" },
    { label: "总进球", value: totalGoals || "待补充" },
    { label: "置信度", value: confidence || "中" }
  ];
}

function extractProbabilityTriplet(markdown, match) {
  const inline = extractInlineProbabilities(markdown, match);
  if (inline.length) return inline;

  const rows = markdown.split(/\r?\n/).filter((line) => /^\|/.test(line) && /%/.test(line));
  const items = [];

  for (const row of rows) {
    const cells = splitTableRow(row);
    if (cells.length < 2) continue;
    const pct = cells.find((cell) => /\d{1,3}(?:\.\d+)?%/.test(cell));
    if (!pct) continue;
    const value = Number((pct.match(/\d{1,3}(?:\.\d+)?/) || [])[0]);
    if (!Number.isFinite(value)) continue;
    items.push({
      label: probabilityLabel(cleanupInline(cells[0]), match, items.length),
      value,
      tone: items.length === 0 ? "green" : items.length === 1 ? "gold" : "red"
    });
    if (items.length === 3) break;
  }

  return items;
}

function extractInlineProbabilities(markdown, match) {
  const line = markdown
    .split(/\r?\n/)
    .map((item) => cleanupInline(item))
    .find((item) => /胜率分布|概率分布/i.test(item) && /%/.test(item));
  if (!line) return [];

  const values = Array.from(line.matchAll(/(\d{1,3}(?:\.\d+)?)%/g))
    .map((matched) => Number(matched[1]))
    .filter((value) => Number.isFinite(value))
    .slice(0, 3);
  if (values.length < 3) return [];

  const labels = [];
  if (match) {
    const [home, away] = match.split(/\s+vs\s+/i);
    if (home) labels.push(home + "胜");
    labels.push("平局");
    if (away) labels.push(away + "胜");
  }

  return values.map((value, index) => ({
    label: labels[index] || ["主胜", "平局", "客胜"][index] || "结果",
    value,
    tone: index === 0 ? "green" : index === 1 ? "gold" : "red"
  }));
}

function probabilityLabel(label, match, index) {
  if (/平|draw/i.test(label)) return "平局";
  if (match) {
    const [home, away] = match.split(/\s+vs\s+/i);
    if (label.includes(home)) return home + "胜";
    if (label.includes(away)) return away + "胜";
  }
  return ["主胜", "平局", "客胜"][index] || label || "结果";
}

function extractFirstScoreLine(markdown, fallback) {
  const labelledLine = markdown
    .split(/\r?\n/)
    .map((item) => cleanupInline(item))
    .find((item) => /最可能比分|预测比分|比分预测/i.test(item) && /\d+\s*-\s*\d+/.test(item));
  if (labelledLine) {
    const labelledMatch = labelledLine.match(/\d+\s*-\s*\d+/);
    if (labelledMatch) return labelledMatch[0];
  }

  const scoreMatch = markdown.match(/(?<!\d{4})\b\d+\s*-\s*\d+\b(?!-\d{2})/);
  if (scoreMatch) return scoreMatch[0];
  return cleanupInline(fallback || "");
}

function extractTotalGoals(markdown) {
  const line = markdown.split(/\r?\n/).find((item) => /总进球|xG区间|进球区间/i.test(item));
  return line ? cleanupInline(line) : "";
}

function extractConfidence(markdown) {
  const line = markdown.split(/\r?\n/).find((item) => /置信度|confidence/i.test(item));
  if (!line) return "";
  if (/极低|very low/i.test(line)) return "极低";
  if (/低|low/i.test(line)) return "低";
  if (/中|medium/i.test(line)) return "中";
  if (/高|high/i.test(line)) return "高";
  return cleanupInline(line);
}

function extractConfidence(markdown) {
  const line = markdown
    .split(/\r?\n/)
    .map((item) => cleanupInline(item))
    .find((item) => /缃俊搴confidence|置信度/i.test(item));
  if (!line) return "";
  if (/鏋佷綆|very low|极低/i.test(line)) return "极低";
  if (/浣巪low|低/i.test(line)) return "低";
  if (/涓瓅medium|中/i.test(line)) return "中";
  if (/楂榺high|高/i.test(line)) return "高";
  return cleanupInline(line);
}

// Override prediction parsers with stricter heuristics for newer templates.
function extractProbabilityTriplet(markdown, match) {
  const inline = extractInlineProbabilities(markdown, match);
  if (inline.length) return inline;

  const rows = markdown.split(/\r?\n/).filter((line) => /^\|/.test(line) && /%/.test(line));
  const items = [];

  for (const row of rows) {
    if (/\d+\s*-\s*\d+/.test(row) || /20\d{2}[-/]\d{1,2}[-/]\d{1,2}/.test(row)) continue;
    const cells = splitTableRow(row);
    if (cells.length < 2) continue;
    const pct = cells.find((cell) => /\d{1,3}(?:\.\d+)?%/.test(cell));
    if (!pct) continue;
    const value = Number((pct.match(/\d{1,3}(?:\.\d+)?/) || [])[0]);
    if (!Number.isFinite(value)) continue;
    items.push({
      label: probabilityLabel(cleanupInline(cells[0]), match, items.length),
      value,
      tone: items.length === 0 ? "green" : items.length === 1 ? "gold" : "red"
    });
    if (items.length === 3) break;
  }

  return items;
}

function extractInlineProbabilities(markdown, match) {
  const line = markdown
    .split(/\r?\n/)
    .map((item) => cleanupInline(item))
    .find((item) => {
      const percentCount = Array.from(item.matchAll(/(\d{1,3}(?:\.\d+)?)%/g)).length;
      if (percentCount !== 3) return false;
      if (/\d+\s*-\s*\d+/.test(item) || /20\d{2}[-/]\d{1,2}[-/]\d{1,2}/.test(item)) return false;
      return /鑳滅巼鍒嗗竷|姒傜巼鍒嗗竷|\/|·/.test(item);
    });
  if (!line) return [];

  const values = Array.from(line.matchAll(/(\d{1,3}(?:\.\d+)?)%/g))
    .map((matched) => Number(matched[1]))
    .filter((value) => Number.isFinite(value))
    .slice(0, 3);
  if (values.length < 3) return [];

  const labels = [];
  if (match) {
    const [home, away] = match.split(/\s+vs\s+/i);
    if (home) labels.push(home + "鑳?");
    labels.push("骞冲眬");
    if (away) labels.push(away + "鑳?");
  }

  return values.map((value, index) => ({
    label: labels[index] || ["涓昏儨", "骞冲眬", "瀹㈣儨"][index] || "缁撴灉",
    value,
    tone: index === 0 ? "green" : index === 1 ? "gold" : "red"
  }));
}

function extractFirstScoreLine(markdown, fallback) {
  for (const row of markdown.split(/\r?\n/).filter((item) => /^\|/.test(item) && /%/.test(item))) {
    const cells = splitTableRow(row);
    if (cells.length < 2) continue;
    if (!/\d+\s*-\s*\d+/.test(cells[0]) || !/%/.test(cells[1])) continue;
    const tableScoreMatch = cells[0].match(/\d+\s*-\s*\d+/);
    if (tableScoreMatch) return tableScoreMatch[0];
  }

  const cleanedLines = markdown
    .split(/\r?\n/)
    .map((item) => cleanupInline(item))
    .filter(Boolean);

  const preferredLine = cleanedLines.find((item) => {
    if (!/\d+\s*-\s*\d+/.test(item)) return false;
    if (/20\d{2}[-/]\d{1,2}[-/]\d{1,2}/.test(item)) return false;
    return /鏈€鍙兘姣斿垎|棰勬祴姣斿垎|姣斿垎棰勬祴|\||%/.test(item);
  });
  if (preferredLine) {
    const preferredMatch = preferredLine.match(/\d+\s*-\s*\d+/);
    if (preferredMatch) return preferredMatch[0];
  }

  for (const line of cleanedLines) {
    if (/20\d{2}[-/]\d{1,2}[-/]\d{1,2}/.test(line)) continue;
    const scoreMatch = line.match(/\b\d+\s*-\s*\d+\b/);
    if (scoreMatch) return scoreMatch[0];
  }

  return cleanupInline(fallback || "");
}

function extractTotalGoals(markdown) {
  const line = markdown
    .split(/\r?\n/)
    .map((item) => cleanupInline(item))
    .find((item) => /鎬昏繘鐞億xG鍖洪棿|杩涚悆鍖洪棿|total xg|xg/i.test(item) && /\d+(?:\.\d+)?\s*-\s*\d+(?:\.\d+)?/.test(item));
  return line ? line : "";
}

function extractConfidence(markdown) {
  const line = markdown
    .split(/\r?\n/)
    .map((item) => cleanupInline(item))
    .find((item) => /缂冾喕淇婃惔顩onfidence|缃俊搴?|confidence/i.test(item));
  if (!line) return "";
  if (/閺嬩椒缍唡very low|鏋佷綆/i.test(line)) return "鏋佷綆";
  if (/娴ｅ藩low|浣?|low/i.test(line)) return "浣?";
  if (/娑撶搮medium|涓?|medium/i.test(line)) return "涓?";
  if (/妤傛high|楂?|high/i.test(line)) return "楂?";
  return cleanupInline(line);
}

function extractReviewStats(markdown, match) {
  const reviewRows = parseReviewRows(markdown);
  const scoreRow = reviewRows[0];
  const actualScore = firstMatch(markdown, [
    /实际比分[:：]\s*\**([^\n*]+)\**/u,
    /\|\s*\**(?:最终比分|实际比分)\**\s*\|\s*[^|]+\|\s*([^|]+)\|/u,
    /\|\s*\**最终比分\**\s*\|\s*([^|]+)\|/u,
    /\|\s*比分\s*\|\s*[^|]+\|\s*([^|]+)\|/u
  ]) || (scoreRow ? scoreRow.actual : match || "待补充");
  const outcome = firstMatch(markdown, [
    /胜平负命中（[^）]+）\s*\|\s*([^\n|]+)/u,
    /\|\s*胜平负命中[^|]*\|\s*([^\|]+)\|/u,
    /\|\s*(?:赛果|胜平负|赛果方向)\s*\|\s*[^|]+\|\s*([^|]+)\|/u
  ]) || (scoreRow ? scoreRow.judgement : "");
  const overUnder = firstMatch(markdown, [
    /大小球[^：|\n]*[:：]\s*([^\n]+)/u,
    /\|\s*大小球判断[^|]*\|\s*([^\|]+)\|/u,
    /\|\s*\**大小球\**\s*\|\s*[^|]+\|\s*([^|]+)\|/u
  ]) || findOverUnderJudgement(reviewRows, markdown);
  const overallScore = firstMatch(markdown, [
    /整体评分[:：]\s*\**([0-9.]+\s*\/\s*10)\**/u,
    /综合评分[:：]\s*([0-9.]+\s*\/\s*10)/u,
    /复盘给分[:：]\s*([0-9.]+\s*\/\s*10)/u,
    /总体评价[:：].*?([0-9.]+\s*\/\s*10)/u
  ]) || extractOverallReviewScore(markdown);

  return [
    { label: "实际比分", value: cleanupInline(actualScore) },
    { label: "胜平负", value: normalizeHitLabel(outcome) },
    { label: "大小球", value: normalizeHitLabel(overUnder) },
    { label: "复盘评分", value: overallScore }
  ];
}

function parseReviewRows(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => /^\|/.test(line) && !/---/.test(line))
    .map((line) => splitTableRow(line))
    .slice(1)
    .filter((cells) => cells.length >= 4)
    .map((cells) => ({
      label: cleanupInline(cells[0]),
      predicted: cleanupInline(cells[1]),
      actual: cleanupInline(cells[2]),
      judgement: cleanupInline(cells[3])
    }));
}

function extractOverallReviewScore(markdown) {
  const matches = markdown.match(/[0-9.]+\s*\/\s*10/g);
  if (!matches || !matches.length) return "待补充";
  return matches[matches.length - 1];
}

function findOverUnderJudgement(reviewRows, markdown) {
  const row = reviewRows.find((item) => /大小|total|xg/i.test(`${item.label} ${item.predicted} ${item.actual}`));
  if (row) return row.judgement;
  const line = markdown.split(/\r?\n/).find((item) => /大小球|大球|小球/i.test(item));
  return line ? cleanupInline(line) : "";
}

function normalizeHitLabel(value) {
  const clean = cleanupInline(value || "");
  if (!clean) return "待补充";
  if (/[✅✔]/u.test(clean) || /hit|命中|正确/i.test(clean)) return "命中";
  if (/[⚠]/u.test(clean) || /partial|部分|方向正确/i.test(clean)) return "部分命中";
  if (/[❌✘]/u.test(clean) || /miss|错误|未中/i.test(clean)) return "未中";
  return clean;
}

function extractFeatureStats(markdown) {
  const rows = markdown.split(/\r?\n/).filter((line) => /^\|/.test(line) && !/---/.test(line));
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

function splitTableRow(row) {
  return row
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function unique(items) {
  return Array.from(new Set(items.filter(Boolean)));
}

function attachRelated(articles) {
  const byId = new Map(articles.map((article) => [article.id, article]));
  const features = articles.filter((article) => article.type === "feature");
  const fallbackFeatures = FEATURE_FALLBACKS.map((id) => byId.get(id)).filter(Boolean);

  for (const article of articles) {
    const related = [];
    if (article.type === "prediction") {
      const reviewId = article.id.replace(/^prediction-/, "review-");
      if (byId.has(reviewId)) related.push(reviewId);
    }
    if (article.type === "review") {
      const predictionId = article.id.replace(/^review-/, "prediction-");
      if (byId.has(predictionId)) related.push(predictionId);
    }
    if (article.type === "feature") {
      related.push(...features.filter((item) => item.id !== article.id).slice(0, 3).map((item) => item.id));
    } else {
      related.push(...fallbackFeatures.map((item) => item.id));
    }
    article.related = unique(related).slice(0, 4);
  }
}

function buildSiteData(articles) {
  const predictions = articles.filter((article) => article.type === "prediction");
  const reviews = articles.filter((article) => article.type === "review");
  const features = articles.filter((article) => article.type === "feature");
  const today = predictions.find((article) => article.date === currentDate) || predictions[0] || { stats: [] };
  const model = buildModelStats(reviews);

  return {
    updatedAt: formatTimestamp(new Date()),
    dashboard: {
      headline: "2026 世界杯预测、复盘与专题研究中枢",
      subtitle: "把赛前判断、赛后校准、模型战绩和趋势信号放进同一套静态结构里，方便持续更新。",
      today: buildTodayCard(today),
      reviewCards: reviews.slice(0, 2).map((article) => ({
        label: "最新复盘",
        match: article.match || article.title,
        result: statValue(article, "实际比分", article.date),
        note: article.summary,
        articleId: article.id
      })),
      metrics: [
        {
          label: "站内文章",
          value: String(articles.length),
          note: "四大板块统一索引，按时间倒序更新"
        },
        {
          label: "已复盘场次",
          value: String(reviews.length),
          note: "复盘样本继续累积，模型判断持续校准"
        },
        {
          label: "胜平负命中",
          value: percent(model[0].value, model[0].total),
          note: `${model[0].value}/${model[0].total}，先看方向稳定性`
        },
        {
          label: "复盘评分",
          value: averageReviewScore(reviews),
          note: "按复盘文中的总体评分动态更新"
        }
      ],
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
  const probabilities = extractProbabilityTriplet(article.markdown || "", article.match);
  return {
    title: "今日主推",
    match: article.match || article.title || "暂无",
    time: article.date || currentDate,
    score: statValue(article, "预测比分", article.summary || "待补充"),
    confidence: statValue(article, "置信度", "中"),
    probabilities: probabilities.length ? probabilities : [
      { label: "主胜", value: 50, tone: "green" },
      { label: "平局", value: 28, tone: "gold" },
      { label: "客胜", value: 22, tone: "red" }
    ],
    reasons: extractReasons(article.markdown || "", article.summary || ""),
    articleId: article.id || ""
  };
}

function extractReasons(markdown, fallback) {
  const items = markdown
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line) || /^\d+\.\s+/.test(line))
    .map((line) => cleanupInline(line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "")));
  if (items.length >= 3) return items.slice(0, 3);
  return clipSummary(fallback).split(/[。.!?]/).map((item) => item.trim()).filter(Boolean).slice(0, 3);
}

function buildSignals(today, reviews, features, predictions) {
  const futureCount = predictions.filter((article) => article.date > currentDate).length;
  const latestFeature = features[0];
  const latestReview = reviews[0];
  return [
    {
      label: "今日主推",
      value: today.match || today.title || "暂无",
      note: today.summary || "当天重点预测已同步"
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
      note: "已写入后续赛程的赛前预测"
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
    const rows = parseReviewRows(raw);
    const scoreRow = rows[0];
    const altScoreRow = rows.find((row) => /备选|alternate/i.test(row.label));
    const overUnder = findOverUnderJudgement(rows, raw);
    const outcomeHit =
      /\|\s*胜平负命中[^|]*\|\s*[^\n|]*✅/u.test(raw) ||
      /\|\s*(?:赛果|胜平负|赛果方向)\s*\|[^\n|]+\|[^\n|]*(?:✅|命中)/u.test(raw) ||
      /方向[:：]\s*✅/u.test(raw) ||
      /✅\s*赛果方向[:：]/u.test(raw) ||
      (scoreRow && /命中|部分命中|方向正确/.test(normalizeHitLabel(scoreRow.judgement)));
    if (outcomeHit) counters.outcome += 1;

    const exactHit =
      /\|\s*比分命中[^|]*\|\s*[^\n|]*✅/u.test(raw) ||
      /主推比分[:：]\s*✅/u.test(raw) ||
      (scoreRow && normalizeHitLabel(scoreRow.judgement) === "命中" && scoreRow.predicted && scoreRow.actual && scoreRow.predicted.includes(scoreRow.actual));
    if (exactHit) counters.exact += 1;

    const altScoreHit =
      /\|\s*(?:备选比分覆盖|备选比分命中)[^|]*\|\s*[^\n|]*✅/u.test(raw) ||
      /第 3 预测[:：]\s*✅/u.test(raw) ||
      /✅\s*比分备选命中[:：]/u.test(raw) ||
      (altScoreRow && normalizeHitLabel(altScoreRow.judgement) === "命中");
    if (altScoreHit) counters.altScore += 1;

    const overUnderHit =
      /\|\s*大小球判断[^|]*\|\s*[^\n|]*✅/u.test(raw) ||
      /\|\s*\**大小球\**\s*\|[^\n|]+\|[^\n|]*✅/u.test(raw) ||
      /大小球[:：]\s*✅/u.test(raw) ||
      /小球命中\s*✅/u.test(raw) ||
      normalizeHitLabel(overUnder) === "命中";
    if (overUnderHit) counters.overUnder += 1;
  }

  return [
    gaugeStat("胜平负命中", counters.outcome, reviews.length),
    gaugeStat("精确比分命中", counters.exact, reviews.length),
    gaugeStat("备选比分覆盖", counters.altScore, reviews.length),
    gaugeStat("大小球命中", counters.overUnder, reviews.length)
  ];
}

function gaugeStat(label, value, total) {
  return {
    label,
    value,
    total,
    tone: gaugeTone(value, total)
  };
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
      const match = stat && stat.value.match(/[0-9.]+/);
      return match ? Number(match[0]) : NaN;
    })
    .filter((value) => Number.isFinite(value));

  if (!values.length) return "暂无";
  return (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1);
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

function buildTodayCard(article) {
  const probabilities = extractProbabilityTriplet(article.markdown || "", article.match);
  const normalizedProbabilities = (() => {
    if (!probabilities.length || !article.match || !article.match.includes(" vs ")) return probabilities;
    const [home, away] = article.match.split(/\s+vs\s+/i);
    const labels = [home, "Draw", away];
    return probabilities.map((item, index) => ({
      ...item,
      label: labels[index] || item.label
    }));
  })();
  const score = extractFirstScoreLine(
    article.markdown || "",
    statValue(article, "棰勬祴姣斿垎", article.summary || "寰呰ˉ鍏?")
  );
  const confidence = extractConfidence(article.markdown || "") || statValue(article, "缃俊搴?", "涓?");

  return {
    title: "浠婃棩涓绘帹",
    match: article.match || article.title || "鏆傛棤",
    time: article.date || currentDate,
    score,
    confidence,
    probabilities: normalizedProbabilities.length ? normalizedProbabilities : [
      { label: "涓昏儨", value: 50, tone: "green" },
      { label: "骞冲眬", value: 28, tone: "gold" },
      { label: "瀹㈣儨", value: 22, tone: "red" }
    ],
    reasons: extractReasons(article.markdown || "", article.summary || ""),
    articleId: article.id || ""
  };
}

function statValue(article, label, fallback) {
  const stat = (article.stats || []).find((item) => item.label === label);
  return stat ? stat.value : fallback;
}

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const matched = text.match(pattern);
    if (matched && matched[1]) return cleanupInline(matched[1]);
  }
  return "";
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
  if (!changed) return;
  if (existingAsciiFiles.has(article.file)) changedFiles.push(article.file);
  else newFiles.push(article.file);
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
