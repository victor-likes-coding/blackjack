class Hand {
    constructor() {
        this.hand = [];
        this.length = 0;
        this.hasAce = false;
        this.value = 0;
        this.aceValue = 11;
        this.aceCount = 0;
    }

    add(card) {
        this.hand.push(card);
        this.length++;
        this.aceCount = 0;

        this.value = this.hand.reduce((prev, nextCard) => {
            if (nextCard.card === "A") {
                this.aceCount++;
                this.hasAce = true;
            }
            return prev + nextCard.value;
        }, 0);

        if (this.hasAce) {
            this.value -= this.aceCount * 1;
            this.updateAceValue();
            this.value += this.aceValue * this.aceCount;
        }
    }

    updateAceValue() {
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
