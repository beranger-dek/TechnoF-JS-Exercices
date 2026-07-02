const board = document.getElementById('game-board');
const newBoardBtn = document.getElementById('start');

cards = ['pair1-1', 'pair1-2', 'pair2-1', 'pair2-2', 
    'pair3-1', 'pair3-2', 'pair4-1', 'pair4-2',
    'pair5-1', 'pair5-2', 'pair6-1', 'pair6-2',
    'pair7-1', 'pair7-2', 'pair8-1', 'pair8-2',
]

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
                newCard.id = 'card1';
                break;
            case 'pair2-1':
            case 'pair2-2':
                newCard.id = 'card2';
                break;
            case 'pair3-1':
            case 'pair3-2':
                newCard.id = 'card3';
                break;
            case 'pair4-1':
            case 'pair4-2':
                newCard.id = 'card4';
                break;
            case 'pair5-1':
            case 'pair5-2':
                newCard.id = 'card5';
                break;
            case 'pair6-1':
            case 'pair6-2':
                newCard.id = 'card6';
                break;
            case 'pair7-1':
            case 'pair7-2':
                newCard.id = 'card7';
                break;
            case 'pair8-1':
            case 'pair8-2':
                newCard.id = 'card8';
                break;
            default:
                break;
        }
        board.append(newCard);
    });
}
newBoardBtn.addEventListener('click', () => {
    board.innerHTML = "";
    innitBoard(cards);
})