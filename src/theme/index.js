/* eslint-disable object-shorthand */

// NOTE: Copied from spectacle

const defaultColors = {
  primary: 'white',
  secondary: 'black',
  tertiary: 'white',
  quartenary: 'black',
};

const defaultFonts = {
  primary: 'Open Sans',
  secondary: 'Lobster Two',
  tertiary: 'monospace',
};

const controlColors = {
  primary: '#eee',
  hover: '#ccc',
};

const screen = (colorArgs = defaultColors, fontArgs = defaultFonts) => {
  const colors = Object.assign({}, defaultColors, colorArgs);
  const fonts = Object.assign({}, defaultFonts, fontArgs);
  return {
    colors: colors,
    fonts: fonts,
    global: {
      body: {
        background: colors.primary,
        fontFamily: fonts.primary,
        fontWeight: 'normal',
        fontSize: '2em',
        color: colors.secondary,
        overflow: 'hidden',
      },
      'html, body': {
        height: '100%',
      },
      '*': {
        boxSizing: 'border-box',
      },
      'ol.presentation-list': {
        listStyleType: 'decimal',
      }
    },
    fullscreen: {
      fill: colors.tertiary,
    },
    controls: {
      prev: {
        position: 'absolute',
        top: '50%',
        left: 20,
        transform: 'translateY(-50%)',
        zIndex: 9999,
        background: 'none',
        border: 'none',
        outline: 0,
      },
      prevIcon: {
        fill: controlColors.primary,
        ':hover': {
          fill: controlColors.hover,
        },
      },
      next: {
        position: 'absolute',
        top: '50%',
        right: 20,
        transform: 'translateY(-50%)',
        zIndex: 9999,
        background: 'none',
        border: 'none',
        outline: 0,
      },
      nextIcon: {
        fill: controlColors.primary,
        ':hover': {
          fill: controlColors.hover,
        },
      },
    },
    progress: {
      pacman: {
        container: {
          position: 'absolute',
          bottom: '5px',
          left: '50%',
          transition: 'all 1s ease-in-out 0.2s',
          zIndex: 1000,
        },
        pacman: {
          position: 'absolute',
          transition: 'left 0.3s ease-in-out 0.2s',
          width: '20px',
          height: '20px',
          transform: 'translate(-5px, -5px)',
        },
        pacmanTop: {
          position: 'absolute',
          content: '',
          width: '20px',
          height: '10px',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
          background: colors.quartenary,
        },
        pacmanBottom: {
          position: 'absolute',
          content: '',
          width: '20px',
          height: '10px',
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
          background: colors.quartenary,
          top: '10px',
        },
        point: {
          position: 'absolute',
          float: 'left',
          background: 'transparent',
          width: '10px',
          height: '10px',
          borderWidth: 2,
          borderStyle: 'solid',
          borderColor: colors.quartenary,
          borderRadius: '50%',
          transition: 'all 0.01s ease-out 0.4s',
        },
      },
      bar: {
        container: {
          position: 'absolute',
          height: '10px',
          width: '100%',
          bottom: 0,
          left: 0,
          transition: 'all 1s ease-in-out 0.2s',
          zIndex: 1000,
        },
        bar: {
          height: '100%',
          background: colors.quartenary,
          transition: 'all 0.3s ease-out',
        },
      },
      number: {
        container: {
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 1000,
          color: colors.quartenary,
        },
      },
    },
    components: {
      blockquote: {
        textAlign: 'left',
        position: 'relative',
        display: 'inline-block',
        margin: 0,
      },
      quote: {
        borderLeft: `1px solid ${colors.primary}`,
        paddingLeft: 40,
        display: 'block',
        color: colors.primary,
        fontSize: '4.9rem',
        lineHeight: 1,
        fontWeight: 'bold',
      },
      cite: {
        color: colors.tertiary,
        display: 'block',
        clear: 'left',
        fontSize: '2rem',
        marginTop: 0,
      },
      content: {
        margin: '0 auto',
        textAlign: 'center',
        padding: 0
      },
      codePane: {
        pre: {
          margin: 'auto',
          fontSize: '0.8rem',
          fontWeight: 'normal',
          fontFamily: fonts.tertiary,
          minWidth: '100%',
          maxWidth: 800,
        },
        code: {
          textAlign: 'left',
          fontWeight: 'normal',
        },
      },
      code: {
        color: 'black',
        fontSize: '2.66rem',
        fontFamily: fonts.tertiary,
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.15)',
        padding: '0 10px',
        borderRadius: 3,
      },
      heading: {
        h1: {
          color: colors.tertiary,
          fontSize: '7.05rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: 0,
          zoom: 1,
        },
        h2: {
          color: colors.secondary,
          fontSize: '5.88rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: 0,
        },
        h3: {
          color: 'black',
          fontSize: '4.9rem',
          fontFamily: fonts.secondary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: 0,
        },
        h4: {
          color: 'black',
          fontSize: '3.82rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: 0,
        },
        h5: {
          color: 'black',
          fontSize: '3.19rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: 0,
        },
        h6: {
          color: 'black',
          fontSize: '2.66rem',
          fontFamily: fonts.primary,
          lineHeight: 1,
          fontWeight: 'bold',
          margin: 0,
        },
      },
      image: {
        display: 'block',
        margin: 0,
      },
      link: {
        textDecoration: 'none',
      },
      listItem: {
        fontSize: '2.66rem',
      },
      list: {
        textAlign: 'left',
        listStylePosition: 'inside',
        padding: 0,
      },
      s: {
        strikethrough: {},
      },
      tableHeaderItem: {
        fontSize: '2.66rem',
        fontWeight: 'bold',
      },
      tableItem: {
        fontSize: '2.66rem',
      },
      table: {
        width: '100%',
      },
      text: {
        color: 'black',
        fontSize: '2.66rem',
        fontFamily: fonts.primary,
        margin: 0,
      },
    },
  };
};

export default screen();
