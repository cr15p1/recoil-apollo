/* eslint-disable global-require */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const { series, src, dest, t } = require("gulp");
const { readFileSync } = require("fs");
const { EOL } = require("os");
const replace = require("gulp-replace");
const tap = require("gulp-tap");

const markdownIt = require("markdown-it");

// require markdown-it plugins
const abbr = require("markdown-it-abbr");
const alerts = require("markdown-it-alerts");
const anc = require("markdown-it-anchor");
const attrs = require("markdown-it-attrs");
const figs = require("markdown-it-implicit-figures");
const kbd = require("markdown-it-kbd");
const toc = require("markdown-it-table-of-contents");
const list = require("markdown-it-task-lists");
const highlight = require("markdown-it-highlightjs");

// Markdown-It Options
const options = {
  preset: "default",
  html: true,
  xhtmlOut: true,
  linkify: true,
  typographer: true,
};

const md = markdownIt("commonmark", options)
  .use(highlight, {
    auto: true,

    register: {
      typescript: require("highlight.js/lib/languages/typescript"),
    },
    hljs: require("highlight.js"),
  })
  .use(abbr)
  .use(alerts)
  .use(anc)
  .use(attrs)
  .use(figs)
  .use(kbd)
  .use(toc)
  .use(list);

function markdownToHtml(file) {
  const result = md.render(file.contents.toString());
  console.log(result);
  file.contents = Buffer.from(result);
  file.path = file.path.replace(/\.md$/, ".html");
}

const parser = {
  code: (config, fileBase) => {
    let fileContent = readFileSync(`${fileBase}/${config.file}`).toString();
    if (config.removeImports) {
      fileContent = fileContent.replace(
        /^((?!^let|^const|^interface|^type|^class|^export).)*/ms,
        ""
      );
    }
    return [`\`\`\`${config.language || ""}`, fileContent, "```"].join(EOL);
  },
};
const markdown = () =>
  src("docsSrc/**/*.md", { buffer: true })
    .pipe(
      replace(/<!---\{(.*)\}--->/g, function (_, p1) {
        return Object.entries(JSON.parse(p1))
          .map(([key, value]) => parser[key](value, this.file.base))
          .join("");
      })
    )
    .pipe(tap(markdownToHtml))
    .pipe(
      tap((file) => {
        file.contents = Buffer.from(
          [
            `<link rel="stylesheet" type="text/css" href="vs2015.css">`,
            file.contents.toString(),
          ].join(" ")
        );
      })
    )
    .pipe(dest("_site"));

const styles = () =>
  src("node_modules/highlight.js/styles/vs2015.css").pipe(dest("_site"));

module.exports.default = series(markdown, styles);
