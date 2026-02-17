import ChapterTitle from '../components/narrative/ChapterTitle'
import Citation from '../components/narrative/Citation'
import DossierCard from '../components/narrative/DossierCard'
import ScrollSection from '../components/narrative/ScrollSection'
import BambooMeetingScene from '../components/pixel/scenes/BambooMeetingScene'

/**
 * 第三章：竹林裡的兄弟
 * 時間：1956-1984
 * 竹聯幫的崛起、幫派與情治的交集。
 */
export default function Chapter03() {
  return (
    <article id="chapter-03">
      <ChapterTitle chapter={3} title="竹林裡的兄弟" />

      {/* 竹林路上的少年、陳啟禮、吳敦、董桂森 */}
      <ScrollSection>
        {() => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">
              <h3 className="mt-8 text-xl font-bold text-ink-800">竹林路上的少年</h3>

              <p className="leading-relaxed text-ink-700">
                1956 年，台北縣永和，十七名少年在竹林路旁結盟，竹聯幫由此誕生。這批創始成員大多出身軍公教家庭——隨國民政府撤台的將校子弟，在台灣這塊陌生土地上抱團取暖。幫派從街頭打架的同義詞，逐漸演變為一個橫跨黑白兩道的龐大組織。
              </p>
              <Citation source="龍之火下" reference="L.2148-2240" />

              <h3 className="mt-8 text-xl font-bold text-ink-800">陳啟禮</h3>

              <p className="leading-relaxed text-ink-700">
                陳啟禮，1943 年生，祖籍江南。13 歲入幫，卻也完成大學學業，後服役軍中。然而，一場牢獄之災將他帶走五年，其中包括綠島。出獄後的陳啟禮，以「儒將」之姿重整旗鼓，創辦建設公司與消防公司，以合法事業為掩護，將竹聯幫壯大為台灣最大幫派。
              </p>
              <Citation source="龍之火下" reference="L.2148-2240" />

              <h3 className="mt-8 text-xl font-bold text-ink-800">吳敦</h3>

              <DossierCard title="吳敦檔案" className="my-4">
                <p className="font-mono text-sm leading-relaxed text-ink-800">
                  「沒有陳啟禮，就沒有吳敦……然而，沒有陳啟禮，也就沒有江南事件。」
                </p>
                <p className="mt-3 leading-relaxed text-ink-700">
                  吳敦在幫派中效力近二十年，人稱「總殺手」，是陳啟禮最信任的左右手。他同時涉足影視圈，參與製作《醉拳》、《英烈千秋》等電影，黑白兩道游走自如。
                </p>
                <Citation source="吳敦回憶錄" reference="第四章" className="mt-2 block" />
                <Citation source="龍之火下" reference="L.3132-3175" className="mt-1 block" />
              </DossierCard>

              <h3 className="mt-8 text-xl font-bold text-ink-800">董桂森</h3>

              <p className="leading-relaxed text-ink-700">
                董桂森出身台中軍人家庭，父親服役後入祀忠烈祠，是標準的外省軍眷子弟。他本人服役十年，退伍後輾轉從事快遞與印刷業，生計平淡。直到被陳公招募進竹聯幫，他的人生才走上一條無法回頭的道路。
              </p>

              <DossierCard className="my-4">
                <p className="font-mono text-sm leading-relaxed text-ink-800">
                  「自然願意替國家去做這件事。」
                </p>
                <p className="mt-2 text-sm text-neutral">— 董桂森談及接受任務時的心態</p>
                <Citation source="董桂森" reference="第二章" className="mt-2 block" />
              </DossierCard>

              <p className="leading-relaxed text-ink-700">
                軍人家庭的背景，讓董桂森對「國家任務」有一種近乎本能的服從。這份服從，將在 1984 年把他帶進 Daly City 的車庫。
              </p>
            </div>
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: bamboo-meeting */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <BambooMeetingScene progress={progress} className="max-w-3xl" />
          </div>
        )}
      </ScrollSection>

      {/* 國民黨招募黑道 */}
      <ScrollSection>
        {() => (
          <div className="mx-auto max-w-2xl px-4 py-16">
            <div className="space-y-6">
              <h3 className="mt-8 text-xl font-bold text-ink-800">國民黨招募黑道</h3>

              <p className="leading-relaxed text-ink-700">
                1980 年代初，台灣情治系統悄悄向竹聯幫伸出橄欖枝。情治人員登門拜訪陳啟禮辦公室，先是高官宴請、禮遇有加，繼而以掃黑壓力為籌碼，軟硬兼施。在這種胡蘿蔔加棍子的操作下，竹聯幫的規模從數百人急速膨脹至萬人以上。
              </p>
              <Citation source="龍之火下" reference="L.2240-2295" />

              <h3 className="mt-8 text-xl font-bold text-ink-800">1984 年國防部座談會</h3>

              <DossierCard title="機密文件摘要" className="my-4">
                <p className="leading-relaxed text-ink-700">
                  1984 年，國防部長宋長志主持的一場座談會上，議程中明列一項：
                </p>
                <p className="mt-3 font-mono text-sm leading-relaxed text-ink-800">
                  「善於運用幫派分子，從事情報工作。」
                </p>
                <p className="mt-3 leading-relaxed text-ink-700">
                  分工亦明確劃定：國家安全局負責管理青幫與洪門，情報局則負責竹聯幫與四海幫。黑道與情報系統的合作，至此已是體制化的安排。
                </p>
                <Citation source="董桂森" reference="第四章" className="mt-2 block" />
              </DossierCard>

              <h3 className="mt-8 text-xl font-bold text-ink-800">蔣家與竹聯幫的關係</h3>

              <p className="leading-relaxed text-ink-700">
                1970 年代，陳啟禮結識蔣家子弟。蔣經國之子蔣孝勇曾私下告知陳啟禮：若有緊急情況，希望他能護衛蔣家。蔣緯國則與陳啟禮維持每週會面的習慣，陳啟禮甚至贈送一架三角鋼琴給蔣緯國。在竹聯幫內部，蔣家逐漸被視為「大老闆和名譽掌門人」。
              </p>
              <Citation source="龍之火下" reference="L.2265-2315" />

              <p className="leading-relaxed text-ink-700">
                幫派與國家機器的邊界，在這一系列往來中悄然消融。當情報局需要一支「可否認」的手來執行海外任務時，竹聯幫已是現成的選擇。
              </p>
            </div>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
