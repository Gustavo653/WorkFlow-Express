import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormField, MessageServiceSuccess } from 'src/app/demo/api/base';
import { CategoryService } from 'src/app/demo/service/category.service.ts';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './categories.component.html',
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
export class CategoriesComponent implements OnInit {
    loading: boolean = true;
    cols: any[] = [];
    data: any[] = [];
    fields: FormField[] = [{ id: 'name', type: 'text', name: 'name', label: 'Nome', required: true }];
    modalDialog: boolean = false;
    selectedRegistry: any;
    constructor(protected layoutService: LayoutService, private categoryService: CategoryService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

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

    createUser() {
        this.selectedRegistry = {
            email: undefined,
            firstName: undefined,
            lastName: undefined,
            password: undefined,
            role: undefined,
        };
        this.modalDialog = true;
    }

    editRegistry(registry: any) {
        this.selectedRegistry = { ...registry };
        this.selectedRegistry.password = null;
        this.modalDialog = true;
    }

    deleteRegistry(registry: any) {
        this.confirmationService.confirm({
            header: 'Deletar registro',
            message: `Tem certeza que deseja apagar o registro: ${registry.firstName}`,
            acceptLabel: 'Aceitar',
            rejectLabel: 'Rejeitar',
            accept: () => {
                this.categoryService.deleteCategory(registry.id).subscribe((x) => {
                    this.messageService.add(MessageServiceSuccess);
                    this.fetchData();
                });
            },
        });
    }

    getFormData(registry: any) {
        if (!registry) {
            this.modalDialog = false;
        } else {
            if (registry.id) {
                this.categoryService.updateCategory(registry.id, registry.name).subscribe((x) => {
                    this.fetchData();
                    this.modalDialog = false;
                });
            } else {
                this.categoryService.createCategory(registry.name).subscribe((x) => {
                    this.fetchData();
                    this.modalDialog = false;
                });
            }
        }
    }

    fetchData() {
        this.categoryService.getCategories().subscribe((x) => {
            this.data = x;
            this.loading = false;
        });
    }
}
