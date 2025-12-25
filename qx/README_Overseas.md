# QuantumultX 海外版配置 + 虚拟币加速服务

## 文件说明

### 1. QuantumultX_Overseas.conf（海外版主配置文件）
适用于海外用户的 QuantumultX 配置文件，主要特点：
- **新加坡节点优先**：所有策略组优先使用新加坡（狮城）节点
- **国际媒体优化**：优化 Netflix、YouTube、Disney+ 等流媒体服务
- **虚拟币支持**：集成虚拟币交易所和 DeFi 应用加速
- **全球加速**：为国际用户优化全球互联网访问
- **DNS 配置**：使用国际 DNS（Google 8.8.8.8 等）而非中国 DNS

### 2. Crypto.conf（虚拟币加速配置）
虚拟币生态专用加速配置文件，包括：
- **交易所加速**：支持 Binance、Coinbase、Kraken、OKX 等主流交易所
- **DeFi 应用**：Uniswap、Aave、Curve 等 DeFi 协议优化
- **NFT 平台**：OpenSea、Blur 等 NFT 市场加速
- **钱包支持**：MetaMask、WalletConnect 等钱包优化
- **数据查询**：CoinMarketCap、CoinGecko 等数据平台加速
- **区块浏览器**：Etherscan 等浏览器加速

### 3. CryptoFilter.list（虚拟币分流规则）
虚拟币相关域名的分流规则列表（v2.0 扩展版）：
- 包含 **100+ 虚拟币交易所、DeFi 平台、NFT 市场**
- 包含 **60+ DeFi 应用**（借贷、交换、收益、期权等）
- 包含 **20+ 数据分析和区块浏览器**
- 支持多链生态（以太坊、Solana、Polygon、Arbitrum、Optimism 等）
- 所有流量将导向"虚拟币交易"策略组（阿联酋/新加坡节点优先）

**关键特性**：
- ✅ **英国 IP 限制绕过**：许多虚拟币项目对英国 IP 有地理限制，此配置通过 VPN 连接到政策友好地区解决
- ✅ **完整的 DeFi 生态**：覆盖所有主流 DeFi 协议和聚合器
- ✅ **跨链支持**：支持所有主流公链和 Layer2 解决方案

---

## 使用步骤

### 第一步：选择主配置文件
根据您的地区选择合适的配置文件：
- **在中国使用**：使用 `QuantumultX_CN.conf`（原始文件）
- **在海外使用**：使用 `QuantumultX_Overseas.conf`（新建文件）

### 第二步：导入配置文件到 QuantumultX
1. 打开 QuantumultX 应用
2. 点击 **风车图标** → **配置文件**
3. 点击 **+** 添加新配置
4. 选择 **文件** 或 **URL**
5. 选择对应的 `.conf` 文件
6. 导入完成后点击 **使用配置**

### 第三步：配置节点订阅（重要）
1. 在配置文件中找到 `[server_remote]` 部分
2. 将示例链接替换为您的实际节点订阅链接
3. 格式参考：
   ```
   https://your-node-provider.com/nodes.yaml#delreg=.*&rename=@tg%40ddgksf2021-+@num-$index7, tag=🌍国际节点, update-interval=3600, opt-parser=true, enabled=true
   ```

### 第四步：启用虚拟币加速（可选）
如果需要虚拟币交易加速：
1. 确保配置文件中已启用 `Crypto.conf` 引用
2. 虚拟币相关流量会自动导向新加坡节点
3. 可在**策略**界面手动切换"虚拟币交易"策略组为其他地区

---

## 重要配置项说明

### 策略组优先级
海外版本的策略组优先级顺序：
1. **新加坡加速** ← 虚拟币首选
2. 美国节点 ← 国际媒体/全球加速
3. 日本节点
4. 台湾节点
5. 直连（Direct）

### DNS 配置
- **主 DNS**：8.8.8.8 (Google)
- **备用 DNS**：1.1.1.1 (Cloudflare)
- **特殊域名 DNS**：已移除中国特定配置

### 虚拟币相关域名
所有以下域名的流量都会被分流到"虚拟币交易"策略组：
- 交易所：binance.com、coinbase.com、kraken.com、okx.com 等
- DeFi：uniswap.org、aave.com、curve.fi 等
- NFT：opensea.io、blur.io 等
- 钱包：metamask.io、walletconnect.org 等
- 数据：coinmarketcap.com、coingecko.com 等

---

## 自定义建议

### 根据实际需求调整
如果您需要调整策略分配，可以编辑以下部分：

**1. 如果想让虚拟币使用美国节点而非新加坡：**
```
static=虚拟币交易, 美国节点, 新加坡加速, 日本节点, direct, proxy
```

**2. 如果想添加更多虚拟币交易所：**
在 `CryptoFilter.list` 中添加：
```
DOMAIN-SUFFIX,your-exchange.com
```

**3. 如果想调整节点自动测速时间：**
修改配置中的 `check-interval=900` 参数（单位为秒）

---

## 故障排查

### 1. 虚拟币交易所访问慢
- **原因**：节点质量不好
- **解决**：在策略组中手动选择其他节点，或等待自动选择重新测速

### 2. DNS 解析失败
- **原因**：DNS 被污染或被阻止
- **解决**：在配置中改为本地 DNS 或其他公共 DNS

### 3. 某些应用无法访问
- **原因**：流量被错误分流
- **解决**：检查 `filter_local` 部分的规则，移除冲突规则

### 4. 节点连接超时
- **原因**：节点已过期或质量差
- **解决**：更新节点订阅，或在配置中更换节点链接

---

## 性能优化建议

### 推荐设置
1. **VPN 栏设置**：
   - ✅ 启用代理
   - ✅ 启用兼容性增强（如遇到微信等 App 问题）
   - ❌ 关闭分流匹配优化
   - ❌ 关闭 MPM

2. **通知栏设置**：
   - ✅ 仅启用策略检测通知
   - ✅ 启用脚本通知
   - ❌ 关闭 Network 状态通知

3. **定期更新**：
   - 每周更新一次分流规则
   - 每月检查一次节点订阅

---

## 虚拟币用户特别提示

### 为什么需要这个配置？

很多 Web3 和虚拟币项目（特别是交易所、DeFi 应用）**不支持英国 IP 访问**。这包括：

**主要问题的平台**：
- 某些交易所限制英国用户注册
- 部分 DeFi 应用对英国 IP 进行地址限制
- 某些虚拟币服务因监管原因阻止英国访问
- NFT 市场和钱包服务的部分功能受限

**解决方案**：
此配置通过 VPN 连接到虚拟币政策更友好的地区节点：
- 🇦🇪 **阿联酋** - 虚拟币中心，无地理限制
- 🇸🇬 **新加坡** - 亚洲交易枢纽，政策开放
- 🇺🇸 **美国** - 规范市场，访问稳定

当访问虚拟币相关网站时，自动使用这些节点，绕过英国 IP 限制。

### 交易所访问优化
- 优先使用阿联酋或新加坡节点（支持 VPN 访问的虚拟币友好地区）
- 建议在进行大额交易时测试不同节点的延迟
- 出现 "geo-blocked" 或 IP 限制错误时，尝试切换节点

### DeFi 应用加速
- 本配置包含 60+ 个 DeFi 应用，均自动通过 VPN 节点访问
- Gas 费用较高时建议使用节点较优的时段操作
- Uniswap、Aave 等应用对延迟较敏感，选择低延迟节点（新加坡优先）
- MetaMask 钱包交互需要稳定连接，建议使用阿联酋或新加坡节点

### 支持的 DeFi 生态
配置已包含完整的 DeFi 生态支持：

**借贷协议**：Aave、Compound、Liquity、Flux Finance、Alchemix 等
**DEX（去中心化交换）**：Uniswap、Curve、Balancer、SushiSwap、PancakeSwap 等
**收益优化**：Yearn、Convex、Aura、Blizz 等
**衍生品交易**：GMX、dYdX、Perp Protocol、Lyra 等
**质押协议**：Lido、Rocket Pool、Staking Rewards 等
**Layer2 DeFi**：Arbitrum、Optimism、Polygon 生态应用
**聚合器**：1inch、ParaSwap、Zapper、DeBank、Instadapp 等

### 风险提示
⚠️ 虚拟币交易涉及资金安全，请确保：
- 使用官方网站或已验证的应用入口
- 确认是通过 VPN 访问（检查显示的节点地区）
- 不使用公开 WiFi 进行敏感操作
- 定期检查节点是否被篡改（使用纯净度查询功能）
- 了解英国关于虚拟币的最新监管政策，合法合规交易

### 英国用户特别说明
如果您在英国但需要访问虚拟币服务：
1. 此配置完全合法，仅用于绕过地理限制
2. 虚拟币交易本身在英国是合法的（受 FCA 监管）
3. 使用 VPN 进行虚拟币交易在英国是合法的
4. 但您仍需遵守英国关于虚拟币交易的税务和监管要求
5. 建议咨询税务顾问了解您的申报义务

---

## 文件版本历史

| 版本 | 日期 | 更新内容 |
|------|------|--------|
| 2.0 | 2025-12-25 | 扩展 DeFi 项目（60+ 应用），添加英国 IP 限制说明 |
| 1.0 | 2025-12-25 | 首次发布，包含海外版配置和虚拟币模块 |

---

## 相关链接

- **QuantumultX 官方**：[https://www.quantumult.app](https://www.quantumult.app)
- **原始配置作者**：[@ddgksf2013](https://github.com/ddgksf2013)
- **Icon 库**：[Qure IconSet](https://github.com/Koolson/Qure)
- **虚拟币数据**：[CoinMarketCap](https://coinmarketcap.com) / [CoinGecko](https://coingecko.com)

---

## 许可和免责声明

- 此配置基于开源项目优化，仅供学习和参考
- 使用虚拟币服务需自担风险，与政策合规性无关
- 作者不对因使用此配置造成的任何后果负责
- 定期检查并更新配置，确保使用最新规则

---

**最后更新**：2025-12-25
**维护者**：Yeats33
**GitHub**：https://github.com/Yeats33/net-rules
