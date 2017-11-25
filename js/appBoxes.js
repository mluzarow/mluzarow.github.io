class AppBoxController {
    static initialize () {
        // Constants
        this.BOX_OPEN_WIDTH = "47vw";
        this.INFO_OPEN_WIDTH = "25vw";
        this.BOX_CLOSED_WIDTH = "22vw";
        this.INFO_CLOSED_WIDTH = "0vw";
        this.su = 0;
        
        // Find all boxes on page
        this.boxes = document.getElementsByClassName ("project_box");
        
        // Add event listeners to all extenders
        // Binds the entire project box as target element so as to animate multiple elements
        for (var i = 0; i < this.boxes.length; i++) {
            this.boxes[i].getElementsByClassName ("project_extender")[0].addEventListener (
                "click",
                this.animate.bind (this.boxes[i]),
                false
            );
        }
        
        // Turn off all transitions
        this.turnOffTransitions ();
    }
    
    static animate () {
        // Check screen size to see if we are mobile or desktop
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        
        // Desktop
        if (w > 767) {
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
                this.style.width = AppBoxController.BOX_OPEN_WIDTH;
                this.getElementsByClassName ("project_info")[0].style.width = AppBoxController.INFO_OPEN_WIDTH;
                this.getElementsByClassName ("project_info")[0].style.opacity = 1;
                
                // Pointer events
                this.style.pointerEvents = "none";
                
                // Time a function to disable transitions after they have transitioned.
                // This is to keep from animating width on resizeBy
                setTimeout (AppBoxController.turnOffTransitions.bind (this), 2000);
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
                this.style.width = AppBoxController.BOX_CLOSED_WIDTH;
                this.getElementsByClassName ("project_info")[0].style.width = AppBoxController.INFO_CLOSED_WIDTH;
                this.getElementsByClassName ("project_info")[0].style.opacity = 0;
                
                // Pointer events
                this.style.pointerEvents = "none";
                
                // Time a function to disable transitions after they have transitioned.
                // This is to keep from animating width on resizeBy
                setTimeout (AppBoxController.turnOffTransitions.bind (this), 2000);
            }
        }
    }
    
    static turnOffTransitions () {
        if (AppBoxController.su == 0) {
            for (var i = 0; i < AppBoxController.boxes.length; i++) {
                AppBoxController.boxes[i].style.transition = "none";
                AppBoxController.boxes[i].getElementsByClassName ("project_info")[0].style.transition = "none";
            }
            AppBoxController.su = 1;
        } else {
            this.style.pointerEvents = "auto";
            this.style.transition = "none";
            this.getElementsByClassName ("project_info")[0].style.transition = "none";
        }
    }
}
