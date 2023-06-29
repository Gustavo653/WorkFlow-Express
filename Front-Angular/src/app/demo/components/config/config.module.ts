import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AtomicModule } from '../atomic/atomic.module';
import { DataViewModule } from 'primeng/dataview';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfigRoutingModule } from './config-routing.module';
import { PrioritiesComponent } from './priorities/priorities.component';
import { CategoriesComponent } from './categories/categories.component';
import { SupportGroupsComponent } from './supportGroups/supportGroups.component';
import { StatusesComponent } from './statuses/statuses.component';

@NgModule({
    declarations: [PrioritiesComponent, CategoriesComponent, SupportGroupsComponent, StatusesComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DialogModule,
        ConfirmDialogModule,
        ProgressBarModule,
        DataViewModule,
        FormsModule,
        AtomicModule,
        ButtonModule,
        InputTextareaModule,
        InputTextModule,
        ConfigRoutingModule,
    ],
})
export class ConfigModule {}
