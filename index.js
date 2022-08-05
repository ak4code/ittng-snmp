const snmp = require('net-snmp');

module.exports = function getSnmp(event, ip) {
    console.log(ip)
    var options = {
        port: 161,
        retries: 1,
        timeout: 5000,
        backoff: 1.0,
        transport: "udp4",
        trapPort: 162,
        version: snmp.Version2c,
    };
    const session = snmp.createSession(`${ip}`, "public", options);

    const oids = ["1.3.6.1.2.1.1.5.0", "1.3.6.1.2.1.1.1.0", "1.3.6.1.4.1.1347.43.10.1.1.12.1.1", "1.3.6.1.2.1.43.10.2.1.4.1.1"];

    return new Promise(function (resolve, reject) {
        session.get(oids, function (error, varbinds) {
            if (error) {
                console.error(error);
                reject(error)
            } else {
                for (var i = 0; i < varbinds.length; i++) {
                    if (snmp.isVarbindError(varbinds[i])) {
                        console.error(snmp.varbindError(varbinds[i]));
                    } else {
                        console.log(varbinds[i].oid + " = " + varbinds[i].value);
                    }
                }
                resolve(varbinds.map((varbind) => " " + varbind.value))
            }
            session.close();
        });
    })
}

