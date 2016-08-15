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
      return node;
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

    if (type === 'Text' && props.href) {
      return (
        <Tag key={node.id} {...props}>
          <a href={props.href} style={{ textDecoration: 'inherit', color: 'inherit' }}>
            {renderChildren(children)}
          </a>
        </Tag>
      );
      /* eslint-enable react/prop-types */
    }
    if (node.props.listType) {
      Tag = (node.props.listType === 'ordered') ? 'ol' : 'ul';
      console.log(children);
      return (
        <Tag key={node.id} {...props}>
          {children && renderChildren(children, true)}
        </Tag>
      );
    }

    // Render and recurse
    return (
      <Tag key={node.id} {...props}>
        {children && renderChildren(children)}
      </Tag>
    );
  });

const slideStyles = {
  style: {
    flexDirection: "column"
  }
};

const innerStyles = {
  height: 700,
  width: 1000,
  padding: 40
};

const renderSlides = (slides) =>
  slides.map((slide) => (
    <Slide key={slide.id} {...{...slide.props, ...slideStyles}} viewerScaleMode>
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

