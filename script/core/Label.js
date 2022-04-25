import { Node } from "./Node.js";

export class Label extends Node {
    constructor() {
        super();
        this._text = "";
        this.size = "";
        this.family = " ";
        this.textColor = "red";
    }

    get text() {
        return this._text;
    }
    set text(value){
        this._text = value;
        this.elm.innerText = value;
    }
    get fontfamily() {
        return this.family;
    }
    set fontfamily(value){
        this.fontfamily = value;
        this.elm.style.fontFamily = value ;
    }
    get fontsize() {
        return this.size;
    }
    set fontsize(value){
        this.size = value;
        this.elm.style.fontSize = value + "px";
    }
    get color() {
        return this.textColor;
    }
    set color(value){
        this.textColor = value;
        this.elm.style.color = value;
    }
    _createElement(){
        let elm = document.createElement("h1");
        elm.style.position = "absolute";
        return elm;
    }
}