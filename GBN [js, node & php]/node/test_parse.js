//Returns list of words in selected book
const fs = require("fs");
//const jl = require('./JSONLoop.js');
var obj_book = JSON.parse(fs.readFileSync("../books/pro_js.json"));
// var obj_book = JSON.parse(fs.readFileSync("../books/My Year of Rest and Relaxation.json"));

//var obj_book = JSON.parse(fs.readFileSync('./the_only_story.json'));

let result = [];
let chapter = [];

//https://stackoverflow.com/questions/14528385/how-to-convert-json-object-to-javascript-array/14528472
//https://stackoverflow.com/questions/3010840/loop-through-an-array-in-javascript
//https://stackoverflow.com/questions/500504/why-is-using-for-in-with-array-iteration-a-bad-idea
for (var m = 0; m < obj_book.body.content.length; m++) {
  //for (m in obj_book.body.content){
  if (obj_book.body.content[m].table !== undefined) {
    result.push(m);
  }
}

console.log(obj_book.body.content.length);

//location of chapter title
// for (var t = 0; t < obj_book.body.content.length; t++) {
//   //var chapter_title = obj_book.body.content[t].paragraph.elements[0].textRun.content
//   if (typeof obj_book.body.content[0].paragraph === 'undefined') {
//     console.log("missing");
//     chapter.push(t);
//   }
// }

//https://stackoverflow.com/questions/5767325/how-do-i-remove-a-particular-element-from-an-array-in-javascript
//The first two results from the array are undefined
result.splice(0, 2);
var parr = [];

var arraylength = result.length;
for (var i = 0; i < arraylength; i++) {
  var ty = result[i];

  notes =
    obj_book.body.content[ty].table.tableRows[0].tableCells[0].content[1].table
      .tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun
      .content;

  url =
    obj_book.body.content[ty].table.tableRows[0].tableCells[0].content[1].table
      .tableRows[0].tableCells[2].content[0].paragraph.elements[0].textRun
      .textStyle.link.url;

  //console.log(arraylength);

  parr.push(notes);

  //notes directory
  console.log(notes);

  //url
  //console.log(url)

  //colour
  // console.log(obj_book.body.content[ty].table.tableRows[0].tableCells[0]
  //     .content[1].table.tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun.textStyle.backgroundColor.color)
}
// var m1 = require('./fetch_test');
// m1 = m2;
//var m2 = console.log(parr);

// console.log(obj_book.body.content[result].table.tableRows[0].tableCells[0]
//     .content[1].table.tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun.content)

// for (result in obj_book.body.content){
//         console.log(obj_book.body.content[16].table.tableRows[0].tableCells[0]
//     .content[1].table.tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun.content)
//         }

//console.log(obj_book.body.content[0].table);

//if the path is equal to true, return the path
//console.log(obj_book.body.content[16].table.tableRows[0].tableCells[0]
//.content[1].table.tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun.content);

// var k = obj_book.body.content[2].table.tableRows[0].tableCells[0].content[1].table.tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun.content;

// //21
// for (var m = 2; m < obj_book.body.content.length; m++)  {
//     if (k === TypeError) { continue; }
//         if (obj_book.body.content[m].table.tableRows[0].tableCells[0].content[1].table.tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun.content !== null) {
//             console.log(obj_book.body.content[m].table.tableRows[0].tableCells[0].content[1].table.tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun.content);
//         }

//     }
