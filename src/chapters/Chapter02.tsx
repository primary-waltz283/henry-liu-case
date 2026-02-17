import ChapterTitle from '../components/narrative/ChapterTitle'
import ScrollSection from '../components/narrative/ScrollSection'
import Citation from '../components/narrative/Citation'
import ContradictionBox from '../components/narrative/ContradictionBox'
import DossierCard from '../components/narrative/DossierCard'
import TypewriterStudyScene from '../components/pixel/scenes/TypewriterStudyScene'
import { getContradiction } from '../data/contradictions'

const motiveContradiction = getContradiction('assassination-motive')!
const identityContradiction = getContradiction('liu-identity')!
const codenameContradiction = getContradiction('liu-codename')!

/**
 * 第二章：江南其人
 * 時間：1932-1984
 * 劉宜良的雙面人生：記者、作家、線人？
 */
export default function Chapter02() {
  return (
    <article id="chapter-02">
      <ChapterTitle chapter={2} title="江南其人" />

      {/* 靖江少年、從廣播到寫作、美國夢 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16 space-y-8">
            <h3 className="text-xl font-bold text-ink-800 mt-8">靖江少年</h3>
            <p className="text-ink-700 leading-relaxed">
              1932 年 12 月 7 日，劉宜良生於江蘇靖江。1949 年，約十七歲的他隨國民政府撤退台灣，
              從此再未踏上故土。
            </p>
            <Citation source="龍之火上" reference="L.522" />

            <h3 className="text-xl font-bold text-ink-800 mt-8">政戰學校的叛逆者</h3>
            <p className="text-ink-700 leading-relaxed">
              劉宜良是政工幹部學校第一批學員。1954 年 1 月 6 日畢業後，他拒絕接受政治軍官職位，
              隨即遭到開除。然而他的說法截然不同。
            </p>
            <DossierCard className="rotate-[-0.3deg]">
              <blockquote className="font-mono text-ink-800 italic">
                「事實上是我把這所幹部學校開除了。」
              </blockquote>
              <p className="mt-2 text-sm text-neutral">—— 劉宜良自述</p>
              <Citation source="龍之火上" reference="L.1100-1182" className="mt-2 block" />
            </DossierCard>

            <h3 className="text-xl font-bold text-ink-800 mt-8">從廣播到寫作</h3>
            <p className="text-ink-700 leading-relaxed">
              1958 年，劉宜良進入廣播界，主持節目「三千六百行」。主持人夏小華在節目中一人分飾多角，
              聲音千變萬化。這段廣播歲月培養了他對敘事的感覺，也為日後的寫作奠定基礎。
            </p>
            <Citation source="龍之火上" reference="L.1300-1400" />

            <p className="text-ink-700 leading-relaxed">
              1965 年，劉宜良以記者身分前往香港，試圖建立「第三種聲音」——既非台北官方宣傳，
              亦非北京立場，而是獨立的華語論述。
            </p>
            <Citation source="龍之火上" reference="L.1400-1698" />

            <h3 className="text-xl font-bold text-ink-800 mt-8">美國夢</h3>
            <p className="text-ink-700 leading-relaxed">
              1967 年 2 月 28 日，劉宜良攜妻崔蓉芝離開台灣，身上只有三百美元。他在美國謀得教職，
              開始新生活。1969 年，因接獲警告而倉皇出走，同年 8 月 15 日取得美國永久居留權。
            </p>
            <Citation source="龍之火上" reference="L.2046-2265" />

            <h3 className="text-xl font-bold text-ink-800 mt-8">十五年磨一書</h3>
            <p className="text-ink-700 leading-relaxed">
              1970 年，蔣經國訪美，劉宜良出席早餐會，近距離觀察這位未來的台灣領導人。
              此後他以筆名「丁依」開始連載，1973 年作品在海外報刊問世。
              將門之子王昇曾對他提出警告。
            </p>
            <p className="text-ink-700 leading-relaxed">
              1974 年，劉宜良拜訪前台灣省主席吳國楨，吳國楨向他透露了一段蔣家秘聞——
              一次針對蔣經國的暗殺未遂事件。這些第一手資料成為《蔣經國傳》最核心的材料。
              全書終於在 1984 年出版，距他開始構思已逾十五年。
            </p>
            <Citation source="龍之火上" reference="L.2882-3050" />
            <Citation source="龍之火下" reference="L.2755-2770" />
          </div>
        )}
      </ScrollSection>

      {/* Pixel Art: typewriter-study */}
      <ScrollSection minHeight="150vh">
        {(progress) => (
          <div className="sticky top-0 flex h-screen items-center justify-center">
            <TypewriterStudyScene progress={progress} className="max-w-3xl" />
          </div>
        )}
      </ScrollSection>

      {/* 暗殺動機之謎、三重身份 */}
      <ScrollSection>
        {(_progress) => (
          <div className="mx-auto max-w-2xl px-4 py-16 space-y-8">
            <h3 className="text-xl font-bold text-ink-800 mt-8">他為何而死？</h3>
            <p className="text-ink-700 leading-relaxed">
              《蔣經國傳》1975 年已開始連載，情報局甚至在 1983 年付了一萬七千美元請劉宜良修改書稿。
              那麼，是什麼在 1984 年讓他成了必須除去的人？各方說法至今仍無定論。
            </p>

            <ContradictionBox
              title={motiveContradiction.title}
              perspectives={motiveContradiction.perspectives}
              publicRecord={motiveContradiction.publicRecord}
            />

            <h3 className="text-xl font-bold text-ink-800 mt-8">三重身份之謎</h3>
            <p className="text-ink-700 leading-relaxed">
              1975 年起，劉宜良開始為 FBI 提供情報，成為「得力人物」。1984 年，他又被情報局吸收，
              化名「劉向真」。一個人，同時效力於美國聯邦調查局與台灣情報局——他究竟是誰的人？
            </p>

            <ContradictionBox
              title={identityContradiction.title}
              perspectives={identityContradiction.perspectives}
              publicRecord={identityContradiction.publicRecord}
            />

            <h3 className="text-xl font-bold text-ink-800 mt-8">代號之謎</h3>
            <p className="text-ink-700 leading-relaxed">
              即便是最基本的情報檔案細節，不同來源之間也存在出入：他的代號是 0325，還是 0335？
              專案名稱是「三一」，還是「三義」？
            </p>

            <ContradictionBox
              title={codenameContradiction.title}
              perspectives={codenameContradiction.perspectives}
              publicRecord={codenameContradiction.publicRecord}
            />

            <DossierCard className="mt-8">
              <p className="text-ink-700 italic leading-relaxed">
                作家、FBI 線人、台灣情報局線人——也許他什麼都是，也許他什麼都不是。
              </p>
              <p className="mt-2 text-sm text-neutral">
                劉宜良帶著他的秘密，在 1984 年 10 月 15 日清晨的 Daly City 車庫裡，永遠沉默了。
              </p>
            </DossierCard>
          </div>
        )}
      </ScrollSection>
    </article>
  )
}
