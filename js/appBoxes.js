var boxes;

/* Animation vars */
var BOX_OPEN_WIDTH = "47vw";
var INFO_OPEN_WIDTH = "25vw";

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
    // Check screen size to see if we are mobile or desktop
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    
    if (w <= 767) {
        // Check id to get open / closed status
        if (this.id == "closed") {
            this.getElementsByClassName ("project_info")[0].style.height = "auto";
            
            this.id = "open";
        } else {
            this.getElementsByClassName ("project_info")[0].style.height = "0px";
            
            this.id = "closed";
        }
    } else {
        // Check id to get open / closed status
        if (this.id == "closed") {
            // Inner text fade-in must be delayed until container is open
            this.getElementsByClassName ("project_comments")[0].style.transitionDelay = "2s";
            this.style.transitionDelay = "0s";
            this.style.transition = "width 2s";
            this.getElementsByClassName ("project_info")[0].style.transitionDelay = "0s";
            this.getElementsByClassName ("project_info")[0].style.transition = "width 2s";
            
            this.style.width = BOX_OPEN_WIDTH;
            this.getElementsByClassName ("project_comments")[0].style.visibility = "visible";
            this.getElementsByClassName ("project_comments")[0].style.opacity = 1;
            this.getElementsByClassName ("project_info")[0].style.width = INFO_OPEN_WIDTH;
            this.getElementsByClassName ("project_extender")[0].innerHTML = "</br></br></br></br><";
            
            // Time a function to disable transitions after they have transitioned.
            // This is to keep from animating width on resizeBy
            setTimeout (turnOffTransitions, 2000);
            
            this.id = "open";
        } else {
            // Container must be delayed until text has faded out
            this.getElementsByClassName ("project_comments")[0].style.transitionDelay = "0s";
            this.style.transitionDelay = "1s";
            this.getElementsByClassName ("project_info")[0].style.transitionDelay = "1s";
            
            this.style.transition = "width 2s";
            this.getElementsByClassName ("project_info")[0].style.transition = "width 2s";
            
            this.style.width = "22vw";
            this.getElementsByClassName ("project_comments")[0].style.visibility = "hidden";
            this.getElementsByClassName ("project_comments")[0].style.opacity = 0;
            this.getElementsByClassName ("project_info")[0].style.width = "0vw";
            this.getElementsByClassName ("project_extender")[0].innerHTML = "</br></br></br></br>>";
            
            // Time a function to disable transitions after they have transitioned.
            // This is to keep from animating width on resizeBy
            setTimeout (turnOffTransitions, 2000);
            this.id = "closed";
        }
    }
}

function turnOffTransitions () {
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].style.transition = "none";
        boxes[i].getElementsByClassName ("project_info")[0].style.transition = "none";
    }
}