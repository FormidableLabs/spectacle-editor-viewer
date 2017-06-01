import React, { PropTypes } from 'react';
import * as Core from 'spectacle';
import sanitizeHtml from 'sanitize-html';
import theme from '../theme';

import Syntax from './syntax';
import migrate from '../migrations';

const { Spectacle, Deck, Slide, Appear } = Core;

Core.Plotly = (props) => <iframe {...props} />;
Core.CodePane = Syntax; // Use custom Syntax component for CodePane

const quoteStyles = {
  borderLeftWidth: '0.05em',
  borderLeftStyle: 'solid',
  borderLeftColor: 'inherit',
  paddingLeft: '0.5em',
};

const getStylesForText = (props, paragraphStyles) => {
  return Object.assign({}, paragraphStyles[props.paragraphStyle], props.style);
};

const escapeHtml = (str) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const isDangerousUrl = (url) => /^javascript:/i.test(url);

// Replace any markdown links using the javascript: protocol to a version that
// does nothing, i.e. "[Click for XSS](javascript:alert('XSS'))" becomes "[Click for XSS](javascript:;)"
const sanitizeMarkdown = (markdown) => {
  return markdown.replace(/\(javascript:.*?\)/ig, '(javascript:;)');
};

const renderChildren = (nodes, paragraphStyles, isListItem) =>
  nodes.map((node, i) => {
    // Text node
    if (typeof node === 'string') {
      const contents = escapeHtml(node).replace(/\n/g, '<br>');
      if (isListItem) {
        return (<li key={`line-${i}`} style={theme.components.listItem} dangerouslySetInnerHTML={{ __html: contents }} />);
      }
      return <span key={`line-${i}`} style={{ width: "100%", display: "block" }} dangerouslySetInnerHTML={{ __html: contents }} />;
    }

    // defaultText handling
    if (node.type === 'Text' && !node.children) {
      return node.defaultText;
    }

    const { type, children, props } = node;

    // Get component from Spectacle core
    let Tag = Core[type];

    /* eslint-disable react/prop-types */
    if (props.isQuote) {
      props.style = Object.assign({}, props.style, quoteStyles);
    }

    // Trap javascript: protocol links and replace with an href that does nothing
    const urlPropNames = ['href', 'src'];
    urlPropNames.forEach(propName => {
      if (props[propName] && isDangerousUrl(props[propName])) {
        props[propName] = "javascript:;";
      }
    });

    if (type === 'Markdown' && props.source) {
      // Sanitize markdown source
      props.source = sanitizeMarkdown(props.source);
    }

    if (type === 'Text' && !props.listType) {
      let contents;
      if (props.href) {
        contents = (
          <a href={props.href} style={{ textDecoration: 'inherit', color: 'inherit' }}>
            {renderChildren(children, paragraphStyles)}
          </a>
        )
      } else {
        contents = renderChildren(children, paragraphStyles);
      }

      return (
        <Tag key={node.id} {...props} style={{...getStylesForText(props, paragraphStyles)}}>
          {contents}
        </Tag>
      );
      /* eslint-enable react/prop-types */
    }

    if (type === 'Text' && props.listType) {
      Tag = (props.listType === 'ordered') ? 'ol' : 'ul';

      return (
        <Tag
          key={node.id}
          className="presentation-list"
          style={{ ...getStylesForText(props, paragraphStyles), margin: 0 }}
        >
          {children && renderChildren(children, paragraphStyles, true)}
        </Tag>
      );
    }

    // Render and recurse
    return (
      <Tag key={node.id} {...props}>
        {children && renderChildren(children, paragraphStyles)}
      </Tag>
    );
  });

const slideStyles = {
  flexDirection: "column"
};

const innerStyles = {
  height: 700,
  width: 1000,
  padding: 40
};

const renderSlides = ({slides, paragraphStyles}) =>
  slides.map((slide) => {
    if (slide.props.notes) {
      slide.props.notes = sanitizeHtml(slide.props.notes);
    }

    return (
      <Slide key={slide.id} {...slide.props} style={{...slide.props.style, ...slideStyles}} viewerScaleMode>
        <div style={innerStyles}>
          {slide.children && renderChildren(slide.children, paragraphStyles)}
        </div>
      </Slide>
    );
  });

const Viewer = (props) => {
  const presentation = migrate(props.content.presentation);
  return (
    <Spectacle theme={{ screen: theme, print: theme }} history={props.history}>
      <Deck transition={[]} globalStyles={false} progress="none">
        {renderSlides(presentation)}
      </Deck>
    </Spectacle>
  );
}

Viewer.propTypes = {
  content: PropTypes.object,
  history: PropTypes.object,
};

export default Viewer;

