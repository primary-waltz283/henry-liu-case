export interface ContradictionPerspective {
  label: string
  claim: string
  source: string
}

export interface Contradiction {
  id: string
  title: string
  perspectives: ContradictionPerspective[]
  publicRecord?: string
}

/** Slug-based lookup for contradiction data used in narrative chapters */
const contradictions: Record<string, Contradiction> = {
  'struggle-at-scene': {
    id: 'C09',
    title: '暗殺現場是否有搏鬥',
    perspectives: [
      {
        label: '吳敦（執行者）',
        claim: '完全沒有搏鬥，一槍斃命，無對話無扭打。吳敦開第一槍（頭部），董桂森補兩槍（腹部）。劉宜良中槍後即刻倒地。',
        source: '吳敦回憶錄，矛盾對照表',
      },
      {
        label: '董桂森（槍手）',
        claim: '劉宜良下樓看到他時「沒有任何驚訝的表情，就只是那麼淡淡地看了一眼」。吳敦先開槍，劉宜良倒地，董桂森補兩槍。無搏鬥。',
        source: '董桂森，第二章',
      },
      {
        label: 'Kaplan（記者）',
        claim: '劉宜良中三槍：腹部兩槍、鼻側一槍穿顱（致命傷）。警方判斷為預謀行動，兇手槍法精準。未描述搏鬥場景。',
        source: '龍之火上，第一章',
      },
      {
        label: '法庭判決',
        claim: '判決書稱兩方「纏鬥」、江南「反撲奪槍」。',
        source: '台灣軍事法庭判決書',
      },
    ],
    publicRecord:
      '兩名在場執行者及外國記者調查均否認有搏鬥。法庭判決書的「纏鬥」描述明顯與事實不符，可能為法庭建構「教訓失控」敘事的一部分。',
  },

  'assassination-motive': {
    id: 'C16',
    title: '暗殺動機——五種假說',
    perspectives: [
      {
        label: '假說 A：《蔣經國傳》',
        claim: '此書 1975 年已開始連載，1983 年情報局甚至付了一萬七千美元讓劉宜良修改——不應引起殺機。',
        source: '龍之火下；忠與過，第十三章',
      },
      {
        label: '假說 B/C：未出版新書',
        claim: '劉宜良正在撰寫《吳國楨傳》——吳國楨掌握大量蔣家內幕。2017 年曝光的「說不出的原因」：計畫撰寫《宋美齡傳》。',
        source: '董桂森，第五章',
      },
      {
        label: '假說 D：暴露情報人員',
        claim: '1984 年 8 月劉宜良設計暴露了情報局在美的聯絡人，被認定為「叛徒」。陳虎門認為這是最核心的理由。',
        source: '董桂森，第四、五章',
      },
      {
        label: '假說 E：殺雞儆猴',
        claim: '震懾全球海外反對人士。',
        source: '綜合分析',
      },
    ],
    publicRecord:
      '法庭以「私怨」定罪。學術界普遍認為動機複合，非單一原因。',
  },

  'liu-identity': {
    id: 'C05',
    title: '劉宜良的真實身分',
    perspectives: [
      {
        label: '汪希苓（情報局長）',
        claim: '劉宜良被情報局吸收為線人，代號 0325，化名「向真」。每年領取情報酬勞。崔曄事件令汪希苓認定劉已從線人變成叛徒。',
        source: '忠與過，第十三章',
      },
      {
        label: 'Kaplan（記者）',
        claim: '劉宜良同時為 FBI 與國民黨情報局提供情報。化名「劉向真」，身份號碼 0335。曾兩度前往中國大陸。',
        source: '龍之火上，第一章；龍之火下',
      },
      {
        label: '崔蓉芝（妻子）',
        claim: '否認丈夫是間諜。案發當天即向警方揭露丈夫替 FBI 工作。',
        source: '龍之火上',
      },
      {
        label: '吳敦（執行者）',
        claim: '「既然他是一位只要用錢就可以『轉化及運用』的人，哪裡還需要動刀槍來制裁？」',
        source: '吳敦回憶錄',
      },
    ],
    publicRecord:
      '公開記錄確認劉宜良同時為 FBI 與國民黨情報局提供情報。學術界普遍認為具有「雙面」甚至「三面」諜報角色。',
  },

  'liu-codename': {
    id: 'C06',
    title: '劉宜良情報代號與專案名稱',
    perspectives: [
      {
        label: '忠與過',
        claim: '代號 0325，化名「向真」，隸屬「三一專案」。',
        source: '忠與過，第十三章',
      },
      {
        label: '龍之火',
        claim: '化名「劉向真」，身份號碼 0335。',
        source: '龍之火下',
      },
    ],
    publicRecord:
      '代號差異（0325 vs 0335）可能為記憶差異或 OCR 辨識錯誤。專案名稱差異（三一 vs 三義）可能因內部/對外稱呼不同。',
  },

  'wang-chen-first-meeting': {
    id: 'C07',
    title: '汪希苓與陳啟禮初識時間',
    perspectives: [
      {
        label: '汪希苓（法庭證詞）',
        claim: '「我在七十三年七月二十八日在白景瑞家中吃飯時，認識陳啟禮。」',
        source: '忠與過，第一章',
      },
      {
        label: '忠與過（揭露）',
        claim: '1984 年 6 月 16 日帥嶽峯已在汪希苓辦公室首次引見陳啟禮；7 月 18 日第二次會面；7 月 28 日白景瑞家宴實為第三次。汪在法庭上隱瞞了六週的前期接觸。',
        source: '忠與過，第十四章',
      },
      {
        label: 'Kaplan（記者）',
        claim: '記錄審判中汪希苓稱 7 月 28 日為初識，基本沿用法庭資料。',
        source: '龍之火下，審判章節',
      },
    ],
    publicRecord:
      '忠與過本身的揭露（6 月 16 日首次會面）與汪希苓法庭證詞（7 月 28 日）構成直接矛盾，證明汪在法庭上做了偽證。暗殺計劃的醞釀時間比法庭認定的更長。',
  },

  'discipline-or-sanction': {
    id: 'C01',
    title: '「教訓」vs「制裁」— 任務性質之爭',
    perspectives: [
      {
        label: '汪希苓（法庭）',
        claim: '法庭上堅稱只是「教訓」，是陳啟禮一時衝動殺人。但事後訪談明確承認「是我下令制裁他的」。',
        source: '忠與過，第一章、第十二章',
      },
      {
        label: '吳敦（執行者）',
        claim: '自始至終用的是「制裁」，意即殺人。從未聽過「教訓」一詞。',
        source: '吳敦回憶錄',
      },
      {
        label: '陳虎門（聯絡人）',
        claim: '出獄後承認：「我們當年在庭上所說的都是真話，就只有這個所謂『教訓』是假的，主要是因為當時的時空環境。其實我們制裁叛逆，有什麼不可以？」',
        source: '董桂森，第五章',
      },
    ],
    publicRecord:
      '法庭判決認定汪希苓「對教訓之方式未予以界定」，以殺人罪共同正犯定讞。四方來源實質一致：命令本質為「制裁」，「教訓」為審判策略。',
  },

  'wang-visits-mountain': {
    id: 'C02',
    title: '汪希苓上陽明山次數',
    perspectives: [
      {
        label: '汪希苓',
        claim: '「沒有這種事，我只上去過一次，我是情報首長，首長不會隨便上山。」',
        source: '忠與過，第一章',
      },
      {
        label: '陳啟禮',
        claim: '汪希苓上山兩次，第二次時訓令「一定要殺死，活了就麻煩了」。',
        source: '龍之火下，審判章節',
      },
    ],
    publicRecord:
      '法庭最終以殺人罪判決，間接採信陳啟禮版本。',
  },

  'sanction-order-timing': {
    id: 'C10',
    title: '制裁令下達時間',
    perspectives: [
      {
        label: '陳啟禮自白書',
        claim: '受訓前的 8 月 2 日永康街會面時已提出。',
        source: '陳啟禮自白書',
      },
      {
        label: '陳啟禮錄音帶',
        claim: '8 月 14 日在局長房間指派任務。',
        source: '陳啟禮錄音帶',
      },
      {
        label: '陳虎門／吳敦',
        claim: '8 月 15 日中午飯局上臨時提出——因為 8 月 10 日才收到崔暉報告。',
        source: '董桂森，第四章；吳敦回憶錄',
      },
    ],
    publicRecord:
      '三個日期，三種政治含義。董桂森書作者傾向 8 月 15 日版本，因 8 月 10 日的崔曄報告是關鍵觸發點。',
  },

  'mission-cancellation': {
    id: 'C13',
    title: '任務是否曾被取消',
    perspectives: [
      {
        label: '陳虎門',
        claim: '台灣時間 10 月 16 日上午，汪希苓告訴他取消任務：「如果有困難，就不要勉強，叫他們回來好了。」',
        source: '董桂森，第四章',
      },
      {
        label: '陳啟禮',
        claim: '美國時間 10 月 15 日上午已執行完畢。陳虎門剛坐下，保密電話就響——「買賣已成，送了三包禮物。」',
        source: '龍之火下；吳敦回憶錄',
      },
    ],
    publicRecord:
      '因時差，取消令與暗殺完成幾乎同時發生。陳虎門感嘆：「這個時間差，改變了台灣歷史。這就是天意。」',
  },

  'tape-recording-date': {
    id: 'C15',
    title: '保命錄音帶錄製時間',
    perspectives: [
      {
        label: '忠與過',
        claim: '錄製日期為 1984 年 10 月 17 日。',
        source: '忠與過，第十五章',
      },
      {
        label: '龍之火',
        claim: '錄製日期為 1984 年 10 月 18 日，長度 14 分鐘。',
        source: '龍之火下',
      },
      {
        label: '董桂森書',
        claim: '約 10 月 17-21 日間，在洛杉磯謝大鈴家地下室，錄了兩次（非拷貝），內容略有不同。',
        source: '董桂森，第三章',
      },
    ],
    publicRecord:
      '差異不大，可能因記憶差異或不同日期基準。董桂森書提供了最多細節。',
  },

  'yiqing-true-purpose': {
    id: 'C12',
    title: '一清專案的真正目的',
    perspectives: [
      {
        label: '官方',
        claim: '全面掃黑行動。',
        source: '官方聲明',
      },
      {
        label: '顏世錫（警政署長）',
        claim: '確認「奉令一定要先把陳啟禮逮捕之後，再正式發動其他逮捕行動」。',
        source: '忠與過，第十六章',
      },
      {
        label: '吳敦',
        claim: '「安全局原本是打算殺人滅口的，先用一清專案逮人，送到牢裡再滅口。」',
        source: '吳敦回憶錄，第八章',
      },
      {
        label: '董桂森書',
        claim: '「大汪鬥小汪」：汪敬煦意圖控管案件，把陳啟禮捏在手裡製造「案件到陳啟禮為止」的結果。',
        source: '董桂森，第四章',
      },
    ],
    publicRecord:
      '多方證據顯示陳啟禮被列為第一逮捕對象並非巧合。一清專案的雙重目的獲當事人間接確認。',
  },

  'wang-report-to-wang': {
    id: 'C11',
    title: '汪希苓是否向汪敬煦報告',
    perspectives: [
      {
        label: '汪希苓',
        claim: '暗殺完成後，於 10 月 22 日主動向安全局長汪敬煦報告。',
        source: '忠與過，第十六章',
      },
      {
        label: '汪敬煦',
        claim: '斷然否認：「沒這回事。無論江南案發生之前或之後，他都沒告訴我。」',
        source: '忠與過，第十七章',
      },
      {
        label: '蔣孝勇',
        claim: '直指汪敬煦的動機：「汪希苓你從此被打下去，你不要想來接我的位子了嘛！」',
        source: '忠與過，第十七章',
      },
    ],
    publicRecord:
      '此為全案最無法調和的矛盾。兩位當事人的陳述完全相反，且雙方都有動機說謊。',
  },

  'trial-political-performance': {
    id: 'C21',
    title: '汪希苓的審判策略 vs 訪談真相',
    perspectives: [
      {
        label: '汪希苓（法庭）',
        claim: '否認下達殺人命令，僅承認「運用」陳啟禮的錯誤。聲稱劉宜良是「有價值的運用人員」。',
        source: '忠與過，第一章',
      },
      {
        label: '汪希苓（訪談）',
        claim: '「是我下令制裁他的。」1993 年對郭冠英：「那件事不是我個人的意思，我替國家扛了起來。」',
        source: '忠與過，第十二章；董桂森書',
      },
      {
        label: '陳虎門',
        claim: '出獄後坦言：「江南案審判時，誰也沒有講實話！」',
        source: '忠與過，第十九章',
      },
    ],
    publicRecord:
      '審判由非正式五人小組幕後主導。多方來源一致證實：整個審判是政治操控的結果。',
  },

  'chiang-hsiao-wu-role': {
    id: 'C03',
    title: '蔣孝武是否為幕後主使',
    perspectives: [
      {
        label: '張安樂（1985 年）',
        claim: '公開指控：「蔣孝武命令陳啟禮暗殺了劉宜良。」',
        source: '龍之火下',
      },
      {
        label: '張安樂（日後）',
        claim: '承認是「圍魏救趙」策略：「為什麼講蔣孝武？因為我們要亂咬誰，就是誰了。」蔣孝武是冤枉的，「代父受過」。',
        source: '董桂森，第五章',
      },
      {
        label: '蔣孝武',
        claim: '發表聲明否認：「我從來沒有見過陳啟禮。」竹聯幫成員憤怒——許多人親眼看到兩人多次在一起。',
        source: '龍之火下',
      },
    ],
    publicRecord:
      '2010 年宮崎學《白狼傳》正式為蔣孝武洗冤——但已是他過世十九年後。一個名字的差錯，毀了一個人的政治生涯和人生。',
  },

  'chiang-hsiao-wu-or-hsiao-yung': {
    id: 'C22',
    title: '蔣家涉案人：蔣孝武 vs 蔣孝勇',
    perspectives: [
      {
        label: '吳敦',
        claim: '私下聽到的名字是蔣孝勇（三子），不是蔣孝武。認為白狼咬蔣孝武是策略。',
        source: '吳敦回憶錄',
      },
      {
        label: '張安樂',
        claim: '公開指控蔣孝武（次子），多年後承認這是「圍魏救趙」策略。',
        source: '董桂森，第五章',
      },
    ],
    publicRecord:
      '吳敦聽到的「蔣孝勇」與張安樂指控的「蔣孝武」之差異極為重要。蔣孝勇是陳啟禮的拜把兄弟，若其名字出現在事件脈絡中，性質完全不同。',
  },

  'dong-prison-death': {
    id: 'C04',
    title: '董桂森獄中死因',
    perspectives: [
      {
        label: '梁東屏（調查記者）',
        claim: '經半個月追蹤重建：馬來西亞籍囚犯蔡漢茂詐騙黑人囚犯，黑人帶自製尖刀尋仇，董桂森上前勸阻時被誤傷，尖刀正中心臟。',
        source: '董桂森，第十章',
      },
      {
        label: '董母萬玉芳',
        claim: '深信是被謀殺：「他身強力壯……為什麼身上全都沒有傷？……為什麼一刀致命？」',
        source: '董桂森，第十章',
      },
      {
        label: '台灣傳言',
        claim: '國民黨派人入獄滅口。',
        source: '公開傳聞',
      },
    ],
    publicRecord:
      '官方說法為「獄中鬥毆」。梁東屏的調查為唯一深入追蹤，「意外被刺」說法最為詳盡，但董母的質疑也合理。',
  },

  'chiang-ching-kuo-knowledge': {
    id: 'C14',
    title: '蔣經國是否事前知情',
    perspectives: [
      {
        label: '汪希苓',
        claim: '多次訪談暗示「不是個人意思，我替國家扛了起來」，但從未直接點名。',
        source: '忠與過；董桂森書',
      },
      {
        label: '陳虎門',
        claim: '「敢打包票，殺江南不是蔣經國的意思。」',
        source: '董桂森，第五章',
      },
      {
        label: '陳啟禮',
        claim: '在金邊說「什麼蔣孝武，根本就是蔣經國」——但被判斷為「意氣揣測之詞」。',
        source: '董桂森，第五章',
      },
    ],
    publicRecord:
      '無直接證據顯示蔣經國事前知情。官方定性為汪希苓個人行為。此為全案最大懸案。',
  },
}

export function getContradiction(slug: string): Contradiction | undefined {
  return contradictions[slug]
}

export default contradictions
