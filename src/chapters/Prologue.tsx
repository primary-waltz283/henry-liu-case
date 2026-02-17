import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'

/**
 * 序章：車庫裡的槍聲
 * 時間：1984.10.15
 * 倒敘開場，以秒為單位推進。
 */
export default function Prologue() {
  return (
    <article id="prologue" className="relative">
      <ChapterTitle chapter={0} title="車庫裡的槍聲" stamp="極機密" />

      {/* 環境建立 — Daly City 清晨 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容將從 data/chapters/prologue.json 引入 */}
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: garage-shot */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            {/* TODO: Task 4.7 — GarageShotScene pixel art */}
            <div className="text-center text-neutral">
              <p className="text-sm">[garage-shot pixel art scene]</p>
              <p className="text-xs">progress: {progress.toFixed(2)}</p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* 撤離與餘波 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            {/* 敘事內容：三聲槍響、撤離、「買賣已成」 */}
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
