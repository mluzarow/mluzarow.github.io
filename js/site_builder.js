/**
 * Builds out the page replacing predefined IDs with the corresponding template.
 */
class SiteBuilder {
    /**
     * Runs the SiteBuilder routine.
     */
    static initialize () {
        // Get every <br> tag
        var brs = document.getElementsByTagName ("br");
    
        // Check tag IDs for valid template IDs
        for (var i = 0; i < brs.length; i++) {
            var start = brs[i].id.indexOf ("template-");
    
            if (start > -1) {
                this.requestTemplate (brs[i].id.substr (start + 9, brs[i].id.length - 8), brs[i].id);
            }
        }
    }
    
    /**
     * Gets the text content of a requested local file by file name.
     *
     * @param {string} filename The name of the template to be used.
     * @param {string} tag      The ID tag of the script to be replaced with template
     *                          data.
     */
    static requestTemplate (fileName, tag) {
        // Create new request
        var resp = new XMLHttpRequest ();
        resp.tag = tag;
        
        // Check the hostname; if there is none, page is in debug mode.
        // if (window.location.hostname === "") {
        //     console.log ("Sitebuilder in debug mode targetting [" + fileName + "].");
        //     var fileLocation = "file:///C:/Users/Mark/Desktop/Github Repo Clones/mluzarow.github.io/templates/" + fileName + ".html";
        // } else {
            var fileLocation = "https://mluzarow.github.io/templates/" + fileName + ".html";
        // }
        
        // Event trigger on response answer received or timeout
        resp.onreadystatechange = function() {
            // Answer received
            if (this.readyState == 4) {
                // Success
                if (this.status == 200) {
                    // Send response text to helper
                    SiteBuilder.renderTemplate (this.responseText, this.tag);
                // Fail
                } else {
                    // Send null (failure) to helper
                    SiteBuilder.renderTemplate (null, this.tag);
                }
            }
        };
        
        // Send request
        resp.open ("GET", fileLocation);
        resp.overrideMimeType("text/plain")
        resp.send ();
    }
    
    /**
     * Replaces received template data with the element using the tag ID.
     *
     * @param  {string} content Text content of the HTML template.
     * @param  {string} tag     The ID tag of the script to be replaced with template
     *                          data.
     */
    static renderTemplate (content, tag) {
        var target = document.getElementById (tag);
        
        // Check for null input
        if (content === null) {
            // Failure
            var errorElement = document.createElement ("span");
            errorElement.style.color = "red";
            errorElement.innerHTML = "ERROR: Could not render requested template.";
            target.outerHTML = errorElement.outerHTML;
            
            return;
        }
        
        target.outerHTML = content;
    }
}
