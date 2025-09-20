import { pathToRoot } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  return (
    <h2 class={classNames(displayClass, "page-title")}>
      <a href={baseDir}>{title}</a>
    </h2>
  )
}

PageTitle.css = `
@font-face {
  font-family: 'Biro Script';
  src: url('./static/BiroScriptUSPlus-Regular.ttf') format('truetype');
  font-display: swap;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
  font-family: 'Biro Script', var(--titleFont);
}
`

export default (() => PageTitle) satisfies QuartzComponentConstructor
