const fs = require("fs")
const UglifyJS = require("uglify-js")
const minify = require('html-minifier').minify
const sass = require('sass')
var CleanCSS = require('clean-css')



const gatheredCss = fs.readdirSync("./src")
    .filter(file => file.endsWith(".css"))
    .map(file => "./src/"+file)
    .map(file => fs.readFileSync(file).toString())
    .join("\n")
const sassResult = sass.compile("./dev.scss")
const minifiedCss = new CleanCSS().minify(gatheredCss + "\n" + sassResult.css)
fs.writeFileSync("./index.css", minifiedCss.styles)
console.log("## CSS - OK")


const minifiedHtml = minify(fs.readFileSync("./dev.html").toString(), {
    removeAttributeQuotes: true,
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    useShortDoctype: true, 
    minifyJS: true,
    minifyCSS: true
})
fs.writeFileSync("./index.html", minifiedHtml)
console.log("## HTML - OK")


const minifiedJs = UglifyJS.minify(fs.readdirSync("./src")
    .filter(file => file.endsWith(".js"))
    .map(file => "./src/"+file)
    .map(file => fs.readFileSync(file).toString())
    .join("\n")
)
if(!minifiedJs.error) {
    fs.writeFileSync("./index.js", minifiedJs.code)
    console.log("## JS - OK")
} else {
    console.log(`!! The following error occured when minifing js: ${minifiedJs.error}`)
}