const board = document.getElementById('game-board');
const newBoardBtn = document.getElementById('start');
const winTxt = document.getElementById('win-txt');
const timer = document.getElementById('timer');
const bestScore = document.getElementById('best-score');

cards = ['pair1-1', 'pair1-2', 'pair2-1', 'pair2-2', 
    'pair3-1', 'pair3-2', 'pair4-1', 'pair4-2',
    'pair5-1', 'pair5-2', 'pair6-1', 'pair6-2',
    'pair7-1', 'pair7-2', 'pair8-1', 'pair8-2',
];
let card1, card2;
let isPaused = false;
let correctPairs = 0;
let tryCount = 0;
let elapsedSeconds = 0;
let timerInterval;
let localBestTry;
let localBestTime;

//Fisher–Yates shuffle
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function innitBoard(cards) {
    cards = shuffleArray(cards);
    cards.forEach( function(card, index, cards) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        switch (card) {
            case 'pair1-1':
            case 'pair1-2':
                newCard.classList.add('card1');
                newCard.id = 'pair1';
                break;
            case 'pair2-1':
            case 'pair2-2':
                newCard.classList.add('card2');
                newCard.id = 'pair2';
                break;
            case 'pair3-1':
            case 'pair3-2':
                newCard.classList.add('card3');
                newCard.id = 'pair3';
                break;
            case 'pair4-1':
            case 'pair4-2':
                newCard.classList.add('card4');
                newCard.id = 'pair4';
                break;
            case 'pair5-1':
            case 'pair5-2':
                newCard.classList.add('card5');
                newCard.id = 'pair5';
                break;
            case 'pair6-1':
            case 'pair6-2':
                newCard.classList.add('card6');
                newCard.id = 'pair6';
                break;
            case 'pair7-1':
            case 'pair7-2':
                newCard.classList.add('card7');
                newCard.id = 'pair7';
                break;
            case 'pair8-1':
            case 'pair8-2':
                newCard.classList.add('card8');
                newCard.id = 'pair8';
                break;
            default:
                break;
        }
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');
        newCard.append(cardFront);
        newCard.append(cardBack);
        newCard.addEventListener('click', () => {
            if (isPaused || newCard.classList.contains('flipped')
                 || newCard.classList.contains('matched')) {
                return;
            }
            newCard.classList.toggle('flipped');
            if (!card1){
                card1 = newCard;
            }else if (!card2) {
                card2 = newCard;
                tryCount++;
                winTxt.textContent = `Try : ${tryCount}`;
                const match = CompareCards(card1,card2);
                if (!match) {
                    isPaused = true;
                    setTimeout(() => {
                        card1.classList.toggle('flipped');
                        card2.classList.toggle('flipped');      
                        card1 = undefined;
                        card2 = undefined;
                        isPaused = false;
                    }, 1000);
                }
                if (match) {
                    correctPairs++;
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    card1 = undefined;
                    card2 = undefined;
                    console.log(correctPairs);
                    if (correctPairs === 8) {
                        stopTimer();
                        winTxt.textContent = `You win | Time : ${elapsedSeconds}s | Tries : ${tryCount}.`;
                        if (localBestTime && localBestTry) {
                            if (localBestTime > elapsedSeconds) {
                                localBestTime = elapsedSeconds;
                            }
                            if (localBestTry > tryCount) {
                                localBestTry = tryCount;
                            }
                        }else{
                            localBestTime = elapsedSeconds;
                            localBestTry = tryCount;
                        }
                        bestScore.textContent = `Best ~ Time: ${localBestTime}s | Tries :${localBestTry}`;
                        timer.textContent = "";
                    }
                }
            }
        })

        board.append(newCard);
    });
}
newBoardBtn.addEventListener('click', () => {
    board.innerHTML = "";
    card1 = undefined;
    card2 = undefined;
    isPaused = false;
    correctPairs = 0;
    tryCount = 0;
    stopTimer();
    innitBoard(cards);
    startTimer();
    winTxt.textContent = "";
    bestScore.textContent = "";
});

function CompareCards(card1, card2) {
    if (card1.id === card2.id){
        console.log("Cards matching!");
        return true;
    }
    console.log("not matching");
    return false;
}

function startTimer() {
    elapsedSeconds = 0; // reset in case a previous game left it non-zero
    timer.textContent = `Timer : ${elapsedSeconds}s`; // show 0 immediately, don't wait for first tick
    timerInterval = setInterval(() => {
        elapsedSeconds++;
        timer.textContent = `Timer : ${elapsedSeconds}s`;
    }, 1000);
}
function stopTimer() {
    clearInterval(timerInterval);
}
innitBoard(cards);
startTimer();