// Load the template base path
var basePath = document.currentScript.src.substr (
	0,
	document.currentScript.src.length - 18
) + "templates";

/**
 * Builds out the page replacing predefined IDs with the corresponding template.
 */
class SiteBuilder {
	/**
	 * Constructor for site builder.
	 */
	constructor () {
		/**
		 * @var {String}  basePath  template folder base path
		 * @var {Boolean} flagDebug debug flag if there is no hostname (running
		 *                          locally)
		 */
		this.basePath = basePath;
		this.flagDebug = window.location.hostname.length === 0;
		
		if (this.flagDebug === true) {
			console.debug ("SiteBuilder running in debug mode.");
		}
	}
	
	/**
	 * Builds all the page's templates.
	 */
	buildTemplates () {
		if (this.flagDebug === true) {
			console.debug (`Using basepath ${this.basePath}.`);
		}
		
		// Get every <br> tag
		let placeholders = document.getElementsByClassName ("sb-template");
		
		for (let i = 0; i < placeholders.length; i++) {
			this._requestTemplate (
				placeholders[i].dataset.template,
				placeholders[i]
			);
		}
	}
	
	/**
	 * Gets the text content of a requested local file by file name.
	 * 
	 * @param {String}  filename     name of the template to be used
	 * @param {Element} $placeholder placeholder element
	 */
	_requestTemplate (fileName, $placeholder) {
		let request = new XMLHttpRequest ();
		request.tag = $placeholder;
		
		if (this.flagDebug === true) {
			// No hostname, so running locally in debug mode
			console.debug (`Requesting template [${fileName}].`);
		}
		
		// Event trigger on response answer received or timeout
		request.onreadystatechange = function() {
			if (request.readyState == 4) {
				// Answer received
				
				if (request.status != 200) {
					// Failure
					return this._renderTemplate ("", request.tag);
				}
				
				return this._renderTemplate (request.responseText, request.tag);
			}
		}.bind (this);
		
		// Send request
		request.open ("GET", `${this.basePath}/${fileName}.html`);
		request.overrideMimeType ("text/plain");
		request.send ();
	}
	
	/**
	 * Replaces received template data with the element using the tag ID.
	 *
	 * @param {String}  content      template HTML
	 * @param {Element} $placeholder placeholder element
	 */
	_renderTemplate (content, $placeholder) {
		if (content.length === 0) {
			// No HTML to display
			var errorElement = document.createElement ("span");
			errorElement.style.color = "red";
			errorElement.innerHTML = "ERROR: Could not render requested template.";
			$placeholder.outerHTML = errorElement.outerHTML;
			
			return;
		}
		
		$placeholder.outerHTML = content;
	}
}
