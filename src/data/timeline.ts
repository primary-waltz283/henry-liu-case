export interface TimelinePerspective {
  speaker: string
  quote: string
}

export interface TimelineEvent {
  /** ISO date (YYYY-MM-DD) */
  date: string
  /** Time of day (HH:MM), if known */
  time?: string
  /** Display label for the date/time row */
  dateLabel: string
  title: string
  description: string
  sources: string[]
  significance: 'background' | 'turning-point' | 'critical'
  /** Optional multi-perspective quotes */
  perspectives?: TimelinePerspective[]
  /** Whether this event marks a contradiction */
  isContradiction?: boolean
}

/**
 * Curated events for the 48-hour timeline infographic (Oct 13–15, 1984).
 * Data extracted from docs/extracted/timeline.json.
 */
export const fortyEightHourEvents: TimelineEvent[] = [
  {
    date: '1984-10-13',
    dateLabel: '10 月 13 日',
    title: '董桂森抵達舊金山',
    description:
      '小皮帶董桂森從洛杉磯到舊金山，石頭火鍋店接風。陳啟禮出示情報員證件，稱劉為「漢奸」。',
    sources: ['董桂森, 第二章', '吳敦回憶錄, 第二章'],
    significance: 'critical',
    perspectives: [
      {
        speaker: '董桂森',
        quote: '「自然願意替國家去做這件事。」',
      },
    ],
  },
  {
    date: '1984-10-14',
    dateLabel: '10 月 14 日',
    title: '暗殺前夜',
    description:
      '陳啟禮帶隊最後踩點確認江南在家。小皮到藝品店確認江南身分。',
    sources: ['吳敦回憶錄, 第二章', '龍之火下, L.3383'],
    significance: 'critical',
  },
  {
    date: '1984-10-14',
    dateLabel: '10 月 14 日深夜',
    title: '曇花盛開',
    description:
      '劉宜良與鄰居李乃義聊天至深夜，院中曇花盛開。這是他生命中的最後一個夜晚。',
    sources: ['龍之火下, L.3383'],
    significance: 'turning-point',
  },
  {
    date: '1984-10-15',
    time: '09:20',
    dateLabel: '10 月 15 日 上午 9:20',
    title: '三聲槍響',
    description:
      '劉宜良在 Daly City 自宅車庫遭吳敦、董桂森槍殺。中三槍：頭部一槍（致命）、腹部兩槍。死亡時間：上午九時五十八分。',
    sources: [
      '吳敦回憶錄, 序曲/第二章',
      '董桂森, 第一章',
      '龍之火下, L.3383-3423',
    ],
    significance: 'critical',
    perspectives: [
      {
        speaker: '吳敦',
        quote:
          '「眼神才剛對接就扣下扳機。一槍斃命，無對話無扭打。」',
      },
      {
        speaker: '董桂森',
        quote:
          '「老鴨不遠千里把我找來，結果被吳敦偷了先機。於是我又朝倒在地上的人腹部開了兩槍。」',
      },
      {
        speaker: 'Kaplan',
        quote:
          '「吳從柱子後閃出用槍頂住劉的頭開槍。第一槍擊中鼻子右側深入大腦。」',
      },
    ],
  },
  {
    date: '1984-10-15',
    dateLabel: '10 月 15 日',
    title: '崔蓉芝指控蔣經國',
    description:
      '崔蓉芝從書架取出《蔣經國傳》，指封面人物稱「殺害我丈夫的就是這個人」。同時透露劉替 FBI 蒐集情報。',
    sources: ['龍之火上, L.600-715'],
    significance: 'critical',
  },
  {
    date: '1984-10-15',
    dateLabel: '10 月 15 日（美國時間）\n10 月 16 日（台灣時間）',
    title: '取消令 vs 買賣已成',
    description:
      '台灣時間 10 月 16 日上午，汪希苓下達取消令。陳虎門剛坐下，保密電話就響了——「買賣已成，送了三包禮物。」時差讓取消令與暗殺完成幾乎同時抵達。',
    sources: ['董桂森, 第四章', '吳敦回憶錄, 將軍口述', '忠與過, 第十五章'],
    significance: 'critical',
    isContradiction: true,
    perspectives: [
      {
        speaker: '陳虎門',
        quote: '「這個時間差，改變了台灣歷史。這就是天意。」',
      },
    ],
  },
]
