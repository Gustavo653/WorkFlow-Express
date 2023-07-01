import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OrderService } from 'src/app/demo/service/order.service';

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
    cols: any[] = [];
    data: any;
    queryParams: any = {
        first: 1,
        rows: 10,
        search: '',
    };
    constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) {}

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
        this.fetchData();
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
        console.log(JSON.stringify(event));
    }
}
