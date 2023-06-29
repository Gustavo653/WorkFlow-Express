import { NgModule } from '@angular/core';
import { RolePipe } from './demo/pipe/RolePipe';

@NgModule({
    declarations: [RolePipe],
    exports: [RolePipe],
})
export class SharedModule {}
