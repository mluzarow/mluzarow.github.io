// function echo(content) {
//     var e = docment.createElement("p");
//     e.innerHTML = content;
//     e.hidden = true;
//     document.currentScript.parentElement.replaceChild(document.currentScript, e);
// }
function renderTemplate (content) {
    // Check for null input
    if (content === null) {
        // Failure
        var errorElement = document.createElement ("span");
        errorElement.style.color = "red";
        errorElement.innerHTML = "ERROR: Could not render requested template.";
        document.currentScript.parentElement.replaceChild (
            document.currentScript,
            errorElement
        );

        return;
    }
    
    var wrap = document.createElement ("div");
    wrap.innerHTML = content;
    document.currentScript.parentElement.replaceChild (
        document.currentScript,
        wrap
    );
}

/**
 * Gets the text content of a requested local file by file name.
 */
function requestTemplate (fileName) {
    // Create new request
    var resp = new XMLHttpRequest ();

    // Event trigger on response answer received or timeout
    resp.onreadystatechange = function() {
        // Answer received
        if (resp.readyState == 4) {
            // Success
            if (resp.status == 200) {
                // Send response text to helper
                renderTemplate (resp.responseText);
            // Fail
            } else {
                // Send null (failure) to helper
                renderTemplate (null);
            }
        }
    };

    // Send request
    resp.open ("GET", fileName);
    resp.send ();
}
