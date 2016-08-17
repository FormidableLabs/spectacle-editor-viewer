const fontMap = {
  'openSans': 'Open Sans',
  'droidSansMono': 'Droid Sans Mono',
  'droidSerif': 'Droid Serif',
  'liberationSans': 'Liberation Sans',
  'overPass': 'Overpass',
  'ptSans': 'PT Sans Narrow',
  'raleway': 'Raleway',
  'roboto': 'Roboto'
};

const mapFont = (font) => {
  if (!font) {
    return font;
  }

  return fontMap[font];
};

export default mapFont;
