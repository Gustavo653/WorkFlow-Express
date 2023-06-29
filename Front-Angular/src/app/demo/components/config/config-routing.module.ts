import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrioritiesComponent } from './priorities/priorities.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'priorities', component: PrioritiesComponent },
            { path: 'categories', component: CategoriesComponent },
        ]),
    ],
    exports: [RouterModule],
})
export class ConfigRoutingModule {}
