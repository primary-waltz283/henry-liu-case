import ChapterTitle from '../components/narrative/ChapterTitle'
import Citation from '../components/narrative/Citation'
import ContradictionBox from '../components/narrative/ContradictionBox'
import DossierCard from '../components/narrative/DossierCard'
import ScrollSection from '../components/narrative/ScrollSection'
import DualTrialComparison from '../components/infographic/DualTrialComparison'
import PrisonFadeScene from '../components/pixel/scenes/PrisonFadeScene'
import { getContradiction } from '../data/contradictions'

const trialContradiction = getContradiction('trial-political-performance')!
const chiangWuContradiction = getContradiction('chiang-hsiao-wu-role')!
const chiangSonContradiction = getContradiction('chiang-hsiao-wu-or-hsiao-yung')!
const dongDeathContradiction = getContradiction('dong-prison-death')!

/**
 * 第六章：審判與餘波
 * 時間：1985-1991
 * 台美審判、蔣孝武之謎、董桂森獄中身亡。
 */
export default function Chapter06() {
  return (
    <article id="chapter-06">
      <ChapterTitle chapter={6} title="審判與餘波" />

      {/* 美國調查團赴台、台灣軍事審判 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">
              <h3 className="mt-8 text-xl font-bold text-ink-800">美國調查團赴台</h3>

              <p className="leading-relaxed text-ink-700">
                1985 年 1 月 22 日，FBI 幹員 Ries 與劉善謙飛抵台灣。台灣方面的接待者是軍事保防局長王景旭，他為兩人提供「簡報」，卻並非實質合作。FBI 對陳啟禮展開三次訊問，累計六小時，陳始終拒絕說出幕後指使者的名字；吳敦則聲稱一切純屬「意外」。兩人接受測謊，結果均未通過。
              </p>
              <Citation source="龍之火下" reference="L.4564-4700" />

              <p className="leading-relaxed text-ink-700">
                三月，美方加派一支十人小組赴台，直接對汪希苓展開訊問。談判桌上，美方祭出最直接的籌碼：若台方不配合，軍售合約將面臨中斷。汪希苓在壓力下，將責任全數推給陳啟禮。
              </p>

              <DossierCard className="my-4">
                <p className="font-mono text-sm leading-relaxed text-ink-800">
                  劉善謙駁斥汪希苓的說詞：「沒有一個華人會用年輕人去給長者上課。」
                </p>
                <p className="mt-2 text-sm text-neutral">— 根據龍之火下記載</p>
              </DossierCard>

              <p className="leading-relaxed text-ink-700">
                汪希苓的測謊結果顯示「飆出圖表」。美方調查人員清楚知道他們得到的是什麼——但正式外交文件中，這些結論被措辭謹慎地包裹起來。
              </p>
              <Citation source="龍之火下" reference="L.4700-4860" />

              <h3 className="mt-8 text-xl font-bold text-ink-800">台灣軍事審判</h3>

              <p className="leading-relaxed text-ink-700">
                1985 年 4 月 19 日，台灣軍事法庭宣判。汪希苓、陳啟禮、吳敦各判無期徒刑，胡儀敏與陳虎門各判兩年半。法庭在判決書中刻意迴避「政治暗殺」的定性，改以「教訓失控」為框架。
              </p>

              <DossierCard title="判決速覽" className="my-4">
                <ul className="space-y-2 font-mono text-sm text-ink-800">
                  <li>汪希苓（情報局長）— 無期徒刑</li>
                  <li>陳啟禮（竹聯幫首領）— 無期徒刑</li>
                  <li>吳敦（執行者）— 無期徒刑</li>
                  <li>胡儀敏（聯絡人）— 兩年六個月</li>
                  <li>陳虎門（聯絡人）— 兩年六個月</li>
                </ul>
              </DossierCard>

              <p className="leading-relaxed text-ink-700">
                在台灣任職的美國外交官崔蓉芝（劉宜良之妻）的律師崔榮志一針見血：「搶劫犯經常被判死刑，這些判決太輕了。」對許多觀察者而言，判決的輕重不是重點，整場審判的設計，才是。
              </p>
              <Citation source="龍之火下" reference="L.4870-4945" />

              <ContradictionBox
                title={trialContradiction.title}
                perspectives={trialContradiction.perspectives}
                publicRecord={trialContradiction.publicRecord}
                className="mt-6"
              />
            </div>
          </div>
        )}
      </ScrollSection>

      {/* Infographic: dual-trial-comparison */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-4xl px-4 py-16">
            <DualTrialComparison />
          </div>
        )}
      </ScrollSection>

      {/* 蔣孝武之謎、美國審判 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">
              <h3 className="mt-8 text-xl font-bold text-ink-800">蔣孝武之謎</h3>

              <p className="leading-relaxed text-ink-700">
                1985 年 3 月 1 日，張安樂（白狼）在公開場合點名指控：「蔣孝武命令陳啟禮暗殺了劉宜良。」蔣孝武隨即發表聲明否認，稱自己從未見過陳啟禮。但竹聯幫成員對這份聲明感到憤怒——許多人親眼目睹兩人多次同桌。
              </p>

              <ContradictionBox
                title={chiangWuContradiction.title}
                perspectives={chiangWuContradiction.perspectives}
                publicRecord={chiangWuContradiction.publicRecord}
                className="mt-2"
              />

              <p className="leading-relaxed text-ink-700">
                多年後，張安樂在採訪中坦承，公開指控蔣孝武是一種「圍魏救趙」策略：「為什麼講蔣孝武？因為我們要亂咬誰，就是誰了。」他認為蔣孝武是冤枉的，是「代父受過」。吳敦在私下場合則提到，他當時聽到的名字，是蔣孝勇（三子），而非蔣孝武。
              </p>

              <ContradictionBox
                title={chiangSonContradiction.title}
                perspectives={chiangSonContradiction.perspectives}
                publicRecord={chiangSonContradiction.publicRecord}
                className="mt-2"
              />

              <h3 className="mt-8 text-xl font-bold text-ink-800">美國法庭審判</h3>

              <p className="leading-relaxed text-ink-700">
                1986 年 7 月 28 日至 9 月 22 日，紐約聯邦法庭展開 RICO（勒索罪及腐敗組織）法案審判。判決結果：黃鳥被判二十年、董桂森被判二十年（毒品罪）、張安樂十五年、向八景十年。
              </p>

              <p className="leading-relaxed text-ink-700">
                1988 年，加州法庭對董桂森作出第二次判決：一級謀殺罪，二十七年有期徒刑。法官在宣判時留下一句話，成為整案最清醒的法律定性：
              </p>

              <DossierCard className="my-4">
                <p className="font-mono text-sm leading-relaxed text-ink-800">
                  「這不是個人的行為……而是政府的行為。」
                </p>
                <p className="mt-2 text-sm text-neutral">— 加州法庭，1988 年判決</p>
              </DossierCard>

              <h3 className="mt-8 text-xl font-bold text-ink-800">崔蓉芝與董桂森的會面</h3>

              <p className="leading-relaxed text-ink-700">
                1986 年，劉宜良的遺孀崔蓉芝設法安排了一次與董桂森的獄中會面。她想知道，那個清晨車庫裡，究竟發生了什麼。董桂森對她說了「對不起」。但她沒有得到她真正想要的答案。
              </p>

              <h3 className="mt-8 text-xl font-bold text-ink-800">民事訴訟</h3>

              <p className="leading-relaxed text-ink-700">
                1985 年 10 月，崔蓉芝對中華民國政府提起民事訴訟，索賠兩億五千萬美元。1989 年，第九巡迴上訴法院裁定：暗殺行為不屬於主權豁免範圍。1990 年，雙方達成庭外和解，金額為一百四十五萬美元。
              </p>

              <p className="leading-relaxed text-ink-700">
                和解附帶一個條件，被寫入協議：崔蓉芝不得將此案改編為電影或小說。
              </p>
              <Citation source="龍之火下" />
            </div>
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: prison-fade */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <PrisonFadeScene progress={progress} className="max-w-3xl" />
          </div>
        )}
      </ScrollSection>

      {/* 董桂森之死、民事和解、大赦結局 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">
              <h3 className="mt-8 text-xl font-bold text-ink-800">董桂森之死</h3>

              <p className="leading-relaxed text-ink-700">
                1991 年 2 月 21 日，賓州路易斯堡聯邦監獄。一場囚犯之間的爭鬥，以意外的方式捲入了董桂森。據調查記者梁東屏歷時半個月的追蹤重建：馬來西亞籍囚犯蔡漢茂詐騙了一名黑人囚犯，對方持自製尖刀前來尋仇。董桂森上前勸阻，尖刀正中心臟。他用手按住傷口，走出了幾步，然後倒地。
              </p>

              <Citation source="董桂森" reference="第十章" />

              <ContradictionBox
                title={dongDeathContradiction.title}
                perspectives={dongDeathContradiction.perspectives}
                publicRecord={dongDeathContradiction.publicRecord}
                className="mt-2"
              />

              <p className="leading-relaxed text-ink-700">
                張安樂在事後沉默良久，才說出一句話：「如果不是因為毒品案……」他沒有說完。董桂森死時四十歲。
              </p>

              <h3 className="mt-8 text-xl font-bold text-ink-800">1991 年大赦——各人的結局</h3>

              <p className="leading-relaxed text-ink-700">
                同年，台灣政府陸續釋放在台服刑的涉案人員。各人此後的命運，走向了截然不同的方向。
              </p>

              <DossierCard title="涉案人員後記" className="my-4">
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-bold text-ink-800">陳啟禮</p>
                    <p className="mt-1 leading-relaxed text-ink-700">
                      出獄後皈依佛教，流亡柬埔寨。2007 年病逝金邊，未能返台。
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-ink-800">吳敦</p>
                    <p className="mt-1 leading-relaxed text-ink-700">
                      轉入台灣電影產業，以製片人身分活躍。2026 年 2 月 3 日辭世。
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-ink-800">汪希苓</p>
                    <p className="mt-1 leading-relaxed text-ink-700">
                      獲特赦後公開表示：「讓過去的永遠成為過去。」此後幾乎不接受採訪。
                    </p>
                  </div>
                  <div>
                    <p className="font-bold text-ink-800">陳虎門</p>
                    <p className="mt-1 leading-relaxed text-ink-700">
                      服滿兩年半刑期後重返情報系統，日後晉升陸軍少將。
                    </p>
                  </div>
                </div>
              </DossierCard>

              <p className="leading-relaxed text-ink-700">
                1984 年 10 月 15 日清晨，Daly City 車庫的三聲槍響，在此後七年間，以審判、外交折衝、獄中會面、和解協議、一份永遠沉默的保密協定，逐漸沉入歷史的褶縫。那些仍然活著的人，各自帶著各自的版本，繼續過日子。
              </p>
            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
