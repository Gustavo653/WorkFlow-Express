import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';

@NgModule({
    imports: [RouterModule.forChild([{ path: 'create', component: CreateComponent }])],
    exports: [RouterModule],
})
export class OrderRoutingModule {}
