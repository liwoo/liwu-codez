module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}', 
    './src/pages/**/*.{ts,tsx,js,jsx}'
  ],
  // next-themes writes both `class` and `data-theme` on <html>, so Tailwind's
  // `dark:` variant and daisyUI's themes always switch together
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        xl: '8rem',
        '2xl': '18rem'
      }
    },
    extend: {
      colors: {
        offBlack: '#032F4C',
        offWhite: '#D2CBCB',
        personal: "#D044BB",
        professional: "#493BB4",
        education: "#D9914D",
        other: "#70D94D",
      },
      screens: {
        "xs": "390px"
      },
      fontFamily: {
        SpaceGrotesk: ["Space Grotesk", "sans-serif"] 
      },
      animation: {
        logos: 'slide 30s linear infinite',
        logosMd: 'slideMd 30s linear infinite',
        logosLg: 'slideLg 20s linear infinite',
        logosXl: 'slideXl 20s linear infinite',
      },
      keyframes: {
        slide: {
          from: {transform: `translateX(0%)`},
          to: {transform: `translateX(-100%)`}
        },
        slideMd: {
          from: {transform: `translateX(100%) translateY(-100%)`},
          to: {transform: `translateX(0%) translateY(-100%)`}
        },
        slideLg: {
          from: {transform: `translateX(0%)`},
          to: {transform: `translateX(-50%)`}
        },
        slideXl: {
          from: {transform: `translateX(0%)`},
          to: {transform: `translateX(-25%)`}
        },
      }
    },
    /* Most of the time we customize the font-sizes,
     so we added the Tailwind default values here for
     convenience */
    fontSize: {
      xs: ".75rem",
      sm: ".875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      '2xl': "1.5rem",
      '3xl': "1.875rem",
      '4xl': "2.25rem",
      '5xl': "3rem",
      '6xl': "4rem"
    },
    /* We override the default font-families with our own default prefs  */
    fontFamily: {
      'sans':['-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
      'serif': ['Georgia', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'], 
      'mono': [ 'Menlo', 'Monaco', 'Consolas', 'Roboto Mono', 'SFMono-Regular', 'Segoe UI', 'Courier', 'monospace']
    },
  },
  variants: {
    width: ['responsive']
  },
  daisyui: {
    // Every token is set explicitly so nothing is auto-derived differently per theme.
    // base-content is the text/icon colour (offBlack in light, offWhite in dark),
    // base-200 is the card/surface colour.
    themes: [
      {
        light: {
          "primary": "#33669A",
          "primary-content": "#FFFFFF",
          "secondary": "#FCEE20",
          "secondary-content": "#032F4C",
          "accent": "#FAD9BA",
          "accent-content": "#032F4C",
          "neutral": "#4B547B",
          "neutral-content": "#F2EFEF",
          "base-100": "#90CDF4",
          "base-200": "#D7ECFA",
          "base-300": "#B4DCF6",
          "base-content": "#032F4C",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
      {
        dark: {
          "primary": "#FCEE20",
          "primary-content": "#110E0E",
          "secondary": "#33669A",
          "secondary-content": "#F2EFEF",
          "accent": "#631948",
          "accent-content": "#F2EFEF",
          "neutral": "#200C29",
          "neutral-content": "#D2CBCB",
          "base-100": "#110E0E",
          "base-200": "#1D1519",
          "base-300": "#2A1E24",
          "base-content": "#D2CBCB",
          "info": "#3ABFF8",
          "success": "#36D399",
          "warning": "#FBBD23",
          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")]
}
