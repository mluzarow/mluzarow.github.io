// Run the builder once the page loads
window.addEventListener("load", function() {
    // Get every <br> tag
    var brs = document.getElementsByTagName ("br");

    // Check tag IDs for valid template IDs
    for (var i = 0; i < brs.length; i++) {
        var start = brs[i].id.indexOf ("template-");

        if (start > -1) {
            requestTemplate (brs[i].id.substr (start + 9, brs[i].id.length - 8), brs[i].id);
        }
    }
}, false);

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
 * @param {string} filename The name of the template to be used.
 * @param {string} tag      The ID tag of the script to be replaced with template
 *                          data.
 */
function requestTemplate (fileName, tag) {
    // Create new request
    var resp = new XMLHttpRequest ();

    // Check the hostname; if there is none, page is in debug mode.
    if (window.location.hostname === "") {
        console.log ("Sitebuilder in debug mode targetting [" + fileName + "].");
        var fileLocation = "file:///C:/Users/Mark/Desktop/Github Repo Clones/mluzarow.github.io/templates/" + fileName + ".html";
    } else {
        var fileLocation = "https://mluzarow.github.io/templates/" + fileName + ".html";
    }

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
    resp.open ("GET", fileLocation);
    resp.overrideMimeType("text/plain")
    resp.send ();
}
