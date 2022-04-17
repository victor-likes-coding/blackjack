const suites = [];

function createSuites() {
    let suiteList = ["Heart", "Diamond", "Clover", "Spade"];

    for (let i = 0; i < 4; i++) {
        suites[i] = suiteList[i];
    }
}

createSuites();

class Deck {
    constructor() {
        this.deck = [];
        this.createDeck();
        this.shuffle(); // shuffles 10x by default
        this.usedCards = [];
    }

    generateCardValue(value = 0) {
        const cardValue = ["A", "J", "Q", "K"];
        if (value < 1 || value > 9) {
            // 10, 11, 12 => 1, 2, 3
            if (value > 9) {
                return cardValue[value - 9];
            }

            return cardValue[value];
        }
        return value;
    }

    createDeck() {
        for (let i = 0; i < 13; i++) {
            for (let j = 0; j < 4; j++) {
                const card = this.generateCardValue(i);
                this.deck[i * 4 + j] = new Card(card, suites[j]);
            }
        }
    }

    shuffle(n = 10) {
        for (let i = 0; i < n; i++) {
            let cardSwap = this.deck.length;

            while (cardSwap) {
                const index = Math.floor(Math.random() * cardSwap--);

                // swap last element with chosen index
                const tempCard = this.deck[cardSwap];
                this.deck[cardSwap] = this.deck[index];
                this.deck[index] = tempCard;
            }
        }
    }

    getCard() {
        const card = this.deck.shift();
        this.usedCards.push(card);

        return card;
    }
}
