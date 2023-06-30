import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { MineComponent } from './mine/mine.component';
import { AgentComponent } from './agent/agent.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'create', component: CreateComponent },
            { path: 'mine', component: MineComponent },
            { path: 'agent', component: AgentComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class OrderRoutingModule {}
