/** Character group categories with display colors */
export type CharacterGroup =
  | 'victim'
  | 'bamboo-union'
  | 'intelligence'
  | 'chiang-family'
  | 'investigation'
  | 'family'
  | 'international'

export const groupMeta: Record<
  CharacterGroup,
  { label: string; color: string; bgColor: string }
> = {
  victim: { label: '受害者', color: '#c23b22', bgColor: '#c23b2220' },
  'bamboo-union': { label: '竹聯幫', color: '#2d2a26', bgColor: '#2d2a2615' },
  intelligence: { label: '情治機關', color: '#4a6570', bgColor: '#4a657015' },
  'chiang-family': { label: '蔣家', color: '#b8943e', bgColor: '#b8943e20' },
  investigation: { label: '調查者', color: '#4a6fa5', bgColor: '#4a6fa520' },
  family: { label: '家屬', color: '#a0785a', bgColor: '#a0785a20' },
  international: { label: '國際', color: '#8b7d6b', bgColor: '#8b7d6b20' },
}

export type RelationType =
  | 'spouse'
  | 'parent'
  | 'sibling'
  | 'handler'
  | 'subordinate'
  | 'sworn-brother'
  | 'adversary'
  | 'associate'
  | 'recruited'
  | 'liaison'
  | 'mentor'
  | 'partner'
  | 'accusation'
  | 'investigation'
  | 'encounter'

export interface CharacterRelation {
  target: string
  type: RelationType
  description: string
}

export interface Character {
  id: string
  nameCht: string
  nameEng: string | null
  aliases: string[]
  role: string
  group: CharacterGroup
  birth: string | null
  death: string | null
  description: string
  relationships: CharacterRelation[]
}

/**
 * Core characters for the interactive relationship map.
 * Subset of docs/extracted/characters.json — only characters
 * central enough to display on the radial map.
 */
export const coreCharacters: Character[] = [
  {
    id: 'liu-yi-liang',
    nameCht: '劉宜良',
    nameEng: 'Henry Liu',
    aliases: ['江南'],
    role: '受害者、作家、記者',
    group: 'victim',
    birth: '1932-12-07',
    death: '1984-10-15',
    description:
      '旅美華裔作家，筆名「江南」，著有未授權《蔣經國傳》。曾為情報局線人，同時與 FBI 及中共均有接觸。1984 年在加州 Daly City 自宅車庫遭暗殺。',
    relationships: [
      { target: 'cui-rong-zhi', type: 'spouse', description: '妻子' },
      {
        target: 'wang-hsi-ling',
        type: 'adversary',
        description: '情報局局長，下令制裁',
      },
    ],
  },
  {
    id: 'chen-qi-li',
    nameCht: '陳啟禮',
    nameEng: 'Chen Chi-li',
    aliases: ['旱鴨子'],
    role: '竹聯幫幫主、行動統籌者',
    group: 'bamboo-union',
    birth: '1943',
    death: '2007-10-04',
    description:
      '竹聯幫幫主，被汪希苓吸收為情報員。受命統籌暗殺行動，事後錄製「保命錄音帶」成為案件曝光關鍵證據。',
    relationships: [
      { target: 'wang-hsi-ling', type: 'handler', description: '被吸收為情報員' },
      { target: 'wu-dun', type: 'sworn-brother', description: '義兄弟' },
      { target: 'dong-gui-sen', type: 'subordinate', description: '忠堂堂主' },
      { target: 'chen-hu-men', type: 'liaison', description: '情報局聯絡人' },
      {
        target: 'chiang-hsiao-yung',
        type: 'sworn-brother',
        description: '拜把兄弟',
      },
    ],
  },
  {
    id: 'wu-dun',
    nameCht: '吳敦',
    nameEng: null,
    aliases: ['鬼見愁'],
    role: '竹聯幫總護法、開第一槍者',
    group: 'bamboo-union',
    birth: '1949',
    death: '2026-02-03',
    description:
      '竹聯幫總護法，陳啟禮的得力助手。在車庫中開出第一槍（擊中頭部）。2026 年辭世。',
    relationships: [
      { target: 'chen-qi-li', type: 'sworn-brother', description: '一生追隨的大哥' },
      { target: 'dong-gui-sen', type: 'partner', description: '暗殺行動搭檔' },
    ],
  },
  {
    id: 'dong-gui-sen',
    nameCht: '董桂森',
    nameEng: null,
    aliases: ['小董'],
    role: '竹聯幫忠堂堂主、補槍者',
    group: 'bamboo-union',
    birth: '1952',
    death: '1991-04-03',
    description:
      '竹聯幫忠堂堂主，被臨時召入暗殺行動。案發後逃亡，在美國聯邦監獄中因勸阻鬥毆被誤刺身亡。',
    relationships: [
      { target: 'chen-qi-li', type: 'subordinate', description: '被提拔為忠堂堂主' },
      { target: 'wu-dun', type: 'partner', description: '暗殺行動搭檔' },
      { target: 'zhang-an-le', type: 'associate', description: '案發前住在張安樂家' },
    ],
  },
  {
    id: 'wang-hsi-ling',
    nameCht: '汪希苓',
    nameEng: 'Wang Hsi-ling',
    aliases: ['小汪'],
    role: '情報局局長、暗殺計畫主謀',
    group: 'intelligence',
    birth: '1929',
    death: null,
    description:
      '海軍中將，情報局長。直接承認「是我下令制裁他的」。1985 年被判無期徒刑，1991 年出獄。',
    relationships: [
      { target: 'chiang-ching-kuo', type: 'subordinate', description: '蔣經國四次破格任用' },
      { target: 'chen-qi-li', type: 'recruited', description: '吸收為情報員' },
      { target: 'chen-hu-men', type: 'subordinate', description: '第三處副處長' },
      { target: 'hu-yi-min', type: 'subordinate', description: '情報局副局長' },
    ],
  },
  {
    id: 'chen-hu-men',
    nameCht: '陳虎門',
    nameEng: null,
    aliases: ['虎哥'],
    role: '情報局第三處副處長、訓練官',
    group: 'intelligence',
    birth: null,
    death: null,
    description:
      '負責陳啟禮的陽明山受訓及暗殺任務聯絡協調。判刑兩年六個月，出獄後重返情報局。',
    relationships: [
      { target: 'wang-hsi-ling', type: 'subordinate', description: '直屬上司' },
      { target: 'chen-qi-li', type: 'liaison', description: '暗殺行動聯絡人' },
    ],
  },
  {
    id: 'chiang-ching-kuo',
    nameCht: '蔣經國',
    nameEng: 'Chiang Ching-kuo',
    aliases: [],
    role: '中華民國總統',
    group: 'chiang-family',
    birth: '1910',
    death: '1988-01-13',
    description:
      '中華民國總統，情治系統的建構者。江南案後宣布蔣家人不再接班，下令解嚴及情報機構改組。',
    relationships: [
      { target: 'wang-hsi-ling', type: 'subordinate', description: '四次破格任用' },
      { target: 'chiang-hsiao-wu', type: 'parent', description: '次子' },
      { target: 'chiang-hsiao-yung', type: 'parent', description: '三子' },
    ],
  },
  {
    id: 'chiang-hsiao-wu',
    nameCht: '蔣孝武',
    nameEng: 'Chiang Hsiao-wu',
    aliases: [],
    role: '蔣經國次子，被指控幕後主使',
    group: 'chiang-family',
    birth: '1945-04-25',
    death: '1991-07-01',
    description:
      '蔣經國次子。張安樂指控其為幕後主使，後承認為「圍魏救趙」策略。1991 年突然去世。',
    relationships: [
      { target: 'chiang-ching-kuo', type: 'parent', description: '父親' },
      { target: 'zhang-an-le', type: 'adversary', description: '被張安樂指控' },
    ],
  },
  {
    id: 'chiang-hsiao-yung',
    nameCht: '蔣孝勇',
    nameEng: 'Chiang Hsiao-yung',
    aliases: ['三太子'],
    role: '蔣經國三子',
    group: 'chiang-family',
    birth: '1948',
    death: '1996-12-22',
    description:
      '蔣經國三子，與陳啟禮為拜把兄弟。吳敦回憶錄透露私下聽到涉案的蔣家人名字是蔣孝勇而非蔣孝武。',
    relationships: [
      { target: 'chiang-ching-kuo', type: 'parent', description: '父親' },
      { target: 'chen-qi-li', type: 'sworn-brother', description: '拜把兄弟' },
    ],
  },
  {
    id: 'cui-rong-zhi',
    nameCht: '崔蓉芝',
    nameEng: 'Helen Liu',
    aliases: ['海倫'],
    role: '劉宜良妻子',
    group: 'family',
    birth: '1943',
    death: null,
    description:
      '劉宜良之妻。案發後在國會聽證會作證，1990 年與中華民國政府和解獲 145 萬美元賠償。',
    relationships: [
      { target: 'liu-yi-liang', type: 'spouse', description: '丈夫' },
    ],
  },
  {
    id: 'zhang-an-le',
    nameCht: '張安樂',
    nameEng: null,
    aliases: ['白狼'],
    role: '竹聯幫在美高層',
    group: 'bamboo-union',
    birth: null,
    death: null,
    description:
      '竹聯幫要角。陳啟禮出發前將保命錄音帶交其保管。公開指控蔣孝武後承認為「圍魏救趙」策略。',
    relationships: [
      { target: 'chen-qi-li', type: 'sworn-brother', description: '竹聯兄弟' },
      { target: 'dong-gui-sen', type: 'associate', description: '董案發前住其家中' },
      { target: 'chiang-hsiao-wu', type: 'accusation', description: '指控後又撤回' },
    ],
  },
  {
    id: 'hu-yi-min',
    nameCht: '胡儀敏',
    nameEng: null,
    aliases: [],
    role: '情報局副局長',
    group: 'intelligence',
    birth: null,
    death: null,
    description:
      '情報局副局長（少將），參與暗殺計畫。汪希苓繞開不支持計畫的副局長荊自立，改用胡儀敏。',
    relationships: [
      { target: 'wang-hsi-ling', type: 'subordinate', description: '汪希苓下屬' },
    ],
  },
  {
    id: 'tony-lau',
    nameCht: '劉善謙',
    nameEng: 'Tony Lau',
    aliases: [],
    role: 'FBI 反間諜特工',
    group: 'investigation',
    birth: null,
    death: null,
    description:
      'FBI 反間諜特工。深夜接到線報後主導調查，鎖定竹聯幫。兩度赴台審問嫌犯。',
    relationships: [],
  },
]

/** Quick lookup by character id */
export const characterById = new Map(
  coreCharacters.map((c) => [c.id, c]),
)
