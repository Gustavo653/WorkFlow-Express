export interface dictionary {
    code: string;
    name: string;
}

export interface dictionaryList {
    code: number;
    name: string;
}

export class PrimeFlexStyle {
    label: string = 'block text-780 text-mg font-medium mb-2';
    title: string = 'block text-900 text-xl font-medium mb-2';
    labelDialog: string = 'width: 25rem; font-weight: 600';
    formItem: string = 'flex flex-column flex-wrap justify-content-around mb-4';
    formCard: string = 'flex flex-column md:flex-row align-items-start flex-wrap justify-content-evenly';
    formCheck: string = 'flex flex-row flex-wrap justify-content-between align-items-center gap-4';
    mbCheckbox: string = 'mb-2';
    mbCheckbox01: string = 'mb-5';
}

export interface FormField {
    id: string;
    type: string;
    name: string;
    label: string;
    required: boolean;
    email?: boolean;
}

export interface TableColumnSpan {
    span: string;
    text: string;
}

export interface TableColumn {
    field: string;
    header: string;
    type: string;
    format?: string;
}

export const MessageServiceSuccess = {
    severity: 'success',
    summary: 'Sua solicitação foi processada com sucesso!',
    detail: `Os dados foram salvos.`,
};

export interface RuntimeConfig {
    PARAM_API_URL: string;
}

export const MenuRoutes = [
    {
        label: 'Usuário',
        role: ['admin', 'user'],
        items: [
            {
                label: 'Feed',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: [''],
            },
            {
                label: 'Criar Post',
                icon: 'pi pi-fw pi-plus',
                routerLink: ['/post/create'],
            },
            {
                label: 'Meus Posts',
                icon: 'pi pi-fw pi-at',
                routerLink: ['/post/mine'],
            },
        ],
    },
    {
        label: 'Administrador',
        role: ['admin'],
        items: [
            {
                label: 'Gerenciar Usuários',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/users'],
            },
            {
                label: 'Gerenciar Posts',
                icon: 'pi pi-fw pi-file-o',
                routerLink: ['/post/manage'],
            },
            {
                label: 'Logs',
                icon: 'pi pi-fw pi-book',
                routerLink: ['/logs'],
            },
        ],
    },
];
