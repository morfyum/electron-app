const { contextBridge, ipcRenderer } = require('electron')


// Injektálás a render.js-be
window.addEventListener('DOMContentLoaded', () => {
	const script = document.createElement('script');
	script.src = './render.js';
	//document.head.appendChild(script);
});

// contextBridge segítségével engedélyezzük a biztonságos kommunikációt a main és render folyamatok között
contextBridge.exposeInMainWorld('electron', {
	invoke: async (channel, ...args) => {
		return await ipcRenderer.invoke(channel, ...args);
	},
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    var theme = event.matches ? "dark" : "light";
	document.documentElement.className = theme
	localStorage.setItem("theme", theme);
	theme = localStorage.getItem("theme");
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

/*
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
})
*/