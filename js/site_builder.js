// Load the template base path
var basePath = document.currentScript.src.substr (
	0,
	document.currentScript.src.length - 18
);

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
	 * Sets a config for data to be used with certain templates.
	 * 
	 * @param {Object} config template data config
	 */
	setConfig (config) {
		this.config = config;
	}
	
	_customizeTemplate (content, data, templateName) {
		let builder;
		
		switch (templateName) {
			case "app_display": builder = new AppDisplayBuilder (); break;
			default:            return content;
		}
		
		return builder.customize (content, data);
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
		request.open ("GET", `${this.basePath}templates/${fileName}.html`);
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
		
		if (
			$placeholder.dataset.tdata &&
			this.config[$placeholder.dataset.tdata]
		) {
			content = this._customizeTemplate (
				content,
				this.config[$placeholder.dataset.tdata],
				$placeholder.dataset.template
			);
		}
		
		$placeholder.outerHTML = content;
	}
}

/**
 * Builder for customizing the app_display template.
 */
class AppDisplayBuilder {
	/**
	 * Customizes the app_display template with the given config data.
	 * 
	 * @param {String} content base template HTML
	 * @param {Object} data    dictionary of config options
	 * 
	 * @return {String} customized HTML
	 */
	customize (content, data) {
		content = this._processDependencies (content, data);
		content = this._processImageSource (content, data);
		content = this._processLinkGithub (content, data);
		content = this._processLinkLive (content, data);
		content = this._processSummary (content, data);
		content = this._processTitle (content, data);
		
		return content;
	}
	
	/**
	 * Processes the dependencies config option.
	 * 
	 * @param {String} content base template HTML
	 * @param {Object} data    dictionary of config options
	 * 
	 * @return {String} customized HTML
	 */
	_processDependencies (content, data) {
		if (
			data.hasOwnProperty ("dependencies") === false ||
			Array.isArray (data.dependencies) === false ||
			data.dependencies.length === 0
		) {
			return content.replace (/{@dependencies}/g, "<span>None!</span>");
		}
		
		let deps = "";
		
		for (let i = 0; i < data.dependencies.length; i++) {
			let item = "";
			
			if (data.dependencies[i].hasOwnProperty ("name") === true) {
				item = data.dependencies[i].name;
			} else {
				item = "Unnamed Dependency";
			}
			
			if (data.dependencies[i].hasOwnProperty ("name") === true) {
				item = `<a href="${data.dependencies[i].name}">${item}</a>`;
			}
			
			deps += `<span>${item}</span>`;
		}
		
		return content.replace (/{@dependencies}/g, deps);
	}
	
	/**
	 * Processes the image source config option.
	 * 
	 * @param {String} content base template HTML
	 * @param {Object} data    dictionary of config options
	 * 
	 * @return {String} customized HTML
	 */
	_processImageSource (content, data) {
		if (data.hasOwnProperty ("imgSrc") === false) {
			return content.replace ("{@imgSrc}", `${basePath}img/noimage.png`);
		}
		
		return content.replace ("{@imgSrc}", data.imgSrc);
	}
	
	/**
	 * Processes the github link config option.
	 * 
	 * @param {String} content base template HTML
	 * @param {Object} data    dictionary of config options
	 * 
	 * @return {String} customized HTML
	 */
	_processLinkGithub (content, data) {
		if (data.hasOwnProperty ("linkGh") === false) {
			return content.replace ("{@linkGh}", "https://github.com/mluzarow");
		}
		
		return content.replace ("{@linkGh}", data.linkGh);
	}
	
	/**
	 * Processes the live link config option.
	 * 
	 * @param {String} content base template HTML
	 * @param {Object} data    dictionary of config options
	 * 
	 * @return {String} customized HTML
	 */
	_processLinkLive (content, data) {
		if (data.hasOwnProperty ("linkLive") === false) {
			return content.replace ("{@linkLive}", "https://mluzarow.github.io/");
		}
		
		return content.replace ("{@linkLive}", data.linkLive);
	}
	
	/**
	 * Processes the summary config option.
	 * 
	 * @param {String} content base template HTML
	 * @param {Object} data    dictionary of config options
	 * 
	 * @return {String} customized HTML
	 */
	_processSummary (content, data) {
		let pTab = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		
		if (
			data.hasOwnProperty ("summary") === false ||
			Array.isArray (data.summary) === false ||
			data.summary.length === 0
		) {
			return content.replace (
				"{@summary}",
				`<p>${pTab}<i>No summary.</i></p>`
			);
		}
		
		let summary = "";
		
		for (let i = 0; i < data.summary.length; i++) {
			summary += `<p>${pTab}${data.summary[i]}</p>`;
		}
		
		return content.replace ("{@summary}", summary);
	}
	
	/**
	 * Processes the title config option.
	 * 
	 * @param {String} content base template HTML
	 * @param {Object} data    dictionary of config options
	 * 
	 * @return {String} customized HTML
	 */
	_processTitle (content, data) {
		if (data.hasOwnProperty ("title") === false) {
			return content.replace ("{@title}", "Untitled Game");
		}
		
		return content.replace ("{@title}", data.title);
	}
}
