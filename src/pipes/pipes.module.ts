import { NgModule } from '@angular/core';
import { RevrsePipe } from './revrse/revrse';
import { ReversePipe } from './reverse/reverse';
@NgModule({
	declarations: [RevrsePipe,
    ReversePipe],
	imports: [],
	exports: [RevrsePipe,
    ReversePipe]
})
export class PipesModule {}
