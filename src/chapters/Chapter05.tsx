import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'

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
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容將從 data/chapters/ch05.json 引入 */}
            {/* 矛盾：tape-recording-date */}
          </div>
        )}
      </ScrollSection>

      {/* Infographic: investigation-flowchart */}
      <ScrollSection>
        {(_progress) => (
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
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 矛盾：yiqing-true-purpose, wang-report-to-wang */}
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
