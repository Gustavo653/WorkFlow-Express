import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MessageServiceSuccess, PrimeFlexStyle } from 'src/app/demo/api/base';
import { CategoryService } from 'src/app/demo/service/category.service';
import { OrderService } from 'src/app/demo/service/order.service';
import { PriorityService } from 'src/app/demo/service/priority.service';
import { StatusService } from 'src/app/demo/service/status.service';
import { SupportGroupService } from 'src/app/demo/service/supportGroup.service';
import { UserService } from 'src/app/demo/service/user.service';

@Component({
    templateUrl: './detail-requester.component.html',
})
export class DetailRequesterComponent implements OnInit {
    startTime?: Date;
    endTime?: Date;
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
    timeEntryRegistry: any = {};
    agentSelector: any[] = [
        { label: 'Atendente', value: 'agent' },
        { label: 'Grupo de Atendimento', value: 'supportGroup' },
    ];
    timeEntrySelectorValue: string = 'requester';
    timeEntrySelector: any[] = [
        { label: 'Solicitantes e Atendentes', value: 'requester' },
        { label: 'Apenas Atendentes', value: 'agent' },
    ];
    constructor(
        private userService: UserService,
        private supportGroupService: SupportGroupService,
        private priorityService: PriorityService,
        private statusService: StatusService,
        private categoryService: CategoryService,
        private orderService: OrderService,
        private activatedRoute: ActivatedRoute,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.fetchData();
    }

    clearAgentSelection() {
        if (this.agentValue == 'agent') {
            this.data.supportGroupId = null;
        } else {
            this.data.agentId = null;
        }
    }

    validateOrderData() {
        return (
            this.data.title != undefined &&
            this.data.description != undefined &&
            this.data.priorityId != undefined &&
            this.data.categoryId != undefined &&
            (this.data.supportGroupId != undefined || this.data.agentId != undefined)
        );
    }

    isOrderFinished() {
        if (this.statuses === undefined) return false;
        const finishedStatus = this.statuses.find((x) => {
            return x.id === this.data.statusId;
        });
        if (finishedStatus === undefined) return false;
        return finishedStatus.name !== 'Encerrado';
    }

    validateTimeEntryData() {
        return this.startTime != undefined && this.endTime != undefined && this.timeEntryRegistry.description != undefined;
    }

    updateOrder() {
        this.loading = true;
        if (this.validateOrderData()) {
            this.orderService
                .updateOrder(this.data.id, this.data.title, this.data.description, this.data.priorityId, this.data.agentId, this.data.categoryId, this.data.supportGroupId)
                .subscribe((x) => {
                    this.messageService.add(MessageServiceSuccess);
                    this.loading = false;
                });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Certifique-se de preencher todos os campos!',
            });
            this.loading = false;
        }
    }

    rateOrder() {
        this.loading = true;
        if (this.data.rating) {
            this.orderService.rateOrder(this.data.id, this.data.rating).subscribe((x) => {
                this.messageService.add(MessageServiceSuccess);
                this.loading = false;
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Certifique-se de preencher todos os campos!',
            });
            this.loading = false;
        }
    }

    finishOrder() {
        this.confirmationService.confirm({
            header: 'Finalizar Chamado',
            message: `Você deseja finalizar o chamado: ${this.data.description}?`,
            acceptLabel: 'Aceitar',
            rejectLabel: 'Rejeitar',
            accept: () => {
                this.loading = true;
                this.orderService.finishOrder(this.data.id).subscribe((x) => {
                    this.messageService.add(MessageServiceSuccess);
                    this.fetchData();
                });
            },
        });
    }

    editTimeEntry(timeEntry: any) {
        this.startTime = new Date(timeEntry.startTime);
        this.endTime = new Date(timeEntry.endTime);
        this.timeEntryRegistry = timeEntry;
    }

    clearTimeEntry() {
        this.startTime = undefined;
        this.endTime = undefined;
        this.timeEntryRegistry = {};
    }

    createOrUpdateTimeEntry() {
        this.loading = true;
        if (this.validateTimeEntryData()) {
            if (this.timeEntryRegistry.id) {
                this.orderService.updateTimeEntry(this.timeEntryRegistry.id, this.timeEntryRegistry.description, this.startTime!, this.endTime!, this.timeEntrySelectorValue).subscribe((x) => {
                    this.messageService.add(MessageServiceSuccess);
                    this.timeEntryRegistry = {};
                    this.startTime = undefined;
                    this.endTime = undefined;
                    this.fetchData();
                });
            } else {
                this.orderService.createTimeEntry(this.timeEntryRegistry.description, this.startTime!, this.endTime!, this.timeEntrySelectorValue, this.data.id).subscribe((x) => {
                    this.messageService.add(MessageServiceSuccess);
                    this.timeEntryRegistry = {};
                    this.startTime = undefined;
                    this.endTime = undefined;
                    this.fetchData();
                });
            }
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Certifique-se de preencher todos os campos!',
            });
            this.loading = false;
        }
    }

    deleteTimeEntry(timeEntry: any) {
        this.confirmationService.confirm({
            header: 'Excluir Registro',
            message: `Você deseja excluir o apontamento: ${timeEntry.description}?`,
            acceptLabel: 'Aceitar',
            rejectLabel: 'Rejeitar',
            accept: () => {
                this.loading = true;
                this.orderService.deleteTimeEntry(timeEntry.id).subscribe((x) => {
                    this.messageService.add(MessageServiceSuccess);
                    this.fetchData();
                });
            },
        });
    }

    anyTimeEntry() {
        const timeEntries = this.data.TimeEntries as any[];

        const hasItems = timeEntries.length > 0;
        return hasItems;
    }

    fetchData() {
        this.loading = true;
        this.orderService.getRequesterOrder(this.orderId).subscribe((x) => {
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
