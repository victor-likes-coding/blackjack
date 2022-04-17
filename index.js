const deck = [];
const suites = {};

function createSuites() {
    let suiteList = ["Heart", "Diamond", "Clover", "Spade"];

    for (let i = 0; i < 4; i++) {
        suites[i] = suiteList[i];
    }
}

function generateCardValue(value = 0) {
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

function createDeck() {
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 4; j++) {
            const card = generateCardValue(i);
            deck[i * 4 + j] = {
                card,
                suite: suites[j],
            };
        }
    }
}

function getCardValue({ card }) {
    /*
     * Card is an object, values 1 - 9 are numbers, AJQK are strings
     * {
     *  card: A, 1, ... J, Q, K
     * }
     */

    if (typeof card === "number") {
        return card;
    }

    // if A => Ace => 10 like other strings
    return 10;
}
function setUp() {
    createSuites();
    createDeck();
}

setUp();
console.log(deck);
