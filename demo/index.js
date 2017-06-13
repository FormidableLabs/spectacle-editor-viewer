import React from 'react';
import { render } from 'react-dom';

import { Viewer } from '../src/';
import json from './test.json';
// import json from './data-url.json';
// import json from './xss-notes.json';

const Demo = () => <Viewer content={json} />;

render(<Demo />, document.getElementById('root'));
