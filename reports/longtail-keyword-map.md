# 三级长尾关键词发现与防互抢映射报告

- **长尾主表 (`data/keywords/longtail-master.csv`)**：共登记 **84 条** 关键词任务（含 37 篇已发布三级文章、31 家品牌评测、16 家商业套餐页及 0 条待建 Backlog 选题）
- **JSON 监控总表 (`data/keywords/keywords.json`)**：共追踪 **71 条**，关键词互抢告警（Cannibalization）：**0 起**
- **严谨声明**：未接入真实 GSC / Bing Webmaster Tools 导流数据前，所有 `searchVolume` 严格留空或标记 `unverified`，绝不编造月搜索量。

| # | 核心主词 | 搜索意图 | 优先级 | 状态 | 唯一归属 URL | 所属二级中心 |
|---|---|---|---|---|---|---|
| 01 | **机场推荐应该看哪些指标** | Commercial Investigation | S | published | `/recommend/how-to-judge-airport` | `/recommend/rankings` |
| 02 | **如何判断机场晚高峰是否稳定** | How-to | A | published | `/recommend/peak-hour-stability-test` | `/recommend/stable` |
| 03 | **10 元以内预算机场推荐** | Commercial Investigation | S | published | `/pricing/10-yuan-budget` | `/pricing/cheap` |
| 04 | **20 元以内月付机场怎么选** | Commercial Investigation | S | published | `/pricing/20-yuan-monthly-guide` | `/pricing/monthly` |
| 05 | **100GB、300GB 与 500GB 套餐分别够用多久** | Informational | A | published | `/pricing/100gb-vs-300gb-vs-500gb` | `/pricing/value` |
| 06 | **如何判断机场官网是否真实并核实品牌资料** | Investigation | A | published | `/brands/how-to-verify-brand-authenticity` | `/brands/` |
| 07 | **传统商业 VPN 与机场代理底层协议有什么区别** | Informational | A | published | `/vpn/vpn-vs-proxy-architecture` | `/vpn/pricing-comparison` |
| 08 | **Mihomo、sing-box 与 FlClash 客户端和内核有什么区别** | Comparison | A | published | `/clients/mihomo-vs-singbox-vs-flclash` | `/clients/windows` |
| 09 | **Shadowrocket 小火箭连接不上或节点全超时怎么办** | Troubleshooting | A | published | `/clients/iphone-shadowrocket-setup-errors` | `/clients/shadowrocket` |
| 10 | **Claude 连接失败与账号被封风控如何排查避坑** | Troubleshooting | S | published | `/streaming-ai/claude-access-and-ban-guide` | `/streaming-ai/chatgpt` |
| 11 | **Google Gemini 提示地区不支持或 Something went wrong 怎么解决** | Troubleshooting | A | published | `/streaming-ai/gemini-region-and-error-fix` | `/streaming-ai/chatgpt` |
| 12 | **香港节点与日本节点延迟差多少？各自适合什么用途** | Comparison | A | published | `/network/hongkong-vs-japan-nodes` | `/network/regions` |
| 13 | **机场测速图怎么看？TLS RTT、HTTPS 延迟与单多线程区别解析** | Informational | A | published | `/network/speedtest-metrics-explained` | `/network/iepl` |
| 14 | **VLESS-Reality、Hysteria 2、Trojan 与 Shadowsocks 技术对比** | Comparison | A | published | `/network/vless-reality-vs-hy2` | `/network/bgp-transit` |
| 15 | **OpenWrt 软路由机场挑选与 OpenClash / Nikki / HomeProxy 避坑实战** | How-to | S | published | `/guides/router-openwrt` | `/clients/linux-openwrt` |
| 16 | **Clash Verge Rev 如何用 Merge 与 Script 覆写保存自定义分流规则** | How-to | S | published | `/guides/clash-verge-merge-script` | `/guides/clash-rules` |
| 17 | **手机电脑和平板软路由能共用同一个机场订阅吗** | Informational | A | published | `/guides/multi-device-same-subscription` | `/guides/plan-selection` |
| 18 | **Clash Verge Rev 开启 TUN 模式冲突与端口占用怎么解决** | Troubleshooting | S | published | `/diagnostics/clash-tun-conflict` | `/diagnostics/dns-speed` |
| 19 | **机场节点连接成功但打不开网页怎么办** | Troubleshooting | S | published | `/diagnostics/connected-but-no-internet` | `/diagnostics/dns-speed` |
| 20 | **为什么家里 Wi-Fi 连不上代理而手机 4G/5G 可以（或反之）** | Troubleshooting | A | published | `/diagnostics/wifi-ok-or-mobile-fails` | `/diagnostics/all-timeout` |
| 21 | **机场只提供专属客户端不开放订阅链接有什么利弊** | Investigation | S | published | `/risks/exclusive-client-lockin` | `/risks/alternatives` |
| 22 | **机场服务更换前该检查什么？如何保留付款凭证与停服应对** | Investigation | A | published | `/risks/payment-evidence-and-exit-checklist` | `/risks/exit-scam-warning` |
| 23 | **机场节点数量越多越好吗** | Commercial Investigation | B | published | `/recommend/node-count-myth` | `/recommend/rankings` |
| 24 | **如何比较两个价格接近的机场** | Comparison | B | published | `/recommend/compare-same-price-airports` | `/recommend/value` |
| 25 | **机场年付折算月价怎么算** | Informational | B | published | `/pricing/annual-monthly-math` | `/pricing/annual` |
| 26 | **月付和不限时套餐哪个更划算** | Comparison | A | published | `/pricing/monthly-vs-no-expiry` | `/pricing/no-expiry` |
| 27 | **品牌临时维护与停止运营怎么区分** | Investigation | B | published | `/brands/maintenance-vs-shutdown` | `/risks/exit-scam-warning` |
| 28 | **不同设备如何选择合适的网络工具** | Informational | B | published | `/vpn/device-network-tool-matrix` | `/vpn/mobile` |
| 29 | **VPN协议常见类型有哪些** | Informational | C | published | `/vpn/common-vpn-protocols` | `/vpn/pricing-comparison` |
| 30 | **Clash Verge无法启动怎么办** | Troubleshooting | B | published | `/clients/clash-verge-launch-fix` | `/clients/clash-verge` |
| 31 | **sing-box配置文件怎么理解** | How-to | B | published | `/clients/singbox-config-guide` | `/clients/linux-openwrt` |
| 32 | **Netflix原创内容和地区版权片库区别** | Informational | B | published | `/streaming-ai/netflix-originals-vs-full` | `/streaming-ai/netflix` |
| 33 | **YouTube速度慢和送中CN排查** | Troubleshooting | B | published | `/streaming-ai/youtube-slow-or-cn-fix` | `/streaming-ai/youtube-tiktok` |
| 34 | **不同运营商为什么同一机场测速差很多** | Informational | B | published | `/network/isp-routing-differences` | `/network/bgp-transit` |
| 35 | **校园网与企业内网高拦截协议选择** | How-to | B | published | `/network/campus-company-network` | `/network/bgp-transit` |
| 36 | **订阅链接返回200但节点为空怎么解决** | Troubleshooting | B | published | `/diagnostics/empty-subscription-200` | `/diagnostics/subscription-failed` |
| 37 | **外区共享Apple ID与企业掉签风险** | Investigation | B | published | `/risks/shared-apple-id-risks` | `/clients/ios` |
