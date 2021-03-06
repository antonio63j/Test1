"use strict";
exports.__esModule = true;
var fs = require("fs");
function asyncDelay(fname, ms) {
    //let fd = fs.openSync (fname2, 'w');
    var i = 0;
    var buff = '';
    var buffIni = "-INICIO: " + getHora() + '\r';
    while (i < ms) {
        buff = buff + getHora() + "-" + i.toString() + '\r';
        i++;
    }
    buff = buff + buffIni + "-FIN: " + getHora() + '\r';
    fs.writeFile(fname + '-' + getMilisegs(), buff, function (err) {
        if (err)
            throw err;
        pinta(getHora() + " writeFile : " + fname);
    });
}
function delay(fname, ms) {
    var i = 0;
    var buff = '';
    var fname2 = fname + "-" + getMilisegs();
    var fd = fs.openSync(fname2, 'w');
    buff = "-INICIO: " + getHora() + '\r';
    while (i < ms) {
        fs.writeSync(fd, getHora() + "-" + i.toString() + '\r');
        i++;
    }
    fs.writeSync(fd, buff + '-FIN: ' + getHora() + '\r');
}
function pinta(p) {
    if (p) {
        console.log(getHora() + " pinta llamado desde " + p);
    }
    else {
        console.log(getHora() + " pinta llamado sin parametro");
    }
}
function getHora() {
    var dt = new Date();
    return dt.getHours() + ':' + dt.getMinutes().toString() + ':'
        + dt.getSeconds().toString() + ':' + dt.getMilliseconds();
}
function getMilisegs() {
    var dt = new Date();
    return dt.getMilliseconds().toString();
}
function f6() {
    return new Promise(function (resolve, reject) {
        console.log(getHora() + " f6 generacion promise");
        asyncDelay('f6.txt', 2000000);
        resolve(getHora() + ' datos promesa f6');
    });
}
var p1 = new Promise(function (resolve, reject) {
    console.log(getHora() + " p1 generacion promise");
    // asyncDelay ('p1.txt', 1000000);
    // resolve(getHora() + ' datos promesa p1'); 
    setTimeout(pinta, 3000, "p1");
    resolve(getHora() + ' datos promesa p1 (3000 mlseg.)');
});
var p2 = new Promise(function (resolve, reject) {
    console.log(getHora() + " p2 generacion promise");
    //delay ('p2.txt', 500000);
    asyncDelay('p2.txt', 2000000);
    resolve(getHora() + ' datos promesa p2');
});
var p3 = new Promise(function (resolve, reject) {
    console.log(getHora() + " p3 generacion promise");
    // setTimeout(pinta, 3000, "p3"); 
    // resolve (getHora() + ' datos promesa p3 (3000 mlseg.)');
    asyncDelay('p3.txt', 1000000);
    resolve(getHora() + ' datos promesa p3');
});
var p4 = new Promise(function (resolve, reject) {
    console.log(getHora() + " p4 generacion promise");
    setTimeout(resolve, 3000, getHora() + " datos promesa p4 (3000 mlseg.)");
    //resolve (getHora() + ' datos promesa p4 (500 mlseg.)');
});
Promise.all([p1, p2, p3, p4, f6()]).then(function (values) {
    console.log(getHora() + " MOSTRANDO VALUES ");
    console.log(values);
}, function (reason) {
    console.log(reason);
});
console.log(getHora() + " FIN PROGRAMA");
// Promise.all([f6(), p2, p3, p4, p1]).then(values => { 
//   console.log(values);
// }).catch(reason => { 
//   console.log(reason)
// });
