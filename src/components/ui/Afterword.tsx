/**
 * 後記 — Why this website was made.
 */
export default function Afterword() {
  return (
    <section
      id="afterword"
      className="mx-auto max-w-3xl px-4 py-16"
      aria-labelledby="afterword-heading"
    >
      <h2
        id="afterword-heading"
        className="mb-8 text-center font-serif text-2xl font-bold text-ink-900 md:text-3xl"
      >
        後記
      </h2>

      <div className="space-y-6 text-base leading-relaxed text-ink-700">
        <p>
          做完<a href="https://soanseng.github.io/the-lin/" className="text-link-blue underline decoration-link-blue/30 underline-offset-2 hover:decoration-link-blue" target="_blank" rel="noopener noreferrer">林宅血案</a>、<a href="https://soanseng.github.io/Chen-Wen-chen/" className="text-link-blue underline decoration-link-blue/30 underline-offset-2 hover:decoration-link-blue" target="_blank" rel="noopener noreferrer">陳文成事件</a>的網站後，朋友問我：「你要不要順便把蔣經國時代的三大案，把江南案也做完？」
        </p>

        <p>
          本來不太想做。找資料非常花時間，光是確認不同來源的說法就夠累人的了。但就在幾天前，看到吳敦去世的消息——江南案最後一位在世的執行者，帶著他的版本離開了——我突然覺得，如果再不做，這些聲音會越來越遠。
        </p>

        <p>
          雖然國史館有完整的檔案，但那些文件厚得讓人卻步。學術文獻也有一些，但多半無法取得。因為案子早已破了，留下的反而是當年各方人馬的回憶錄——決策者的、執行者的、槍手的、外國記者的。每個人都說了自己該說的話，每個人的版本都不太一樣。
        </p>

        <p>
          這些書多半沒有電子版，只能用掃描的方式取得文字。後來用了
          Mistral 的 OCR 技術，速度很快，辨識也精準。於是就這樣，五本書的內容，四個視角的交叉比對，變成了這個網站。
        </p>

        <div className="my-8 border-l-4 border-paper-300 pl-4">
          <p className="text-sm italic text-neutral">
            行醫多年，我始終相信一件事——真相是療癒的前提。一個人的身體出了問題，要先有正確的診斷，才談得上治療。一個社會也是。
          </p>
        </div>

        <p>
          江南案是台灣威權時代最具國際衝擊力的政治謀殺。一個美國公民，在自家車庫被來自台灣的情報系統派人暗殺——這件事直接牽動了台美關係，也成為推動台灣解嚴的關鍵力量之一。書中詳細記載了台灣法院與美國法院的審判資料，不同來源之間的矛盾，正是這個案件最引人深思的地方。
        </p>

        <p>
          我並沒有取得台灣法院的原始卷宗，也沒有美國法院的完整紀錄，純粹依據這幾本書的內容，整理製作了這個網站。但透過四方視角的比對——外國記者的全面調查、情治首長的自我辯護、執行者的無奈告白、槍手友人的側寫——應該可以看出那個年代蔣經國統治之下，情報系統的運作方式，以及一個政權如何跨越國界去消滅它認為的「敵人」。
        </p>

        <p>
          做了林宅血案、陳文成事件、江南案這三個網站之後，我對台灣近代史多了一層很不一樣的理解。這三個案件串在一起看，你會看到一個威權體制從內部鎮壓到境外暗殺的完整光譜——從島內的白色恐怖，到伸向海外的黑手。而這三個案件的共同結局，是沒有任何一個真正的決策者受到應有的究責。
        </p>

        <p>
          這不應該是認識自己歷史的門檻。你不需要讀完五本書、不需要是歷史學者，只要捲動頁面，就能走進 1984 年那個秋天的 Daly City 車庫。
        </p>

        <p>
          我不會告訴你該怎麼想。這裡只有文獻記載的事實、不同來源間的矛盾，以及至今沒有完整答案的問題。判斷，留給你。
        </p>

        <p>
          希望透過這樣的網站，讓更多人了解自己的歷史。記得的人越多，被遺忘就越難。
        </p>
      </div>

      {/* Author */}
      <div className="mt-12 border-t border-paper-300 pt-8 text-center">
        <p className="font-serif text-base text-ink-800">
          陳璿丞 醫師
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-neutral">
          <a
            href="https://anatomind.com"
            className="text-link-blue underline decoration-link-blue/30 underline-offset-2 hover:decoration-link-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            anatomind.com
          </a>
          <a
            href="https://facebook.com/anatomind"
            className="text-link-blue underline decoration-link-blue/30 underline-offset-2 hover:decoration-link-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>

      {/* Sister sites */}
      <div className="mt-8 rounded-lg border border-paper-300 bg-paper-100 px-4 py-4 text-center">
        <p className="mb-3 text-sm font-bold text-ink-800">系列網站</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          <a
            href="https://soanseng.github.io/the-lin/"
            className="text-link-blue underline decoration-link-blue/30 underline-offset-2 hover:decoration-link-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            林宅血案
          </a>
          <a
            href="https://soanseng.github.io/Chen-Wen-chen/"
            className="text-link-blue underline decoration-link-blue/30 underline-offset-2 hover:decoration-link-blue"
            target="_blank"
            rel="noopener noreferrer"
          >
            陳文成事件
          </a>
          <span className="text-neutral">江南案（本站）</span>
        </div>
      </div>
    </section>
  )
}
