const plugin = require("tailwindcss/plugin")
const fs = require("fs")
const path = require("path")

const colorsNotUsingScale = [
  "black",
  "white"
]

const colorsUsingScale = [
  "blue",
  "green"
]

const safelist = []

colorsNotUsingScale.forEach(color => {
  safelist.push(`text-${color}`)
})

colorsUsingScale.forEach(color => {
  for (let i = 0; i <= 9; i += 1) {
    safelist.push(`text-${color}-${i}`)
  }
});

module.exports = {
  content: [
    "./js/**/*.js",
    "../lib/*_web.ex",
    "../lib/*_web/**/*.*ex",
    "../lib/*_web/**/*.sface"
  ],
  safelist: safelist,
  theme: { // GitHub Primer
    boxShadow: {
      'sm': '0 1px 0 rgba(27, 31, 36, 0.04)',
      'md': '0 3px 6px rgba(140, 149, 159, 0.15)',
      'lg': '0 8px 24px rgba(140, 149, 159, 0.2)',
      'xl': '0 12px 28px rgba(140, 149, 159, 0.3)',
    },
    colors: {
      black: '#1b1f24',
      blue: {
        0: '#ddf4ff',
        1: '#b6e3ff',
        2: '#80ccff',
        3: '#54aeff',
        4: '#218bff',
        5: '#0969da',
        6: '#0550ae',
        7: '#033d8b',
        8: '#0a3069',
        9: '#002155',
      },
      current: 'currentColor',
      gray: {
        0: '#f6f8fa',
        1: '#eaeef2',
        2: '#d0d7de',
        3: '#afb8c1',
        4: '#8c959f',
        5: '#6e7781',
        6: '#57606a',
        7: '#424a53',
        8: '#32383f',
        9: '#24292f',
      },
      green: {
        0: '#dafbe1',
        1: '#aceebb',
        2: '#6fdd8b',
        3: '#4ac26b',
        4: '#2da44e',
        5: '#1a7f37',
        6: '#116329',
        7: '#044f1e',
        8: '#003d16',
        9: '#002d11',
      },
      purple: {
        5: "#8250df",
      },
      red: {
        0: '#ffebe9',
        1: '#ffcecb',
        2: '#ffaba8',
        3: '#ff8182',
        4: '#fa4549',
        5: '#cf222e',
        6: '#a40e26',
        7: '#82071e',
        8: '#660018',
        9: '#4c0014'
      },
      transparent: 'transparent',
      white: '#ffffff',
      yellow: {
        0: '#fff8c5',
        1: '#fae17d',
        2: '#eac54f',
        3: '#d4a72c',
        4: '#bf8700',
        5: '#9a6700',
        6: '#7d4e00',
        7: '#633c01',
        8: '#4d2d00',
        9: '#3b2300'
      },
      "marketing-primary-button": "#2ea44f",
      // --color-btn-primary-selected-bg
      "primary-button-active": "#298e46",
      // --color-btn-primary-hover-bg
      "primary-button-hover": "#2c974b",
      // --color-btn-active-bg
      "secondary-button-active": "#ebecf0",
      // --color-btn-hover-bg
      "secondary-button-hover": "#f3f4f6",
    },
    fontFamily: {
      'mono': '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace !default',
      'sans': '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // Allows prefixing tailwind classes with LiveView classes to add rules
    // only when LiveView classes are applied, for example:
    //
    //     <div class="phx-click-loading:animate-ping">
    //
    plugin(({addVariant}) => addVariant("phx-no-feedback", [".phx-no-feedback&", ".phx-no-feedback &"])),
    plugin(({addVariant}) => addVariant("phx-click-loading", [".phx-click-loading&", ".phx-click-loading &"])),
    plugin(({addVariant}) => addVariant("phx-submit-loading", [".phx-submit-loading&", ".phx-submit-loading &"])),
    plugin(({addVariant}) => addVariant("phx-change-loading", [".phx-change-loading&", ".phx-change-loading &"])),

    // TODO: consider - remove
    // Embeds Hero Icons (https://heroicons.com) into your app.css bundle
    // See your `CoreComponents.icon/1` for more information.
    //
    plugin(function({matchComponents, theme}) {
      let iconsDir = path.join(__dirname, "../priv/hero_icons/optimized")
      let values = {}
      let icons = [
        ["", "/24/outline"],
        ["-solid", "/24/solid"],
        ["-mini", "/20/solid"]
      ]
      icons.forEach(([suffix, dir]) => {
        fs.readdirSync(path.join(iconsDir, dir)).map(file => {
          let name = path.basename(file, ".svg") + suffix
          values[name] = {name, fullPath: path.join(iconsDir, dir, file)}
        })
      })
      matchComponents({
        "hero": ({name, fullPath}) => {
          let content = fs.readFileSync(fullPath).toString().replace(/\r?\n|\r/g, "")
          return {
            [`--hero-${name}`]: `url('data:image/svg+xml;utf8,${content}')`,
            "-webkit-mask": `var(--hero-${name})`,
            "mask": `var(--hero-${name})`,
            "background-color": "currentColor",
            "vertical-align": "middle",
            "display": "inline-block",
            "width": theme("spacing.5"),
            "height": theme("spacing.5")
          }
        }
      }, {values})
    })
  ]
}