"use strict"

//loads book name with a promise execution
fetch("pro_js.json")
// fetch("My Year of Rest and Relaxation.json")
    .then(function (resp) {
        return resp.json();
    })
    .then(function (document) {

        //creates array called content_number
        let content_no_list = [];

        //empty array for the list of notes
        var Notes_list = [];

        /* for loop that checks if the JSON object is not undefined, 
           if the statement is true the results of the query are pushed to the results variable
        */
        content_index_check(document, content_no_list);

        /**  
         *  The first two entries (2,4) of the content_no_lists array are not in the same format as the notes. 
         */
        content_no_list.splice(0, 2);

        //the length of the content_no_lists variable is assigned to a new variable
        var arraylength = content_no_list.length;

        //for loop to increment until it is less than arraylength
        ParagraphElements(arraylength, content_no_list, document, Notes_list);

        CreateList(Notes_list);

    });

/** 
 * for loop that checks if the JSON object is not undefined, 
 * if the statement is true the results of the query are pushed to the results variable
 * @param {object} document JSON Object.
 * @param {Array} content_no_list Stores the number of results.
 */
function content_index_check(document, content_no_list) {
    for (var m = 0; m < document.body.content.length; m++) {
        if (document.body.content[m].table !== undefined) {
            content_no_list.push(m);
        }
    }
}

/** 
 * for loop to increment until it is less than arraylength
 * @param {object} document 
 * @param {Array} content_no_list 
 * @param {Array} arraylength 
 * @param {Array} Notes_list 
 */
function ParagraphElements(arraylength, content_no_list, document, Notes_list) {
    for (var i = 0; i < arraylength; i++) {
        //
        var content_index = content_no_list[i];
        var notes = document.body.content[content_index].table.tableRows[0].tableCells[0].content[1].table
            .tableRows[0].tableCells[1].content[0].paragraph.elements[0].textRun
            .content;

        console.log(content_index);
        Notes_list.push(notes);
        //url_list.push(url);
    }
}

/** 
 * creates html tags (ul & li) list of notes are parsed to become an li tag
 * @param {Array} Notes_list 
 */
function CreateList(Notes_list) {
    var ul = document.createElement('ul');
    document.getElementById('myList').appendChild(ul);
    Notes_list.forEach(function (name) {
        var li = document.createElement('li');
        ul.appendChild(li);
        li.innerHTML += name;
    });
}

