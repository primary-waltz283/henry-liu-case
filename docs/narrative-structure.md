# 江南案：敘事結構設計

> 本文件定義互動式歷史紀錄網站的八章結構、每章的視覺元素（Pixel Art 場景與資訊圖表），以及捲動敘事（scrollytelling）的節奏設計。

---

## 章節總覽

| 章 | 標題 | 時間範圍 | Pixel Art 場景 | 資訊圖表 | 預估捲動長度 |
|----|------|---------|---------------|---------|-------------|
| 序 | 車庫裡的槍聲 | 1984.10.15 | `garage-shot` | — | 3 screens |
| 1 | 龍的爪牙 | 1949-1980 | `spy-network` | `intelligence-org-chart` | 4 screens |
| 2 | 江南其人 | 1932-1984 | `typewriter-study` | — | 4 screens |
| 3 | 竹林裡的兄弟 | 1956-1984 | `bamboo-meeting` | — | 3 screens |
| 4 | 鋤奸 | 1984.08-10.15 | `mission-clock` | `48-hour-timeline`, `contradiction-table` | 6 screens |
| 5 | 紙包不住火 | 1984.10-1985 | — | `investigation-flowchart` | 4 screens |
| 6 | 審判與餘波 | 1985-1991 | `prison-fade` | `dual-trial-comparison` | 5 screens |
| 7 | 解嚴之路 | 1985-2025 | — | `causality-chain` | 3 screens |
| 全域 | — | — | — | `character-map` | 浮動面板 |

**總計：** 6 個 Pixel Art 場景、7 個資訊圖表、約 32 screens 捲動長度。

---

## 各章詳細結構

### 序章：車庫裡的槍聲

**時間：** 1984 年 10 月 15 日
**敘事節奏：** 倒敘開場，沉浸式。以秒為單位推進。
**情緒弧線：** 寂靜 → 緊張等待 → 瞬間暴力 → 黑色幽默（超速罰單）→ 懸念

**段落結構：**
1. **環境建立**（0.5 screen）— Daly City 清晨，Hillview Court 74 號。崔蓉芝離開。
2. **等待**（1 screen）— `garage-shot` 場景啟動。吳敦、董桂森在車庫暗處。董桂森的心跳引述。
3. **槍擊**（0.5 screen）— 三聲槍響。法醫細節。吳敦「眼神才剛對接」引述。
4. **撤離**（0.5 screen）— 自行車逃離、指紋遺留、超速罰單。
5. **餘波**（0.5 screen）— 「買賣已成，送了三包禮物。」崔蓉芝指著《蔣經國傳》。

**矛盾標記：** `struggle-at-scene`（法庭稱有纏鬥 vs 兩名殺手否認）

**Pixel Art：** `garage-shot` — 場景隨捲動從黎明靜止 → 人影出現 → 槍焰閃光 → 紅色擴散
**資訊圖表：** 無

---

### 第一章：龍的爪牙

**時間：** 1949-1980
**敘事節奏：** 宏觀歷史背景，節奏從容。以年代為單位推進。
**情緒弧線：** 冷戰格局 → 恐怖體制 → 情報帝國擴張 → 汪希苓崛起

**段落結構：**
1. **韓戰與台灣命運**（0.5 screen）— 1950 年韓戰爆發，台灣從「政治累贅」變「戰略要地」。
2. **蔣經國的安全帝國**（1 screen）— 白色恐怖、五大情報機關、五萬特工。吳國楨的控訴。
3. **政戰學校**（0.5 screen）— 蘇聯模式、每日朗讀語錄。劉宜良是首批學員——伏筆。
4. **海外情報擴張**（1 screen）— `spy-network` 場景。15 個領事機構、職業學生、FBI 反制。`intelligence-org-chart` 在此展開。
5. **汪希苓登場**（1 screen）— 四次破格提拔、CIA 人脈、「兩汪之爭」伏筆。

**矛盾標記：** 無（本章為背景鋪陳）

**Pixel Art：** `spy-network` — 全球地圖上的情報網絡連線，隨捲動逐步點亮
**資訊圖表：** `intelligence-org-chart` — 五大情報機關的層級與互動關係

---

### 第二章：江南其人

**時間：** 1932-1984
**敘事節奏：** 傳記體，按人生階段推進。
**情緒弧線：** 叛逆少年 → 自由追求 → 寫作執念 → 身份迷霧 → 命運陷阱

**段落結構：**
1. **靖江少年**（0.5 screen）— 出生、來台、政戰學校叛逆。
2. **從廣播到寫作**（0.5 screen）— 正聲電台、夏曉華（恩師/中間人伏筆）。
3. **美國夢**（0.5 screen）— 赴美、教中文、取得學位。1969 年險遭逮捕逃離台灣。
4. **十五年磨一書**（1 screen）— `typewriter-study` 場景。蔣經國傳的寫作歷程。吳國楨訪問。
5. **暗殺動機之謎**（1 screen）— 五種假說並列。`assassination-motive` 矛盾展開。
6. **三重身份**（0.5 screen）— FBI 線人 / 情報局線人 / 中共貴賓。`liu-identity` 矛盾。

**矛盾標記：** `assassination-motive`、`liu-identity`、`liu-codename`

**Pixel Art：** `typewriter-study` — 書房場景：打字機、手稿、書架、孤燈
**資訊圖表：** 無

---

### 第三章：竹林裡的兄弟

**時間：** 1956-1984
**敘事節奏：** 群像式，介紹三組人物。
**情緒弧線：** 少年結盟 → 幫派壯大 → 與情治系統合流 → 國家機器的非正式延伸

**段落結構：**
1. **竹林路上的少年**（0.5 screen）— 1956 年竹聯幫成立。
2. **陳啟禮**（0.5 screen）— 幫主的雙重面孔。
3. **吳敦**（0.5 screen）— 「沒有陳啟禮就沒有吳敦」。電影界跨界。
4. **董桂森**（0.5 screen）— 眷村軍人之子、十年軍旅。
5. **國黨招募黑道**（1 screen）— `bamboo-meeting` 場景。白景瑞飯局、國防部座談會、蔣家與竹聯幫的關係。

**矛盾標記：** 無（本章為人物介紹）

**Pixel Art：** `bamboo-meeting` — 宴席場景：圓桌、酒杯、暗處觀察的眼神
**資訊圖表：** 無

---

### 第四章：鋤奸

**時間：** 1984 年 8 月至 10 月 15 日
**敘事節奏：** 最緊密的一章，節奏加速。以天和小時為單位推進。
**情緒弧線：** 密謀 → 訓練 → 出發 → 搜索困境 → 殺手集結 → 倒數 → 差點取消 → 時差宿命

**段落結構：**
1. **第一個巧合：白景瑞的飯局**（1 screen）— 官方版 vs 忠與過揭露的三次會面。`wang-chen-first-meeting` 矛盾。
2. **永康街招待所**（0.5 screen）— 正式吸收。汪希苓的龐大計畫。
3. **第二個巧合：暴露情報人員**（0.5 screen）— 崔暉事件。陳虎門的判斷。
4. **陽明山訓令**（1 screen）— 松竹山莊受訓。`mission-clock` 場景。`discipline-or-sanction`、`wang-visits-mountain`、`sanction-order-timing` 三個矛盾集中展開。`contradiction-table` 在此呈現。
5. **出發與搜索**（0.5 screen）— 天廚飯店、帥鍊業退出、NSA 監聽未通報。
6. **殺手團隊集結**（0.5 screen）— 董桂森「你願不願意為國家做一點事？」
7. **第三個巧合**（1 screen）— `48-hour-timeline` 展開。取消令 vs 時差。「天意」。
8. **（回到序章場景）**（1 screen）— 以文字簡要回顧序章，不重複 pixel art。

**矛盾標記：** `wang-chen-first-meeting`、`discipline-or-sanction`、`wang-visits-mountain`、`sanction-order-timing`、`mission-cancellation`

**Pixel Art：** `mission-clock` — 倒數計時器風格，日期翻頁推進
**資訊圖表：** `48-hour-timeline`（10/14-10/15 逐時對照）、`contradiction-table`（四方矛盾全覽）

---

### 第五章：紙包不住火

**時間：** 1984 年 10 月至 1985 年
**敘事節奏：** 偵探敘事，抽絲剝繭。
**情緒弧線：** 掩蓋嘗試 → 保命錄音帶 → FBI 介入 → 一清專案 → 錄音帶曝光 → 逃亡

**段落結構：**
1. **國民黨的第一反應**（0.5 screen）— 「文化戰爭」會議。
2. **陳啟禮的保命錄音帶**（1 screen）— 白狼的警告、地下室錄音。引述錄音帶原文。`tape-recording-date` 矛盾。
3. **FBI 介入**（0.5 screen）— 劉善謙、皮建鑫被捕。`investigation-flowchart` 在此展開。
4. **一清專案：兩汪之爭**（1 screen）— 掃黑 vs 滅口？「大汪鬥小汪」。`yiqing-true-purpose`、`wang-report-to-wang` 矛盾。
5. **錄音帶曝光**（0.5 screen）— 林肯廣場飯店 707 號房。連鎖反應。
6. **董桂森的逃亡**（0.5 screen）— 菲律賓→泰國→巴西。被自己的信任出賣。

**矛盾標記：** `tape-recording-date`、`yiqing-true-purpose`、`wang-report-to-wang`

**Pixel Art：** 無
**資訊圖表：** `investigation-flowchart` — 線索如何從指紋→皮建鑫→陳啟禮→錄音帶→汪希苓層層揭開

---

### 第六章：審判與餘波

**時間：** 1985-1991
**敘事節奏：** 對比式敘事（台灣 vs 美國審判）。
**情緒弧線：** 政治操作的審判 → 蔣孝武冤案 → 民事和解 → 董桂森之死 → 各人結局

**段落結構：**
1. **美國調查團赴台**（0.5 screen）— FBI 赴台、審問、測謊。
2. **台灣軍事審判**（1 screen）— 判決結果。`trial-political-performance` 矛盾。`dual-trial-comparison` 在此展開。
3. **蔣孝武之謎**（1 screen）— 指控→撤回→「圍魏救趙」。`chiang-hsiao-wu-role`、`chiang-hsiao-wu-or-hsiao-yung` 矛盾。
4. **美國的審判**（0.5 screen）— RICO 起訴、加州一級謀殺判決。
5. **崔蓉芝見董桂森**（0.5 screen）— 「對不起，對不起……」
6. **民事訴訟與和解**（0.5 screen）— 145 萬美元。不能拍電影的條件。
7. **董桂森之死**（1 screen）— `prison-fade` 場景。`dong-prison-death` 矛盾。

**矛盾標記：** `trial-political-performance`、`chiang-hsiao-wu-role`、`chiang-hsiao-wu-or-hsiao-yung`、`dong-prison-death`

**Pixel Art：** `prison-fade` — 監獄場景漸暗至黑
**資訊圖表：** `dual-trial-comparison` — 台美審判對照表

---

### 第七章：解嚴之路

**時間：** 1985-2025
**敘事節奏：** 收束式，從具體到抽象。
**情緒弧線：** 政治海嘯 → 蔣家終結 → 解嚴 → 未解之謎 → 沉思

**段落結構：**
1. **政治海嘯**（0.5 screen）— 軍售威脅、情報局改組。蔣經國：「蠢事。」
2. **蔣家王朝的終結**（0.5 screen）— 蔣經國宣示、蔣孝武外放。
3. **解嚴**（0.5 screen）— 1987.7.15。《蔣經國傳》公開發售。`causality-chain` 在此展開。
4. **吳敦的最後證言**（0.5 screen）— 「我開的這一槍……改變了台灣的命運。」
5. **五大未解之謎**（1 screen）— `chiang-ching-kuo-knowledge` 矛盾。2026 年吳敦辭世——三名殺手皆已不在。

**矛盾標記：** `chiang-ching-kuo-knowledge`

**Pixel Art：** 無
**資訊圖表：** `causality-chain` — 從暗殺到解嚴的因果鏈

---

### 全域元素

**`character-map`（人物關係圖）**
- 以浮動面板形式存在，可在任何章節展開
- 當前章節的相關人物高亮
- 點擊人物可展開個人檔案卡

---

## 捲動敘事（Scrollytelling）設計原則

### 節奏控制

| 元素 | 捲動速度 | 觸發行為 |
|------|---------|---------|
| 一般段落 | 正常速度 | 文字淡入 |
| 引述段落 | 稍慢 | 打字機效果 |
| Pixel Art 場景 | 釘選（sticky） | progress 0→1 連動 |
| 矛盾對照框 | 停頓 | 展開四方說法 |
| 章節轉場 | 停頓 | 「機密」印章蓋下 → 翻頁 |
| 資訊圖表 | 釘選或停頓 | 互動式探索 |

### 轉場設計

每個章節之間以「機密檔案」風格轉場：
1. 當前章節內容淡出
2. 「極機密」紅色橡皮章旋轉蓋入畫面中央
3. 下一章章節標題以打字機效果出現
4. 背景紙張紋理略微變化（暗示時間推移）

### RWD 降級策略

| 裝置 | Pixel Art | 資訊圖表 | 轉場效果 |
|------|----------|---------|---------|
| 桌面 (> 1024px) | 完整 PixiJS 動畫 | 完整互動 | 完整動畫 |
| 平板 (640-1024px) | 簡化動畫 | 部分互動 | 簡化動畫 |
| 手機 (< 640px) | 靜態 PNG | Tab 切換或垂直堆疊 | 簡單淡入淡出 |

---

## 資料流

```
docs/extracted/narrative.md     → src/data/chapters/*.json  → Chapter 元件
docs/extracted/timeline.json    → src/data/timeline.json    → Timeline 元件
docs/extracted/characters.json  → src/data/characters.json  → CharacterMap 元件
docs/extracted/contradictions.json → src/data/contradictions.json → ContradictionBox 元件
```

所有文字內容從 JSON 資料層引入，元件中不硬編碼長文字。
