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

const renderChildren = (nodes, isListItem) =>
  nodes.map((node, i) => {
    if (typeof node === 'string' && isListItem) {
      return (<li key={`list-item-${i}`} style={theme.components.listItem}>{node}</li>);
    }
    // Text node
    if (typeof node === 'string') {
      const line = node.replace(/\n/g, "");

      if (line.length) {
        return <span style={{width: "100%", display: "block"}}>{line}</span>;
      }

      const emptyLineStyles = {
        width: "100%",
        margin: 0,
        display: "block",
        minHeight: "1em",
        padding: 0,
        position: "relative",
      };

      return (<span style={emptyLineStyles}>&nbsp;</span>);
    }

    // defaultText handling

    if (node.type === 'Text' && !node.children) {
      return node.defaultText;
    }

    const { type, children, props: properties } = node;

    // Get component from Spectacle core
    let Tag = Core[type];

    /* eslint-disable react/prop-types */
    if (properties.isQuote) {
      properties.style = Object.assign({}, properties.style, quoteStyles);
    }

    if (type === 'Text' && properties.href) {
      return (
        <Tag key={node.id} {...properties}>
          <a href={properties.href} style={{ textDecoration: 'inherit', color: 'inherit' }}>
            {renderChildren(children)}
          </a>
        </Tag>
      );
      /* eslint-enable react/prop-types */
    }

    if (properties.listType) {
      Tag = (properties.listType === 'ordered') ? 'ol' : 'ul';

      return (
        <Tag key={node.id} {...properties} className="presentation-list">
          {children && renderChildren(children, true)}
        </Tag>
      );
    }
    console.log({...properties});
    console.log(children);
    // Render and recurse
    return (
      <Tag key={node.id} {...properties}>
        {children && renderChildren(children)}
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

const renderSlides = (slides) =>
  slides.map((slide) => (
    <Slide key={slide.id} {...slide.props} style={{...slide.props.style, ...slideStyles}} viewerScaleMode>
      <div style={innerStyles}>
        {slide.children && renderChildren(slide.children)}
      </div>
    </Slide>
  ));

const Viewer = (props) => (
  <Spectacle theme={{ screen: theme, print: theme }} history={props.history}>
    <Deck transition={[]} globalStyles={false}>
      {renderSlides(props.content.presentation.slides)}
    </Deck>
  </Spectacle>
);

Viewer.propTypes = {
  content: PropTypes.object,
  history: PropTypes.object,
};

export default Viewer;

