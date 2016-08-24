import React, { PropTypes } from 'react';
import * as Core from 'spectacle';
import theme from '../theme';

const { Spectacle, Deck, Slide, Appear } = Core;

Core.Plotly = (props) => <iframe {...props} />;

const quoteStyles = {
  borderLeftWidth: '0.05em',
  borderLeftStyle: 'solid',
  borderLeftColor: 'inherit',
  paddingLeft: '0.5em',
};

const getStylesForText = (props, paragraphStyles) => {
  return Object.assign({}, paragraphStyles[props.paragraphStyle], props.style);
};

const renderChildren = (nodes, paragraphStyles, isListItem) =>
  nodes.map((node, i) => {
    if (typeof node === 'string' && isListItem) {
      return (<li key={`list-item-${i}`} style={theme.components.listItem}>{node}</li>);
    }
    // Text node
    if (typeof node === 'string') {
      return node.replace(/\n$/, "").split("\n").map((line, k) => (
        <span style={{width: "100%", display: "block"}}>
          {line.trim() === "" ? "\u200B" : line}
        </span>
      ));
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
          style={{...getStylesForText(props, paragraphStyles)}}
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
  slides.map((slide) => (
    <Slide key={slide.id} {...slide.props} style={{...slide.props.style, ...slideStyles}} viewerScaleMode>
      <div style={innerStyles}>
        {slide.children && renderChildren(slide.children, paragraphStyles)}
      </div>
    </Slide>
  ));

const Viewer = (props) => (
  <Spectacle theme={{ screen: theme, print: theme }} history={props.history}>
    <Deck transition={[]} globalStyles={false} progress="none">
      {renderSlides(props.content.presentation)}
    </Deck>
  </Spectacle>
);

Viewer.propTypes = {
  content: PropTypes.object,
  history: PropTypes.object,
};

export default Viewer;

