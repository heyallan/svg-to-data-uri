/*
* paste from clipboard
* https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard
*/

document.addEventListener('paste', function(event) {
  if (event.target.matches('[contenteditable]')) {
    event.preventDefault();
    var data = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, data);
  }
});
