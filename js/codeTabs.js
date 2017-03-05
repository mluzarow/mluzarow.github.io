window.onload = function () {
	// Show default tab
    
    // Declare all variables
    var i, code_tab_content, code_tab;

    // Get all elements with class="code_tab_content" and hide them
    code_tab_content = document.getElementsByClassName("code_tab_content");
    for (i = 0; i < code_tab_content.length; i++) {
        code_tab_content[i].style.display = "none";
    }
    
    // Get all elements with class="code_tab" and remove the class "active"
    code_tab = document.getElementsByClassName("code_tab");
    for (i = 0; i < code_tab.length; i++) {
        code_tab[i].className = code_tab[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementsByClassName("default")[0].style.display = "block";
    document.getElementsByClassName("default")[0].className += " active";
    
}

function selectTab (evt, lang) {
    // Declare all variables
    var i, code_tab_content, code_tab;

    // Get all elements with class="code_tab_content" and hide them
    code_tab_content = document.getElementsByClassName("code_tab_content");
    for (i = 0; i < code_tab_content.length; i++) {
        code_tab_content[i].style.display = "none";
    }

    // Get all elements with class="code_tab" and remove the class "active"
    code_tab = document.getElementsByClassName("code_tab");
    for (i = 0; i < code_tab.length; i++) {
        code_tab[i].className = code_tab[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(lang).style.display = "block";
    evt.currentTarget.className += " active";
}