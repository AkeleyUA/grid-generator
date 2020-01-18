import { FWComponent } from "../framework";
import { logics as compLogics } from './app.comp.logics';

class AppComponent extends FWComponent {
    constructor(config) {
        super(config);
    }
}

let id = 2;

export const appComponent2 = new AppComponent ({
    selector: 'root2',
    template: `
    <div class="container-${id}">
        <div class="col">
            <div class="box"></div>
        </div>
        <button class="add add-row">+</button>
        <button class="add add-col">+</button>
        <button class="delete del-row">-</button>
        <button class="delete del-col" disabled>-</button>
    </div>
    `,
    logics: compLogics, 
    id:id
});