/* eslint-disable no-param-reassign */
import cloneDeep from 'lodash.clonedeep';

export default ({ version, presentation }) => {
  const cloned = cloneDeep(presentation);
  if (!version) {
    cloned.slides.forEach((slide) => {
      slide.children.forEach((childObj) => {
        // move width/height to inline styles
        childObj.props.style.width = childObj.props.style.width || childObj.props.width;
        delete childObj.props.width;
        childObj.props.style.height = childObj.props.style.height || childObj.props.height;
        delete childObj.props.height;

        // add newline to end of all lines
        if (childObj.type === 'Text') {
          childObj.children = childObj.children.map((line) => `${line}\n`);
        }
      });
    });
  }
  return cloned;
};
