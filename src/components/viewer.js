import React, { PropTypes } from 'react';
import * as Core from 'spectacle';
import theme from '../theme';

import Syntax from "./syntax";

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

// older way of rendering text, preservered for backcompat
const renderPreVersionedText = (node, isListItem, i) => {
  const contents = node.split("\n").map((line, k) => (
    <span key={`line-${k}`} style={{width: "100%", display: "block"}}>
      {line === "" ? "\u200B" : line}
    </span>
  ));
  if (isListItem) {
    return (<li key={`list-item-${i}`} style={theme.components.listItem}>{contents}</li>);
  }
  return contents;
}

const renderChildren = (version, nodes, paragraphStyles, isListItem) =>
  nodes.map((node, i) => {
    // Text node
    if (typeof node === 'string') {
      if (!version) {
        return renderPreVersionedText(node, isListItem, i);
      }
      const contents = escapeHtml(node).replace(/\n/g, () => "<br>");
      if (isListItem) {
        return (<li key={`list-item-${i}`} style={theme.components.listItem} dangerouslySetInnerHTML={{ __html: contents }} />);
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

    if (type === 'Text' && !props.listType) {
      let contents;
      if (props.href) {
        contents = (
          <a href={props.href} style={{ textDecoration: 'inherit', color: 'inherit' }}>
            {renderChildren(version, children, paragraphStyles)}
          </a>
        )
      } else {
        contents = renderChildren(version, children, paragraphStyles);
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
          {children && renderChildren(version, children, paragraphStyles, true)}
        </Tag>
      );
    }

    // Render and recurse
    return (
      <Tag key={node.id} {...props}>
        {children && renderChildren(version, children, paragraphStyles)}
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

const renderSlides = ({version, presentation: {slides, paragraphStyles}}) =>
  slides.map((slide) => (
    <Slide key={slide.id} {...slide.props} style={{...slide.props.style, ...slideStyles}} viewerScaleMode>
      <div style={innerStyles}>
        {slide.children && renderChildren(version, slide.children, paragraphStyles)}
      </div>
    </Slide>
  ));

const Viewer = (props) => (
  <Spectacle theme={{ screen: theme, print: theme }} history={props.history}>
    <Deck transition={[]} globalStyles={false} progress="none">
      {renderSlides(props.content)}
    </Deck>
  </Spectacle>
);

Viewer.propTypes = {
  content: PropTypes.object,
  history: PropTypes.object,
};

export default Viewer;

