class Hand {
    constructor() {
        this.hand = [];
        this.length = 0;
        this.hasAce = false;
        this.value = 0;
        this.aceValue = 1;
    }

    add(card) {
        const cardValue = card.getCardValue();

        this.hand.push(card);
        this.length++;
        this.value += cardValue;

        // check if card is an Ace
        if (card.card === "A") {
            this.hasAce;

            this.value -= cardValue;
            this.value += this.aceValue;
        }
    }

    getAceValue() {
        if (this.value > 10) {
            this.aceValue = 1;
        } else {
            this.aceValue = 11;
        }
    }

    getValue() {
        return this.value;
    }
}
