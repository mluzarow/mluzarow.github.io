var codeWindow = null;
var textScript = "$login main-sys -p 0x32 -dl 1 -mainName scoobydoo";
var index = 0;
var temp_index = 0;
var indexScript = 0;
var textScriptAI = new Array ();
textScriptAI.push ("Hello.\nWelcome to the system.\nPlease log in to continue.\n\n   >> ");
var indexMax = textScript.length - 1;
var turn = 0;
var typer = null;

window.onload = function () {
    // Initialization
    codeWindow = document.getElementById ("code_words");
    codeWindow.addEventListener ("keypress", readScript);
    codeWindow.focus ();
    readScript ();
}

function readScript () {
    // AI's turn to speak
    if (turn == 0) {
        var str = textScriptAI.pop ();
        typer = setInterval (typeString, 80);
        
        function typeString () {
            if (temp_index <= str.length - 1) {
                if (str[temp_index] == '\n') {
                    codeWindow.innerHTML += "<br/>";
                } else{ 
                    codeWindow.innerHTML += str[temp_index];
                }
                temp_index += 1;
            } else {
                clearInterval (typer);
            }
        }
        
        indexScript += 1;
        turn = 1;
    } else {
        if (index <= indexMax) {
            codeWindow.innerHTML += textScript[index];
            index += 1;
        } else {
            turn = 0;
        }
    }
}