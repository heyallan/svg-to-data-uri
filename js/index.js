/** ------------- logic ------------- */

const inputField = document.querySelector('#input');
const outputField = document.querySelector('#output');
const markupField = document.querySelector('#html');
const previewImg = document.querySelector('#preview');
localStorage.setItem('previewPlaceholder', previewImg.src);
const previewPlaceholder = localStorage.getItem('previewPlaceholder');

document.addEventListener('click', function(event) {
  if (event.target.matches('[data-action="encode"]') || event.target.matches('[data-action="example"]')) {
    if (event.target.matches('[data-action="example"]')) {
      inputField.innerText = exampleSvg;
    }
    const svg = inputField.innerText;
    const result = svgToDataURI(svg)
    if (result) {
      displayResult(event, result);
      displayButtonFeedback(event);
    } else {
      displayError();
    }
  }
  if (event.target.matches('[data-action="reset"]')) {
    inputField.innerText = '';
    outputField.innerText = '';
    markupField.innerText = '';
    previewImg.src = previewPlaceholder;
  }
});

/** ------------- functions ------------- */

const exampleSvg = `<?xml version="1.0" encoding="utf-8"?>
<!-- generator: software -->
<svg version="1.1" id="html5" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50" enable-background="new 0 0 50 50" xml:space="preserve">
  <title>HTML5 Logo</title>
  <path id="shield" fill="#E34F26" d="M6.5,44.9L2.5,0h44l-4,44.9L24.5,50"/>
  <path id="shield-light" fill="#EF652A" d="M24.5,46.1l14.6-4l3.4-38.5h-18"/>
  <path id="five-shadow" fill="#EBEBEB" d="M24.5,20.3h-7.3l-0.5-5.7h7.8V9.2h-0.1H10.7l0.1,1.5l1.4,15.2h12.4V20.3z M24.5,34.7 L24.5,34.7L18.3,33l-0.4-4.4H15h-2.5l0.7,8.7l11.3,3.1h0.1V34.7z"/>
  <path id="five" fill="#FFFFFF" d="M24.5,20.3v5.6h6.8L30.6,33l-6.2,1.7v5.8l11.3-3.1l0.1-1l1.3-14.6l0.2-1.5h-1.6H24.5z M24.5,9.2 v3.4v2.1l0,0h13.4l0,0l0,0l0.1-1.2l0.3-2.8l0.1-1.5H24.5z"/>
</svg>
`;

const iconError = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50'%3E%3Cpath fill='%23C0C0C9' d='M0.2,39.7c6-3.6,15.2-6.5,24.8-6.5s18.8,2.6,24.8,6.5v3.9c-8.3-4.3-15.7-6-24.8-6 c-8.7,0-16.5,1.8-24.8,6C0.2,43.6,0.2,39.7,0.2,39.7z'/%3E%3Cpolygon fill='%23C0C0C9' points='45.4,10.3 43.1,7.9 38.6,12.4 34.2,8 31.9,10.3 36.3,14.7 31.9,19.2 34.2,21.5 38.6,17.1 43.1,21.6 45.5,19.2 41,14.7 '/%3E%3Cpolygon fill='%23C0C0C9' points='18.2,10.3 15.9,7.9 11.4,12.4 7,8 4.7,10.3 9.1,14.7 4.6,19.2 7,21.5 11.4,17.1 15.9,21.6 18.2,19.2 13.7,14.7 '/%3E%3C/svg%3E`;

function displayResult(event, result) {
  document.querySelector('#output').innerText = result;
  document.querySelector('#output').focus();
  document.querySelector('.preview img').src = result;
  document.querySelector('#html').innerText = `<img src="${result}" />`;
  document.querySelector('.feedback').classList.add('hide');
}

function displayError() {
  document.querySelector('.feedback').classList.remove('hide');
  document.querySelector('#output').innerText = '';
  document.querySelector('#html').innerText = '';
  document.querySelector('.preview img').src = iconError;
};

function displayButtonFeedback(event) {
  let originalText = event.target.innerText.replace(' ✓', '');
  event.target.innerText = originalText + ' ✓';
  setTimeout(function() {
    event.target.innerText = originalText;
  }, 2000);
}
