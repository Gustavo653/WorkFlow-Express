import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormField, MessageServiceSuccess } from 'src/app/demo/api/base';
import { PostService } from 'src/app/demo/service/post.service';

@Component({
    templateUrl: './manage.component.html',
})
export class ManageComponent implements OnInit {
    constructor(private postService: PostService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) {}
    data: any[] = [];
    selectedRegistry: any;
    loading: boolean = true;
    modalDialog: boolean = false;
    layout: string = 'grid';
    fields: FormField[] = [
        { id: 'title', type: 'text', name: 'title', label: 'Título', required: true },
        { id: 'content', type: 'textArea', name: 'content', label: 'Conteúdo', required: true },
    ];

    ngOnInit(): void {
        this.fetchData();
    }

    fetchData() {
        this.postService.getPosts().subscribe((x) => {
            this.data = x;
            this.loading = false;
        });
    }

    getFormData(data: any) {
        this.postService.updatePost(data.id, data.title, data.content).subscribe((x) => {
            this.messageService.add({
                severity: 'success',
                summary: 'Post atualizado!',
                detail: `Título: ${x.title}`,
            });
            this.fetchData();
            this.modalDialog = false;
        });
    }

    editRegistry(registry: any) {
        this.selectedRegistry = { ...registry };
        this.modalDialog = true;
    }

    deleteRegistry(registry: any) {
        this.confirmationService.confirm({
            header: 'Deletar registro',
            message: `Tem certeza que deseja apagar o registro: ${registry.title}`,
            acceptLabel: 'Aceitar',
            rejectLabel: 'Rejeitar',
            accept: () => {
                this.postService.deletePost(registry.id).subscribe((x) => {
                    this.messageService.add(MessageServiceSuccess);
                    this.fetchData();
                });
            },
        });
    }
}
