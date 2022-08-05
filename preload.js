const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('snmp', {
    mib: () => ipcRenderer.invoke('mib'),
})