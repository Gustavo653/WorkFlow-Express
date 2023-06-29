import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SliderModule } from 'primeng/slider';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { PanelModule } from 'primeng/panel';
import { FieldsetModule } from 'primeng/fieldset';
import { FormTableComponent } from './form-table/form-table.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { CheckboxModule } from 'primeng/checkbox';
import { FormComponent } from './form/form.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    declarations: [FormTableComponent, FormComponent],
    exports: [FormTableComponent, FormComponent],
    imports: [
        RouterModule,
        CommonModule,
        RadioButtonModule,
        ReactiveFormsModule,
        FormsModule,
        TableModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        RadioButtonModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        PanelModule,
        FieldsetModule,
        SharedModule,
        CheckboxModule,
        InputTextareaModule,
        DialogModule,
    ],
})
export class AtomicModule {}
