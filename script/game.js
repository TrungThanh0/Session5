import { Node } from "./core/Node.js";
import { Sprite } from "./core/Sprite.js";
import { Card } from "./components/Card.js";
import { Label } from "./core/Label.js";

class Game extends Node {
    constructor() {
        super();
        this._createBPlay();         
    }
    
    _init() {
        this.width = 900;
        this.height = 500;
        this.x = 0;
        this.y = 0;
        this.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)";
        this.cardFlipped = 0;
        this.canClick = true;
        this.firstCard = null;
        this.secondCard = null;
        this.score = 100; 
        this._createCards();
        this.removeChild();   
        this._createScore();
        this._createBRPlay();    
    }
    _shuffleCards() {
        let randomCards = new Array(20)
        for (let i = 0; i < 20; i++) {
            randomCards[i] = i % (20 / 2)
        }
        randomCards.sort(() => {
            return 0.5 - Math.random()
        })
        randomCards.sort()
        return randomCards;
    }
    _createCards() {

        let tl = gsap.timeline({ repeat: 0, repeatDelay: 0 });
        let cards = [];
        let card;
        let randomCards = this._shuffleCards()
        for (let index = 0; index < 20; index++) {
            card = new Card(index);
            let col = index % 5
            let row = Math.floor(index / 5)
            card.x = col * 110
            card.y = row * 110
            card.width = 50
            card.height = 50
            TweenMax.to(card, {
                ease: Back.easeIn,
                x: 200,
                y: 150,
                zIndex: 999,
                duration: 0.2
            }, "0.1");
            this.addChild(card)
            card.setValue(randomCards[index]);
            cards.push(card)
            card.elm.addEventListener("click", this.onClickCard.bind(this, card))
        }
        
        for (let index = 0; index < 20; index++) {
            let row = Math.floor(index / 5)
            let col = index % 5
            TweenMax.to(cards[index], 0.4, {
                ease: Back.easeOut.config(5),
                x: col * 110,
                y: row * 110,
                delay: index * 0.1
            }
        )}
           
        
    }
    _createBPlay() {
        let BTPlay = new Label();
        BTPlay.elm.style.position = "absolute"
        BTPlay.elm.style.padding = "5px 5px"
        BTPlay.elm.style.borderRadius = "5px"
        BTPlay.elm.style.background = "pink"
        BTPlay.elm.style.cursor = "pointer"
        BTPlay.fontsize = 39;
        BTPlay.width = 172
        BTPlay.height = -1
        BTPlay.elm.textContent = "START "
        BTPlay.x = 720;
        BTPlay.y = 80;
        BTPlay.color = "Blue"
        BTPlay.elm.addEventListener("click", () => {
            document.getElementsByTagName("div")[0].innerHTML = "";
            this._init();
        });
        console.log(BTPlay );
        this.BTPlay = BTPlay
        this.addChild(this.BTPlay);
        
    }
    _createBRPlay(){
        this.BRPlay = new Label();
        this.BTPlay.elm.style.position = "absolute"
        this.BRPlay.elm.style.padding = "5px 5px"
        this.BRPlay.elm.style.borderRadius = "5px"
        this.BRPlay.elm.style.background = "Lightgreen"
        this.BRPlay.elm.style.cursor = "pointer"
        this.BRPlay.elm.classList.add('BRPlay');
        this.BRPlay.x = 730;
        this.BRPlay.y = 400;
        this.BRPlay.text = "RE-PLAY";
        this.BRPlay.elm.addEventListener("click", this.resetGame.bind(this, this.BRPlay));
        this.addChild(this.BRPlay);
        
        
    }
    _createScore() {
        this.lblScore = new Label();
        this.lblScore.text ='Score:'+ this.score;
        this.lblScore.fontsize = 50;
        this.lblScore.x = 700;
        this.lblScore.width = 50;
        this.lblScore.height = 50;
        this.lblScore.y = 0;
        this.lblScore.color = "Black";
        this.addChild(this.lblScore);
    }
    onClickCard(card) {
        if (this.flipCard = 0) 
            if (!this.canClick) return;
        if (card === this.firstCard) return;
        if (this.firstCard === null) {
            this.firstCard = card;
            this.firstCard.flipCard();
            console.log("firstCard", this.firstCard.value);
        } else {
            this.canClick = false;
            this.secondCard = card;
            this.secondCard.flipCard();
            console.log("second", this.secondCard.value);
            setTimeout(() => {
                this.compareCard(this.firstCard, this.secondCard);
            }, 1000);
        }
    }


    compareCard(firstCard, secondCard) {
        if (this.firstCard.value === this.secondCard.value) {
            gsap.to(this.label, { text: this.score, duration: 1 , snap: "text" });
            firstCard.scaleHideImage();
            secondCard.scaleHideImage(firstCard, secondCard);
            setTimeout(() => {
                this.firstCard = this.secondCard = null;
            }, 1000)
            console.log(true);
            this.plusScore();
            this.gameWin();
        } else {    
            gsap.to(this.label, { text: this.score, duration: 1, snap: "text" });           
            firstCard.flopCard();
            secondCard.flopCard(firstCard, secondCard);
            setTimeout(() => {
                this.firstCard = this.secondCard = null;
            }, 1000)
            console.log(false);
            this.minusScore();
            this.gameLose();
        }       
        setTimeout(()=> {
            this.canClick = true ;
        firstCard = secondCard = null ;
            
        },2000 ) ;
    }
        plusScore() {
        TweenLite.to(this, 1, {score: "+=10", roundProps: "score", onUpdate:() =>{ this.lblScore.text = 'Score:' + this.score;
        }});       
    }
        

    minusScore() {
        TweenLite.to(this, 1, {score: "-=10", roundProps: "score", onUpdate:() =>{ this.lblScore.text = 'Score:' + this.score;
        }});
        console.log(this.score);
    }
    resetGame() {
        const cards = document.body.getElementsByTagName("div")[0];
        cards.innerHTML = "";
        this._init();
    }
    gameLose() {
        if (document.getElementsByTagName("div")[0].childElementCount > 2 && this.score <=0 ){
            this.BRPlay.text = "You lose "
            this._createBPlay();
        }
    }
    gameWin() {
        if (document.getElementsByTagName("div")[0].childElementCount <= 2 && this.score > 0){
            this.BRPlay.text = " You win " ;
            this.resetGame();
        }      
    }
}
let game = new Game();
        game.width = 900
        game.height = 500
        game.x = 0
        game.y = 0
        game.elm.style.backgroundImage = "url(./images/trucxanh_bg.jpg)"
        document.body.appendChild(game.elm) 
        
