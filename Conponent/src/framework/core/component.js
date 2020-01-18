export class Component {
    constructor(config) {
        this.selector = config.selector;
        this.template = config.template;
        this.logics = config.logics;
        this.id = config.id;
    }

    render() {
        document.querySelector(this.selector).innerHTML = this.template;
    }

    work() {
        this.logics(this.id);
    }
}