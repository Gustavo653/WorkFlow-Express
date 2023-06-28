import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormField } from 'src/app/demo/api/base';
import { PostService } from 'src/app/demo/service/post.service';

@Component({
    templateUrl: './create.component.html',
})
export class CreateComponent {
    constructor(private postService: PostService, private messageService: MessageService, private router: Router) {}
    fields: FormField[] = [
        { id: 'title', type: 'text', name: 'title', label: 'Título', required: true },
        { id: 'content', type: 'textArea', name: 'content', label: 'Conteúdo', required: true },
    ];

    getFormData(data: any) {
        this.postService.createPost(data.title, data.content).subscribe((x) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Post criado!',
                detail: `Título: ${x.title}`,
            });
            this.router.navigate(['']);
        });
    }
}
