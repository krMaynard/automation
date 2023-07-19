// Attempts to check all the checkboxes on the page.

(async () => {
  try {
    const checkboxes = Array.from(document.querySelectorAll('material-checkbox'));
    for (const checkbox of checkboxes) {
      checkbox.click();
    } alert(`Selected ${checkboxes.length} cases.`);
  } catch (error) {
    console.error('No checkboxes found on the page.');
  }
})();
