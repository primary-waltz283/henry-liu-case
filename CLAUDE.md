# 江南案 — 互動式歷史紀錄網站

## 專案目標與定位

以「解密檔案」（scrollytelling documentary）的形式，呈現 1984 年江南案（劉宜良暗殺事件）的歷史全貌。網站讓使用者像翻閱解密檔案一樣，透過捲動頁面逐步進入事件的背景、人物、執行、審判與餘波，搭配 PixiJS pixel art 場景重現關鍵時刻。

**核心定位：** 歷史紀錄，非政治評論。以多方視角交叉比對，讓事實與文獻自己說話。

**敘事特色：** 四方視角矛盾比對 — 同一事件從汪希苓（決策者）、吳敦（執行者）、董桂森（槍手）、David Kaplan（外國記者）四個角度呈現，標示矛盾之處。

---

## 技術棧

| 層級 | 技術 | 用途 |
|------|------|------|
| 建置工具 | Vite | 快速 dev server、HMR、production build |
| 框架 | React 18+ | UI 元件、狀態管理 |
| 語言 | TypeScript (strict) | 型別安全 |
| 樣式 | TailwindCSS v4 | 工具類 CSS、自訂報紙/檔案風主題 |
| 場景渲染 | PixiJS v8 | Pixel art 場景、動畫 |
| 捲動敘事 | GSAP ScrollTrigger 或 Intersection Observer | Scrollytelling 觸發 |
| 部署 | GitHub Pages + GitHub Actions | 靜態網站部署 |

---

## 目錄結構

```
herry-liu-case/
├── CLAUDE.md                    ← 本檔案（專案規範）
├── docs/
│   └── plans/
│       └── 2026-02-17-initial.md  ← 實作計畫
├── data/                        ← 原始書籍資料（已 gitignore，版權保護）
│   ├── 龍之火-上.md
│   ├── 龍之火-下.md
│   ├── 董桂森.md
│   ├── 吳敦回憶錄.md
│   └── 忠與過.md
├── docs/
│   └── extracted/               ← 提取的結構化資料
│       ├── 01-fires-of-dragon.md
│       ├── 02-dong-guisen.md
│       ├── 03-wu-dun-memoir.md
│       ├── 04-wang-hsi-ling.md
│       ├── 05-public-sources.md
│       ├── timeline.json        ← 整合後的事件時間線
│       ├── characters.json      ← 人物資料庫
│       ├── contradictions.json  ← 四方矛盾比對資料
│       └── narrative.md         ← 整合後的完整敘事
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── src/
│   ├── main.tsx                 ← 應用程式進入點
│   ├── App.tsx                  ← 根元件
│   ├── chapters/                ← 各章節頁面元件
│   │   ├── index.ts
│   │   ├── Prologue.tsx
│   │   ├── Chapter01.tsx
│   │   └── ...
│   ├── components/
│   │   ├── ui/                  ← 通用 UI 元件
│   │   ├── infographic/         ← 資訊圖表
│   │   ├── pixel/               ← PixiJS pixel art 場景元件
│   │   └── narrative/           ← 敘事元件
│   ├── data/                    ← 結構化資料（從 docs/extracted/ 匯入）
│   ├── hooks/                   ← 自訂 React hooks
│   ├── styles/                  ← 全域樣式、字型宣告
│   └── utils/                   ← 工具函式
└── public/
    └── assets/
        ├── sprites/             ← Pixel art sprite sheets
        ├── textures/            ← 紙張紋理、印章圖樣
        └── fonts/               ← 自訂字型
```

---

## 視覺設計：「解密檔案」風格

### 色彩系統

| 名稱 | 色碼 | 用途 |
|------|------|------|
| paper-50 | `#faf8f4` | 最淺紙張色（主要背景） |
| paper-100 | `#f5f0e8` | 紙張色（卡片背景） |
| paper-200 | `#e8dfd2` | 較深紙張（hover 狀態） |
| paper-300 | `#d4c9b8` | 分隔線、邊框 |
| ink-700 | `#3d3833` | 主要文字 |
| ink-800 | `#2d2a26` | 標題文字 |
| ink-900 | `#1a1816` | 最深文字 |
| stamp-red | `#c23b22` | 「機密」印章、重要時刻標記 |
| link-blue | `#4a6fa5` | 連結、互動元素 |
| neutral | `#8b7d6b` | 輔助文字、舊報紙灰褐 |
| evidence-gold | `#b8943e` | 證據高亮、引述框 |

### 質感元素

- 紙張紋理背景（微噪點 SVG filter 或 CSS background）
- 「極機密」「鋤奸」橡皮章圖樣（用於章節轉場）
- 打字機字體用於檔案引述（JetBrains Mono 或 Courier）
- 報紙剪報風格的插入框（旋轉微角度、陰影）
- 紅色圈批標記用於矛盾處

---

## 開發規範

### 命名慣例

- **元件：** PascalCase（`TimelineBar.tsx`、`PixelScene.tsx`）
- **hooks：** camelCase 以 `use` 開頭（`useScrollProgress.ts`）
- **工具函式：** camelCase（`formatDate.ts`）
- **資料檔：** kebab-case（`timeline.json`、`characters.json`）
- **CSS 類：** TailwindCSS 工具類為主，自訂類用 kebab-case

### 元件拆分原則

- 每個章節（Chapter）一個獨立元件檔
- 可重用的敘事元素抽為 `narrative/` 下的元件
- PixiJS 場景封裝在 `pixel/` 下，透過 React wrapper 呈現
- 資訊圖表各自獨立於 `infographic/`

### i18n 考量

- 主要語言：**繁體中文**
- 英文作為次要語言（尤其 Kaplan《龍之火》相關內容、國際脈絡）
- 文字內容集中在 `data/` 資料夾，方便日後抽換為多語系
- 元件中不硬編碼長文字，改從資料層引入

### TypeScript 規範

- 啟用 `strict` 模式
- 所有元件 props 定義 interface
- 避免 `any`，必要時用 `unknown` 加 type guard

---

## PixiJS 使用原則

### 適用場景（用 pixel art）

1. **車庫槍擊** — Daly City 車庫，清晨三聲槍響
2. **情治系統網絡** — 像電路板般展開的間諜組織圖
3. **劉宜良書房** — 打字機、手稿、孤獨的寫作者
4. **竹聯幫+情報局會面** — 白景瑞家宴的秘密會面
5. **任務倒數** — 松竹山莊受訓到執行的時間推移
6. **董桂森獄中** — 書信、遇害、淡出黑暗

### 不用 PixiJS 的場景

- 純文字敘事段落
- Timeline、人物關係圖、組織架構圖（用 SVG 或 CSS）
- 引用文獻區塊
- 矛盾對照表

### 技術原則

- 使用 sprite sheet 管理像素圖
- 每個場景是獨立的 React 元件，內嵌 PixiJS canvas
- 場景在進入 viewport 時才初始化（lazy load）
- 手機上降級為靜態圖片或簡化動畫
- 像素風格參考：Papers, Please 的色調但偏暖（配合報紙風）

---

## 資料來源

### 主要來源（版權書籍，不入版控）

| # | 檔名 | 說明 | 視角 |
|---|------|------|------|
| 1 | `龍之火-上.md` / `龍之火-下.md` | David Kaplan《Fires of the Dragon》中譯 | 外國記者全面調查 |
| 2 | `董桂森.md` | 柴東屏《江南案槍手董桂森》 | 槍手視角 |
| 3 | `吳敦回憶錄.md` | 吳敦口述／藍祖蔚錄寫 | 執行者視角 |
| 4 | `忠與過.md` | 汪士淳著（汪希苓相關） | 情治首長視角 |

### 補充來源（公開資料）

- 維基百科（江南案、董桂森、汪希苓、蔣孝武）
- 新聞報導、學術論文
- 促轉會相關報告

### 版權保護

- `data/` 目錄加入 `.gitignore`
- 提取的結構化資料（`docs/extracted/`）為重新整理後的事實摘要，非原文複製
- 網站敘事基於提取資料重新撰寫，標註「根據 XXX 一書記載」
- 不直接引用大段原文

---

## 章節結構

| 章 | 標題 | 時間範圍 | 敘事重點 |
|----|------|---------|---------|
| 序 | 車庫裡的槍聲 | 1984.10.15 | 倒敘開場：Daly City 車庫暗殺現場 |
| 1 | 龍的爪牙 | 1949-1980 | 蔣家王朝與情治系統、海外間諜網 |
| 2 | 江南其人 | 1932-1984 | 劉宜良的雙面人生：記者、作家、線人？ |
| 3 | 竹林裡的兄弟 | 1956-1984 | 竹聯幫的崛起、幫派與情治的交集 |
| 4 | 鋤奸 | 1984.08-10.15 | 任務策劃到執行、三個巧合、被取消又執行 |
| 5 | 紙包不住火 | 1984.10-1985 | 破案經過、陳啟禮錄音帶、一清專案 |
| 6 | 審判與餘波 | 1985-1991 | 台美審判、蔣孝武之謎、董桂森獄中身亡 |
| 7 | 解嚴之路 | 1985-2025 | 對台灣民主化的影響、未解之謎 |

---

## 歷史敘事原則

1. **嚴謹與事實** — 所有敘述必須有文獻依據，不臆測、不虛構
2. **多方視角** — 同一事件呈現四方說法，明確標示矛盾
3. **不做政治判斷** — 呈現各方說法與證據，讓讀者自行判斷
4. **尊重所有當事人** — 避免煽情化、避免消費悲劇
5. **標註出處** — 每段敘述標明來自哪份文獻
6. **矛盾處理** — 不同來源有矛盾時，並列呈現並用紅色標記

### 引用格式

```
（來源：龍之火，第 XX 頁）
（來源：吳敦回憶錄，第 X 章）
（來源：董桂森，第 X 章）
（來源：忠與過，第 X 頁）
```

### 敏感內容處理

- 暴力細節以客觀描述，不誇張渲染
- 提供內容警告（content warning）給讀者

---

## 開發指令

```bash
# 安裝依賴
npm install

# 開發模式
npm run dev

# 建置
npm run build

# 預覽建置結果
npm run preview

# 型別檢查
npx tsc --noEmit

# Lint
npm run lint
```
