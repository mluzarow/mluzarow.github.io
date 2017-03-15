/************************
** Document Elements
************************/
var chat;
var chatInput;
var chatButton;
var chatWindow;
var chatWindowBar;
var chatStatus;

/************************
** Conversation Control
************************/
// Holds all AImy dialogue
var dialog = new Array ();
// Current stack of lines to read
var currentLines;

// Special event stack
var events = new Array ();
// The user's special input
var userString = "";

// Holds color coordinations
var colors = {};

// Styled names
var nameAI = "<span style='color:lightblue'>[AImy]:  </span>";
var nameUser = "<span style='color:lightblue'>[Guest]:  </span>";

// Conversation speed
var letterTiming = 80;  // Time it takes to type 1 character
var thinkTiming = 1200; // Rest time between lines

/******************************************************************************************
**
**  Script Initialization
**
*******************************************************************************************/
window.onload = function () {
    // Init page element variables
    chatWindow = document.getElementById ("chatBox");
    chatWindowBar = document.getElementById ("chatBox_topBar");
    chat = document.getElementById ("chatBox_chat");
    chatInput = document.getElementById ("chatBox_chat_textBox");
    chatButton = document.getElementById ("chatBox_chat_button");
    chatStatus = document.getElementById ("chatBox_chat_status");
    
    // Init event listeners
    chatWindowBar.addEventListener ("mousedown", mouseDown, false);
    chatWindowBar.addEventListener ("touchstart", mouseDown, false);
    window.addEventListener ("mouseup", mouseUp, false);
    window.addEventListener ("touchend", mouseUp, false);
    chatButton.addEventListener ("click", textSend, false);
    
    // Init AI dialogue
    initializeDialog ();
    // Init events
    initializeEvents ();
    // Init colors
    initializeColors ();
    
    // Blank the input field
    chatInput.value = "";
    
    // Start speech routine
    converse ();
} 

/******************************************************************************************
**
**  Conversation flow control
**
*******************************************************************************************/
function converseSpeaker () {
    // Get the next line
    var line = currentLines.shift ();

    // Print the line
    chat.innerHTML += nameAI + simplePrintf (line, userString) + "</br>";
    // Scroll to bottom of text
    chat.scrollTop = chat.scrollHeight;
    // Toggle typing status
    chatStatus.style.display = "none";
    
    // Set up time before going back to the conversation controller
    setTimeout (converseControl, thinkTiming);
}

function converseControl () {
    // If there are still lines to read, read 'em
    if (currentLines.length >= 1) {
        // Toggle typing status
        chatStatus.style.display = "inline";
        
        // Set up "typing" time before line is printed
        setTimeout (converseSpeaker, letterTiming * currentLines[0].length);
    // If there are no more lines, fire the stage event
    } else {
        var func = events.shift ();
        
        // Make sure that there is a function to call
        if (func != null) {
            window [func] ();
        }
    }
}

function converse () {
    // Get the stage of the conversation
    currentLines = dialog.shift ();
    
    // Throw control to conversation controller using currentLines
    converseControl ();
}

/******************************************************************************************
**
**  Stage specific functions
**
*******************************************************************************************/
// Makes the user's chosen string the user's username
function stage1 () {
    nameUser = simplePrintf ("<span style='color:lightblue'>[{!}]:  </span>", userString);
}

// Uses the user's favorite color in order to reconstruct the page CSS with the closest
// matching color group
function stage2 () {
    // Make the string lower case
    userString = userString.toLowerCase ();
    
    // Request a coordination
    var myCoordination = colors ["red"];
    
    chatWindow.style.backgroundColor = myCoordination.chatBox_background;
    chatWindowBar.style.backgroundColor = myCoordination.chatBox_topBar_background;
    chatWindowBar.style.color = myCoordination.chatBox_topBar_text;
    chat.style.backgroundColor = myCoordination.chatBox_chat_background;
    chat.style.color = myCoordination.chatBox_chat_text;
    chatStatus.style.color = myCoordination.chatBox_status_text;
    
}
/******************************************************************************************
**
**  Support functions
**
*******************************************************************************************/
function simplePrintf (s, a) {
    var r = s.replace (/{!}/, a);
    
    return (r);
}

/******************************************************************************************
**
**  Event triggers
**
*******************************************************************************************/
function textSend (e) {
    // Write text to chat box
    chat.innerHTML += nameUser + chatInput.value + "</br>";
    // Scroll to bottom of text
    chat.scrollTop = chat.scrollHeight;
    
    // Save input
    userString = chatInput.value;
    // Black the input box
    chatInput.value = "";
    
    // Hand conversation control back to AI
    converse ();
}

function mouseDown (e) {
    // Stop default mouseDown functions while dragging
    e.preventDefault ();
    window.addEventListener ("mousemove", transform, true);
}

function mouseUp () {
    window.removeEventListener ("mousemove", transform, true);
}

function transform (e) {
    chatWindow.style.position = "absolute";
    chatWindow.style.top = e.clientY + "px";
    chatWindow.style.left = e.clientX + "px";
}

/******************************************************************************************
**
**  Hard data initialization
**
*******************************************************************************************/
function initializeDialog () {
    // Load AI dialogue
    var t = new Array ();
    
    t.push ("Hello. I'm AImy.");
    t.push ("I'll be your buddy on this adventure!");
    t.push ("It might be a bit awkward to converse without giving you a name, though...");
    t.push ("How about hittin' me with a fancy user name?");
    dialog.push (t);
    
    t = new Array ();
    t.push ("{!}, huh? That's a pretty good name. I like it!");
    t.push ("I'm going to go ahead and make that your user name.");
    t.push ("And...");
    t.push ("There we go! Try it out!");
    dialog.push (t);
    
    t = new Array ();
    t.push ("Great!");
    t.push ("You know, it's kind of bleak around here don't you think?");
    t.push ("Maybe we should spice it up a bit.");
    t.push ("What's your favorite color?");
    t.push ("I'm quite enjoy black myself.");
    dialog.push (t);
    
    t = new Array ();
    t.push ("Really? OK, wow.");
    t.push ("Alright, alright; we can work with that.");
    t.push ("Let's try a little something... like this.");
    dialog.push (t);
}

function initializeEvents () {
    events.push (null);
    events.push ("stage1");
    events.push (null);
    events.push ("stage2");
}

// Load color coordinations
function initializeColors () {
    colors ["red"] = new Coordination ("#DF0000", "#800000", "#400000", "#FF0000", "#400000", "#400000", "#9F0000", "#400000");
                                   
}

class Coordination {
/*
    var chatBox_background;
    var chatBox_topBar_background;
    var chatBox_topBar_text;
    var chatBox_chat_background;
    var chatBox_chat_text;
    var chatBox_status_text;
    var chatBox_button_background;
    var chatBox_button_text;
    */
    constructor (cb_bg, tb_bg, tb_txt, c_bg, c_txt, s_txt, btn_bg, btn_txt) {
        this.chatBox_background = cb_bg;
        this.chatBox_topBar_background = tb_bg;
        this.chatBox_topBar_text = tb_txt;
        this.chatBox_chat_background = c_bg;
        this.chatBox_chat_text = c_txt;
        this.chatBox_status_text = s_txt;
        this.chatBox_button_background = btn_bg;
        this.chatBox_button_text = btn_txt;
    }
}
