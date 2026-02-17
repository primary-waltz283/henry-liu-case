import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'
import Citation from '../components/narrative/Citation'
import ContradictionBox from '../components/narrative/ContradictionBox'
import DossierCard from '../components/narrative/DossierCard'
import CausalityChain from '../components/infographic/CausalityChain'
import { getContradiction } from '../data/contradictions'

const ckKnowledgeContradiction = getContradiction('chiang-ching-kuo-knowledge')!

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
            <div className="space-y-6">

              <h3 className="text-xl font-bold text-ink-800 mt-8">政治海嘯</h3>

              <p className="text-ink-700 leading-relaxed">
                江南案在美國政界掀起的風波，被《龍之火》形容為「台美斷交以來最嚴峻的外交危機」。
                美國國會強烈反應，多名參議員公開要求停止對台軍售。台灣駐美代表奔走斡旋，
                外交部緊急啟動危機處理，整個對美關係都在這起暗殺案的餘震中搖晃。
                <Citation source="龍之火下" reference="L.5150-5200" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                壓力傳回台北後，蔣經國做出決定：情報局改制，移交國防部監管，更名為軍事情報局。
                此舉意在向美方展現整頓誠意，切斷情治機關在政治上的獨立性。
                一個延續三十年的情報帝國，在這起暗殺案的後果中，被迫重新定位。
                <Citation source="龍之火下" reference="L.5150-5200" />
              </p>

              <DossierCard title="蔣經國的兩個字">
                <p className="text-ink-700 leading-relaxed">
                  當幕僚向蔣經國彙報江南案始末，這位老人沉默片刻，只說了兩個字：
                </p>
                <blockquote className="border-l-4 border-stamp-red pl-4 font-mono text-sm text-ink-700 mt-3">
                  <p>「蠢事。」</p>
                </blockquote>
                <Citation source="忠與過" reference="第十九章，L.7171" className="mt-3 block" />
              </DossierCard>

              <h3 className="text-xl font-bold text-ink-800 mt-8">蔣家王朝的終結</h3>

              <p className="text-ink-700 leading-relaxed">
                1985 年，蔣經國在公開場合宣布：蔣家人不會競選下一任總統，軍隊不干政。
                這是蔣家王朝史上第一次，公開承認世襲不會延續。
                <Citation source="龍之火下" reference="L.5220" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                1986 年，菲律賓馬可仕政權在民主浪潮中垮台。這個訊號令蔣經國深受震動——
                威權體制若不自我革新，等待的是被推翻，而非平靜退場。
                他加速了政治改革的步伐。同年，蔣孝武被外放新加坡，
                逐步淡出台灣政治核心。
              </p>

              <p className="text-ink-700 leading-relaxed">
                1987 年 7 月 15 日，蔣經國宣布解除戒嚴。長達 38 年的戒嚴令，至此畫下句點。
                政治犯陸續獲釋，黨禁開放，《蔣經國傳》得以公開販售，海外流亡者開始返台。
                台灣的歷史，從此翻開新的一頁。
                <Citation source="龍之火下" reference="L.5220-5250" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                1988 年 1 月，蔣經國病逝，享年 78 歲。副總統李登輝依憲法繼任，成為台灣第一位
                本省籍國家元首。1991 年，李登輝宣告廢止《動員戡亂時期臨時條款》，正式終結
                兩岸內戰的法律狀態。台灣的民主轉型，至此完成關鍵一步。
                <Citation source="龍之火下" reference="L.5250-5275" />
              </p>

            </div>
          </div>
        )}
      </ScrollSection>

      {/* Infographic: causality-chain */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-4xl px-4 py-16">
            <CausalityChain />
          </div>
        )}
      </ScrollSection>

      {/* 吳敦的最後證言、五大未解之謎 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">

              <h3 className="text-xl font-bold text-ink-800 mt-8">吳敦的最後證言</h3>

              <p className="text-ink-700 leading-relaxed">
                2026 年 2 月 3 日，吳敦辭世。至此，江南案三名執行者——陳啟禮、董桂森、吳敦——
                已全數凋零。台灣媒體在報導中寫道：
              </p>

              <DossierCard>
                <blockquote className="border-l-4 border-stamp-red pl-4 font-mono text-sm text-ink-700">
                  <p>「隨著三大殺手不在了，江南案的真相，也將石沉大海。」</p>
                </blockquote>
              </DossierCard>

              <p className="text-ink-700 leading-relaxed">
                在吳敦生前留下的口述錄音中，他以執行者的角度，回顧了這一槍對台灣命運的意義：
              </p>

              <DossierCard title="吳敦回憶錄：最後的話">
                <blockquote className="border-l-4 border-evidence-gold pl-4 font-mono text-sm text-ink-700 space-y-3">
                  <p>「我開的這一槍，陰錯陽差改變了蔣家，也改變了台灣的命運。」</p>
                  <p>「捲進江南案，對我而言純屬偶然。卻也是必然。」</p>
                </blockquote>
                <Citation source="吳敦回憶錄" reference="第六章" className="mt-3 block" />
              </DossierCard>

              <h3 className="text-xl font-bold text-ink-800 mt-8">五大未解之謎</h3>

              <p className="text-ink-700 leading-relaxed">
                四十年過去，文獻已盡，當事人已逝。以下五個核心問題，至今仍無定論。
              </p>

              <ol className="space-y-8 list-none">
                <li>
                  <p className="font-bold text-ink-800">一、蔣經國是否事前知情？</p>
                  <p className="text-ink-700 leading-relaxed mt-2">
                    汪希苓聲稱奉命行事；蔣孝武的角色從未獲完整釐清；美方情報顯示高層確有授意，
                    但具體指令鏈至今付之闕如。《忠與過》的立場是：蔣經國知情，但保持距離；
                    《龍之火》則認為，間接默許與直接指令之間的邊界，刻意被模糊化。
                  </p>
                  <ContradictionBox
                    title={ckKnowledgeContradiction.title}
                    perspectives={ckKnowledgeContradiction.perspectives}
                    publicRecord={ckKnowledgeContradiction.publicRecord}
                    className="mt-4"
                  />
                </li>

                <li>
                  <p className="font-bold text-ink-800">二、蔣孝武的真實角色？</p>
                  <p className="text-ink-700 leading-relaxed mt-2">
                    竹聯幫大佬張安樂（白狼）後來承認，涉案之初有「圍魏救趙」之意——
                    利用江南案轉移外界對竹聯幫的注意力。然而，蔣孝武究竟是主謀、中間人，
                    或僅是知情而未阻止，隨著他 1991 年在新加坡病逝，答案已成永謎。
                  </p>
                </li>

                <li>
                  <p className="font-bold text-ink-800">三、「制裁」還是「教訓」？</p>
                  <p className="text-ink-700 leading-relaxed mt-2">
                    吳敦口述，他從陳啟禮處聽到的指令是「制裁」——即殺死。
                    但陳虎門事後向調查人員表示，原始指令是「教訓」，殺意是執行層加上去的。
                    兩字之差，決定了法律責任的歸屬，也決定了誰應當為這條命承擔。
                  </p>
                </li>

                <li>
                  <p className="font-bold text-ink-800">四、董桂森獄中死亡是否為滅口？</p>
                  <p className="text-ink-700 leading-relaxed mt-2">
                    1991 年，董桂森在美國聯邦監獄內死亡。友人梁東平對外說明是意外，
                    但董桂森的母親拒絕接受這個說法，認為兒子死得蹊蹺。
                    作為唯一親手扣下扳機的人，董桂森所掌握的細節，
                    比任何人都更具爆炸性。
                  </p>
                </li>

                <li>
                  <p className="font-bold text-ink-800">五、劉宜良的真實身份？</p>
                  <p className="text-ink-700 leading-relaxed mt-2">
                    他是記者、作家，也曾是台灣情報線人。FBI 的檔案顯示他與美方亦有接觸。
                    有一種說法認為他是三重間諜——同時為台灣、美國、某種個人立場服務。
                    無論哪種說法為真，他的死，令所有答案隨之封存。
                  </p>
                </li>
              </ol>

              <DossierCard title="吳敦的最終判斷">
                <blockquote className="border-l-4 border-evidence-gold pl-4 font-mono text-sm text-ink-700">
                  <p>「江南案究竟和蔣經國有沒有關係？我的認知是：直接沒有，間接難免。」</p>
                </blockquote>
                <Citation source="吳敦回憶錄" reference="第六章" className="mt-3 block" />
              </DossierCard>

              <p className="text-ink-700 leading-relaxed">
                矛盾之處已標示，讀者可自行對照各方說法。
                歷史的真相，也許永遠存在於這些矛盾的縫隙之間。
              </p>

            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
