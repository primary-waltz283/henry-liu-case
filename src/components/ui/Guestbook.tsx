import Giscus from '@giscus/react'

/**
 * 留言板 — Giscus-powered comment section backed by GitHub Discussions.
 */
export default function Guestbook() {
  return (
    <section
      id="guestbook"
      className="mx-auto max-w-3xl px-4 py-16"
      aria-labelledby="guestbook-heading"
    >
      <h2
        id="guestbook-heading"
        className="mb-4 text-center font-serif text-2xl font-bold text-ink-900 md:text-3xl"
      >
        留言板
      </h2>

      <p className="mb-8 text-center text-sm leading-relaxed text-neutral">
        留言會保存在{' '}
        <a
          href="https://github.com/soanseng/henry-liu-case/discussions"
          className="text-link-blue underline decoration-link-blue/30 underline-offset-2 hover:decoration-link-blue"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Discussions
        </a>
        ，需要 GitHub 帳號登入。你也可以直接到 Discussions 頁面發表。
      </p>

      <Giscus
        repo="soanseng/henry-liu-case"
        repoId="R_kgDORSEDdg"
        category="General"
        categoryId="DIC_kwDORSEDds4C2nQw"
        mapping="specific"
        term="留言板 Guestbook"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="noborder_light"
        lang="zh-TW"
        loading="lazy"
      />
    </section>
  )
}
