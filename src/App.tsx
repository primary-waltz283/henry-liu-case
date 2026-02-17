import CharacterMap from './components/infographic/CharacterMap'
import ContentWarning from './components/ui/ContentWarning'
import ChapterNav from './components/ui/ChapterNav'
import SourcesSection from './components/ui/SourcesSection'
import Afterword from './components/ui/Afterword'
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

        <footer className="py-16 text-center text-sm text-neutral">
          <p>本網站內容基於歷史文獻整理，所有引述均標註出處。</p>
          <p className="mt-2 text-xs text-neutral/60">
            &copy; {new Date().getFullYear()} 歷史紀錄計畫
          </p>
        </footer>
      </div>
    </ContentWarning>
  )
}

export default App
