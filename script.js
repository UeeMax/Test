var tq = document.getElementById("test-questions");
var userAnswers = [];
var currentQuestion;
var tableQ, tableA;

tq.onclick = function(event) {
  if (event.target != tq) {
    currentQuestion = event.target;
    loadQuestion();
    document.getElementById("progress").style.width = event.target.innerHTML / tq.children.length * 100 + "%";
    changeCurrentQuestion();
  }
};

function pageLoad() {
  var test = document.getElementById("test-questions");
  for (var i = 1; i <= ques.length; i++) {
    var el = document.createElement("span");
    el.setAttribute("id", "question" + i);
    el.innerHTML = i;
    test.appendChild(el);
  }
  document.getElementById("question1").click();
}

function changeCurrentQuestion() {
  for (let i = 0; i < tq.children.length; i++)
    if (tq.children[i].className == "current")
      tq.children[i].className = "";
  currentQuestion.className = "current";

  if (tq.children[tq.children.length - 1] == currentQuestion) {
    document.f.next.style.display = "none";
    document.f.end.style.display = "";
    document.f.action = "javascript: next(); end()";
  } else {
    document.f.next.style.display = "";
    document.f.end.style.display = "none";
    document.f.action = "javascript: next()";
  }
}

function loadQuestion() {
  if (typeof ques[Number(currentQuestion.innerHTML) - 1] !== "undefined") {
    if (typeof tableQ !== "undefined") {
      tableQ.parentNode.removeChild(tableQ);
      tableA.parentNode.removeChild(tableA);
    }
    tableQ = document.createElement("table");
    tableQ.setAttribute("border", "1");
    tableQ.setAttribute("cellspacing", "0");
    document.getElementsByTagName("h2")[0].innerHTML = ques[Number(currentQuestion.innerHTML) - 1].title;
    document.getElementsByTagName("p")[0].innerHTML = ques[Number(currentQuestion.innerHTML) - 1].question;
    var heads = tableQ.insertRow(0);
    for (var i = 0; i < ques[Number(currentQuestion.innerHTML) - 1].answers.length; i++) {
      var th = heads.insertCell(i);
      th.innerHTML = String.fromCharCode(i + 1040);
    }
    var ans = tableQ.insertRow(1);
    for (var i = 0; i < ques[Number(currentQuestion.innerHTML) - 1].answers.length; i++) {
      var td = ans.insertCell(i);
      td.innerHTML = ques[Number(currentQuestion.innerHTML) - 1].answers[i];
    }
    document.getElementsByClassName("question-content")[0].appendChild(tableQ);
    tableA = document.createElement("table");
    var heads = tableA.insertRow(0);
    for (var i = 0; i < ques[Number(currentQuestion.innerHTML) - 1].answers.length; i++) {
      var th = heads.insertCell(i);
      th.innerHTML = String.fromCharCode(i + 1040);
    }
    var ans = tableA.insertRow(1);
    for (var i = 0; i < ques[Number(currentQuestion.innerHTML) - 1].answers.length; i++) {
      var td = ans.insertCell(i);
      td.innerHTML = '<input type="radio" value="' + String.fromCharCode(i + 1072) + '" name="q">';
    }
    var submit = tableA.insertRow(2);
    var but = submit.insertCell(0);
    but.setAttribute("colspan", ques[Number(currentQuestion.innerHTML) - 1].answers.length);
    but.innerHTML = '<input type="submit" name="next" value="Наступне питання"><input type="submit" name="end" value="Завершити тест" style="display: none">';
    document.f.appendChild(tableA);
    if(typeof userAnswers[Number(currentQuestion.innerHTML) - 1] !== "undefined")
      document.f.q.value = userAnswers[Number(currentQuestion.innerHTML) - 1];
  }
}

function next() {
  userAnswers[Number(currentQuestion.innerHTML) - 1] = document.f.q.value;
  if(Number(currentQuestion.innerHTML) != ques.length)
    document.getElementById("question" + (Number(currentQuestion.innerHTML)+1)).click();
}

function end() {
  let count = 0;
  ques.forEach((item, i) => {
    if (item.answ == userAnswers[i])
      count++
  });
  alert("Результат правильних відповідей = " + count + "/" + ques.length + "\nЗагальна оцінка = " + count / ques.length * 100 + "/100 балів");
  location.reload();
}
