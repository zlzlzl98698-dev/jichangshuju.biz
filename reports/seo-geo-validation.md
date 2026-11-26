# SEO / GEO 技术验收与自动化反重复检查报告

| 检查项目 | 检查范围与标准 | 实测结果 | 状态 |
|---|---|---|---|
| **静态构建总页面数** | VitePress SSG 输出 HTML 全量 | **163 页** | ✅ 通过 |
| **Title 唯一性** | 全站非首页 Markdown 唯一 Title 检查 | 重复数：**0** | ✅ 通过 |
| **H1 唯一性** | 每页正文严格仅含 1 个 H1 | 异常页数：**0** | ✅ 通过 |
| **空白内容检查** | 无 <150 汉字的占位空页面；QA 空页检查 | 空页数：**0** (QA: 0) | ✅ 通过 |
| **Canonical & OG 标签** | 全部页面注入准确 `Canonical` 与 `og:image` | 缺失数：**0** | ✅ 通过 |
| **Static SSR JSON-LD** | `config.ts` SSR 头部直接输出 Schema（动态日期范围） | 三级 37/37 含 `FAQPage`；品牌与对比页含 `Article`/`BreadcrumbList` | ✅ 通过 |
| **全站搜索索引** | VitePress 本地全文检索包构建输出 | 已生成 Search Index Chunk ✅ | ✅ 通过 |
| **Sitemap/RSS/llms.txt/Apache** | `sitemap.xml`、全量 `feed.xml`、`llms.txt`、`llms-full.txt`、`.htaccess`、`robots.txt` | 缺失构建产物：**0** | ✅ 通过 |
| **关键词互抢检查** | `npm run keywords:analyze` 校验 `keywords.json` | 追踪 71 词；互抢告警：**0** | ✅ 通过 |
