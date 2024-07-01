const https = require('https');
const fs = require('fs');

// URL of the PNG image
const imageUrl = 'https://raw.githubusercontent.com/user/repo/branch/image.png';

// Function to fetch image and convert to base64
function fetchImageAsBase64(url, callback) {
  https.get(url, (res) => {
    const data = [];
    res.on('data', (chunk) => {
      data.push(chunk);
    }).on('end', () => {
      const buffer = Buffer.concat(data);
      const base64 = buffer.toString('base64');
      callback(base64);
    });
  }).on('error', (err) => {
    console.error(err);
    callback(null);
  });
}

// Function to generate SVG with the base64 image
function generateSVG(base64) {
  return `
<svg width="666" height="666" xmlns="http://www.w3.org/2000/svg">
  <image href="data:image/png;base64,${base64}" height="666" width="666"/>
</svg>
  `;
}

// Fetch the image and generate SVG
fetchImageAsBase64(imageUrl, (base64) => {
  if (base64) {
    const svgContent = generateSVG(base64);
    fs.writeFile('output.svg', svgContent, (err) => {
      if (err) {
        console.error('Error writing SVG file:', err);
      } else {
        console.log('SVG file has been saved.');
      }
    });
  } else {
    console.log('Failed to fetch image.');
  }
});
