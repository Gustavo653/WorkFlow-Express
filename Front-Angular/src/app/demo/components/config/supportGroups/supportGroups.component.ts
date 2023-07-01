import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormField, MessageServiceSuccess } from 'src/app/demo/api/base';
import { SupportGroupService } from 'src/app/demo/service/supportGroup.service';
import { UserService } from 'src/app/demo/service/user.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './supportGroups.component.html',
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
export class SupportGroupsComponent implements OnInit {
    loading: boolean = true;
    cols: any[] = [];
    data: any[] = [];
    users: any[] = [];
    fields: FormField[] = [];
    modalDialog: boolean = false;
    selectedRegistry: any;
    constructor(
        protected layoutService: LayoutService,
        private userService: UserService,
        private supportGroupService: SupportGroupService,
        private confirmationService: ConfirmationService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.cols = [
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
                field: 'userCount',
                header: 'Quantidade de Atendentes',
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
                field: '',
                header: 'Editar',
                type: 'edit',
            },
            {
                field: '',
                header: 'Apagar',
                type: 'delete',
            },
        ];
        this.fetchData();
    }

    event(selectedItems: any) {
        if (selectedItems.type == 0) {
        } else if (selectedItems.type == 1) {
            this.editRegistry(selectedItems.data);
        } else if (selectedItems.type == 2) {
            this.deleteRegistry(selectedItems.data);
        } else {
            console.error(selectedItems);
        }
    }

    create() {
        this.selectedRegistry = { name: '', Users: [] };
        this.setUsersOptions(true);
        this.modalDialog = true;
    }

    editRegistry(registry: any) {
        this.selectedRegistry = { ...registry };
        this.setUsersOptions();
        this.modalDialog = true;
    }

    deleteRegistry(registry: any) {
        this.confirmationService.confirm({
            header: 'Deletar registro',
            message: `Tem certeza que deseja apagar o registro: ${registry.name}`,
            acceptLabel: 'Aceitar',
            rejectLabel: 'Rejeitar',
            accept: () => {
                this.loading = true;
                this.supportGroupService.deleteSupportGroup(registry.id).subscribe((x) => {
                    this.messageService.add(MessageServiceSuccess);
                    this.fetchData();
                });
            },
        });
    }

    getFormData(registry: any) {
        this.loading = true;
        this.modalDialog = false;
        if (!registry) {
            this.fetchData();
        } else {
            if (registry.id) {
                this.supportGroupService.updateSupportGroup(registry.id, registry.name, registry.Users).subscribe((x) => {
                    this.fetchData();
                });
            } else {
                this.supportGroupService.createSupportGroup(registry.name, registry.Users).subscribe((x) => {
                    this.fetchData();
                });
            }
        }
    }

    fetchData() {
        this.loading = true;
        this.userService.getUsers().subscribe((x) => {
            this.users = x;
        });
        this.supportGroupService.getSupportGroups().subscribe((x) => {
            this.data = x;
            this.loading = false;
        });
        this.setUsersOptions(true);
    }

    setUsersOptions(showAll: boolean = true) {
        let options: any[] = [];
        if (showAll) options = this.users.filter((user) => !this.selectedRegistry.Users.some((selectedUser: any) => selectedUser.id === user.id));

        this.fields = [
            { id: 'name', type: 'text', name: 'name', label: 'Nome', required: true },
            {
                id: 'Users',
                type: 'picklist-user',
                name: 'Users',
                label: 'Usuários',
                required: false,
                options: options,
            },
        ];
    }
}
