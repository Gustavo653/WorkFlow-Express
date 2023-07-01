import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { PrimeFlexStyle } from 'src/app/demo/api/base';
import { CategoryService } from 'src/app/demo/service/category.service.ts';
import { OrderService } from 'src/app/demo/service/order.service';
import { PriorityService } from 'src/app/demo/service/priority.service';
import { StatusService } from 'src/app/demo/service/status.service';
import { SupportGroupService } from 'src/app/demo/service/supportGroup.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
    templateUrl: './mine.component.html',
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
export class MineComponent implements OnInit {
    loading: boolean = true;
    style = new PrimeFlexStyle();
    cols: any[] = [];
    data: any;
    users: any[] = [];
    supportGroups: any[] = [];
    priorities: any[] = [];
    statuses: any[] = [];
    categories: any[] = [];
    queryParams: any = {
        first: 1,
        rows: 10,
        search: '',
    };
    constructor(
        private orderService: OrderService,
        private userService: UserService,
        private supportGroupService: SupportGroupService,
        private priorityService: PriorityService,
        private statusService: StatusService,
        private categoryService: CategoryService
    ) {}

    ngOnInit() {
        this.cols = [
            {
                field: '',
                header: 'Detalhes',
                type: 'redirect',
                format: '/order/detail',
            },
            {
                field: 'id',
                header: 'ID',
                type: 'number',
            },
            {
                field: 'title',
                header: 'Título',
                type: 'text',
            },
            {
                field: 'Priority.name',
                header: 'Prioridade',
                type: 'text',
            },
            {
                field: 'Category.name',
                header: 'Categoria',
                type: 'text',
            },
            {
                field: 'Status.name',
                header: 'Status',
                type: 'text',
            },
            {
                field: 'requester.firstName',
                header: 'Solicitante',
                type: 'text',
            },
            {
                field: 'agent.firstName',
                header: 'Atendente',
                type: 'text',
            },
            {
                field: 'SupportGroup.name',
                header: 'Grupo',
                type: 'text',
            },
            {
                field: 'createdAt',
                header: 'Criado em',
                type: 'date',
                format: 'dd/MM/yy HH:mm:ss',
            },
            {
                field: 'updatedAt',
                header: 'Atualizado em',
                type: 'date',
                format: 'dd/MM/yy HH:mm:ss',
            },
            {
                field: 'closingDate',
                header: 'Encerrado em',
                type: 'date',
                format: 'dd/MM/yy HH:mm:ss',
            },
        ];
        this.fetchDataFiltros();
        this.fetchData();
    }

    fetchDataFiltros() {
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
    }

    fetchData() {
        this.orderService.getOrders(0, this.queryParams).subscribe((x) => {
            this.data = x;
            this.loading = false;
        });
    }

    event(event: any) {
        this.queryParams.search = event.data.filters.global?.value ?? '';
        this.queryParams.first = event.data.first;
        this.queryParams.rows = event.data.rows;
        this.queryParams.sortField = event.data.sortField ?? 'id';
        this.queryParams.sortOrder = event.data.sortOrder ?? 1;
        this.fetchData();
    }
}
