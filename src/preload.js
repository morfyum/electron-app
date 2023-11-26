const { contextBridge, ipcRenderer } = require('electron')

// Injektálás a render.js-be
window.addEventListener('DOMContentLoaded', () => {
	const script = document.createElement('script');
	script.src = './renderer.js';
	//document.head.appendChild(script);
});

// contextBridge segítségével engedélyezzük a biztonságos kommunikációt a main és render folyamatok között
/*
contextBridge.exposeInMainWorld('electron', {
	invoke: async (channel, ...args) => {
		return await ipcRenderer.invoke(channel, ...args);
	},
});
*/

contextBridge.exposeInMainWorld('morfyumAPI', {
	desktop: true
  })


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
	replaceText(`platform`, process.platform)
})


/*
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  //chrome: () => process.versions.chrome,
  //electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})*/


// Saját változó definiálása és átadása a renderelő folyamatnak


const customVariable = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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