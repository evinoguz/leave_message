//BU BİR STORE

import { action, observable, makeObservable } from 'mobx';

class Keyboard {
    constructor() {
        makeObservable(
            this,
            {
                active: observable,
                setActive: action,

                height: observable,
                setHeight: action,

                close: action,
                open: action
            }
        );
    }

    active = false;
    setActive = d => this.active = d;

    height = 0;
    setHeight = d => this.height = d;


    close = () => {
        this.active = false;
        this.height = 0;
    };
    open = ({ endCoordinates: { height } }) => {
        this.active = true;
        this.height = height;
    };
}

const keyboard = new Keyboard();

export { keyboard };