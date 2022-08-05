const hostSNMP = async () => {
    const response = await window.snmp.mib(document.getElementById('ip').value)
    console.log(response) // prints out 'pong'
    return response
}

document.getElementById('getSnmp').addEventListener('click', async () => {
    const varbinds = await hostSNMP()
    console.log(varbinds)
    for (const varbind of varbinds) {
        const paragraph = document.createElement('p')
        paragraph.textContent = varbind
        document.getElementById('info').appendChild(paragraph)
    }
})