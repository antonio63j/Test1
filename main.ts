
function delay(ms: number) {
  let i = 0;
  while (i < ms) {
    console.log (i); 
    i++
  }
}
function pinta (p ?: string) {
  if (p) {
    console.log(`${getHora()} pinta llamado desde ${p}`);
  } else {
    console.log(`${getHora()} pinta llamado sin parametro`);
  }
}
 
function getHora (): string {
  let dt = new Date();
  return dt.getHours() + ':' + dt.getMinutes().toString() + ':'
        + dt.getSeconds().toString() + ':' + dt.getMilliseconds();
} 

function f6 () {
  return new Promise (function (resolve, reject) {
    console.log (`${getHora()} f6`);
    delay (2000);
    resolve(getHora() + ' datos promesa f6');
  });
} 

 var p1 = new Promise((resolve, reject) => { 
    console.log (`${getHora()} p1`);
    setTimeout(resolve, 1000, getHora() + " datos promesa p1"); 
  }); 
  var p2 = new Promise((resolve, reject) => { 
    console.log (`${getHora()} p2`);
    setTimeout(resolve, 2000, getHora() + " datos promesa p2"); 
  });
  var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, getHora() + " datos promesa p3"); 
    console.log (`${getHora()} p3`);
  });
  var p4 = new Promise((resolve, reject) => {
    console.log (`${getHora()} p4`);
    let t = getHora();
    resolve (t + " datos promesa p4"); 
  });
  var p5 = new Promise((resolve, reject) => {
    //reject("reject");
    pinta('p5');
    resolve(getHora() + " datos promesa p5"); 
    //setTimeout(resolve, 1000, "four");
    
  });
  
  Promise.all([p1, p2, p3, p4, p5, f6()]).then(values => { 
    console.log(values);
  }, reason => {
    console.log(reason)
  });
  
  Promise.all([f6(), p5, p2, p3, p4, p1]).then(values => { 
    console.log(values);
  }).catch(reason => { 
    console.log(reason)
  });
  

  import * as fs from 'fs';
  fs.writeFile('message.txt', 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });