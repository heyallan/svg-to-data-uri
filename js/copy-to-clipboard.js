document.addEventListener('click', function(event) {

  if (event.target.matches('[data-action="copy"]')) {

    const element = document.querySelector(event.target.getAttribute('data-source'));
    const selection = window.getSelection();
    const range = document.createRange();

    // get content
    range.selectNodeContents(element);

    // clean selection
    selection.removeAllRanges();

    // add content to selection
    selection.addRange(range);

    try {
      // copy to clipboard
      document.execCommand('copy');

      // clean selection
      selection.removeAllRanges();

      // add feedback
      const originalText = event.target.textContent;
      event.target.textContent += ' ✓';

      // remove feedback
      setTimeout(function() {
        event.target.textContent = originalText;
      }, 2000);
    }

    catch (error) {
      console.log(error);
    }

  }

});
