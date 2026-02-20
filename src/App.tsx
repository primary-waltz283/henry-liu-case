import CharacterMap from './components/infographic/CharacterMap'
import ContentWarning from './components/ui/ContentWarning'
import ChapterNav from './components/ui/ChapterNav'
import SourcesSection from './components/ui/SourcesSection'
import Afterword from './components/ui/Afterword'
import Guestbook from './components/ui/Guestbook'
import ChapterDivider from './components/narrative/ChapterDivider'
import FadeInSection from './components/narrative/FadeInSection'
import {
  Prologue,
  Chapter01,
  Chapter02,
  Chapter03,
  Chapter04,
  Chapter05,
  Chapter06,
  Chapter07,
} from './chapters'

function App() {
  return (
    <ContentWarning message="本網站包含歷史暴力事件的描述，包括暗殺細節與相關影像。內容基於歷史文獻，旨在忠實呈現歷史事實。">
      <ChapterNav />
      <div className="min-h-screen bg-paper-50 text-ink-700">
        <header className="py-16 text-center">
          <FadeInSection>
            <h1 className="font-serif text-4xl font-bold text-ink-900 md:text-5xl">
              江南案 — 解密檔案
            </h1>
          </FadeInSection>
          <FadeInSection delay={200}>
            <p className="mt-4 text-lg text-neutral">
              1984 年劉宜良暗殺事件互動式歷史紀錄
            </p>
          </FadeInSection>
          <FadeInSection delay={400}>
            <div className="mx-auto mt-8 h-px w-32 bg-paper-300" />
          </FadeInSection>
        </header>

        <a href="#main-content" className="skip-link">
          跳至主要內容
        </a>

        <main id="main-content">
          <Prologue />
          <ChapterDivider stamp="機密" />
          <Chapter01 />
          <ChapterDivider />
          <Chapter02 />
          <ChapterDivider />
          <Chapter03 />
          <ChapterDivider stamp="鋤奸" />
          <Chapter04 />
          <ChapterDivider />
          <Chapter05 />
          <ChapterDivider />
          <Chapter06 />
          <ChapterDivider />
          <Chapter07 />
        </main>

        {/* Global: Character relationship map */}
        <CharacterMap />

        <SourcesSection />

        <Afterword />

        <Guestbook />

        {/* ── Series Websites ── */}
        <section className="border-t border-paper-300 py-16">
          <div className="mx-auto max-w-2xl px-4 text-center">
            <h2 className="mb-2 font-serif text-xl font-bold text-ink-900">系列網站</h2>
            <p className="mb-8 text-xs tracking-wider text-neutral">
              台灣威權時代重大案件 · 互動式歷史紀錄
            </p>
            <div className="space-y-3 text-left">
              {[
                { title: '林宅血案', url: 'https://lin.nectamen.com/', description: '1980 年林義雄家宅血案' },
                { title: '陳文成事件', url: 'https://cwc.nectamen.com/', description: '1981 年陳文成命案' },
                { title: '江南案', url: 'https://liu.nectamen.com/', description: '1984 年劉宜良命案（本站）', current: true },
                { title: '鄭南榕事件', url: 'https://nylon.nectamen.com/', description: '1989 年鄭南榕自焚事件' },
              ].map((site) => (
                <a
                  key={site.url}
                  href={site.current ? undefined : site.url}
                  target={site.current ? undefined : '_blank'}
                  rel={site.current ? undefined : 'noopener noreferrer'}
                  aria-current={site.current ? 'page' : undefined}
                  className={`block border px-4 py-3 transition-colors ${
                    site.current
                      ? 'cursor-default border-paper-300 bg-paper-100'
                      : 'border-paper-300 hover:border-paper-400 hover:bg-paper-100'
                  }`}
                >
                  <span className="text-sm font-medium text-ink-800">
                    {site.title}
                    {site.current && <span className="ml-2 text-xs text-neutral">← 本站</span>}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral">{site.description}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <footer className="py-16 text-center text-sm text-neutral">
          <p>本網站內容基於歷史文獻整理，所有引述均標註出處。</p>
          <p className="mt-2 text-xs text-neutral/60">
            &copy; {new Date().getFullYear()} 歷史紀錄計畫
          </p>
          <p className="mt-2 text-xs text-neutral/60">
            <a
              href="https://github.com/soanseng/henry-liu-case"
              className="text-link-blue underline decoration-link-blue/30 underline-offset-2 hover:decoration-link-blue"
              target="_blank"
              rel="noopener noreferrer"
            >
              Source Code on GitHub
            </a>
          </p>
        </footer>
      </div>
    </ContentWarning>
  )
}

export default App
