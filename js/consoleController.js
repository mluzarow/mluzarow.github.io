var input;
var output;

window.onload = function () {
    // Find the two main I/O elements on the page
    input = document.getElementById ("text-input-box");
    output = document.getElementById ("text-output");

    input.addEventListener ("keyup", function (e) {
        if (document.activeElement === this && e.keyCode == 13) {
            write (input.value);
            input.value = "";
        }
    });

    testWriteLogo ();
    //testWriteNavLinks ();
    // testWriteAllLines ();
    // testWriteAllColumns ();
    // computeColumns ()
}

/**
 * Computes the total number of whole lines available for writing to in the
 * output at current font size and line-height.
 *
 * @return {int} Number of whole lines that can be used for writing.
 */
function computeLines () {
    var computedStyle = window.getComputedStyle (output);
    var lineHeight = computedStyle.getPropertyValue ("line-height").replace ("px", "");
    var outputHeight = computedStyle.getPropertyValue ("height").replace ("px", "");
    var outputPadding = computedStyle.getPropertyValue ("padding-bottom").replace ("px", "");

    return (parseInt ((outputHeight - outputPadding) / lineHeight));
}

function computeColumns () {
    var computedStyle = window.getComputedStyle (output);
    var outputwidth = computedStyle.getPropertyValue ("width").replace ("px", "");
    var outputPadding = (
        parseInt(computedStyle.getPropertyValue ("padding-left").replace ("px", "")) +
        parseInt(computedStyle.getPropertyValue ("padding-right").replace ("px", ""))
    )

    return (parseInt ((outputwidth - outputPadding) / charWidth));
}

function computeLetterWidth () {
    // Create dummy span with one character of text under output so it inherits
    // text CSS
    var computedStyle = window.getComputedStyle (output);
    var dummy = document.createElement("span");
    dummy.innerHTML = "A";
    dummy.style.fontSize = computedStyle.getPropertyValue ("font-size");

    var computedDummy = window.getComputedStyle (dummy);
    return (parseFloat(computedDummy.getPropertyValue ("width").replace ("px", "")));
}

function write (message, flagBreak = true) {
    var lineBreak = flagBreak ? "</br>" : "";

    output.innerHTML += message + lineBreak;
}

function testWriteAllLines () {
    var lines = computeLines ();

    output.innerHTML = "";

    for (var i = 1; i <= lines; i++) {
        write ("LINE NUMBER: " + i);
    }
}

function testWriteAllColumns () {
    var cols = computeColumns ();

    output.innerHTML = "";

    var counter = 0;
    for (var i = 1; i <= cols; i++) {
        output.innerHTML += counter;

        counter++;
        if (counter > 9) {
            counter = 0;
        }
    }
}

function testWriteNavLinks () {
    write("");
    write("");
    write("");
    write("");

    var cnt = [
        String.raw`+=========================+   +=========================+   +=========================+`,
        String.raw`|                         |   |                         |   |                         |`,
        String.raw`|                         |   |                         |   |                         |`,
        String.raw`|                         |   |                         |   |                         |`,
        String.raw`|                         |   |                         |   |                         |`,
        String.raw`|          GAMES          |   |          TOOLS          |   |           BLOG          |`,
        String.raw`|                         |   |                         |   |                         |`,
        String.raw`|                         |   |                         |   |                         |`,
        String.raw`|                         |   |                         |   |                         |`,
        String.raw`|                         |   |                         |   |                         |`,
        String.raw`+=========================+   +=========================+   +=========================+`,
    ];
    var cntLink = [
        String.raw`                           `,
        String.raw` ========================= `,
        String.raw` =                       = `,
        String.raw` =                       = `,
        String.raw` =                       = `,
        String.raw` =                       = `,
        String.raw` =                       = `,
        String.raw` =                       = `,
        String.raw` =                       = `,
        String.raw` ========================= `,
        String.raw`                           `,
    ];

    var Aclass = "class = \"nav-hover\"";
    var Dclass = "class = \"output-line\"";
    var Pclass = "class = \"formatted-text\"";

    output.innerHTML +=
        "<div id = \"anchor\">" +
            "<a " + Aclass + " href=\"https://mluzarow.github.io\"><pre " + Pclass + "></pre></a>" +
            "<a " + Aclass + " href=\"https://mluzarow.github.io\" style=\"margin-left:240px\"><pre " + Pclass + "></pre></a>" +
            "<a " + Aclass + " href=\"https://mluzarow.github.io\" style=\"margin-left:480px\"><pre " + Pclass + "></pre></a>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[0] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[1] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[2] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[3] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[4] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[5] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[6] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[7] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[8] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[9] + "</pre></div>" +
            "<div " + Dclass + "><pre " + Pclass + ">" + cnt[10] + "</pre></div>" +
        "</div>"
    ;

    var hovers = document.getElementsByClassName ("nav-hover");
    var hover_pre = [];

    for (var i = 0; i < hovers.length; i++) {
        hover_pre.push (hovers[i].getElementsByClassName ("formatted-text")[0]);
    }

    for (var i = 0; i < hover_pre.length; i++) {
        for (var j = 0; j < cntLink.length; j++) {
            hover_pre[i].innerHTML += cntLink[j] + "</br>";
        }
    }
       // competition pro
//
//             __
//            (  )
//             ||
//             ||
//         ___|""|__.._
//        /____________\
// jrei   \____________/~~~.
//
//
//         /|\       []   |"""""""""""--__    /|  |\
//        / | \      ||   |____________--""  ( |__| )
//       | ( ) |     ||         | |           \    /
//       | .-. |     ||         | |            |12|
//       ]( 0 )[     ||         | |            |  |
//       / `-' \     ||         | |            |  |
//      / /' `\ \    ||         | |            |  |
//     | |     | |  |%%|        | |            |  |
//     | |     | |  ,'`,        | |            |  |
//     | |     | |  ||||        | |            |14|
//     | |     | |  ||||        | |           / __ \
//      \ \   / /   ||||        | |          ( |  | )
//       `-' `-'    `--'        `-'           \|  |/


}

function testWriteLogo () {
    var lines = computeLines ();
    var offset = parseInt (lines / 4);

    for (var i = 0; i < offset; i++) {
        write ("");
    }

    var Dstyle = "style = \"text-align: center;\"";
    var Pstyle = "style = \"margin: 0;\"";
    var logo = [
        String.raw`___________________________________/\\\\\\_________________________________________________________________________________________________________        `,
        String.raw` ___________________________/\\\\\_\////\\\______________________________________________________________________________________________/\\\\\_____       `,
        String.raw`  _________________________/\\\///_____\/\\\_____________________________________________________________________________________________\////\\\____      `,
        String.raw`   ____/\\\\\__/\\\\\______\//\\\_______\/\\\_____/\\\____/\\\__/\\\\\\\\\\\__/\\\\\\\\\_____/\\/\\\\\\\______/\\\\\_____/\\____/\\___/\\____/\\\_____     `,
        String.raw`    __/\\\///\\\\\///\\\__/\\\\\\________\/\\\____\/\\\___\/\\\_\///////\\\/__\////////\\\___\/\\\/////\\\___/\\\///\\\__\/\\\__/\\\\_/\\\___\//\\\\\\_    `,
        String.raw`     _\/\\\_\//\\\__\/\\\_\/////\\\_______\/\\\____\/\\\___\/\\\______/\\\/______/\\\\\\\\\\__\/\\\___\///___/\\\__\//\\\_\//\\\/\\\\\/\\\_____/\\\///__   `,
        String.raw`      _\/\\\__\/\\\__\/\\\_____/\\\________\/\\\____\/\\\___\/\\\____/\\\/_______/\\\/////\\\__\/\\\_________\//\\\__/\\\___\//\\\\\/\\\\\_____\//\\\____  `,
        String.raw`       _\/\\\__\/\\\__\/\\\____\///\\\\\__/\\\\\\\\\_\//\\\\\\\\\___/\\\\\\\\\\\_\//\\\\\\\\/\\_\/\\\__________\///\\\\\/_____\//\\\\//\\\_____/\\\\\_____ `,
        String.raw`        _\///___\///___\///_______\/////__\/////////___\/////////___\///////////___\////////\//__\///_____________\/////________\///__\///_____\/////______`
    ];

    for (var i = 0; i < logo.length; i++) {
        write ("<div " + Dstyle + "><pre " + Pstyle + ">" + logo[i] + "</pre></div>", false);
    }
}
