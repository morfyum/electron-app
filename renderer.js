// renderer.js
// 
//const information = document.getElementById('info');
//information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

//alert("OK")


var theme = localStorage.getItem("theme");
document.documentElement.className = theme
    

document.querySelector('#new-test-log').addEventListener('click', log);
document.querySelector('#toggleFullScreen').addEventListener('click', toggleFullScreen)
document.querySelector('#light').addEventListener('click', setTheme)
document.querySelector('#dark').addEventListener('click', setTheme)
document.querySelector('#window-close').addEventListener('click', windowClose)

function windowClose() {
    window.close()
}


function log() {
    const test_log = "[ OK ]"
    console.log(test_log)
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

/* Set Theme with buttons */
function setTheme(theme) {
    document.documentElement.className = theme
    localStorage.setItem("theme", theme);
    theme = localStorage.getItem("theme");
    console.log("setTheme:", theme)
}


function loadUrl() {
// Az input mező értékének lekérdezése
const url = document.getElementById("url-input").value;

// URL érvényességének ellenőrzése
if (!isValidUrl(url)) {
alert("Érvénytelen URL!");
return;
}

// Az URL betöltése
const {shell} = require('electron');
shell.openExternal(url);
}

function isValidUrl(url) {
// Egyszerű URL érvényességi ellenőrzés
// Itt további ellenőrzéseket is végezhetsz, ha szükséges
const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;
return regex.test(url);
}


const setThemeLight = document.getElementById('light');
//const setThemeLight = document.querySelector('#light');

setThemeLight.addEventListener('click', () => {
    console.log('Set Light')
    document.documentElement.className = theme
	localStorage.setItem("theme", theme)
	theme = localStorage.getItem("theme")
});

const setThemeDark = document.getElementById('dark');
setThemeDark.addEventListener('click', () => {
  document.documentElement.className = theme
	localStorage.setItem("theme", theme);
	theme = localStorage.getItem("theme");
    console.log('Set Dark:', theme);
});

