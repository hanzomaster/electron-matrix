const ipcRenderer = require("electron").ipcRenderer;
ipcRenderer.send("submitForm", formData);
