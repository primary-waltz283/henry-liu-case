import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'
import Citation from '../components/narrative/Citation'
import ContradictionBox from '../components/narrative/ContradictionBox'
import DossierCard from '../components/narrative/DossierCard'
import MissionClockScene from '../components/pixel/scenes/MissionClockScene'
import FortyEightHourTimeline from '../components/infographic/FortyEightHourTimeline'
import ContradictionTable from '../components/infographic/ContradictionTable'
import { getContradiction } from '../data/contradictions'

const meetingContradiction = getContradiction('wang-chen-first-meeting')!
const disciplineContradiction = getContradiction('discipline-or-sanction')!
const mountainContradiction = getContradiction('wang-visits-mountain')!
const timingContradiction = getContradiction('sanction-order-timing')!
const cancellationContradiction = getContradiction('mission-cancellation')!

/**
 * 第四章：鋤奸
 * 時間：1984.08-10.15
 * 最緊密的一章，任務策劃到執行。
 */
export default function Chapter04() {
  return (
    <article id="chapter-04">
      <ChapterTitle chapter={4} title="鋤奸" stamp="鋤奸" />

      {/* 第一個巧合：白景瑞的飯局 / 永康街 / 陽明山 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16 space-y-6">

            <h3 className="text-xl font-bold text-ink-800 mt-8">
              第一個巧合：白景瑞的飯局
            </h3>

            <p className="text-ink-700 leading-relaxed">
              1984 年 7 月 28 日，電影導演白景瑞在台北家中設宴，12 人入席。
              汪希苓事後在法庭上宣稱，那是他第一次見到陳啟禮。這個說法，
              後來被《忠與過》一書拆穿。
            </p>

            <ContradictionBox
              title={meetingContradiction.title}
              perspectives={meetingContradiction.perspectives}
              publicRecord={meetingContradiction.publicRecord}
              className="my-4"
            />

            <p className="text-ink-700 leading-relaxed">
              真實情況是：早在 6 月 16 日，帥嶽峯便已在汪希苓辦公室首次引見陳啟禮；
              7 月 18 日兩人第二度會面；白景瑞家宴不過是第三次。汪希苓在法庭上隱瞞了
              六週的前期接觸，意味著謀劃比官方承認的開始得更早。
            </p>

            <h3 className="text-xl font-bold text-ink-800 mt-8">
              永康街招待所
            </h3>

            <p className="text-ink-700 leading-relaxed">
              1984 年 8 月 2 日，汪希苓在台北永康街情報局招待所約見陳啟禮。
              汪希苓提出一個宏大構想：以竹聯幫在海外的人脈，延伸情報局的境外觸角。
              但在這個海外合作的大框架下，有一項具體任務被提了出來。
            </p>

            <DossierCard title="永康街會面" className="my-4">
              <blockquote className="border-l-4 border-evidence-gold pl-4 font-mono text-sm text-ink-700 space-y-3">
                <p>「必須把劉除掉，他活著，事情會變得無法收拾。」</p>
                <p>陳啟禮回應：「把這個任務交給我吧。」</p>
              </blockquote>
              <Citation source="龍之火下" reference="L.2549-2640" className="mt-3 block" />
            </DossierCard>

            <h3 className="text-xl font-bold text-ink-800 mt-8">
              第二個巧合：暴露情報人員
            </h3>

            <p className="text-ink-700 leading-relaxed">
              8 月 10 日，崔暉（化名崔曄）向汪希苓提交報告：劉宜良設計暴露了情報局
              在美國的聯絡人網路。在情報機構的邏輯裡，這是叛徒行為，足以觸動最高層級
              的內部處置。
            </p>

            <DossierCard className="my-4">
              <blockquote className="border-l-4 border-evidence-gold pl-4 font-mono text-sm text-ink-700">
                <p>「制裁劉宜良是情報局內部的事，局長就可以決定。」</p>
              </blockquote>
              <p className="mt-2 text-sm text-ink-700">— 陳虎門（聯絡人）</p>
              <Citation source="董桂森" reference="第四、五章" className="mt-1 block" />
            </DossierCard>

            <h3 className="text-xl font-bold text-ink-800 mt-8">
              陽明山訓令
            </h3>

            <p className="text-ink-700 leading-relaxed">
              8 月 14 日至 18 日，陳啟禮、吳敦等人在陽明山松竹山莊進行任務訓練。
              汪希苓親赴山莊，帶去的不僅是情報局的支持，還有一句讓所有人清楚任務
              性質的話。
            </p>

            <DossierCard title="松竹山莊訓令" className="my-4">
              <blockquote className="border-l-4 border-stamp-red pl-4 font-mono text-sm text-ink-700">
                <p>「一定要殺死，殺不死就麻煩了。」</p>
              </blockquote>
              <p className="mt-2 text-sm text-ink-700">— 陳啟禮轉述汪希苓訓令</p>
              <Citation source="龍之火下" reference="審判章節" className="mt-1 block" />
            </DossierCard>

            <ContradictionBox
              title={disciplineContradiction.title}
              perspectives={disciplineContradiction.perspectives}
              publicRecord={disciplineContradiction.publicRecord}
              className="my-4"
            />

            <ContradictionBox
              title={mountainContradiction.title}
              perspectives={mountainContradiction.perspectives}
              publicRecord={mountainContradiction.publicRecord}
              className="my-4"
            />

            <ContradictionBox
              title={timingContradiction.title}
              perspectives={timingContradiction.perspectives}
              publicRecord={timingContradiction.publicRecord}
              className="my-4"
            />

            <h3 className="text-xl font-bold text-ink-800 mt-8">
              出發
            </h3>

            <p className="text-ink-700 leading-relaxed">
              9 月 14 日，送行晚宴。執行小組收到情報局準備的情報包：地圖、目標照片、
              劉宜良在加州的生活資訊。三人分批赴美，任務倒數開始。
            </p>

            <h3 className="text-xl font-bold text-ink-800 mt-8">
              美國的搜索困境
            </h3>

            <p className="text-ink-700 leading-relaxed">
              抵達加州後，執行受阻。劉希川（帥嶽峯之子）認出目標後，帥撤退。
              美國國安局曾截獲相關電話通訊，CIA 掌握線報，卻始終未採取行動保護劉宜良。
              Kaplan 的調查記錄了這段令人沉重的失敗：美國政府有機會阻止暗殺，但沒有。
            </p>

            <h3 className="text-xl font-bold text-ink-800 mt-8">
              殺手團隊集結
            </h3>

            <p className="text-ink-700 leading-relaxed">
              10 月 1 日，劉宜良從中國大陸返回加州。陳啟禮告知吳敦任務內容時，
              援引的是戴笠的典故——以「國家」名義賦予任務的正當性。吳敦以 250 美元
              購入手槍，但子彈口徑不符，這個細節後來成為破案的關鍵線索之一。
            </p>

            <p className="text-ink-700 leading-relaxed">
              10 月 13 日，董桂森抵達。陳啟禮向他說明任務，董桂森的回應簡短而決絕。
            </p>

            <DossierCard className="my-4">
              <blockquote className="border-l-4 border-evidence-gold pl-4 font-mono text-sm text-ink-700">
                <p>「自然願意替國家去做這件事。」</p>
              </blockquote>
              <p className="mt-2 text-sm text-ink-700">— 董桂森</p>
              <Citation source="董桂森" reference="第二章" className="mt-1 block" />
            </DossierCard>

          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: mission-clock */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <MissionClockScene progress={progress} className="max-w-3xl" />
          </div>
        )}
      </ScrollSection>

      {/* Infographic: 48-hour-timeline */}
      <ScrollSection minHeight="300vh">
        {(progress) => (
          <div className="sticky top-0 min-h-screen overflow-y-auto">
            <FortyEightHourTimeline progress={progress} />
          </div>
        )}
      </ScrollSection>

      {/* Infographic: contradiction-table */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-7xl px-4">
            <ContradictionTable />
          </div>
        )}
      </ScrollSection>

      {/* 第三個巧合：取消令與時間差 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16 space-y-6">

            <h3 className="text-xl font-bold text-ink-800 mt-8">
              第三個巧合：那通電話
            </h3>

            <p className="text-ink-700 leading-relaxed">
              台灣時間 1984 年 10 月 16 日上午，汪希苓透過陳虎門傳話：若有困難，
              就叫他們回來。取消令下達了。
            </p>

            <p className="text-ink-700 leading-relaxed">
              陳虎門剛坐下，保密電話就響了。
            </p>

            <DossierCard title="那通保密電話" className="my-4">
              <blockquote className="border-l-4 border-stamp-red pl-4 font-mono text-sm text-ink-700 space-y-2">
                <p>「買賣已成，送了三包禮物。」</p>
              </blockquote>
              <p className="mt-3 text-sm text-ink-700">
                美國時間 10 月 15 日上午，Daly City 車庫，三聲槍響。
                台灣與美國之間的時差，讓取消令與暗殺完成的消息幾乎同時抵達。
              </p>
              <Citation source="龍之火下" className="mt-2 block" />
              <Citation source="吳敦回憶錄" className="mt-1 block" />
            </DossierCard>

            <DossierCard className="my-4">
              <blockquote className="border-l-4 border-evidence-gold pl-4 font-mono text-sm text-ink-700">
                <p>「這個時間差，改變了台灣歷史。這就是天意。」</p>
              </blockquote>
              <p className="mt-2 text-sm text-ink-700">— 陳虎門</p>
              <Citation source="董桂森" reference="第四章" className="mt-1 block" />
            </DossierCard>

            <ContradictionBox
              title={cancellationContradiction.title}
              perspectives={cancellationContradiction.perspectives}
              publicRecord={cancellationContradiction.publicRecord}
              className="my-4"
            />

            <p className="text-ink-700 leading-relaxed">
              就在同一個早晨，地球的另一端，劉宜良的妻子崔蓉芝正在等丈夫下樓吃早餐。
              她等來的，是警察的敲門聲。
            </p>

          </div>
        )}
      </ScrollSection>
    </article>
  )
}
