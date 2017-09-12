const ALLOWED_PROTOCOLS = ['//', 'http://', 'https://', 'mailto://', 'data:image/gif',
  'data:image/png', 'data:image/jpeg', 'data:image/webp'];
const ALLOWED_SPECTACLE_ELEMENTS = ['CodePane', 'Text', 'Image', 'Plotly'];

const isDangerousUri = (uri) => !ALLOWED_PROTOCOLS.some(proto => uri.startsWith(proto));

// If good URI, return it. Otherwise return empty string.
export const sanitizeUri = (uri) => {
  const decodedUri = decodeURIComponent(uri);
  return !isDangerousUri(decodedUri) ? decodedUri : '';
};

export const passAllowedSpectacleElements = node => (
  typeof node === 'string' ||
  (typeof node === 'object' && ALLOWED_SPECTACLE_ELEMENTS.indexOf(node.type) !== -1)
);
