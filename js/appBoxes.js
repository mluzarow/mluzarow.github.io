var boxes;

window.onload = function () {
    // Find all boxes on page
    boxes = document.getElementsByClassName ("project_box");
    
    // Add event listeners to all extenders
    // Binds the entire project box as target element so as to animate multiple elements
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].getElementsByClassName ("project_extender")[0].addEventListener ("mousedown", animate.bind (boxes[i]), false);
    }
}

function animate (target) {
    // Check id to get open / closed status
    if (this.id == "closed") {
        // Inner text fade-in must be delayed until container is open
        this.getElementsByClassName ("project_comments")[0].style.transitionDelay = "2s";
        this.style.transitionDelay = "0s";
        this.getElementsByClassName ("project_info")[0].style.transitionDelay = "0s";
        
        this.style.width = "50vw";
        this.getElementsByClassName ("project_comments")[0].style.visibility = "visible";
        this.getElementsByClassName ("project_comments")[0].style.opacity = 1;
        this.getElementsByClassName ("project_info")[0].style.width = "28vw";
        this.getElementsByClassName ("project_extender")[0].innerHTML = "<";
        
        this.id = "open";
    } else {
        // Container must be delayed until text has faded out
        this.getElementsByClassName ("project_comments")[0].style.transitionDelay = "0s";
        this.style.transitionDelay = "1s";
        this.getElementsByClassName ("project_info")[0].style.transitionDelay = "1s";
        
        this.style.width = "22vw";
        this.getElementsByClassName ("project_comments")[0].style.visibility = "hidden";
        this.getElementsByClassName ("project_comments")[0].style.opacity = 0;
        this.getElementsByClassName ("project_info")[0].style.width = "0vw";
        this.getElementsByClassName ("project_extender")[0].innerHTML = ">";
        
        this.id = "closed";
    }
}