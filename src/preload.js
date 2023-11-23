const { contextBridge, ipcRenderer } = require('electron')

// Injektálás a render.js-be
window.addEventListener('DOMContentLoaded', () => {
	
	const script = document.createElement('script');
	script.src = './renderer.js';
	//document.head.appendChild(script);

});

// contextBridge segítségével engedélyezzük a biztonságos kommunikációt a main és render folyamatok között
contextBridge.exposeInMainWorld('electron', {
	invoke: async (channel, ...args) => {
		return await ipcRenderer.invoke(channel, ...args);
	},
});



window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}

	for (const dependency of ['chrome', 'node', 'electron']) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})

window.addEventListener('DOMContentLoaded', () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}
	replaceText(`current-platform`, process.platform)
})


/*
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  //chrome: () => process.versions.chrome,
  //electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})*/


// Saját változó definiálása és átadása a renderelő folyamatnak


const customVariable = 'Ez egy példa saját változó érték';

// Saját adatok biztonságos átadása a renderelő folyamatnak
contextBridge.exposeInMainWorld('myCustomData', {
    getCustomVariable: () => customVariable
});


let currentSystemTheme



if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
	currentSystemTheme = 'dark';
	console.log("Dark?", currentSystemTheme)
} else {
	currentSystemTheme = 'light';
	console.log("Light?", currentSystemTheme)
}

// Saját adatok biztonságos átadása a renderelő folyamatnak
contextBridge.exposeInMainWorld('currentThemeData', {
    getCustomVariable: () => currentSystemTheme
});