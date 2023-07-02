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
import { OrderRoutingModule } from './order-routing.module';
import { CreateComponent } from './create/create.component';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { EditorModule } from 'primeng/editor';
import { MineComponent } from './mine/mine.component';
import { AgentComponent } from './agent/agent.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DetailComponent } from './detail/detail.component';
import { RatingModule } from 'primeng/rating';

@NgModule({
    declarations: [CreateComponent, MineComponent, AgentComponent, DetailComponent],
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
        OrderRoutingModule,
        DropdownModule,
        SelectButtonModule,
        EditorModule,
        FieldsetModule,
        RatingModule,
    ],
})
export class OrderModule {}
