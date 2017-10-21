var ROOT_PATH = "https://raw.githubusercontent.com/mluzarow/Programming-Challenges/master/";
var query = window.location.href.split ("?")[1].split ("&");
var args = [];

for (var i = 0; i < query.length; i++) {
    var t = query[i].split ("=");
    args[t[0]] = t[1];
}
args['lang'] = args['lang'].split (",");

for (var i = 0; i < args['lang'].length; i++) {
    getFile (ROOT_PATH + args['ref'] + "." + args['lang'][i]);
}

function getFile (url) {
    var f = new XMLHttpRequest();
    f.open("GET", url, true);
    f.send();

    f.onreadystatechange = function() {
        if (f.readyState == 4 && f.status == 200) {
            document.getElementById ("code_box").innerHTML += f.responseText.replace ("<", "&lt;").replace (">", "&gt;");
        }
    }
}
