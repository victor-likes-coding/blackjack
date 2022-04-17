class Card {
    constructor(card, denomination) {
        this.card = card;
        this.denomination = denomination;
        this.value = this.getCardValue(card);
    }

    getCardValue() {
        /*
         * Card is an object, values 1 - 9 are numbers, AJQK are strings
         * {
         *  card: A, 1, ... J, Q, K
         * }
         */

        if (typeof this.card === "number") {
            return this.card;
        }

        if (this.card === "A") {
            return 1;
        }

        // if A => Ace => 10 like other strings
        return 10;
    }
}
