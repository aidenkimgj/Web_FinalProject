var correct = [];


document.onload = loadDataXML();

function loadDataXML() {
    var filePath = './assets/data/finalquiz.xml';
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {

            processXML(ajax);
        }
    }

    ajax.open('GET', filePath, true);
    ajax.send();
}

function processXML(ajax) {
    var xmlDoc = ajax.responseXML;
    var display = "";

    console.log(xmlDoc);
    var quizList = xmlDoc.getElementsByTagName('question');
    var rightanswer = xmlDoc.getElementsByTagName('rightanswers')[0].textContent;


    correct = rightanswer.split(',');


    for (let i = 0; i < quizList.length; i++) {
        var thisQuiz = quizList[i];

        var qNumber = thisQuiz.getElementsByTagName('qnumber')[0].textContent;
        var qTitle = thisQuiz.getElementsByTagName('qtitle')[0].textContent;
        var qA = thisQuiz.getElementsByTagName('a')[0].textContent;
        var qB = thisQuiz.getElementsByTagName('b')[0].textContent;
        var qC = thisQuiz.getElementsByTagName('c')[0].textContent;
        var qD = thisQuiz.getElementsByTagName('d')[0].textContent;

        display += '<div class="quiz">'
        display += '<h4>Question ' + qNumber + '</h4>';
        display += '<p>' + qTitle + '</p>';
        display += '<label>';
        display += '<input type="radio" name="selection' + i + '" value="a">';
        display += '<span>' + 'A) ' + qA + '</span>';
        display += '</label>'
        display += '<label>';
        display += '<input type="radio" name="selection' + i + '" value="b">';
        display += '<span>' + 'B) ' + qB + '</span>';
        display += '</label>';
        display += '<label>';
        display += '<input type="radio" name="selection' + i + '" value="c">';
        display += '<span>' + 'C) ' + qC + '</span>';
        display += '</label>';
        display += '<label>';
        display += '<input type="radio" name="selection' + i + '" value="d">';
        display += '<span>' + 'D) ' + qD + '</span>';
        display += '</label>';
        display += '</div>';

        document.getElementById('displayBox').innerHTML = display;
    }

}

function calculateGrade() {
    var answer = [];

    for (let i = 0; i < correct.length; i++) {

        if (document.querySelector('input[name="selection' + i + '"]:checked') !== null) {
            answer.push(document.querySelector('input[name="selection' + i + '"]:checked').value);
        } else {
            answer.push('f');
        }
    }
    console.log(answer);

    var count = 0;
    
    for (let i = 0; i < correct.length; i++) {
        if (answer[i] == correct[i]) {
            count++
        }
    }

    alert('Your Grade is '+ count + '/5');

}