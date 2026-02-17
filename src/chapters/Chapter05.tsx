import ChapterTitle from '../components/narrative/ChapterTitle'
import Citation from '../components/narrative/Citation'
import ContradictionBox from '../components/narrative/ContradictionBox'
import DossierCard from '../components/narrative/DossierCard'
import ScrollSection from '../components/narrative/ScrollSection'
import TapeRecorderScene from '../components/pixel/scenes/TapeRecorderScene'
import { getContradiction } from '../data/contradictions'

const tapeContradiction = getContradiction('tape-recording-date')!
const yiqingContradiction = getContradiction('yiqing-true-purpose')!
const wangReportContradiction = getContradiction('wang-report-to-wang')!

/**
 * 第五章：紙包不住火
 * 時間：1984.10-1985
 * 破案經過、陳啟禮錄音帶、一清專案。
 */
export default function Chapter05() {
  return (
    <article id="chapter-05">
      <ChapterTitle chapter={5} title="紙包不住火" />

      {/* 國民黨的第一反應、陳啟禮的保命錄音帶 */}
      <ScrollSection>
        {() => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">
              <h3 className="mt-8 text-xl font-bold text-ink-800">國民黨的第一反應</h3>

              <p className="leading-relaxed text-ink-700">
                槍聲響起兩天後，1984 年 10 月 17 日，台北軍官俱樂部召開一場秘密會議。與會者均為黨內高層，議程名為「文化戰爭」——這是他們給這場危機貼上的標籤。張景禹建議對外界的批評展開誹謗訴訟，宋楚瑜則直白地提出：「新聞檢查必須有效地擴大和進行。」
              </p>
              <Citation source="龍之火下" reference="L.3433-3505" />

              <p className="leading-relaxed text-ink-700">
                暗殺發生在美國土地上，受害者是美國公民。消息一旦擴散，外交壓力將難以承受。黨內高層的第一反應，是如何壓制消息，而非如何面對事實。
              </p>

              <h3 className="mt-8 text-xl font-bold text-ink-800">陳啟禮的保命錄音帶</h3>

              <p className="leading-relaxed text-ink-700">
                遠在洛杉磯的陳啟禮，早已嗅到危險。竹聯幫幹部張安樂（白狼）向他發出警告：「過河拆橋」。情報局用完他們，會把一切推到竹聯幫身上。陳啟禮決定留下一份保命證據。
              </p>

              <DossierCard title="陳啟禮錄音帶（摘要）" className="my-4">
                <p className="font-mono text-sm leading-relaxed text-ink-800">
                  「作家江南本名劉宜良……」
                </p>
                <p className="mt-3 font-mono text-sm leading-relaxed text-ink-800">
                  「1984 年 8 月 14 日在陽明山……局長房間指派任務……」
                </p>
                <p className="mt-3 leading-relaxed text-ink-700">
                  10 月 17 至 18 日之間，在洛杉磯謝大鈴家的地下室，陳啟禮錄下兩份內容略有不同的錄音帶——非複製品，而是兩次重新錄製。他在帶中詳述汪希苓如何指派任務、情報局如何介入整個計畫，讓磁帶成為他與情報系統之間唯一的籌碼。
                </p>
                <Citation source="龍之火下" className="mt-2 block" />
                <Citation source="董桂森" reference="第三章" className="mt-1 block" />
              </DossierCard>

              <p className="leading-relaxed text-ink-700">
                兩份錄音帶分別流向不同方向：一份交給吳敦轉交皮繼昂（後來被銷毀），另一份交給黃鳥，輾轉送到張安樂手中。這張帶子，將在三個月後引爆整個事件。
              </p>

              <ContradictionBox
                title={tapeContradiction.title}
                perspectives={tapeContradiction.perspectives}
                publicRecord={tapeContradiction.publicRecord}
                className="mt-6"
              />
            </div>
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: tape-recorder — 陳啟禮地下室錄音 */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <TapeRecorderScene progress={progress} className="max-w-3xl" />
          </div>
        )}
      </ScrollSection>

      {/* Infographic: investigation-flowchart */}
      <ScrollSection>
        {() => (
          <div className="mx-auto max-w-4xl px-4 py-16">
            {/* TODO: Task 4.6 — InvestigationFlowchart */}
            <div className="text-center text-neutral">
              <p className="text-sm">[investigation-flowchart infographic]</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 一清專案、錄音帶曝光、董桂森逃亡 */}
      <ScrollSection>
        {() => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">
              <h3 className="mt-8 text-xl font-bold text-ink-800">FBI 介入</h3>

              <p className="leading-relaxed text-ink-700">
                1984 年 10 月 22 日，舊金山唐人街假日酒店。竹聯幫成員阮大方與李乃義與 FBI 幹員 Tony Lau 會面。這是美方正式介入調查的起點。兩週後，11 月 22 日，皮繼昂在舊金山落網，成為被捕的第一人——他的口供，讓調查人員得以確認兩名槍手的身分。
              </p>
              <Citation source="龍之火下" reference="L.3764-3974" />

              <h3 className="mt-8 text-xl font-bold text-ink-800">一清專案</h3>

              <p className="leading-relaxed text-ink-700">
                1984 年 11 月 12 日，台灣史上規模最大的掃黑行動正式展開。陳啟禮落網時高聲呼喊，表明自己是情報局人員——他以為這層身分能保他平安。警方在他身上搜出一本筆記，內容是他對整個任務的親筆供述。
              </p>

              <ContradictionBox
                title={yiqingContradiction.title}
                perspectives={yiqingContradiction.perspectives}
                publicRecord={yiqingContradiction.publicRecord}
                className="mt-2"
              />

              <h3 className="mt-8 text-xl font-bold text-ink-800">「兩汪之爭」</h3>

              <p className="leading-relaxed text-ink-700">
                案發後，情報局長汪希苓與安全局長汪敬煦之間爆發了一場權力角力。蔣經國曾承諾汪希苓三年後接任安全局長，汪敬煦對此深感威脅。案件走向，直接牽動兩人的政治命運。
              </p>

              <ContradictionBox
                title={wangReportContradiction.title}
                perspectives={wangReportContradiction.perspectives}
                publicRecord={wangReportContradiction.publicRecord}
                className="mt-2"
              />

              <h3 className="mt-8 text-xl font-bold text-ink-800">錄音帶曝光</h3>

              <p className="leading-relaxed text-ink-700">
                1985 年 1 月 13 日，紐約林肯廣場酒店 707 號房。張安樂將陳啟禮的錄音帶親手交給 FBI。連鎖反應在一兩天內發生：1 月 14 至 15 日，帶子的存在被證實，整個政治架構在此刻開始崩塌。
              </p>
              <Citation source="龍之火下" reference="L.4430-4557" />

              <DossierCard className="my-4">
                <p className="font-mono text-sm leading-relaxed text-ink-800">
                  「白狼在 707 號房，把帶子遞出去的那一刻，陳啟禮布下的最後一張牌，終於翻面。」
                </p>
                <p className="mt-2 text-sm text-neutral">— 根據龍之火下記載重構</p>
              </DossierCard>

              <h3 className="mt-8 text-xl font-bold text-ink-800">董桂森的逃亡</h3>

              <p className="leading-relaxed text-ink-700">
                另一名槍手董桂森，沒有等到錄音帶被交出去的那一天。1984 年 12 月 30 日，他悄悄離開台灣。逃亡路線橫跨半個地球：菲律賓、泰國、新加坡，最後落腳巴西。在那裡，他以為可以隱身。
              </p>

              <p className="leading-relaxed text-ink-700">
                1985 年 9 月 20 日，里約熱內盧。巴西警方將他逮捕。一場從 Daly City 車庫開始的逃亡，在南美洲的夏天畫下句點。
              </p>
              <Citation source="龍之火下" className="block" />
              <Citation source="董桂森" reference="第六、七章" className="mt-1 block" />
            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
