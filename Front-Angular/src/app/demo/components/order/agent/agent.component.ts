import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { OrderService } from 'src/app/demo/service/order.service';

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
    cols: any[] = [];
    data: any[] = [];
    constructor(private orderService: OrderService) {}

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
                field: 'name',
                header: 'Nome',
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
        ];
        this.fetchData();
    }

    fetchData() {
        this.orderService.getOrders(1).subscribe((x) => {
            this.data = x;
            this.loading = false;
        });
    }
}
