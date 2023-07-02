import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrimeFlexStyle } from 'src/app/demo/api/base';
import { CategoryService } from 'src/app/demo/service/category.service.ts';
import { OrderService } from 'src/app/demo/service/order.service';
import { PriorityService } from 'src/app/demo/service/priority.service';
import { StatusService } from 'src/app/demo/service/status.service';
import { SupportGroupService } from 'src/app/demo/service/supportGroup.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
    templateUrl: './detail.component.html',
})
export class DetailComponent implements OnInit {
    users: any[] = [];
    supportGroups: any[] = [];
    priorities: any[] = [];
    statuses: any[] = [];
    categories: any[] = [];
    data: any = {};
    loading: boolean = true;
    style = new PrimeFlexStyle();
    orderId: number = Number(this.activatedRoute.snapshot.paramMap.get('id') ?? 0);
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
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.fetchData();
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
        this.orderService.getOrder(this.orderId).subscribe((x) => {
            if (x.agentId != undefined) this.agentValue = 'agent';
            if (x.supportGroupId != undefined) this.agentValue = 'supportGroup';
            this.data = x;
        });
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
