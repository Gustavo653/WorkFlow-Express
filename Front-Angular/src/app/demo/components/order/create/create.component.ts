import { Component, OnInit } from '@angular/core';
import { PrimeFlexStyle } from 'src/app/demo/api/base';
import { CategoryService } from 'src/app/demo/service/category.service.ts';
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
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.fetchData();
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
