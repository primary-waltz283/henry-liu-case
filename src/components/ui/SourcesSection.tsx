/**
 * 資料來源 — Lists the copyrighted source books used in this project.
 */
export default function SourcesSection() {
  return (
    <section
      id="sources"
      className="mx-auto max-w-3xl px-4 py-16"
      aria-labelledby="sources-heading"
    >
      <h2
        id="sources-heading"
        className="mb-8 text-center font-serif text-2xl font-bold text-ink-900 md:text-3xl"
      >
        資料來源
      </h2>

      <p className="mb-8 text-sm leading-relaxed text-neutral">
        本網站內容主要取材自以下四本著作，經 OCR
        轉檔後引用其歷史事實與敘述。所有引述均標註出處，並以多方視角交叉比對呈現。有興趣深入了解的讀者，建議尋找原書閱讀。
      </p>

      <ol className="space-y-6">
        {SOURCES.map((src, i) => (
          <li
            key={i}
            className="border-l-4 border-evidence-gold bg-paper-100 px-4 py-3"
          >
            <p className="font-serif text-base font-bold text-ink-800">
              {src.title}
            </p>
            <p className="mt-1 text-sm text-ink-700">{src.author}</p>
            <p className="mt-0.5 text-xs text-neutral">{src.publisher}</p>
            <p className="mt-2 text-xs italic text-neutral">{src.perspective}</p>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-xs leading-relaxed text-neutral/70">
        以上書籍均受著作權保護，本站不提供原文下載。原始文字檔案（OCR
        轉檔）不包含於網站原始碼中。
      </p>
    </section>
  )
}

const SOURCES = [
  {
    title: '《龍之火──江南案始末與國民黨海外間諜活動》（上、下冊）',
    author: '大衛・凱普蘭（David E. Kaplan）著；新新聞編譯',
    publisher: '新新聞文化，1993 年',
    perspective: '視角：外國記者全面調查',
  },
  {
    title: '《忠與過──情治首長汪希苓的起落》',
    author: '汪士淳 著',
    publisher: '天下遠見出版，1999 年',
    perspective: '視角：情治首長（決策者）',
  },
  {
    title: '《江南案與我的一生──吳敦回憶錄》',
    author: '吳敦 口述；藍祖蔚 錄寫',
    publisher: '時報文化出版',
    perspective: '視角：執行者',
  },
  {
    title: '《江南案槍手董桂森──我們是為了國家?!》',
    author: '梁東屏 著',
    publisher: '時報出版',
    perspective: '視角：槍手',
  },
]
