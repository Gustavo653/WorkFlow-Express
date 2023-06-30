import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MessageServiceSuccess, PrimeFlexStyle } from 'src/app/demo/api/base';
import { CategoryService } from 'src/app/demo/service/category.service.ts';
import { OrderService } from 'src/app/demo/service/order.service';
import { PriorityService } from 'src/app/demo/service/priority.service';
import { StatusService } from 'src/app/demo/service/status.service';
import { SupportGroupService } from 'src/app/demo/service/supportGroup.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
    templateUrl: './create.component.html',
})
export class CreateComponent implements OnInit {
    style = new PrimeFlexStyle();
    loading: boolean = true;
    users: any[] = [];
    supportGroups: any[] = [];
    priorities: any[] = [];
    statuses: any[] = [];
    categories: any[] = [];
    data: any = {};
    agentValue: string = 'agent';
    agentSelector: any[] = [
        { label: 'Atendente', value: 'agent' },
        { label: 'Grupo de Atendimento', value: 'supportGroup' },
    ];
    constructor(
        private userService: UserService,
        private supportGroupService: SupportGroupService,
        private priorityService: PriorityService,
        private statusService: StatusService,
        private categoryService: CategoryService,
        private orderService: OrderService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.fetchData();
    }

    validateData() {
        return (
            this.data.title != undefined &&
            this.data.description != undefined &&
            this.data.priorityId != undefined &&
            this.data.categoryId != undefined &&
            (this.data.supportGroupId != undefined || this.data.agentId != undefined)
        );
    }

    createOrder() {
        console.log(JSON.stringify(this.data));
        if (this.validateData()) {
            this.orderService.createOrder(this.data.title, this.data.description, this.data.priorityId, this.data.agentId, this.data.categoryId, this.data.supportGroupId).subscribe((x) => {
                this.messageService.add(MessageServiceSuccess);
                this.router.navigate(['']);
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Certifique-se de preencher todos os campos!',
            });
        }
    }

    clearAgentSelection() {
        if (this.agentValue == 'agent') {
            this.data.supportGroupId = undefined;
        } else {
            this.data.agentId = undefined;
        }
    }

    fetchData() {
        this.loading = true;
        this.userService.getUsers().subscribe((x) => {
            this.users = x;
        });
        this.supportGroupService.getSupportGroups().subscribe((x) => {
            this.supportGroups = x;
        });
        this.priorityService.getPriorities().subscribe((x) => {
            this.priorities = x;
        });
        this.statusService.getStatuses().subscribe((x) => {
            this.statuses = x;
        });
        this.categoryService.getCategories().subscribe((x) => {
            this.categories = x;
        });
        this.loading = false;
    }
}
