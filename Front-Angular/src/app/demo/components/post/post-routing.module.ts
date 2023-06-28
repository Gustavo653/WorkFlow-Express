import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { MineComponent } from './mine/mine.component';
import { ManageComponent } from './manage/manage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: CreateComponent },
            { path: 'mine', component: MineComponent },
            { path: 'manage', component: ManageComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class PostRoutingModule {}
