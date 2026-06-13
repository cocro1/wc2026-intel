window.SITE_DATA = {
  updatedAt: "2026-06-13 22:44",
  dashboard: {
    headline: "世界杯预测、复盘与规律研究的日更工作台",
    subtitle: "把赛前判断、赛后校准、魔咒专题和数据趋势放在同一套结构里，让每天的内容可以持续沉淀。",
    today: {
      title: "今日主推",
      match: "巴西 vs 摩洛哥",
      time: "2026-06-14 06:00 北京时间",
      score: "巴西 2-1 摩洛哥",
      confidence: "中",
      probabilities: [
        { label: "巴西胜", value: 42, tone: "green" },
        { label: "平局", value: 31, tone: "gold" },
        { label: "摩洛哥胜", value: 27, tone: "red" }
      ],
      reasons: [
        "安切洛蒂世界杯首秀更可能先求控场，而不是直接对攻",
        "摩洛哥的边路推进和反击效率，足以把巴西拖进细节战",
        "内马尔与 Rodrygo 缺席后，巴西前场更依赖维尼修斯单点爆破"
      ],
      articleId: "prediction-brazil-morocco"
    },
    metrics: [
      { label: "站内文章", value: "9", note: "预测、复盘、专题" },
      { label: "已复盘场次", value: "2", note: "样本仍小，先看结构命中率" },
      { label: "备选比分覆盖", value: "100%", note: "2/2，韩国2-1捷克、加拿大1-1波黑" },
      { label: "复盘评分", value: "6.5", note: "两场样本，主比分仍需继续校准" }
    ],
    model: [
      { label: "胜平负命中", value: 0, total: 2, tone: "red" },
      { label: "精确比分命中", value: 0, total: 2, tone: "red" },
      { label: "备选比分覆盖", value: 2, total: 2, tone: "green" },
      { label: "大小球命中", value: 1, total: 2, tone: "gold" }
    ],
    signals: [
      { label: "魔咒雷达", value: "西班牙 / 法国", note: "专题模型给出的冠军主线候选" },
      { label: "首轮大小球", value: "11 大 / 10 小", note: "另有3场建议观望" },
      { label: "前3场历史均值", value: "7.2球", note: "近6届前3场总进球均值" },
      { label: "冷门观察", value: "巴西首秀承压", note: "摩洛哥反击质量足以把比赛拖进拉锯" }
    ],
    workflow: [
      "赛前：写出比分、概率、xG区间、关键变量",
      "赛后：核对命中项、偏差项、概率是否校准",
      "专题：把魔咒、进球趋势、大小球规律沉淀为长期判断框架",
      "仪表盘：每天聚合最新预测、模型战绩和风险信号"
    ]
  },
  articles: [
    {
      id: "prediction-brazil-morocco",
      type: "prediction",
      section: "赛前预测",
      title: "巴西 vs 摩洛哥预测：安切洛蒂首秀会被反击拖进拉锯吗？",
      date: "2026-06-14",
      match: "巴西 vs 摩洛哥",
      summary: "巴西仍是更可能赢球的一方，但在内马尔与 Rodrygo 缺席的情况下，这场更像控场与反击效率的细节战。",
      file: "prediction-brazil-morocco.md",
      tags: ["赛前预测", "C组", "强强对话", "反击"],
      stats: [
        { label: "预测比分", value: "2-1" },
        { label: "主胜/平/客胜", value: "42/31/27" },
        { label: "总进球", value: "2-3球" },
        { label: "置信度", value: "中" }
      ],
      related: ["feature-group-round-one", "feature-over-under-round-one"]
    },
    {
      id: "review-canada-bosnia",
      type: "review",
      section: "赛后复盘",
      title: "加拿大 vs 波黑复盘：为什么主胜判断被 1-1 拖住？",
      date: "2026-06-13",
      match: "加拿大 vs 波黑",
      summary: "低比分框架和备选比分都对了，但把主场压制直接换算成主胜，导致结果排序偏激进。",
      file: "review-canada-bosnia.md",
      tags: ["赛后复盘", "备选比分", "概率校准"],
      stats: [
        { label: "实际比分", value: "加拿大 1-1" },
        { label: "胜平负", value: "未命中" },
        { label: "备选比分", value: "命中" },
        { label: "复盘评分", value: "7.0/10" }
      ],
      related: ["prediction-canada-bosnia", "feature-over-under-round-one"]
    },
    {
      id: "prediction-canada-bosnia",
      type: "prediction",
      section: "赛前预测",
      title: "加拿大 vs 波黑预测：主场防线能否压住低比分？",
      date: "2026-06-13",
      match: "加拿大 vs 波黑",
      summary: "加拿大防守稳定、主场优势明显；波黑不败含金量需要校准。本场更像防守大于进攻的低比分比赛。",
      file: "prediction-canada-bosnia.md",
      tags: ["赛前预测", "B组", "小球", "xG"],
      stats: [
        { label: "预测比分", value: "1-0" },
        { label: "主胜/平/客胜", value: "40/34/26" },
        { label: "大小球", value: "小于2.5" },
        { label: "置信度", value: "中" }
      ],
      related: ["review-canada-bosnia", "feature-over-under-round-one", "feature-first-three-goals"]
    },
    {
      id: "prediction-korea-czech",
      type: "prediction",
      section: "赛前预测",
      title: "韩国 vs 捷克预测：技术速度对抗定位球强点",
      date: "2026-06-12",
      match: "韩国 vs 捷克",
      summary: "韩国核心球员质量更高，捷克定位球威胁突出。原预测给出1-1和平局倾向，赛后已完成复盘。",
      file: "prediction-korea-czech.md",
      tags: ["赛前预测", "A组", "定位球", "复盘已出"],
      stats: [
        { label: "预测比分", value: "1-1" },
        { label: "主胜/平/客胜", value: "38/30/32" },
        { label: "大小球", value: "小于2.5" },
        { label: "置信度", value: "中" }
      ],
      related: ["review-korea-czech"]
    },
    {
      id: "review-korea-czech",
      type: "review",
      section: "赛后复盘",
      title: "韩国 vs 捷克复盘：为什么1-1判断偏保守？",
      date: "2026-06-12",
      match: "韩国 vs 捷克",
      summary: "预测战术框架较准，但赛果、大小球和关键替补变量判断偏差明显。复盘指出门将、替补、球员数据库是主要补强方向。",
      file: "review-korea-czech.md",
      tags: ["赛后复盘", "模型修正", "概率校准"],
      stats: [
        { label: "实际比分", value: "韩国 2-1" },
        { label: "胜平负", value: "未命中" },
        { label: "备选比分", value: "命中" },
        { label: "复盘评分", value: "6.0/10" }
      ],
      related: ["prediction-korea-czech", "feature-over-under-round-one"]
    },
    {
      id: "feature-curses-champion",
      type: "feature",
      subtype: "魔咒与历史规律",
      section: "专题研究",
      title: "世界杯魔咒分析：基于历史规律的冠军预测",
      date: "2026-06-11",
      summary: "从FIFA第一魔咒、卫冕冠军魔咒、外籍教练魔咒和北美举办规律切入，推演冠军候选。",
      file: "feature-curses-champion.md",
      tags: ["魔咒", "冠军预测", "历史规律"],
      stats: [
        { label: "核心候选", value: "西班牙/法国" },
        { label: "阿根廷", value: "三重魔咒" },
        { label: "巴西", value: "外籍教练魔咒" },
        { label: "方法", value: "规律推演" }
      ],
      related: ["feature-group-round-one"]
    },
    {
      id: "feature-group-round-one",
      type: "feature",
      subtype: "小组赛观察",
      section: "专题研究",
      title: "小组赛第一轮分析：死亡之组与首轮预测",
      date: "2026-06-11",
      summary: "梳理48队扩军后的12个小组，标记死亡之组、首轮赛程和关键预测。",
      file: "feature-group-round-one.md",
      tags: ["小组赛", "第一轮", "死亡之组"],
      stats: [
        { label: "参赛球队", value: "48" },
        { label: "小组数量", value: "12" },
        { label: "小组赛", value: "72场" },
        { label: "淘汰赛名额", value: "32" }
      ],
      related: ["feature-over-under-round-one"]
    },
    {
      id: "feature-over-under-round-one",
      type: "feature",
      subtype: "进球趋势",
      section: "专题研究",
      title: "小组赛第一轮大小球分析：24场比赛走势研判",
      date: "2026-06-11",
      summary: "结合赔率、球队攻防、战术节奏和首轮历史规律，对24场第一轮比赛给出大小球倾向。",
      file: "feature-over-under-round-one.md",
      tags: ["大小球", "第一轮", "进球趋势"],
      stats: [
        { label: "推荐大球", value: "11" },
        { label: "推荐小球", value: "10" },
        { label: "观望", value: "3" },
        { label: "标准盘口", value: "2.5" }
      ],
      related: ["feature-first-three-goals", "prediction-canada-bosnia"]
    },
    {
      id: "feature-first-three-goals",
      type: "feature",
      subtype: "进球趋势",
      section: "专题研究",
      title: "世界杯前3场总进球数：历史数据与2026区间",
      date: "2026-06-12",
      summary: "统计2006至2026六届世界杯前3场进球走势，用于判断首轮节奏和大小球风险。",
      file: "feature-first-three-goals.md",
      tags: ["进球趋势", "历史数据", "前3场"],
      stats: [
        { label: "六届均值", value: "7.2球" },
        { label: "场均", value: "2.39球" },
        { label: "小球占比", value: "55.6%" },
        { label: "2026区间", value: "3-8球" }
      ],
      related: ["feature-over-under-round-one"]
    }
  ]
};
