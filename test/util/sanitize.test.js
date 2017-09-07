const { expect } = require('chai');
const { passAllowedSpectacleElements, sanitizeUri } = require('../../src/util/sanitize');

describe('util/sanitize', () => {
  describe('passAllowedSpectacleElements', () => {
    it('allows Text', () => {
      expect(passAllowedSpectacleElements({ type: 'Text' })).to.equal(true);
    });

    it('allows Image', () => {
      expect(passAllowedSpectacleElements({ type: 'Image' })).to.equal(true);
    });

    it('allows Plotly', () => {
      expect(passAllowedSpectacleElements({ type: 'Plotly' })).to.equal(true);
    });

    it('allows CodePane', () => {
      expect(passAllowedSpectacleElements({ type: 'CodePane' })).to.equal(true);
    });

    it('disallows Markdown', () => {
      expect(passAllowedSpectacleElements({ type: 'Markdown' })).to.equal(false);
    });
  });

  describe('sanitizeUri', () => {
    it('allows http', () => {
      const uri = 'http://foo.bar';
      expect(sanitizeUri(uri)).to.equal(uri);
    });

    it('allows https', () => {
      const uri = 'https://foo.bar';
      expect(sanitizeUri(uri)).to.equal(uri);
    });

    it('allows relative protocol', () => {
      const uri = '//foo.bar';
      expect(sanitizeUri(uri)).to.equal(uri);
    });

    it('allows data:image/gif', () => {
      const uri = 'data:image/gif;base64,foo';
      expect(sanitizeUri(uri)).to.equal(uri);
    });

    it('allows data:image/png', () => {
      const uri = 'data:image/png;base64,foo';
      expect(sanitizeUri(uri)).to.equal(uri);
    });

    it('allows data:image/jpeg', () => {
      const uri = 'data:image/jpeg;base64,foo';
      expect(sanitizeUri(uri)).to.equal(uri);
    });

    it('allows data:image/webp', () => {
      const uri = 'data:image/webp;base64,foo';
      expect(sanitizeUri(uri)).to.equal(uri);
    });

    it('disallows javascript:', () => {
      const uri = 'javascript:alert(document.cookie)'; // eslint-disable-line no-script-url
      expect(sanitizeUri(uri)).to.equal('');
    });

    it('disallows javascript%3A', () => {
      const uri = 'javascript%3Aalert(document.cookie)'; // eslint-disable-line no-script-url
      expect(sanitizeUri(uri)).to.equal('');
    });

    it('disallows javascript&#58;', () => {
      const uri = 'javascript&#58;alert(document.cookie)'; // eslint-disable-line no-script-url
      expect(sanitizeUri(uri)).to.equal('');
    });

    it('disallows javascript&#x3a;', () => {
      const uri = 'javascript&#x3a;alert(document.cookie)'; // eslint-disable-line no-script-url
      expect(sanitizeUri(uri)).to.equal('');
    });

    it('disallows javascript&#x003a;', () => {
      const uri = 'javascript&#x003a;alert(document.cookie)'; // eslint-disable-line no-script-url
      expect(sanitizeUri(uri)).to.equal('');
    });

    it('disallows data:text/html', () => {
      const uri = 'data:text/html;base64,foo';
      expect(sanitizeUri(uri)).to.equal('');
    });
  });
});
