const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('snmp', {
    mib: (ip) =>  ipcRenderer.invoke('mib', ip),
})