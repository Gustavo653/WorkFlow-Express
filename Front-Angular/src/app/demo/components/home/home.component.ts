import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { MessageServiceSuccess } from '../../api/base';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { PostService } from '../../service/post.service';

@Component({
    templateUrl: './home.component.html',
    providers: [MessageService, ConfirmationService],
    styles: [
        `
            :host ::ng-deep .p-frozen-column {
                font-weight: bold;
            }

            :host ::ng-deep .p-datatable-frozen-tbody {
                font-weight: bold;
            }

            :host ::ng-deep .p-progressbar {
                height: 0.5rem;
            }

            .user-profile {
                display: flex;
                align-items: center;
                margin: 10px;
            }
        `,
    ],
})
export class HomeComponent implements OnInit {
    loading: boolean = true;
    data: any[] = [];
    constructor(protected layoutService: LayoutService, private postService: PostService, private messageService: MessageService) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.loading = true;
        this.postService.getPosts().subscribe((x) => {
            this.data = x;
            this.loading = false;
        });
    }

    addReaction(postId: string, type: string) {
        this.postService.addReaction(postId, type).subscribe((x) => {
            this.messageService.add(MessageServiceSuccess);
            this.fetchData();
        });
    }

    addComment(postId: string, comment: string) {
        this.postService.createComment(postId, comment).subscribe((x) => {
            this.messageService.add(MessageServiceSuccess);
            this.fetchData();
        });
    }
}
