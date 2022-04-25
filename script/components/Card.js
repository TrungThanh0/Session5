import { Node } from "../core/Node.js";
import { Sprite } from "../core/Sprite.js";
import { Label } from "../core/Label.js";

export class Card extends Node {
    constructor(index) {
        super();
        this.index = index;
        this.value = null;
        this._createSprite();
        this._createCover();
        this._createLabel(this.index);
    }
    _createSprite() {
        this.sprite = new Sprite();
        this.sprite.width = 100;
        this.sprite.height = 100;
        this.sprite.x = 150;
        this.sprite.y = 50;
        this.addChild(this.sprite);
    }
    _createCover() {
        let cover = new Node();
        cover.x = 150;
        cover.y = 50;
        cover.width = 100;
        cover.height = 100;
        cover.elm.style.backgroundColor = "orange";
        cover.elm.style.border = "solid 1px blue";
        this.cover = cover;
        this.addChild(this.cover);
    }
    _createLabel(index) {
        this.label = new Label();
        this.label.x = 187;
        this.label.y = 65;
        this.label.text = index + 1;
        this.addChild(this.label);
    }
    setValue(value) {
        this.value = value;
        this.sprite.path = "./images/trucxanh" + value + ".jpg";
    }
    
    open() {
        const tl = gsap.timeline();
        tl.to(this.elm, { scaleX: 0, duration: 0.3 });
        tl.call(() => {
            this.sprite.elm.style.display = "unset";
            this.label.elm.style.display = "none";
        })
        tl.to(this.elm, { scaleX: 1, duration: 0.3 });
    }
    close() {
        const tl = gsap.timeline();
        tl.delay(0.5);
        tl.to(this.elm, 0.1, { x: "-=20", yoyo: true, repeat: 2 })
        tl.to(this.elm, 0.1, { x: "+=20", yoyo: true, repeat: 2 })
        tl.to(this.elm, { scaleX: 0, duration: 0.3 });
        tl.call(() => {
            this.sprite.elm.style.display = "none";
            this.label.elm.style.display = "unset";
        });
        tl.to(this.elm, { scaleX: 1, duration: 0.3 });
    }
    hide() {
        const tl = gsap.timeline();
        tl.to(this.elm, { zIndex: 1, scale: 1.5, duration: 0.3, delay: 0.5});
        tl.to(this.elm, { zIndex: 1, scale: 0, duration: 0.3});
    }



flipCard() {

    const tl = gsap.timeline({ paused: true });
    tl.to(this.sprite, { scaleX: 0, duration: 0 });
    tl.to(this.label, { scaleX: 0, duration: 0 });
    tl.to(this.cover, { scaleX: 0, duration: 1 });
    tl.to(this.sprite, { scaleX: 1, duration: 1 })
    tl.play();
    }
flopCard() {    
    const tl = gsap.timeline({ paused: true });
    tl.to(this.cover, { scaleX: 1, duration: 1, delay: 1 });
    tl.to(this.label, { scaleX: 1, duration: 0 })
    tl.to(this.sprite, { scaleX: 0, duration: 0 });
    tl.play();
    }
scaleHideImage(firstCard, secondCard) {
    this.sprite.zIndex = 1;
    gsap.to(firstCard, { scaleX: 1, scaleY: 1, width: 200, height: 200, x: -50, y: -50, duration: 0.5   });
    gsap.to(secondCard, { scaleX: 1, scaleY: 1, width: 200, height: 200, x: 50, y: -50, duration: 0.5 });
    
    setTimeout(() => {
        this.sprite.elm.style.display = "none";
        this.sprite.elm.style.display = "none";
    }, 1000)
}
}
