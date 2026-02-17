import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'
import Citation from '../components/narrative/Citation'
import ContradictionBox from '../components/narrative/ContradictionBox'
import DossierCard from '../components/narrative/DossierCard'
import GarageShotScene from '../components/pixel/scenes/GarageShotScene'
import { getContradiction } from '../data/contradictions'

const struggleContradiction = getContradiction('struggle-at-scene')!

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
          <div className="mx-auto max-w-2xl px-4 py-16 space-y-6">
            <p className="text-lg font-bold text-ink-800">
              1984 年 10 月 15 日，加州大理市（Daly City）
            </p>

            <p className="leading-relaxed">
              清晨的大理市 Hillview Court 74 號，一棟不起眼的獨棟住宅。崔蓉芝開著她的黑色
              Oldsmobile Firenza 出門，車庫門沒有關上。兩名身著灰色帽 T
              的亞洲男子——吳敦與董桂森——在車庫暗處已經等了將近十分鐘。吳敦蜷縮在通往二樓的樓梯旁柱子後方，董桂森躲在洗衣機旁邊。
              <Citation source="吳敦回憶錄" reference="序曲" />
              <Citation source="龍之火下" reference="L.3383-3423" />
            </p>

            <DossierCard>
              <p className="font-mono text-sm leading-relaxed text-ink-700">
                「我們躲在那邊大約前後十分鐘，但卻像十年那麼長，我很緊張，幾乎可以聽到自己的心跳聲。」
              </p>
              <p className="mt-2 text-right">
                <Citation source="董桂森" reference="第一章" />
              </p>
            </DossierCard>

            <p className="leading-relaxed">
              約上午九時，劉宜良從二樓走下。前一晚，他還與好友李乃義通話到深夜，聊起最近的中國大陸之行、兒子的婚事，以及書桌旁盛開的曇花。他說中藥裡曇花有潤肺功效，堅持要等花開後切來嚐味。這是他留在世間的最後一段閒話。
              <Citation source="龍之火上" reference="L.600-715" />
            </p>

            <p className="leading-relaxed">
              劉宜良走下五階，看見了暗處的吳敦。
            </p>

            <DossierCard>
              <p className="font-mono text-sm leading-relaxed text-ink-700">
                「其實當時的情況很詭異，他看到我了，可是卻沒有任何驚訝的表情，就只是那麼淡淡地看了一眼，然後就轉眼看住別處，好像我根本就不存在一樣。」
              </p>
              <p className="mt-2 text-right">
                <Citation source="董桂森" reference="第一章" />
              </p>
            </DossierCard>

            <DossierCard>
              <p className="font-mono text-sm leading-relaxed text-ink-700">
                「眼神才剛對接，就扣下了扳機。」
              </p>
              <p className="mt-2 text-right">
                <Citation source="吳敦回憶錄" reference="序曲" />
              </p>
            </DossierCard>

            <p className="leading-relaxed">
              第一槍從吳敦的 0.38 口徑左輪射出，擊中劉宜良鼻子右側，子彈擊碎顱骨深入大腦右額葉——這是致命的一槍。劉宜良雙膝著地，臉朝天仰倒在車庫地面。吳敦轉身就走。
              <Citation source="龍之火下" reference="L.607-622" />
            </p>

            <DossierCard>
              <p className="font-mono text-sm leading-relaxed text-ink-700">
                「『老鴨』不遠千里把我找來執行這個任務，結果倒被吳敦偷了先機，真沒面子，於是我又朝倒在地上的人腹部開了兩槍。」
              </p>
              <p className="mt-2 text-right">
                <Citation source="董桂森" reference="第一章" />
              </p>
            </DossierCard>

            <p className="leading-relaxed">
              第二槍穿過迴腸、損傷胰臟，繼續擊穿左橫隔膜至左後胸；第三槍打碎腸子。法醫後來確認死亡時間：上午九時五十八分。
              <Citation source="董桂森" reference="第一章" />
            </p>

            <ContradictionBox
              title={struggleContradiction.title}
              perspectives={struggleContradiction.perspectives}
              publicRecord={struggleContradiction.publicRecord}
              className="my-8"
            />

            <p className="leading-relaxed">
              日後台灣法庭的判決書描述現場發生了「纏鬥」，聲稱劉宜良曾「反撲奪槍」。兩名在場者均否認有任何搏鬥——吳敦直斥：「騙人的，都在胡說八道亂編故事。」法庭建構「教訓失控」的敘事需要一場搏鬥，但執行者的證詞顯示暗殺是冷靜而迅速的。
              <Citation source="吳敦回憶錄" />
              <Citation source="董桂森" reference="第一章" />
            </p>
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: garage-shot */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <GarageShotScene progress={progress} className="max-w-3xl" />
          </div>
        )}
      </ScrollSection>

      {/* 撤離與餘波 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16 space-y-6">
            <p className="leading-relaxed">
              兩名殺手騎上事先停放的自行車，到社區外跳上皮建鑫（小皮）的接應車。吳敦回頭擦去自行車把手上的指紋。但他沒有擦另一輛——陳啟禮的那輛。FBI
              後來在遺棄的自行車把手上採到陳啟禮左手食指指紋，成為破案的關鍵證據。
              <Citation source="吳敦回憶錄" reference="第二、三章" />
            </p>

            <p className="leading-relaxed">
              撤離途中發生了一段黑色幽默：小皮超速被巡警追上，連直升機都出動了。車內三人以為暴露，嚇得臉色鐵青。結果只是一張普通超速罰單。小皮此後一直留著那張罰單，拿來嘲笑當天嚇到發抖的吳敦。
              <Citation source="吳敦回憶錄" reference="第三章" />
            </p>

            <DossierCard>
              <p className="font-mono text-sm leading-relaxed text-ink-700">
                當天晚間，陳啟禮打電話給台北的陳虎門上校，說了暗語：「買賣已成，送了三包禮物。」
              </p>
              <p className="mt-1 font-mono text-sm text-neutral">
                三包禮物，指三顆子彈。
              </p>
              <p className="mt-2 text-right">
                <Citation source="龍之火下" reference="L.3650" />
                <Citation source="忠與過" reference="第十五章" />
              </p>
            </DossierCard>

            <p className="leading-relaxed">
              案發後，崔蓉芝向 Daly City 的年輕刑警約翰·華倫指著書架上的一本書——灰色封面，上面印著一位戴眼鏡的中年男子——說：「殺害我丈夫的就是這個人。」那是劉宜良剛出版不久的《蔣經國傳》。她告訴警方，丈夫替
              FBI 蒐集情報。在劉宜良的通訊錄裡，警方找到了 FBI 聯絡人戴夫·萊蘇爾的電話號碼。
              <Citation source="龍之火上" reference="L.600-715" />
            </p>

            <p className="mt-8 text-center text-lg font-semibold text-ink-800">
              一本書、一串電話號碼、一枚指紋——一場政治暗殺的拼圖開始浮現。
            </p>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
