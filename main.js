// Letters
const letters = 'abcdefghijklmnopqrstuvwxyz';

// Get Array of Letters
let lettersArray = Array.from(letters);

// Select Letters Container
let lettersContainer = document.querySelector('.letters');

// Generate Letters
lettersArray.forEach((letter) => {

    // Create Letter Element
    let span = document.createElement('span');

    // Create Text Letter
    let text = document.createTextNode(letter);

    // Append Text to Element
    span.appendChild(text);

    // Append Class To Element
    span.className = 'letter-box';

    // Append Letters to Letters Container
    lettersContainer.appendChild(span);

})

// Get Random Property

const words = {
    programming: ['Javascript', 'Python', 'PHP', 'go', 'rust', 'Dart'],
    framework: ['React', 'Angular', 'Vue', 'Larvel', 'Django', 'ASP.Net'],
    anime: ['Naruto', 'Bleach', 'One piece', 'Blue Lock', 'Jujutsu Kaisen'],
    clubs: ['Real Madried', 'Barcelona', 'PSG', 'Liver Pool', 'Man city']
}

let keys = Object.keys(words);
let randomNum = Math.floor(Math.random() * keys.length);
let randomCategoryName = keys[randomNum];
let randomPropValue = words[randomCategoryName];
let randomValueNum = Math.floor(Math.random() * randomPropValue.length);
let randomWordArray = randomPropValue[randomValueNum];


document.querySelector('.category span').innerText = randomCategoryName;

let chosenWordArray = Array.from(randomWordArray);
let lettersGuess = document.querySelector('.letters-guess');

chosenWordArray.forEach(letter => {

    let span = document.createElement('span');

    if (letter === ' ' || letter === '.') {
        span.className = 'has-space';
    }

    lettersGuess.appendChild(span);

})

let spans = document.querySelectorAll('.letters-guess span');
let wrongAttemps = 0;
let hangmanDraw = document.querySelector('.hangman-draw');
let sucsessSound = document.getElementById('sucess');
let failSound = document.getElementById('fail');
let notSpaceSpan = document.querySelectorAll('.letters-guess span:not(.has-space)').length;


document.addEventListener('click', (e) => {

    let theStatus = false;

    if (e.target.className ==  'letter-box') {

        e.target.classList.add('clicked');

        let clickedLetter = e.target.innerHTML.toLowerCase();

        chosenWordArray.forEach((wordLetter, wordIndex) => {

            if (clickedLetter == wordLetter.toLowerCase()) {
                theStatus = true;
                spans.forEach((span, spanIndex) => {

                    if (wordIndex == spanIndex) {

                        span.innerHTML = clickedLetter;
                        span.classList.add('sucess');
                        
                    }

                });
            };

        });

        if (theStatus !== true) {

            wrongAttemps++;
            hangmanDraw.classList.add(`wrong-${wrongAttemps}`);
            failSound.play();

            if (wrongAttemps === 8) {

                endGame(`The Word is ${randomWordArray}`);
                lettersContainer.classList.add('finished');
            }



        } else {

            sucsessSound.play();
            let sucessSpan = document.querySelectorAll('.sucess');
           
            if (sucessSpan.length == notSpaceSpan){
               setTimeout(()=>{

                endGame('Congratz You Are Finish the Game');

               },1000)
            }
        
        //    console.log(sucessSpan.length == notSpaceSpan)

        };
    };

});


function endGame(txt){

    let popUp  = document.createElement('div');
    popUp.className = 'pop-up';

    let p = document.createElement('p');


    p.appendChild(document.createTextNode(txt));
    popUp.appendChild(p);
    document.body.appendChild(popUp);

    setTimeout(()=>{

        window.location.reload();

    },5000)
}