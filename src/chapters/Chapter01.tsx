import ChapterTitle from '../components/narrative/ChapterTitle'
import Citation from '../components/narrative/Citation'
import DossierCard from '../components/narrative/DossierCard'
import ScrollSection from '../components/narrative/ScrollSection'
import IntelligenceOrgChart from '../components/infographic/IntelligenceOrgChart'

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
            <div className="space-y-6">

              <h3 className="text-xl font-bold text-ink-800 mt-8">韓戰救了台灣</h3>

              <p className="text-ink-700 leading-relaxed">
                1949年，國民政府撤退台灣。在華府眼中，蔣介石政權已是「燙手山芋」——一個
                在中國大陸潰敗的殘局，美國並不打算為其背書。杜魯門政府發表聲明，暗示美國
                不會介入台灣問題。蔣介石孤立無援，台灣的命運岌岌可危。
              </p>

              <p className="text-ink-700 leading-relaxed">
                轉機來自朝鮮半島。1950年6月，韓戰爆發，局勢驟然逆轉。杜魯門總統下令第七
                艦隊巡弋台灣海峽，台灣從「政治包袱」一夜之間變成「戰略資產」。原本被冷落
                的蔣介石政權，搖身成為對抗共產主義擴張的前沿陣地。
                <Citation source="龍之火" reference="L.769-790" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                這場意外的救援，讓蔣家王朝得以喘息，也讓蔣經國有足夠的時間和空間，打造他
                心目中的安全帝國。
              </p>

              <h3 className="text-xl font-bold text-ink-800 mt-8">蔣經國的安全帝國</h3>

              <p className="text-ink-700 leading-relaxed">
                1949年，蔣介石將整頓情治系統的重任交給長子蔣經國。彼時蔣經國剛從蘇聯留學
                歸來，帶回了史達林式政治委員制度的完整框架。他著手推行一套蘇聯模式的政工體
                系——在軍隊、政府、民間組織中安插政治監察員，對上報告，對下監控。
                <Citation source="龍之火" reference="L.871-905" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                白色恐怖隨之而來。1949年起，當局大規模逮捕異見人士、左派份子、或任何被認
                為對黨國不忠的人。僅1949年一年，遭拘押者逾萬人，施以酷刑審訊，不少人就此
                人間蒸發。這段歷史在台灣官方敘事中長期被壓抑，直到解嚴後才逐漸重見天日。
                <Citation source="龍之火" reference="L.905-960" />
              </p>

              <DossierCard title="吳國楨的批評">
                <p className="text-ink-700 leading-relaxed">
                  台灣省主席吳國楨曾公開批評蔣經國的情治手段過於殘酷。他向蔣介石陳情，指出
                  特務系統的濫權已造成嚴重的人權問題。然而，這番直言換來的是被迫流亡海外的
                  命運。吳國楨出走美國後，接受媒體採訪，揭露台灣內部的政治迫害，成為當時國
                  際社會少數能公開發言的台灣批評者之一。
                </p>
                <Citation source="龍之火" reference="L.960-1130" className="mt-2 block" />
              </DossierCard>

              <p className="text-ink-700 leading-relaxed">
                至1950年代中期，台灣已建立起五個相互重疊的情報機構，總計約五萬名特工散布
                於各地，涵蓋調查局、國防部情報局、保密局（後改制）及各軍種情報系統。這些
                機構各自為政，卻又共同受蔣經國節制，形成一個複雜而有效的監控網絡。
                <Citation source="龍之火" reference="L.1100-1130" />
              </p>

              <h3 className="text-xl font-bold text-ink-800 mt-8">政戰學校：培育爪牙</h3>

              <p className="text-ink-700 leading-relaxed">
                1951年，政工幹部學校（後改名政治作戰學校）在台北近郊創立，藍本直接仿效
                莫斯科的政治軍官訓練體系。學校每年培訓約1,500名學員，蔣經國親自參與其中，
                每週兩次為學員講授「領袖故事」——一系列以蔣介石為核心的政治教化課程。
                <Citation source="龍之火" reference="L.960-1065" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                課程涵蓋新聞審查技術、組織滲透、反間諜操作與公民監控方法。畢業生將被派駐
                軍中、學校、工廠乃至海外社區，成為黨國意志的延伸觸角。劉宜良——即後來遭
                暗殺的「江南」——正是這所學校第一批入學的學員之一。
                <Citation source="龍之火" reference="L.1030-1065" />
              </p>

            </div>
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
            <IntelligenceOrgChart />
          </div>
        )}
      </ScrollSection>

      {/* 海外情報擴張與汪希苓登場 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">

              <h3 className="text-xl font-bold text-ink-800 mt-8">海外情報擴張</h3>

              <p className="text-ink-700 leading-relaxed">
                進入1970年代，台灣的海外情報網絡達到高峰。在美國，台灣設有15處領事機構，
                每處至少配置3名情報人員，全美特工總數超過100人。他們的任務涵蓋監控海外台
                灣留學生的政治動向、蒐集異見人士資料，以及維繫與當地親國民黨社群的聯絡網絡。
                <Citation source="龍之火" reference="L.3175-3200" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                然而，隨著美國與中華人民共和國關係正常化的進程加速，台灣特工的活動開始引發
                美方疑慮。1977年，美國情報評估報告甚至一度將台灣列為「敵對國家」，顯示雙
                方信任已出現裂痕。台美之間的情報合作關係，從此籠罩在複雜的政治陰影之下。
                <Citation source="龍之火" reference="L.4393-4400" />
              </p>

              <h3 className="text-xl font-bold text-ink-800 mt-8">汪希苓：一個從謊言開始的仕途</h3>

              <p className="text-ink-700 leading-relaxed">
                1929年，汪希苓生於浙江杭州。15歲那年，他謊報年齡，投身海軍。這個少年時的
                謊言，某種程度上預示了他日後在情報世界中的行事風格——以欺瞞為手段，以生存
                為目的。
                <Citation source="忠與過" reference="第九章" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                汪希苓的仕途與蔣經國的賞識密不可分。蔣經國前後四度提拔他，使其從海軍軍官
                逐步晉升至情報系統核心。外派美國期間，汪希苓建立起與美國中央情報局副局長
                的私人管道，掌握了大量關於美國對台政策的第一手情報。
                <Citation source="忠與過" reference="第十章" />
              </p>

              <DossierCard title="第二十四號總統備忘錄">
                <p className="text-ink-700 leading-relaxed">
                  汪希苓在華府任職期間，透過情報管道獲悉美國正在秘密推進與中華人民共和國關係
                  正常化的計畫，相關文件代號為「第二十四號總統備忘錄」。此一消息對台灣情報界
                  而言猶如晴天霹靂——在正式外交通知到達之前，台灣已透過非正式管道掌握了足以
                  改變兩岸格局的關鍵情報。
                </p>
                <Citation source="忠與過" reference="第十章" className="mt-2 block" />
              </DossierCard>

              <p className="text-ink-700 leading-relaxed">
                1982年，《華盛頓郵報》刊出報導，揭露汪希苓的情報人員身份，他隨即被迫召回
                台灣。然而，這次曝光非但未終結其仕途，反而成為一次政治跳板——蔣經國任命他
                出任情報局局長。蔣經國同時承諾，三年任期屆滿後，汪希苓將接掌地位更高的安
                全局局長一職。
                <Citation source="忠與過" reference="第十一章" />
              </p>

              <p className="text-ink-700 leading-relaxed">
                這個承諾，在情治系統內部埋下了一顆定時炸彈。現任安全局局長汪敬煦同樣是蔣
                經國的親信愛將，兩人皆姓「汪」，仕途相互糾纏——史稱「兩汪競爭」。為了兌現
                對汪希苓的承諾，汪敬煦必須讓位。這場潛藏的權力角力，將在兩年後的江南案中
                留下難以忽視的背景陰影。
                <Citation source="忠與過" reference="第十一章" />
              </p>

            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
