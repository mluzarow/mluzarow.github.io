var boxes;

/* Animation vars */
var BOX_OPEN_WIDTH = "47vw";
var INFO_OPEN_WIDTH = "25vw";
var BOX_CLOSED_WIDTH = "22vw";
var INFO_CLOSED_WIDTH = "0vw";
var su = 0;

window.onload = function () {
    // Find all boxes on page
    boxes = document.getElementsByClassName ("project_box");
    
    // Add event listeners to all extenders
    // Binds the entire project box as target element so as to animate multiple elements
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].getElementsByClassName ("project_extender")[0].addEventListener ("mousedown", animate.bind (boxes[i]), false);
    }
    
    // Turn off all transitions
    turnOffTransitions ();
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
            // WARNING: transition property MUST go before transitionDelay or it will
            // NOT FIRE!!!
        
            // Transition Properties
            this.style.transition = "width 1s";
            this.getElementsByClassName ("project_info")[0].style.transition = "width 0s, opacity 0.7s";
            
            // Transition Delays
            this.style.transitionDelay = "0s";
            this.getElementsByClassName ("project_info")[0].style.transitionDelay = "1s";
            
            // Misc Variables
            this.getElementsByClassName ("project_extender")[0].innerHTML = "</br></br></br></br><";
            this.id = "open";
            
            // Transition Variables
            this.style.width = BOX_OPEN_WIDTH;
            this.getElementsByClassName ("project_info")[0].style.width = INFO_OPEN_WIDTH;
            this.getElementsByClassName ("project_info")[0].style.opacity = 1;
            
            // Time a function to disable transitions after they have transitioned.
            // This is to keep from animating width on resizeBy
            setTimeout (turnOffTransitions.bind (this), 2000);
        } else {
            // Transition Properties
            this.style.transition = "width 1s";
            this.getElementsByClassName ("project_info")[0].style.transition = "width 0s, opacity 0s";
            
            // Transition Delays
            this.style.transitionDelay = "0.1s";
            this.getElementsByClassName ("project_info")[0].style.transitionDelay = "0s";
            
            // Misc Variables
            this.getElementsByClassName ("project_extender")[0].innerHTML = "</br></br></br></br>>";
            this.id = "closed";
            
            // Transition Variables
            this.style.width = BOX_CLOSED_WIDTH;
            this.getElementsByClassName ("project_info")[0].style.width = INFO_CLOSED_WIDTH;
            this.getElementsByClassName ("project_info")[0].style.opacity = 0;
            
            // Time a function to disable transitions after they have transitioned.
            // This is to keep from animating width on resizeBy
            setTimeout (turnOffTransitions.bind (this), 3000);
        }
    }
}

function turnOffTransitions () {
    if (su == 0) {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].style.transition = "none";
            boxes[i].getElementsByClassName ("project_info")[0].style.transition = "none";
        }
        su = 1;
    } else {
        this.style.transition = "none";
        this.getElementsByClassName ("project_info")[0].style.transition = "none";
    }
}