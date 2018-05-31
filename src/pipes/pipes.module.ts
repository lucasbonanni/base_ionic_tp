import { NgModule } from '@angular/core';
import { LastSendTimePipe } from './last-send-time/last-send-time';
@NgModule({
	declarations: [LastSendTimePipe],
	imports: [],
	exports: [LastSendTimePipe]
})
export class PipesModule {}
