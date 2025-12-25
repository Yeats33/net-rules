# 🌍 海外版配置升级总结（虚拟币优化版）

## ✅ 更新完成

海外版 QuantumultX 配置已完成重大升级，**虚拟币功能已完全集成到主配置**中，不再需要单独引用。

---

## 📋 关键改动

### 1️⃣ QuantumultX_Overseas.conf (v1.1+)

**版本标记**：
```
@ConfigVersion     1.1 (Overseas with Crypto Integration)
@CryptoOptimized   支持虚拟币政策宽松地区节点（阿联酋/新加坡）
```

**虚拟币节点优先级更新**：
```
🇦🇪 阿联酋（首选）    ← 虚拟币政策最宽松
🇸🇬 新加坡（次选）    ← 亚洲交易中心
🇺🇸 美国（第三选）    ← 规范市场
🇯🇵 日本（备选）      ← 亚洲备选
```

**新增政策组**：
- `static=虚拟币交易` - 政策友好地区节点优先
- `static=阿联酋加速` - 阿联酋专用加速组
- 总共 **9 个**策略组（之前 8 个）

**虚拟币分流规则**：
```
force-policy=虚拟币交易,
包含 100+ 虚拟币相关域名
```

### 2️⃣ CryptoFilter.list（已更新）

**新增说明**：
```
虚拟币节点策略：根据各地虚拟币政策灵活选择节点
  🇦🇪 阿联酋（政策最宽松）- 成为加密资产中心之一
  🇸🇬 新加坡（政策友好）  - 亚洲虚拟币中心
  🇺🇸 美国（政策相对开放） - 规范化市场
```

包含 100+ 虚拟币相关域名，覆盖：
- 50+ 交易所（Binance, Coinbase, OKX, Gate.io 等）
- 10+ DeFi 应用（Uniswap, Aave, Curve 等）
- 5+ NFT 平台（OpenSea, Blur 等）
- 4+ 钱包（MetaMask, WalletConnect 等）
- 数据平台（CoinMarketCap, CoinGecko 等）
- 区块浏览器（Etherscan, Polygonscan 等）

### 3️⃣ Crypto.conf（改为参考文档）

**文件用途变更**：
- ❌ 不再作为可引用的配置文件
- ✅ 改为虚拟币功能说明和参考文档
- 所有功能已集成到 `QuantumultX_Overseas.conf`

### 4️⃣ CRYPTO_POLICY_GUIDE.md（新增）

**文件说明**：
- 🇦🇪 阿联酋虚拟币政策详解
- 🇸🇬 新加坡虚拟币政策详解
- 🇺🇸 美国虚拟币政策详解
- 📊 政策对比和节点选择建议
- ⚠️ 法律风险提示和合规建议

### 5️⃣ QUICK_START.md（已更新）

**更新内容**：
- 虚拟币节点优先级说明
- 虚拟币政策友好地区优先
- 自定义虚拟币节点的方法
- 虚拟币安全提示

---

## 🎯 使用方式

### 对于虚拟币用户

✅ **推荐做法**（新）：
```
直接使用 QuantumultX_Overseas.conf 即可
虚拟币功能自动启用，无需额外配置
```

❌ **不推荐做法**（旧）：
```
分别引用 QuantumultX_Overseas.conf 和 Crypto.conf
Crypto.conf 现在仅用于参考，不需要引用
```

### 配置导入

```
1. 打开 QuantumultX
2. 点击风车 → 配置文件 → +
3. 选择 QuantumultX_Overseas.conf（v1.1+）
4. 配置会自动包含虚拟币优化
```

### 验证虚拟币加速是否启用

```
1. 打开 Binance、Coinbase 等交易所
2. 观察 QuantumultX 的流量统计
3. 应显示使用"虚拟币交易"策略组
4. 节点应优先显示阿联酋或新加坡
```

---

## 💡 核心特性

### 1. 虚拟币政策优化

| 特性 | 说明 |
|------|------|
| **首选节点** | 🇦🇪 阿联酋（政策最宽松） |
| **备选节点** | 🇸🇬 新加坡（亚洲最优） |
| **灵活切换** | 支持手动切换到其他地区 |
| **自动降级** | 节点不可用时自动切换备选 |
| **政策提醒** | 内含虚拟币政策对比和法律提示 |

### 2. 自动识别虚拟币服务

配置会**自动识别**以下所有虚拟币相关服务：

**主流交易所**（20+）
- Binance / Coinbase / Kraken / OKX / Huobi / Gate.io / KuCoin / Bybit / Upbit / Bithumb

**DeFi 应用**（10+）
- Uniswap / Aave / Curve / Lido / Balancer / Compound / MakerDAO / Yearn Finance

**NFT 平台**（5+）
- OpenSea / Blur / Raydium / Magic Eden / LooksRare

**钱包服务**（4+）
- MetaMask / WalletConnect / Ledger / Trezor / Trust Wallet / Phantom

**数据平台**（8+）
- CoinMarketCap / CoinGecko / DefiLlama / Glassnode / Nansen / Kaiko

**区块浏览器**（8+）
- Etherscan / BSCScan / Polygonscan / Solscan / ViewBlock / DefiLlama

### 3. 零配置即用

✅ **无需做任何特殊配置**
- 虚拟币功能自动启用
- 自动优先使用政策友好节点
- 自动识别并加速 100+ 虚拟币相关域名

---

## 📊 版本对比

| 版本 | 发布时间 | 虚拟币支持 | 特点 |
|------|---------|---------|------|
| **v1.0** | 2025-12-25 | ✅ 有（需单独引用） | 初版，虚拟币作为独立模块 |
| **v1.1** | 2025-12-25 | ✅ 有（完全集成） | 升级版，虚拟币完全集成，支持政策友好地区 |

---

## 🔄 迁移指南

### 从 v1.0 升级到 v1.1

**如果您正在使用 v1.0**：

```
旧配置（v1.0）：
  - QuantumultX_Overseas.conf (v1.0)
  - Crypto.conf （作为单独引用）

新配置（v1.1）：
  - QuantumultX_Overseas.conf (v1.1+)
  - Crypto.conf （仅作参考，不需引用）

升级步骤：
1. 删除旧的 v1.0 配置
2. 导入新的 v1.1 配置
3. 虚拟币功能自动启用，无需手动添加 Crypto.conf
```

### 保持现有设置

```
如果需要保留现有节点选择：
1. 记录之前选择的虚拟币节点
2. 导入新配置后，在策略组中重新选择
3. 新配置支持与旧版相同的所有节点
```

---

## ⚙️ 自定义选项

### 改变虚拟币节点优先级

编辑配置，找到：
```
static=虚拟币交易, 阿联酋节点, 新加坡加速, 美国节点, 日本节点, direct, proxy
```

根据需要调整，例如优先新加坡：
```
static=虚拟币交易, 新加坡加速, 阿联酋节点, 美国节点, 日本节点, direct, proxy
```

### 禁用虚拟币加速

在配置中找到：
```
https://raw.githubusercontent.com/Yeats33/net-rules/main/qx/CryptoFilter.list
```

前面加 `;` 注释：
```
;https://raw.githubusercontent.com/Yeats33/net-rules/main/qx/CryptoFilter.list
```

### 添加新虚拟币交易所

编辑 `CryptoFilter.list`，在末尾添加：
```
DOMAIN-SUFFIX,your-exchange.com
```

---

## 📚 文档目录

| 文件 | 用途 | 必需 |
|------|------|------|
| **QuantumultX_CN.conf** | 中国版配置 | ❌ 可选 |
| **QuantumultX_Overseas.conf** | 海外版主配置（v1.1+） | ✅ 必需 |
| **CryptoFilter.list** | 虚拟币分流规则 | ✅ 必需（被主配置引用） |
| **Crypto.conf** | 虚拟币功能说明 | ❌ 可选（仅参考） |
| **CRYPTO_POLICY_GUIDE.md** | 虚拟币政策对比 | ❌ 可选（推荐阅读） |
| **QUICK_START.md** | 快速开始指南 | ❌ 可选（推荐阅读） |
| **README_Overseas.md** | 详细使用说明 | ❌ 可选（推荐阅读） |

---

## ✨ 新版本优势

### 相比 v1.0

```
✅ 虚拟币支持更完整
   • 100+ 虚拟币域名自动分流
   • 50+ 交易所覆盖
   • 10+ DeFi 应用支持

✅ 节点选择更灵活
   • 阿联酋优先（政策最宽松）
   • 支持 4 个地区节点
   • 自动降级和手动切换

✅ 政策认知更清晰
   • 虚拟币政策对比指南
   • 法律风险提示
   • 各地政策背景说明

✅ 使用更便捷
   • 零配置即用
   • 自动识别虚拟币服务
   • 无需单独引用模块
```

---

## 🚀 立即升级

### 1. 备份旧配置
```
保存现有的 QuantumultX 配置
记录虚拟币相关的手动设置
```

### 2. 导入新配置
```
下载最新的 QuantumultX_Overseas.conf (v1.1+)
在 QuantumultX 中导入该配置
```

### 3. 验证功能
```
打开虚拟币交易所网站
检查 QuantumultX 策略是否正确
验证节点优先级是否为阿联酋/新加坡
```

### 4. 可选优化
```
阅读 CRYPTO_POLICY_GUIDE.md 了解政策
根据需要调整虚拟币节点优先级
记录新的配置设置
```

---

## ❓ 常见问题

**Q: 需要删除 Crypto.conf 吗？**
A: 不必删除，但不需要引用。该文件现在仅作为参考文档。

**Q: v1.1 和 v1.0 可以同时使用吗？**
A: 可以，但建议只使用一个。同时使用可能导致分流规则冲突。

**Q: 如何验证虚拟币加速是否启用？**
A: 打开交易所网站，在 QuantumultX 中查看流量统计，应显示使用"虚拟币交易"策略组。

**Q: 可以改为优先新加坡而不是阿联酋吗？**
A: 可以，在配置的 `[policy]` 部分修改 `虚拟币交易` 策略组的节点顺序。

**Q: 虚拟币分流规则是否可关闭？**
A: 可以，在配置中对 `CryptoFilter.list` 行添加注释符 `;` 即可禁用。

---

## 📞 技术支持

- 📖 详细文档：查看 `README_Overseas.md`
- 🎓 政策指南：查看 `CRYPTO_POLICY_GUIDE.md`
- 🚀 快速开始：查看 `QUICK_START.md`
- 🔧 GitHub Issues：https://github.com/Yeats33/net-rules/issues

---

## 📝 版本信息

**当前版本**：QuantumultX_Overseas.conf v1.1
**发布日期**：2025-12-25
**虚拟币优化**：✅ 完全集成
**政策友好地区**：🇦🇪 阿联酋、🇸🇬 新加坡、🇺🇸 美国
**维护者**：Yeats33

---

**祝您使用愉快！** 🌍✨
