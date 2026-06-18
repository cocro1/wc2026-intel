window.SITE_DATA = {
  "updatedAt": "2026-06-18 19:13",
  "dashboard": {
    "headline": "2026 世界杯预测、复盘与专题研究中枢",
    "subtitle": "把赛前判断、赛后校准、模型战绩和趋势信号放进同一套静态结构里，方便持续更新。",
    "today": {
      "title": "今日主推",
      "match": "乌兹别克斯坦 vs 哥伦比亚",
      "time": "2026-06-17",
      "score": "2026-06",
      "confidence": "低",
      "probabilities": [
        {
          "label": "主胜",
          "value": 2,
          "tone": "green"
        },
        {
          "label": "平局",
          "value": 80,
          "tone": "gold"
        },
        {
          "label": "客胜",
          "value": 90,
          "tone": "red"
        }
      ],
      "reasons": [
        "总xG：2.00 - 3.00",
        "哥伦比亚 xG：1.50 - 2.20 | 乌兹别克斯坦 xG：0.70 - 1.20",
        "实力差距全方位： 哥伦比亚FIFA 13，拥有路易斯·迪亚斯（拜仁世界级）+J罗（世界杯金靴）+英超两名首发。乌兹别克斯坦FIFA 58，除胡萨诺夫（曼城轮换）外所有球员来自亚洲联赛。差距不仅是排名，而是联赛质量的\"级差\"。"
      ],
      "articleId": "prediction-uzbekistan-colombia"
    },
    "reviewCards": [
      {
        "label": "最新复盘",
        "match": "england vs croatia",
        "result": "英格兰 4-2 克罗地亚",
        "note": "8项命中：赛果方向、Kane、Bellingham、双方进球、克罗地亚反击、控球优势、平局概率、克罗地亚胜率",
        "articleId": "review-england-croatia"
      },
      {
        "label": "最新复盘",
        "match": "ghana vs panama",
        "result": "加纳 1-0 巴拿马",
        "note": "3项命中：紧密低位比赛、备选覆盖、加纳整体实力略优",
        "articleId": "review-ghana-panama"
      }
    ],
    "metrics": [
      {
        "label": "站内文章",
        "value": "55",
        "note": "四大板块统一索引，按时间倒序更新"
      },
      {
        "label": "已复盘场次",
        "value": "20",
        "note": "复盘样本继续累积，模型判断持续校准"
      },
      {
        "label": "胜平负命中",
        "value": "35%",
        "note": "7/20，先看方向稳定性"
      },
      {
        "label": "复盘评分",
        "value": "5.5",
        "note": "按复盘文中的总体评分动态更新"
      }
    ],
    "model": [
      {
        "label": "胜平负命中",
        "value": 7,
        "total": 20,
        "tone": "gold"
      },
      {
        "label": "精确比分命中",
        "value": 0,
        "total": 20,
        "tone": "red"
      },
      {
        "label": "备选比分覆盖",
        "value": 3,
        "total": 20,
        "tone": "red"
      },
      {
        "label": "大小球命中",
        "value": 9,
        "total": 20,
        "tone": "gold"
      }
    ],
    "signals": [
      {
        "label": "今日主推",
        "value": "乌兹别克斯坦 vs 哥伦比亚",
        "note": "总xG：2.00 - 3.00"
      },
      {
        "label": "最新专题",
        "value": "2026 世界杯小组赛「大比分高概率场次」预测分析",
        "note": "2026 世界杯小组赛「大比分高概率场次」预测分析"
      },
      {
        "label": "最新复盘",
        "value": "england vs croatia",
        "note": "8项命中：赛果方向、Kane、Bellingham、双方进球、克罗地亚反击、控球优势、平局概率、克罗地亚胜率"
      },
      {
        "label": "预测储备",
        "value": "0 场",
        "note": "已写入后续赛程的赛前预测"
      }
    ],
    "workflow": [
      "赛前：同步新预测，提取比分、概率、置信度和关键变量。",
      "赛后：新增复盘，回填命中情况、偏差根因和模型评分。",
      "专题：沉淀魔咒、进球趋势、大比分模型和赛程观察。",
      "仪表盘：聚合最新文章、模型战绩和当天重点信号。"
    ]
  },
  "articles": [
    {
      "id": "feature-wc2026-blowout-prediction",
      "type": "feature",
      "section": "专题研究",
      "title": "2026 世界杯小组赛「大比分高概率场次」预测分析",
      "date": "2026-06-18",
      "summary": "2026 世界杯小组赛「大比分高概率场次」预测分析",
      "file": "feature-wc2026-blowout-prediction.md",
      "tags": [
        "专题研究",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "1",
          "value": "FIFA 排名差 ≥ 30"
        },
        {
          "label": "2",
          "value": "弱队为世界杯新军"
        },
        {
          "label": "3",
          "value": "弱队久违参赛 / 经验严重不足"
        },
        {
          "label": "4",
          "value": "亚洲/非洲防线 vs 欧洲/南美顶级锋线"
        }
      ],
      "related": [
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction",
        "feature-daily-brief-2026-06-16"
      ],
      "subtype": "大比分模型",
      "match": "墨西哥 vs 南非"
    },
    {
      "id": "feature-blowout-analysis",
      "type": "feature",
      "section": "专题研究",
      "title": "2018 & 2022 世界杯「大比分比赛」特征深度分析报告",
      "date": "2026-06-18",
      "summary": "2018：12 场大比分中有 9 场（75%）包含定位球进球（点球、角球、任意球）",
      "file": "feature-blowout-analysis.md",
      "tags": [
        "专题研究",
        "世界杯",
        "大比分",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "1",
          "value": "小组赛 A 组"
        },
        {
          "label": "2",
          "value": "小组赛 G 组"
        },
        {
          "label": "3",
          "value": "小组赛 G 组"
        },
        {
          "label": "4",
          "value": "小组赛 B 组"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-round2-matchday2-prediction",
        "feature-daily-brief-2026-06-16"
      ],
      "subtype": "强弱差模型",
      "match": "小组赛 A 组 俄罗斯 vs 沙特阿拉伯"
    },
    {
      "id": "review-england-croatia",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘报告 · 英格兰 vs 克罗地亚（2026-06-17）",
      "date": "2026-06-17",
      "summary": "8项命中：赛果方向、Kane、Bellingham、双方进球、克罗地亚反击、控球优势、平局概率、克罗地亚胜率",
      "file": "review-england-croatia.md",
      "tags": [
        "赛后复盘",
        "xG",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "英格兰 4-2 克罗地亚"
        },
        {
          "label": "胜平负",
          "value": "命中"
        },
        {
          "label": "大小球",
          "value": "远超上限"
        },
        {
          "label": "复盘评分",
          "value": "6.5/10"
        }
      ],
      "related": [
        "prediction-england-croatia",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "england vs croatia"
    },
    {
      "id": "review-ghana-panama",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘报告 · 加纳 vs 巴拿马（2026-06-17）",
      "date": "2026-06-17",
      "summary": "3项命中：紧密低位比赛、备选覆盖、加纳整体实力略优",
      "file": "review-ghana-panama.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "加纳 1-0 巴拿马"
        },
        {
          "label": "胜平负",
          "value": "未中"
        },
        {
          "label": "大小球",
          "value": "命中"
        },
        {
          "label": "复盘评分",
          "value": "4.3/10"
        }
      ],
      "related": [
        "prediction-ghana-panama",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "ghana vs panama"
    },
    {
      "id": "review-portugal-dr-congo",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘报告 · 葡萄牙 vs 刚果民主共和国（2026-06-17）",
      "date": "2026-06-17",
      "summary": "3项命中：备选覆盖、刚果xG上限、刚果反击进球方式",
      "file": "review-portugal-dr-congo.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "1-1 平局"
        },
        {
          "label": "胜平负",
          "value": "严重偏差"
        },
        {
          "label": "大小球",
          "value": "远低于下限"
        },
        {
          "label": "复盘评分",
          "value": "3.5/10"
        }
      ],
      "related": [
        "prediction-portugal-dr-congo",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "portugal vs dr congo"
    },
    {
      "id": "review-uzbekistan-colombia",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘报告 · 乌兹别克斯坦 vs 哥伦比亚（2026-06-17）",
      "date": "2026-06-17",
      "summary": "8项命中：赛果方向、Díaz、备选覆盖、乌兹别克xG、平局概率、乌兹别克胜率、进攻深度、控球优势",
      "file": "review-uzbekistan-colombia.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "哥伦比亚 3-1 乌兹别克"
        },
        {
          "label": "胜平负",
          "value": "命中"
        },
        {
          "label": "大小球",
          "value": "️ 略超上限"
        },
        {
          "label": "复盘评分",
          "value": "7.5/10"
        }
      ],
      "related": [
        "prediction-uzbekistan-colombia",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "uzbekistan vs colombia"
    },
    {
      "id": "prediction-uzbekistan-colombia",
      "type": "prediction",
      "section": "赛前预测",
      "title": "乌兹别克斯坦 vs 哥伦比亚 — 2026世界杯 K组 第1轮 预测报告",
      "date": "2026-06-17",
      "summary": "总xG：2.00 - 3.00",
      "file": "prediction-uzbekistan-colombia.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "2/80/90"
        },
        {
          "label": "总进球",
          "value": "预期xG区间"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "review-uzbekistan-colombia",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "乌兹别克斯坦 vs 哥伦比亚"
    },
    {
      "id": "prediction-ghana-panama",
      "type": "prediction",
      "section": "赛前预测",
      "title": "加纳 vs 巴拿马 — 2026世界杯 L组 第1轮 预测报告",
      "date": "2026-06-17",
      "summary": "总xG：1.80 - 2.80",
      "file": "prediction-ghana-panama.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "3/82/90"
        },
        {
          "label": "总进球",
          "value": "预期xG区间"
        },
        {
          "label": "置信度",
          "value": "极低"
        }
      ],
      "related": [
        "review-ghana-panama",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "加纳 vs 巴拿马"
    },
    {
      "id": "prediction-england-croatia",
      "type": "prediction",
      "section": "赛前预测",
      "title": "英格兰 vs 克罗地亚 — 2026世界杯 L组 第1轮 预测报告",
      "date": "2026-06-17",
      "summary": "总xG：2.20 - 3.20",
      "file": "prediction-england-croatia.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "3/74/98"
        },
        {
          "label": "总进球",
          "value": "预期xG区间"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "review-england-croatia",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "英格兰 vs 克罗地亚"
    },
    {
      "id": "prediction-portugal-dr-congo",
      "type": "prediction",
      "section": "赛前预测",
      "title": "葡萄牙 vs 民主刚果 — 2026世界杯 K组 第1轮 预测报告",
      "date": "2026-06-17",
      "summary": "总xG：2.70 - 3.80",
      "file": "prediction-portugal-dr-congo.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "78/95/85"
        },
        {
          "label": "总进球",
          "value": "预期xG区间"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "review-portugal-dr-congo",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "葡萄牙 vs 民主刚果"
    },
    {
      "id": "feature-round2-matchday2-prediction",
      "type": "feature",
      "section": "专题研究",
      "title": "2026 年世界杯小组赛第二轮预测报告",
      "date": "2026-06-17",
      "summary": "数据分析来源 / Data Sources: 2018 年俄罗斯世界杯、2022 年卡塔尔世界杯完整小组赛数据（第一轮 + 第二轮），以及 2026 年世界杯实际第一轮结果（截至 2026 年 6 月 17 日）。",
      "file": "feature-round2-matchday2-prediction.md",
      "tags": [
        "专题研究",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "胜 (Win)",
          "value": "13/16 (81%)"
        },
        {
          "label": "平 (Draw)",
          "value": "1/16 (6%)"
        },
        {
          "label": "负 (Loss)",
          "value": "2/16 (13%)"
        },
        {
          "label": "维度",
          "value": "2018 R1"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-daily-brief-2026-06-16"
      ],
      "subtype": "赛程观察",
      "match": "法国 vs 伊拉克"
    },
    {
      "id": "review-austria-jordan",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘：奥地利 vs 约旦 — 2026世界杯 J组第1轮",
      "date": "2026-06-16",
      "summary": "比分备选命中：1-0为第二备选（12%）",
      "file": "review-austria-jordan.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "奥地利 1-0 约旦（第二备选·12%）"
        },
        {
          "label": "胜平负",
          "value": "奥地利胜"
        },
        {
          "label": "大小球",
          "value": "命中"
        },
        {
          "label": "复盘评分",
          "value": "7.5/10"
        }
      ],
      "related": [
        "prediction-austria-jordan",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "奥地利 vs 约旦"
    },
    {
      "id": "prediction-iraq-norway",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测：伊拉克 vs 挪威",
      "date": "2026-06-16",
      "summary": "哈兰德是\"降维打击\"：当今世界最顶级的中锋面对中东联赛的中卫组合，这不是\"实力差距\"而是\"维度差距\"。哈兰德在英超面对范戴克/迪亚斯等世界级中卫都能持续进球，面对苏拉卡/塔赫辛完全可能上演帽子戏法。伊拉克没有\"防守哈兰德的方案\"——只有\"祈祷哈兰德状态不好\"。",
      "file": "prediction-iraq-norway.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "10/71/3"
        },
        {
          "label": "总进球",
          "value": "| 总进球 大3.0 | 1.97 | 1.92 |"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "伊拉克 vs 挪威"
    },
    {
      "id": "prediction-austria-jordan",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测：奥地利 vs 约旦",
      "date": "2026-06-16",
      "summary": "Al-Tamari反击速度 vs 丹索/弗里德尔 — 约旦唯一攻击威胁。丹索速度+身体是关键。如果丹索跟上Al-Tamari节奏，约旦进攻归零。",
      "file": "prediction-austria-jordan.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "6/78/73"
        },
        {
          "label": "总进球",
          "value": "xG区间对比"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "review-austria-jordan",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "奥地利 vs 约旦"
    },
    {
      "id": "prediction-france-senegal",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测 · 法国 vs 塞内加尔",
      "date": "2026-06-16",
      "summary": "总xG：2.30 - 3.15",
      "file": "prediction-france-senegal.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "1/76/95"
        },
        {
          "label": "总进球",
          "value": "预期xG区间"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "法国 vs 塞内加尔"
    },
    {
      "id": "prediction-argentina-algeria",
      "type": "prediction",
      "section": "赛前预测",
      "title": "🇦🇷 阿根廷 vs 阿尔及利亚 🇩🇿 — 2026世界杯 J组 第1轮 预测报告",
      "date": "2026-06-16",
      "summary": "Messi vs 阿尔及利亚低位防守 🇦🇷",
      "file": "prediction-argentina-algeria.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "8/73/67"
        },
        {
          "label": "总进球",
          "value": "待补充"
        },
        {
          "label": "置信度",
          "value": "中"
        }
      ],
      "related": [
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "阿根廷 vs 阿尔及利亚"
    },
    {
      "id": "feature-daily-brief-2026-06-16",
      "type": "feature",
      "section": "专题研究",
      "title": "2026 FIFA World Cup 战报 & 预测",
      "date": "2026-06-16",
      "summary": "时间：6月11日 → 7月19日",
      "file": "feature-daily-brief-2026-06-16.md",
      "tags": [
        "专题研究",
        "世界杯",
        "大比分",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "1",
          "value": "🇲🇽 墨西哥（H）"
        },
        {
          "label": "2",
          "value": "🇰🇷 韩国"
        },
        {
          "label": "3",
          "value": "🇨🇿 捷克"
        },
        {
          "label": "4",
          "value": "🇿🇦 南非"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "赛程观察",
      "match": "哈兰德 vs 萨拉赫"
    },
    {
      "id": "feature-coach-analysis-groups-il",
      "type": "feature",
      "section": "专题研究",
      "title": "2026年世界杯主教练执教水平深度对比分析",
      "date": "2026-06-16",
      "summary": "国籍：🇫🇷 法国 | 年龄：57岁",
      "file": "feature-coach-analysis-groups-il.md",
      "tags": [
        "专题研究",
        "世界杯",
        "大比分",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "I组",
          "value": "🇫🇷 法国"
        },
        {
          "label": "J组",
          "value": "🇦🇷 阿根廷"
        },
        {
          "label": "K组",
          "value": "🇵🇹 葡萄牙"
        },
        {
          "label": "L组",
          "value": "󠁧󠁢󠁥󠁮󠁧󠁿 英格兰"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "教练研究"
    },
    {
      "id": "feature-coach-analysis-groups-eh",
      "type": "feature",
      "section": "专题研究",
      "title": "2026 世界杯主教练执教水平深度对比分析",
      "date": "2026-06-16",
      "summary": "基础阵型：4-2-3-1 或 3-4-2-1（频繁变阵）",
      "file": "feature-coach-analysis-groups-eh.md",
      "tags": [
        "专题研究",
        "世界杯",
        "大比分",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "E组",
          "value": "🇩🇪 德国"
        },
        {
          "label": "F组",
          "value": "🇳🇱 荷兰"
        },
        {
          "label": "G组",
          "value": "🇧🇪 比利时"
        },
        {
          "label": "H组",
          "value": "🇪🇸 西班牙"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "教练研究"
    },
    {
      "id": "feature-coach-analysis-groups-ad",
      "type": "feature",
      "section": "专题研究",
      "title": "2026 世界杯主教练执教水平深度对比分析",
      "date": "2026-06-16",
      "summary": "三次执教墨西哥国家队（2001-02、2009-10、2024至今），每次都在球队低谷时接手",
      "file": "feature-coach-analysis-groups-ad.md",
      "tags": [
        "专题研究",
        "世界杯",
        "大比分",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "A组",
          "value": "🇲🇽 墨西哥"
        },
        {
          "label": "B组",
          "value": "🇨🇦 加拿大"
        },
        {
          "label": "C组",
          "value": "🇧🇷 巴西"
        },
        {
          "label": "D组",
          "value": "🇺🇸 美国"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "教练研究"
    },
    {
      "id": "review-sweden-tunisia",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘：瑞典 vs 突尼斯（2026-06-15）",
      "date": "2026-06-15",
      "summary": "建议一：引入\"前锋组合化学反应\"评估指标",
      "file": "review-sweden-tunisia.md",
      "tags": [
        "赛后复盘",
        "xG",
        "大比分",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "5-1"
        },
        {
          "label": "胜平负",
          "value": "瑞典胜"
        },
        {
          "label": "大小球",
          "value": "️"
        },
        {
          "label": "复盘评分",
          "value": "6.5/10"
        }
      ],
      "related": [
        "prediction-sweden-tunisia",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "sweden vs tunisia"
    },
    {
      "id": "review-iran-new-zealand",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘：伊朗 vs 新西兰（2026-06-15）",
      "date": "2026-06-15",
      "summary": "建议一：引入\"关键球员爆发\"概率区间",
      "file": "review-iran-new-zealand.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "2-2"
        },
        {
          "label": "胜平负",
          "value": "平局"
        },
        {
          "label": "大小球",
          "value": "待补充"
        },
        {
          "label": "复盘评分",
          "value": "4.5/10"
        }
      ],
      "related": [
        "prediction-iran-new-zealand",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "iran vs new zealand"
    },
    {
      "id": "review-saudi-arabia-uruguay",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘：沙特阿拉伯 vs 乌拉圭（2026-06-15）",
      "date": "2026-06-15",
      "summary": "建议一：建立\"门将状态波动\"量化指标",
      "file": "review-saudi-arabia-uruguay.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "1-1"
        },
        {
          "label": "胜平负",
          "value": "平局"
        },
        {
          "label": "大小球",
          "value": "待补充"
        },
        {
          "label": "复盘评分",
          "value": "4.5/10"
        }
      ],
      "related": [
        "prediction-saudi-arabia-uruguay",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "saudi vs arabia uruguay"
    },
    {
      "id": "review-belgium-egypt",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘：比利时 vs 埃及（2026-06-15）",
      "date": "2026-06-15",
      "summary": "建议一：中等置信度场景增加平局概率权重",
      "file": "review-belgium-egypt.md",
      "tags": [
        "赛后复盘",
        "xG",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "1-1"
        },
        {
          "label": "胜平负",
          "value": "平局"
        },
        {
          "label": "大小球",
          "value": "️"
        },
        {
          "label": "复盘评分",
          "value": "5.5/10"
        }
      ],
      "related": [
        "prediction-belgium-egypt",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "belgium vs egypt"
    },
    {
      "id": "review-spain-cabo-verde",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘：西班牙 vs 佛得角（2026-06-15）",
      "date": "2026-06-15",
      "summary": "建议一：引入门将专项评估模块",
      "file": "review-spain-cabo-verde.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "0-0"
        },
        {
          "label": "胜平负",
          "value": "平局"
        },
        {
          "label": "大小球",
          "value": "待补充"
        },
        {
          "label": "复盘评分",
          "value": "3.0/10"
        }
      ],
      "related": [
        "prediction-spain-cabo-verde",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "spain vs cabo verde"
    },
    {
      "id": "prediction-sweden-tunisia",
      "type": "prediction",
      "section": "赛前预测",
      "title": "🇸🇪 瑞典 vs 突尼斯 🇹🇳 - 2026世界杯预测报告",
      "date": "2026-06-15",
      "summary": "对阵双方：🇸🇪 瑞典 vs 突尼斯 🇹🇳",
      "file": "prediction-sweden-tunisia.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "50/28/22"
        },
        {
          "label": "总进球",
          "value": "待补充"
        },
        {
          "label": "置信度",
          "value": "高"
        }
      ],
      "related": [
        "review-sweden-tunisia",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "瑞典 vs 突尼斯"
    },
    {
      "id": "prediction-iran-new-zealand",
      "type": "prediction",
      "section": "赛前预测",
      "title": "伊朗 vs 新西兰 · 2026世界杯预测",
      "date": "2026-06-15",
      "summary": "对Tier 2对手：1胜1负，进6球失2球",
      "file": "prediction-iran-new-zealand.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "80/80/50"
        },
        {
          "label": "总进球",
          "value": "| 预期总xG区间 | 2.10-2.80 | |"
        },
        {
          "label": "置信度",
          "value": "中"
        }
      ],
      "related": [
        "review-iran-new-zealand",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "伊朗 vs 新西兰"
    },
    {
      "id": "prediction-saudi-arabia-uruguay",
      "type": "prediction",
      "section": "赛前预测",
      "title": "沙特阿拉伯 vs 乌拉圭 · 2026世界杯预测",
      "date": "2026-06-15",
      "summary": "对Tier 1-2对手：0胜2平5负，进2球失9球",
      "file": "prediction-saudi-arabia-uruguay.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "80/80/80"
        },
        {
          "label": "总进球",
          "value": "| 预期总xG区间 | 1.90-2.75 | |"
        },
        {
          "label": "置信度",
          "value": "高"
        }
      ],
      "related": [
        "review-saudi-arabia-uruguay",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "沙特阿拉伯 vs 乌拉圭"
    },
    {
      "id": "prediction-belgium-egypt",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测 · 比利时 vs 埃及（2026-06-15）",
      "date": "2026-06-15",
      "summary": "近5场战绩：4胜1平（9.0/9.0/8.0/3.8/9.0评分）· 状态火热",
      "file": "prediction-belgium-egypt.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "90/90/90"
        },
        {
          "label": "总进球",
          "value": "| 预计总xG区间 | 2.80 - 3.70 | |"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "review-belgium-egypt",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "五大联赛 vs 埃及超"
    },
    {
      "id": "prediction-spain-cabo-verde",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测 · 西班牙 vs 佛得角（2026-06-15）",
      "date": "2026-06-15",
      "summary": "近10场战绩：7胜3平0负 · 不败金身",
      "file": "prediction-spain-cabo-verde.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "50/50/30"
        },
        {
          "label": "总进球",
          "value": "| 预计总xG区间 | 2.70 - 3.75 | |"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "review-spain-cabo-verde",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "spain vs cabo verde"
    },
    {
      "id": "review-ivory-coast-ecuador",
      "type": "review",
      "section": "赛后复盘",
      "title": "科特迪瓦 vs 厄瓜多尔 · 复盘笔记",
      "date": "2026-06-14",
      "summary": "方向： 命中（科特迪瓦胜，AI 概率 51%）",
      "file": "review-ivory-coast-ecuador.md",
      "tags": [
        "赛后复盘",
        "xG",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "科特迪瓦 1-0 厄瓜多尔"
        },
        {
          "label": "胜平负",
          "value": "低估胜率"
        },
        {
          "label": "大小球",
          "value": "命中"
        },
        {
          "label": "复盘评分",
          "value": "6.5/10"
        }
      ],
      "related": [
        "prediction-ivory-coast-ecuador",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "科特迪瓦 vs 厄瓜多尔"
    },
    {
      "id": "review-netherlands-japan",
      "type": "review",
      "section": "赛后复盘",
      "title": "2026 世界杯预测复盘报告",
      "date": "2026-06-14",
      "summary": "FIFA Top 20 对话历史平局率约 28-32%，应作为所有强强对话的平局概率底线。",
      "file": "review-netherlands-japan.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "🇳🇱 荷兰 2-2 日本 🇯🇵（平局）"
        },
        {
          "label": "胜平负",
          "value": "实际"
        },
        {
          "label": "大小球",
          "value": "实际打入2球（含一个折射）"
        },
        {
          "label": "复盘评分",
          "value": "4.0 / 10"
        }
      ],
      "related": [
        "prediction-netherlands-japan",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "荷兰 vs 日本"
    },
    {
      "id": "review-haiti-scotland",
      "type": "review",
      "section": "赛后复盘",
      "title": "2026 世界杯预测复盘报告",
      "date": "2026-06-14",
      "summary": "当对手采用 5-4-1 / 4-5-1 / 4-4-2 密集防守时，强队的预期进球数应被下调 25-35%。",
      "file": "review-haiti-scotland.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "🇭🇹 海地 0-1 苏格兰 󠁧󠁢󠁳󠁣󠁴󠁿（麦金 28'）"
        },
        {
          "label": "胜平负",
          "value": "实际"
        },
        {
          "label": "大小球",
          "value": "实际 1 球（进球数被高估）"
        },
        {
          "label": "复盘评分",
          "value": "7.0 / 10"
        }
      ],
      "related": [
        "prediction-haiti-scotland",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "海地 vs 苏格兰"
    },
    {
      "id": "review-germany-curacao",
      "type": "review",
      "section": "赛后复盘",
      "title": "2026 世界杯预测复盘报告",
      "date": "2026-06-14",
      "summary": "当两队 FIFA 排名差 ≥ 50 位时，强队进球数应放大 1.5-2.0 倍。",
      "file": "review-germany-curacao.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "🇩🇪 德国 7-1 库拉索 🇨🇼"
        },
        {
          "label": "胜平负",
          "value": "实际"
        },
        {
          "label": "大小球",
          "value": "实际 8 球，球数被严重低估"
        },
        {
          "label": "复盘评分",
          "value": "5.5 / 10"
        }
      ],
      "related": [
        "prediction-germany-curacao",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "德国 vs 库拉索历史交锋记录"
    },
    {
      "id": "review-australia-turkey",
      "type": "review",
      "section": "赛后复盘",
      "title": "2026 世界杯预测复盘报告",
      "date": "2026-06-14",
      "summary": "所有热身赛数据按对手 FIFA 排名分档（1-20 / 21-50 / 51-80 / 80+）加权。",
      "file": "review-australia-turkey.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "🇦🇺 澳大利亚 2-0 土耳其 🇹🇷"
        },
        {
          "label": "胜平负",
          "value": "（方向相反）"
        },
        {
          "label": "大小球",
          "value": "| 大小球判断（≤2.5球） | |"
        },
        {
          "label": "复盘评分",
          "value": "4.5 / 10"
        }
      ],
      "related": [
        "prediction-australia-turkey",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "澳大利亚 vs 土耳其"
    },
    {
      "id": "prediction-ivory-coast-ecuador",
      "type": "prediction",
      "section": "赛前预测",
      "title": "🇨🇮 科特迪瓦 vs 厄瓜多尔 🇪🇨 - 2026世界杯预测报告",
      "date": "2026-06-14",
      "summary": "对阵双方：🇨🇮 科特迪瓦 vs 厄瓜多尔 🇪🇨",
      "file": "prediction-ivory-coast-ecuador.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "51/21/28"
        },
        {
          "label": "总进球",
          "value": "待补充"
        },
        {
          "label": "置信度",
          "value": "中"
        }
      ],
      "related": [
        "review-ivory-coast-ecuador",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "科特迪瓦 vs 厄瓜多尔"
    },
    {
      "id": "prediction-netherlands-japan",
      "type": "prediction",
      "section": "赛前预测",
      "title": "🇳🇱 荷兰 vs 日本 🇯🵰 - 2026世界杯预测报告",
      "date": "2026-06-14",
      "summary": "对阵双方：🇳🇱 荷兰 vs 日本 🇯�",
      "file": "prediction-netherlands-japan.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "35/18/47"
        },
        {
          "label": "总进球",
          "value": "待补充"
        },
        {
          "label": "置信度",
          "value": "中"
        }
      ],
      "related": [
        "review-netherlands-japan",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "荷兰 vs 日本"
    },
    {
      "id": "prediction-germany-curacao",
      "type": "prediction",
      "section": "赛前预测",
      "title": "德国 vs 库拉索 - 2026 世界杯预测报告",
      "date": "2026-06-14",
      "summary": "对阵：🇩🇪 德国 vs 🇨🇼 库拉索",
      "file": "prediction-germany-curacao.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "50/95/95"
        },
        {
          "label": "总进球",
          "value": "待补充"
        },
        {
          "label": "置信度",
          "value": "高"
        }
      ],
      "related": [
        "review-germany-curacao",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "德国 vs 库拉索"
    },
    {
      "id": "prediction-australia-turkey",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测报告：澳大利亚 vs 土耳其",
      "date": "2026-06-14",
      "summary": "居莱尔 vs 欧文+梅特卡夫（中场创造力 vs 绞杀）——居莱尔（皇马）是土耳其创造力引擎，澳大利亚双后腰（德甲）需贴身限制。若居莱尔获得空间，直塞球和远射将撕破澳洲防线。",
      "file": "prediction-australia-turkey.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "90/65/85"
        },
        {
          "label": "总进球",
          "value": "| 预计总xG区间 | 1.80 - 2.70 | — |"
        },
        {
          "label": "置信度",
          "value": "中"
        }
      ],
      "related": [
        "review-australia-turkey",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "澳大利亚 vs 土耳其"
    },
    {
      "id": "prediction-haiti-scotland",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测报告：海地 vs 苏格兰",
      "date": "2026-06-14",
      "summary": "麦克托米奈 vs 贝勒加德（中场）——英超狼队vs意甲那不勒斯的中场对决。麦克托米奈的后插上+远射是核心武器，贝勒加德需在防守端限制他。",
      "file": "prediction-haiti-scotland.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "90/90/85"
        },
        {
          "label": "总进球",
          "value": "| 预计总xG区间 | 2.25 - 3.00 | — |"
        },
        {
          "label": "置信度",
          "value": "低"
        }
      ],
      "related": [
        "review-haiti-scotland",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "海地 vs 苏格兰"
    },
    {
      "id": "review-brazil-morocco",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘 · 巴西 vs 摩洛哥（2026-06-13）",
      "date": "2026-06-13",
      "summary": "近期直接交锋被低估：2026 年 3 月 25 日巴西 1-2 负于摩洛哥（虽然当时内马尔在场），是 1 个半月前的最近一次直接对决，比 FIFA 排名差异更有预测力",
      "file": "review-brazil-morocco.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "巴西 1-1 摩洛哥（1-1 16% 命中但非首选）"
        },
        {
          "label": "胜平负",
          "value": "待补充"
        },
        {
          "label": "大小球",
          "value": "️"
        },
        {
          "label": "复盘评分",
          "value": "6.0 / 10"
        }
      ],
      "related": [
        "prediction-brazil-morocco",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "Vini vs Hakimi"
    },
    {
      "id": "review-qatar-switzerland",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘 · 卡塔尔 vs 瑞士（2026-06-13）",
      "date": "2026-06-13",
      "summary": "VAR 介入引发点球：12' Freuler 禁区内被犯规原本是大赛首战常见的\"模糊判罚\"，VAR 介入直接改判",
      "file": "review-qatar-switzerland.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "卡塔尔 1-1 瑞士"
        },
        {
          "label": "胜平负",
          "value": "命中"
        },
        {
          "label": "大小球",
          "value": "总 2 球"
        },
        {
          "label": "复盘评分",
          "value": "5.0 / 10"
        }
      ],
      "related": [
        "prediction-qatar-switzerland",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "qatar vs switzerland"
    },
    {
      "id": "review-canada-bosnia-herzegovina",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘报告：加拿大 vs 波黑（2026-06-13）",
      "date": "2026-06-13",
      "summary": "低比分比赛 — 预测总xG 1.5-1.9，实际2.23，2球",
      "file": "review-canada-bosnia-herzegovina.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "加拿大 1-1 波黑（平局）"
        },
        {
          "label": "胜平负",
          "value": "助攻"
        },
        {
          "label": "大小球",
          "value": "首发/替补不确定性标注 + 数据信号优先于主场偏好 + 球员数据库扩容 + 犯规率战术评估。"
        },
        {
          "label": "复盘评分",
          "value": "6.5 / 10"
        }
      ],
      "related": [
        "prediction-canada-bosnia-herzegovina",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "canada vs bosnia herzegovina"
    },
    {
      "id": "review-usa-paraguay",
      "type": "review",
      "section": "赛后复盘",
      "title": "复盘报告：美国 vs 巴拉圭（2026-06-13）",
      "date": "2026-06-13",
      "summary": "美国胜 — 预测48%胜率，方向正确",
      "file": "review-usa-paraguay.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "美国 4-1 巴拉圭"
        },
        {
          "label": "胜平负",
          "value": "助攻"
        },
        {
          "label": "大小球",
          "value": "5球 大球"
        },
        {
          "label": "复盘评分",
          "value": "5.5 / 10"
        }
      ],
      "related": [
        "prediction-usa-paraguay",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "usa vs paraguay"
    },
    {
      "id": "prediction-brazil-morocco",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测：巴西 vs 摩洛哥",
      "date": "2026-06-13",
      "summary": "近9场场均2.89球，安切洛蒂上任后近3场热身10球",
      "file": "prediction-brazil-morocco.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "73/55/26"
        },
        {
          "label": "总进球",
          "value": "xG区间： 总xG 2.3-2.8（巴西1.5-1.75 + 摩洛哥0.8-1.05），小于2.5球概率约54%"
        },
        {
          "label": "置信度",
          "value": "高"
        }
      ],
      "related": [
        "review-brazil-morocco",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "巴西 vs 摩洛哥"
    },
    {
      "id": "prediction-qatar-switzerland",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯预测：卡塔尔 vs 瑞士",
      "date": "2026-06-13",
      "summary": "近5场场均仅0.6球，进攻效率低迷",
      "file": "prediction-qatar-switzerland.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "72/10/18"
        },
        {
          "label": "总进球",
          "value": "xG区间： 总xG 2.3-2.9（瑞士1.8-2.3 + 卡塔尔0.4-0.7），小于2.5球概率约66%，卡塔尔零进球概率~69%"
        },
        {
          "label": "置信度",
          "value": "高"
        }
      ],
      "related": [
        "review-qatar-switzerland",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "卡塔尔 vs 瑞士"
    },
    {
      "id": "prediction-canada-bosnia-herzegovina",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026世界杯 · 加拿大 vs 波黑 预测报告",
      "date": "2026-06-13",
      "summary": "场均进球：0.9 · 近10场加权 xG ≈ 1.02",
      "file": "prediction-canada-bosnia-herzegovina.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "1-1"
        },
        {
          "label": "胜平负",
          "value": "72/28/40"
        },
        {
          "label": "总进球",
          "value": "预期进球数区间：总进球 1-2 球（概率 ~65%）"
        },
        {
          "label": "置信度",
          "value": "中"
        }
      ],
      "related": [
        "review-canada-bosnia-herzegovina",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "加拿大 vs 波黑"
    },
    {
      "id": "prediction-usa-paraguay",
      "type": "prediction",
      "section": "赛前预测",
      "title": "美国 vs 巴拉圭 — 2026世界杯 D组 第1轮 预测报告",
      "date": "2026-06-13",
      "summary": "对 T1（前20名）：4 场 1胜3负，进 6 球失 11 球，场均进 1.50 / 失 2.75",
      "file": "prediction-usa-paraguay.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2026-06"
        },
        {
          "label": "胜平负",
          "value": "32/0/30"
        },
        {
          "label": "总进球",
          "value": "| 总 xG | 1.4 - 2.1 | 偏向低比分，60% 概率总进球 ≤2 |"
        },
        {
          "label": "置信度",
          "value": "中"
        }
      ],
      "related": [
        "review-usa-paraguay",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "美国 vs 巴拉圭"
    },
    {
      "id": "feature-first-five-goals",
      "type": "feature",
      "section": "专题研究",
      "title": "2026世界杯 · 前五轮进球预测分析",
      "date": "2026-06-13",
      "summary": "前5场场均通常高于首轮场均：8届中有6届前5场场均 首轮场均（仅2010年相反），说明开赛初期进球偏多，后续弱队登场拉低场均",
      "file": "feature-first-five-goals.md",
      "tags": [
        "专题研究",
        "世界杯",
        "大比分",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "本届已完赛场次",
          "value": "3场"
        },
        {
          "label": "已进球数",
          "value": "7球"
        },
        {
          "label": "场均进球（3场）",
          "value": "2.33球"
        },
        {
          "label": "首轮总进球预测区间",
          "value": "35-41球（等效32队赛制）/ 55-65球（48队）"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "进球趋势",
      "match": "墨西哥 vs 南非"
    },
    {
      "id": "review-korea-czech",
      "type": "review",
      "section": "赛后复盘",
      "title": "2026 世界杯预测复盘报告",
      "date": "2026-06-12",
      "summary": "问题：预选赛数据未经对手强度加权，导致\"捷克定位球11球\"等数据被高估",
      "file": "review-korea-czech.md",
      "tags": [
        "赛后复盘",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "实际比分",
          "value": "🇰🇷 韩国 2-1 捷克 🇨🇿"
        },
        {
          "label": "胜平负",
          "value": "实际"
        },
        {
          "label": "大小球",
          "value": "（预测小球，实际3球）"
        },
        {
          "label": "复盘评分",
          "value": "6.0 / 10"
        }
      ],
      "related": [
        "prediction-korea-czech",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "韩国 vs 捷克"
    },
    {
      "id": "prediction-korea-czech",
      "type": "prediction",
      "section": "赛前预测",
      "title": "2026 FIFA 世界杯 · 赛果预测报告",
      "date": "2026-06-12",
      "summary": "最可能比分：韩国 1-1 捷克（约25%）",
      "file": "prediction-korea-czech.md",
      "tags": [
        "赛前预测",
        "xG",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "预测比分",
          "value": "2-0"
        },
        {
          "label": "胜平负",
          "value": "38/30/32"
        },
        {
          "label": "总进球",
          "value": "待补充"
        },
        {
          "label": "置信度",
          "value": "中"
        }
      ],
      "related": [
        "review-korea-czech",
        "feature-round2-matchday2-prediction",
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis"
      ],
      "match": "korea vs czech"
    },
    {
      "id": "feature-first-three-goals",
      "type": "feature",
      "section": "专题研究",
      "title": "世界杯「前3场」总进球数 · 历史数据",
      "date": "2026-06-12",
      "summary": "东道主揭幕战进球均值：3.2球/场（2006:6, 2010:2, 2014:4, 2018:5, 2022:2）",
      "file": "feature-first-three-goals.md",
      "tags": [
        "专题研究",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "6届平均",
          "value": "7.2球"
        },
        {
          "label": "场均进球",
          "value": "2.39球"
        },
        {
          "label": "最高一届",
          "value": "12球（2022 卡塔尔）"
        },
        {
          "label": "最低一届",
          "value": "4球（2010 南非）"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "进球趋势",
      "match": "墨西哥 vs 南非"
    },
    {
      "id": "feature-group-round-one",
      "type": "feature",
      "section": "专题研究",
      "title": "2026 FIFA世界杯小组赛第一轮数据分析报告",
      "date": "2026-06-11",
      "summary": "高置信度 (70%+准确率): 实力差距明显，主场优势显著，历史交锋一边倒",
      "file": "feature-group-round-one.md",
      "tags": [
        "专题研究",
        "世界杯",
        "进球趋势"
      ],
      "stats": [
        {
          "label": "参赛球队总数",
          "value": "48"
        },
        {
          "label": "小组数量",
          "value": "12"
        },
        {
          "label": "小组赛总场次",
          "value": "72"
        },
        {
          "label": "晋级淘汰赛球队",
          "value": "32"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "小组赛观察",
      "match": "日 墨西哥 vs 南非"
    },
    {
      "id": "feature-curses-champion",
      "type": "feature",
      "section": "专题研究",
      "title": "2026世界杯魔咒分析：基于历史规律的冠军预测",
      "date": "2026-06-11",
      "summary": "巴西：1970第3冠 → 1994第4冠，24年",
      "file": "feature-curses-champion.md",
      "tags": [
        "专题研究",
        "世界杯"
      ],
      "stats": [
        {
          "label": "1",
          "value": "🇦🇷 阿根廷"
        },
        {
          "label": "2",
          "value": "🇪🇸 西班牙"
        },
        {
          "label": "3",
          "value": "🇫🇷 法国"
        },
        {
          "label": "4",
          "value": "󠁧󠁢󠁥󠁮󠁧󠁿 英格兰"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "魔咒与历史规律",
      "match": "决赛对阵 西班牙 vs 法国"
    },
    {
      "id": "feature-over-under-round-one",
      "type": "feature",
      "section": "专题研究",
      "title": "2026世界杯小组赛第一轮 · 大小球博彩分析",
      "date": "2026-06-11",
      "summary": "DraftKings: Over +115 / Under -145",
      "file": "feature-over-under-round-one.md",
      "tags": [
        "专题研究",
        "xG",
        "世界杯",
        "大比分"
      ],
      "stats": [
        {
          "label": "第一轮比赛总数",
          "value": "24"
        },
        {
          "label": "推荐大球 (Over)",
          "value": "11"
        },
        {
          "label": "推荐小球 (Under)",
          "value": "10"
        },
        {
          "label": "均势/观望",
          "value": "3"
        }
      ],
      "related": [
        "feature-wc2026-blowout-prediction",
        "feature-blowout-analysis",
        "feature-round2-matchday2-prediction"
      ],
      "subtype": "进球趋势",
      "match": "传控打法 vs 防守反击"
    }
  ]
};
