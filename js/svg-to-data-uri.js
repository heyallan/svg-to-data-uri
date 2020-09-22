function svgToDataURI(svg) {
  svg = svg.trim();
  // remove xml, doctype, generator...
  svg = svg.slice(svg.indexOf('<svg'));
  // soft validate
  if (!svg.startsWith('<svg') || !svg.endsWith('svg>')) return;
  // add namespace if necessary
  if (!svg.includes('http://www.w3.org/2000/svg')) svg = svg.replace(/<svg/g, `<svg xmlns='http://www.w3.org/2000/svg'`);
  // remove comments
  svg = svg.replace(/<!--.{1,}-->/g, '');
  // remove unnecessary attributes
  svg = svg.replace(/version=[\"\'](.{0,}?)[\"\'](?=[\s>])/g, '');
  svg = svg.replace(/id=[\"\'](.{0,}?)[\"\'](?=[\s>])/g, '');
  svg = svg.replace(/class=[\"\'](.{0,}?)[\"\'](?=[\s>])/g, '');
  // replace nested quotes
  svg = svg.replace(/"'(.{1,})'"/g, '\'$1\'');
  // replace double quotes
  svg = svg.replace(/"/g, '\'');
  // remove empty spaces between tags
  svg = svg.replace(/>\s{1,}</g, '><');
  // remove duplicate spaces
  svg = svg.replace(/\s{2,}/g, ' ');
  // trim again
  svg = svg.trim();
  // soft validate again
  if (!(svg.startsWith('<svg')) || !(svg.endsWith('svg>'))) return;
  // replace ampersand
  svg = svg.replace(/&/g, '&amp;');
  // encode only unsafe symbols
  svg = svg.replace(/[%#<>?\[\\\]^`{|}]/g, encodeURIComponent);
  // build data uri
  svg = `data:image/svg+xml,${svg}`;
  // ok, ship it!
  return svg;
}
