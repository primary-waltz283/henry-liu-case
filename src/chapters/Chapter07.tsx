import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'

/**
 * 第七章：解嚴之路
 * 時間：1985-2025
 * 對台灣民主化的影響、未解之謎。
 */
export default function Chapter07() {
  return (
    <article id="chapter-07">
      <ChapterTitle chapter={7} title="解嚴之路" />

      {/* 政治海嘯、蔣家王朝的終結、解嚴 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容將從 data/chapters/ch07.json 引入 */}
          </div>
        )}
      </ScrollSection>

      {/* Infographic: causality-chain */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-4xl px-4 py-16">
            {/* TODO: Task 4.6 — CausalityChain */}
            <div className="text-center text-neutral">
              <p className="text-sm">[causality-chain infographic]</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 吳敦的最後證言、五大未解之謎 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 矛盾：chiang-ching-kuo-knowledge */}
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
