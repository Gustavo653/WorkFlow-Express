import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrioritiesComponent } from './priorities/priorities.component';
import { CategoriesComponent } from './categories/categories.component';
import { SupportGroupsComponent } from './supportGroups/supportGroups.component';
import { StatusesComponent } from './statuses/statuses.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'priorities', component: PrioritiesComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'support-groups', component: SupportGroupsComponent },
            { path: 'statuses', component: StatusesComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ConfigRoutingModule {}
