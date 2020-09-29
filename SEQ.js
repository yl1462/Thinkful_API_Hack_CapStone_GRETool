let SEQdata
//here on is for Sentence Equivalence Questions

function SEQButton() {
  $('main').on('click', '.SEQButton', function () {
    console.log('displaying SEQ questions');
    fetchSEQquestions();
  });
}

//fetching SE questions
function fetchSEQquestions() {
  fetch("https://gre-verbal.p.rapidapi.com/api/v1/questions?subcat=SE&count=10", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "gre-verbal.p.rapidapi.com",
      "x-rapidapi-key": "f6bf5906c1msh45ccd6bea4e4595p19e710jsn64d68bc7e7d2"
    }
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      SEQdata = data.data[0];
      displaySEQquestions(SEQdata)
    })
}

//display SE questions
function displaySEQquestions(SEQdata) {
  $('main').html(
    `
    <form>
    <h4>${SEQdata.description}</h4>
    <select multiple type='checkbox'>${SEQcheckBox()}</select>
     <button class='turnInSEQ' type='submit'>Turn In</button>
    </form>
     `
  )
}

function SEQcheckBox() {
  let option = ''
  for (let i = 0; i < SEQdata.options[0].length; i++) {
    option += `
    <br>
    <option id='SEQanswer' value='${SEQdata.options[0][i]}' type='checkbox'>${SEQdata.options[0][i]}</option>
    `
  }
  return option
}

function submitSEQanswer() {
  $('main').on('click', '.turnInSEQ', function (event) {
    event.preventDefault();
    console.log('checkingSEQanswer')
    checkSEQanswer();
  })
}

function checkSEQanswer() {
  let correctAnswer1 = `${SEQdata.options[0][SEQdata.answers[0][0]]}`
  let correctAnswer2 = `${SEQdata.options[0][SEQdata.answers[0][1]]}`
  console.log(correctAnswer1, correctAnswer2)
  let userAnswer = $('option:selected').val();
  console.log(userAnswer)
  // let userAnswer = ""
  // let correctAnswer = ""
  // for (let i = 0; i < SEQdata.answers.length; i++) {
  //   correctAnswer += `${SEQdata.options[0][SEQdata.answers[0][i]]}`
  //   console.log(correctAnswer)
  //   userAnswer += $('option:selected').val();
  //   console.log(userAnswer)
  // }
    // if (correctAnswer !== userAnswer) {
    //   wrongSEQanswer()
    // } else {
    //   $('main').html(
    //     `
    //   <h4>Well done!<h4>
    //   <p>Would you like to try another one?</p>
    //   <button class='SEQButton' type='submit'>Yes!</button>
    //   <button class='readyGo' type='button'>
    //     <span>Back to Main Menu</span>
    //   </button>
    //   `
    //   )
    // }
  }


function displayCorrectSEQ() {
  console.log(SEQdata.description)
  let html = `<h2>${SEQdata.description}</h2>`
  for (let i = 0; i < SEQdata.answers.length; i++) {
    html += `${SEQdata.options[0][SEQdata.answers[0][i]]}`
  }
  return html
}

function wrongSEQanswer() {
  console.log("wrong!")
  $('main').html(
    `
    <h3>Not quite there yet... but you are on the right track!</h3>
    <h4>${displayCorrectSEQ()}</h4>
    <p>Would you like to try another one?</p>
    <button class='SEQButton' type='submit'>Yes!</button>
    `
  )
}

$(
  SEQButton(),
  submitSEQanswer()
)