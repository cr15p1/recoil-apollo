/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-var-requires */
const { series, src, dest } = require("gulp");
const { readFileSync } = require("fs");
const { EOL } = require("os");
const replace = require("gulp-replace");

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
const buildDocks = () =>
  src("docsSrc/**/*.md", { buffer: true })
    .pipe(
      replace(/<!---\{(.*)\}--->/g, function (_, p1) {
        return Object.entries(JSON.parse(p1))
          .map(([key, value]) => parser[key](value, this.file.base))
          .join("");
      })
    )
    .pipe(dest("docs"));

module.exports.default = series(buildDocks);
