(function() {
    function isValidSpan(span) {
      // A valid span has text content and no child elements
      return (
        span.tagName.toLowerCase() === 'span' &&
        span.children.length === 0 &&
        span.textContent.trim().length > 0
      );
    }
  
    function findValidSpanTexts(element) {
      let current = element.parentElement;
      while (current) {
        const spans = Array.from(current.querySelectorAll('span'));
        const validSpans = spans.filter(isValidSpan);
        if (validSpans.length > 0) {
          return validSpans.map(span => span.textContent.trim());
        }
        current = current.parentElement;
      }
      return [];
    }
  
    function assignNameAttributes() {
      const inputs = document.querySelectorAll('input:not([type="hidden"]):not([name])');
  
      inputs.forEach(input => {
        const spanTexts = findValidSpanTexts(input);
        if (spanTexts.length === 0) return;
  
        // Pick the longest text among valid spans
        let name = spanTexts.reduce((longest, current) => 
          current.length > longest.length ? current : longest, ''
        );
  
        // Optionally sanitize
        name = name.toLowerCase().replace(/\s+/g, '_').replace(/[^\w]/g, '');
  
        // Assign the name
        input.setAttribute('name', name);
      });
    }
  
    // Run the script when the DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', assignNameAttributes);
    } else {
      assignNameAttributes();
    }
  })();