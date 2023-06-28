import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { PostRoutingModule } from './post-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AtomicModule } from '../atomic/atomic.module';
import { DataViewModule } from 'primeng/dataview';
import { MineComponent } from './mine/mine.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ManageComponent } from './manage/manage.component';

@NgModule({
    declarations: [CreateComponent, MineComponent, ManageComponent],
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
        PostRoutingModule,
    ],
})
export class PostModule {}
