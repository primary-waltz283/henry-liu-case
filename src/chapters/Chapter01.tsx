import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'

/**
 * 第一章：龍的爪牙
 * 時間：1949-1980
 * 蔣家王朝與情治系統、海外間諜網。
 */
export default function Chapter01() {
  return (
    <article id="chapter-01">
      <ChapterTitle chapter={1} title="龍的爪牙" stamp="機密" />

      {/* 韓戰與台灣命運、蔣經國的安全帝國 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容將從 data/chapters/ch01.json 引入 */}
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: spy-network */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            {/* TODO: Task 4.7 — SpyNetworkScene pixel art */}
            <div className="text-center text-neutral">
              <p className="text-sm">[spy-network pixel art scene]</p>
              <p className="text-xs">progress: {progress.toFixed(2)}</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* Infographic: intelligence-org-chart */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-4xl px-4 py-16">
            {/* TODO: Task 4.6 — IntelligenceOrgChart */}
            <div className="text-center text-neutral">
              <p className="text-sm">[intelligence-org-chart infographic]</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 汪希苓登場 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 汪希苓背景與伏筆 */}
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
