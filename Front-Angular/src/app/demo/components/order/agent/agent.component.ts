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
    templateUrl: './agent.component.html',
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
export class AgentComponent implements OnInit {
    loading: boolean = true;
    style = new PrimeFlexStyle();
    cols: any[] = [];
    data: any;
    priorities: any[] = [];
    statuses: any[] = [];
    categories: any[] = [];
    queryParams: any = {
        first: 1,
        rows: 10,
        type: '0',
        search: '',
    };
    agentSelector: any[] = [
        { label: 'Meus chamados', value: '0' },
        { label: 'Chamados de meus grupos', value: '1' },
        { label: 'Todos', value: '2' },
    ];
    constructor(private orderService: OrderService, private priorityService: PriorityService, private statusService: StatusService, private categoryService: CategoryService) {}

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
        this.orderService.getOrders(1, this.queryParams).subscribe((x) => {
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
