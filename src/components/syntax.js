import React, { PropTypes, Component } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

import tomorrow from 'react-syntax-highlighter/dist/styles/tomorrow';
import tomorrowNight from 'react-syntax-highlighter/dist/styles/tomorrow-night';

import cpp from 'highlight.js/lib/languages/cpp';
import cs from 'highlight.js/lib/languages/cs';
import css from 'highlight.js/lib/languages/css';
import fsharp from 'highlight.js/lib/languages/fsharp';
import go from 'highlight.js/lib/languages/go';
import haskell from 'highlight.js/lib/languages/haskell';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import julia from 'highlight.js/lib/languages/julia';
import xml from 'highlight.js/lib/languages/xml';
import matlab from 'highlight.js/lib/languages/matlab';
import php from 'highlight.js/lib/languages/php';
import python from 'highlight.js/lib/languages/python';
import r from 'highlight.js/lib/languages/r';
import ruby from 'highlight.js/lib/languages/ruby';
import scala from 'highlight.js/lib/languages/scala';
import sql from 'highlight.js/lib/languages/sql';
import yaml from 'highlight.js/lib/languages/yaml';

import lowlight from 'lowlight/lib/core';

lowlight.registerLanguage('cpp', cpp);
lowlight.registerLanguage('cs', cs);
lowlight.registerLanguage('css', css);
lowlight.registerLanguage('fsharp', fsharp);
lowlight.registerLanguage('go', go);
lowlight.registerLanguage('haskell', haskell);
lowlight.registerLanguage('java', java);
lowlight.registerLanguage('javascript', javascript);
lowlight.registerLanguage('julia', julia);
lowlight.registerLanguage('xml', xml);
lowlight.registerLanguage('matlab', matlab);
lowlight.registerLanguage('php', php);
lowlight.registerLanguage('python', python);
lowlight.registerLanguage('r', r);
lowlight.registerLanguage('ruby', ruby);
lowlight.registerLanguage('scala', scala);
lowlight.registerLanguage('sql', sql);
lowlight.registerLanguage('yaml', yaml);

const styles = {
  tomorrow,
  tomorrowNight,
};

const STYLE_TAG_ID = '_spectacle-viewer-syntax-style';

class Syntax extends Component {

  componentDidMount() {
    if (document.getElementById(STYLE_TAG_ID)) return;
    const el = document.createElement('style');
    el.type = 'text/css';
    el.id = STYLE_TAG_ID;
    const cssText = '.spectacle-viewer-syntax code { font-family: inherit; }';
    if (el.styleSheet) {
      el.styleSheet.cssText = cssText;
    } else {
      el.appendChild(document.createTextNode(cssText));
    }
    document.head.appendChild(el);
  }

  shouldComponentUpdate(nextProps) {
    const { language, theme, style, source } = this.props;
    return (
      nextProps.language !== language ||
      nextProps.theme !== theme ||
      nextProps.source !== source ||
      JSON.stringify(nextProps.style) !== JSON.stringify(style)
    );
  }

  render() {
    const { language, theme, style, source } = this.props;
    return (
      <SyntaxHighlighter
        language={language}
        style={styles[theme]}
        customStyle={style}
        className="spectacle-viewer-syntax"
      >
        {source}
      </SyntaxHighlighter>
    );
  }
}

Syntax.propTypes = {
  language: PropTypes.string,
  theme: PropTypes.string,
  source: PropTypes.string,
  style: PropTypes.object,
};

export default Syntax;
