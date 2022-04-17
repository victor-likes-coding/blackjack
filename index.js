let deck = null;
let playerTurn = false;
const dealerThreshold = 15;
const dealerGreed = 0.666;
let dealerGreedChance = Math.random();

// represent hands
let user = null;
let dealer = null;

// dom elements
const playerText = document.querySelector("#player-score");
const dealerText = document.querySelector("#dealer-score");
const hitButton = document.querySelector("#hit");
const stayButton = document.querySelector("#stay");
const winnerText = document.querySelector("#winner");

function deal() {
    for (let cardCount = 0; cardCount < 4; cardCount++) {
        card = deck.getCard();
        if (cardCount % 2 == 0) {
            user.add(card);
        } else {
            dealer.add(card);
        }
    }
}

function start() {
    // make new deck of card, shuffled on creation 10x
    playerTurn = true;
    deck = new Deck();

    user = new Hand();
    dealer = new Hand();

    deal();

    playerText.textContent = generatePlayerHand(user, "Player");
    // `Player: ${user.hand[0].card} ${user.hand[1].card} = ${user.value}`;

    // only reveal first card of dealer
    dealerText.textContent = `Dealer: ${dealer.hand[0].card} ? = ?`;

    hitButton.className = "";
    stayButton.className = "";
    winnerText.textContent = "";
}

function generatePlayerHand({ hand, value }, userType) {
    // for each card in user's hand, get value and add it up
    let text = hand.reduce((prev, next) => {
        return prev + ` ${next.card} `;
    }, `${userType}: `);

    text += `= ${value}`;
    return text;
}

function hit() {
    if (playerTurn) {
        getCard(user);

        playerText.textContent = generatePlayerHand(user, "Player");

        if (user.length > 4 || user.value > 21) {
            playerTurn = false;

            // computer turn
            // reveal dealer cards
            finishGame();
        }
    }
}

function stay() {
    playerTurn = false;
    finishGame();
}

function finishGame() {
    dealerText.textContent = generatePlayerHand(dealer, "Dealer");
    if (user.value > 21) {
        winnerText.textContent = "Dealer Won!";
        return;
    }

    if (user.value < 22) {
        // dealer will randomly decide if he wants to continue adding a card after a fixed score
        while (dealer.value < dealerThreshold && dealer.length < 5 && dealer.value < 21) {
            // draw a card
            getCard(dealer);
            dealerText.textContent = generatePlayerHand(dealer, "Dealer");
        }

        // getting out of loop means we either hit above 17 or we hit 5 cards

        // if dealer didn't, generate random chance greater than dealer greed to stop

        while (dealerGreedChance < dealerGreed && dealer.length < 5 && dealer.value < 21) {
            getCard(dealer);
            dealerText.textContent = generatePlayerHand(dealer, "Dealer");
        }

        // if dealer hit 5 cards, determine who won

        const userScore = user.value;
        const dealerScore = dealer.value;
        if (dealerScore > 21) {
            winnerText.textContent = "You Won!";
            return;
        }

        if (userScore < dealerScore) {
            winnerText.textContent = "Dealer Won!";
            return;
        }

        if (userScore > dealerScore) {
            winnerText.textContent = "You Won!";
            return;
        } else {
            winnerText.textContent = "You both Tied!";
        }
    } else {
        winnerText.textContent = "Dealer Won!";
    }
}

function getCard(player) {
    const card = deck.getCard();
    player.add(card);
}
