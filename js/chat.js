// Elements
var chat;
var chatInput;
var chatButton;
var chatWindow;
var chatWindowBar;

// Conversation
var dialog = new Array ();
var nameAI = "<span style='color:lightblue'>[AImy]:  </span>";
var nameUser = "<span style='color:lightblue'>[Guest]:  </span>";
var speechTrigger = true;
var dialogIndex = 0;

window.onload = function () {
    /* Chat window itself */
    chatWindow = document.getElementById ("chatBox");
    chatWindowBar = document.getElementById ("chatBox_topBar");
    chatWindowBar.addEventListener ("mousedown", mouseDown, false);
    window.addEventListener ("mouseup", mouseUp, false);
    
    /* The actual chatting portion */
    chat = document.getElementById ("chatBox_chat");

    chatInput = document.getElementById ("chatBox_chat_textBox");
    chatButton = document.getElementById ("chatBox_chat_button");
    chatButton.addEventListener ("click", textSend, false);
    
    // Blank the input field
    chatInput.value = "";
    
    
    // Load AI dialog
    var t = new Array ();
    
    t.push ("Hello. I'm AImy.");
    t.push ("I'll be your buddy on this adventure!");
    t.push ("It might be a bit awkward to converse without giving you a name, though...");
    t.push ("How about hittin' me with a fancy user name?");
    dialog.push (t);
    
    t = new Array ();
    t.push ("{!}, huh? That's a pretty good name. I like it!");
    t.push ("I'm gonna go ahead and make that your user name.");
    t.push ("Aaaaaaand...");
    t.push ("There we go! Try it out!");
    dialog.push (t);
    
    converse ();
    
} 

function simple_printf (s, a) {
    var r = s.replace (/{!}/, a);
    
    return (r);
}

function printDialog (a) {
    chat.innerHTML += nameAI + a;
    dialogIndex += 1;
    speechTrigger = false;
}


function converse (plugin="") {
    // Get the stage of the conversation
    var speech = dialog.shift ();
    
    var talk = setInterval (function () {
        if (speech.length >= 1) {
            chat.innerHTML += nameAI + simple_printf (speech.shift (), plugin) + "</br>";
            // Scroll to bottom of text
            chat.scrollTop = chat.scrollHeight;
        } else {
            clearInterval (talk);
            speechTrigger = false;
        }
    }, 1000);
    
    // Depending on the stage of the conversation, do special things
    if (plugin != "") {
        nameUser = simple_printf ("<span style='color:lightblue'>[{!}]:  </span>", plugin);
    }
}

function textSend (e) {
    chat.innerHTML += nameUser + chatInput.value + "</br>";
    // Scroll to bottom of text
    chat.scrollTop = chat.scrollHeight;
    
    converse (chatInput.value);
    chatInput.value = "";
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