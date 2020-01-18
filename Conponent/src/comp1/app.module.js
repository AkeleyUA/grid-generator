import { FWModule } from '../framework/index';
import { appComponent } from './app.component';
import { appComponent2 } from './app.component2';
 


class AppModule extends FWModule {
    constructor(config) {
        super(config);
    }
}

export const appModule = new AppModule({
    components: [
        appComponent,
        appComponent2
    ]
});