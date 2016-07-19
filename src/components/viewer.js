import React, { PropTypes } from 'react';
import * as Core from 'spectacle';
import theme from '../theme';

const { Spectacle, Deck, Slide, Appear } = Core;

Core.Plotly = (props) => <iframe {...props} />;

const renderChildren = (nodes) =>
  nodes.map((node) => {
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
    const Tag = Core[type];

    // Wrap ListItems in Appear
    if (node.type === 'ListItem') {
      return (
        <Appear>
          <Tag key={node.id} {...props}>
            {children && renderChildren(children)}
          </Tag>
        </Appear>
      );
    }

    // Render and recurse
    return (
      <Tag key={node.id} {...props}>
        {children && renderChildren(children)}
      </Tag>
    );
  });

const renderSlides = (slides) =>
  slides.map((slide) => (
    <Slide key={slide.id}>
      {slide.children && renderChildren(slide.children)}
    </Slide>
  ));

const Viewer = (props) => (
  <Spectacle theme={{ screen: theme, print: theme }}>
    <Deck transition={[]}>
      {renderSlides(props.presentation.content.slides)}
    </Deck>
  </Spectacle>
);

Viewer.propTypes = {
  presentation: PropTypes.object,
};

export default Viewer;

