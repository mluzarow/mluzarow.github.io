/**
 * Replaces received template data with the element using the tag ID.
 *
 * @param  {string} content Text content of the HTML template.
 * @param  {string} tag     The ID tag of the script to be replaced with template
 *                          data.
 */
function renderTemplate (content, tag) {
    var target = document.getElementById (tag);

    // Check for null input
    if (content === null) {
        // Failure
        var errorElement = document.createElement ("span");
        errorElement.style.color = "red";
        errorElement.innerHTML = "ERROR: Could not render requested template.";
        target.outerHTML = errorElement;

        return;
    }

    target.outerHTML = content;
}

/**
 * Gets the text content of a requested local file by file name.
 *
 * @param {string} filename The filename of the template to be used.
 * @param {string} tag      The ID tag of the script to be replaced with template
 *                          data.
 */
function requestTemplate (fileName, tag) {
    // Create new request
    var resp = new XMLHttpRequest ();

    // Event trigger on response answer received or timeout
    resp.onreadystatechange = function() {
        // Answer received
        if (resp.readyState == 4) {
            // Success
            if (resp.status == 200) {
                // Send response text to helper
                renderTemplate (resp.responseText, tag);
            // Fail
            } else {
                // Send null (failure) to helperS
                renderTemplate (null, tag);
            }
        }
    };

    // Send request
    resp.open ("GET", fileName);
    resp.send ();
}
