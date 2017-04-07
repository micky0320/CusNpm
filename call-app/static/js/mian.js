import '../sass/main.css';
import '../sass/test.scss';
import './os';
import './callapp';

let envLibStr = JSON.stringify(window.envLib);
document.getElementById("envLibDiv").innerHTML = envLibStr;
const ua = navigator.userAgent;
document.getElementById("userAgent").innerHTML = ua;
document.getElementById('show').innerHTML = 'pageshow';

var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange"
} else if (typeof document.oHidden !== "undefined") {
    hidden = "oHidden";
    visibilityChange = "ovisibilitychange";
}

document.addEventListener(visibilityChange, function () {
    var tag = document[hidden];
    var state = hidden.replace(/[H|h]idden/, '');
    var visibilityState = !!state ? (state + 'VisibilityState') : ('visibilityState');
    document.title = document[visibilityState] + '状态';

    if (tag) {
        document.getElementById('show').innerHTML = visibilityChange;
    }
}, false);


document.getElementById('testSS').addEventListener('click', function () {
    window.callApp.callAppLink(null,function () {
        alert('提示浏览器打开');
    });
})