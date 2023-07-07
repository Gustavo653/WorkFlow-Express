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
    formItem: string = 'flex flex-column flex-wrap justify-content-around w-full mb-2';
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
    options?: dictionary[];
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
        label: 'Geral',
        role: ['ADMIN', 'REQUESTER', 'AGENT'],
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-chart-line',
                routerLink: [''],
            },
            {
                label: 'Criar Chamado',
                icon: 'pi pi-fw pi-plus',
                routerLink: ['/order/create'],
            },
            {
                label: 'Meus Chamados',
                icon: 'pi pi-fw pi-tag',
                routerLink: ['/order/mine'],
            },
        ],
    },
    {
        label: 'Atendente',
        role: ['ADMIN', 'AGENT'],
        items: [
            {
                label: 'Meus Atendimentos',
                icon: 'pi pi-fw pi-comments',
                routerLink: ['/order/agent'],
            },
        ],
    },
    {
        label: 'Administrador',
        role: ['ADMIN'],
        items: [
            {
                label: 'Gerenciar Usuários',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: ['/users'],
            },
            {
                label: 'Configurações',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Gerenciar Categorias',
                        icon: 'pi pi-fw pi-sliders-h',
                        routerLink: ['/config/categories'],
                    },
                    {
                        label: 'Gerenciar Prioridades',
                        icon: 'pi pi-fw pi-sliders-h',
                        routerLink: ['/config/priorities'],
                    },
                    {
                        label: 'Gerenciar Grupos de Atendimento',
                        icon: 'pi pi-fw pi-sliders-h',
                        routerLink: ['/config/support-groups'],
                    },
                    {
                        label: 'Gerenciar Status',
                        icon: 'pi pi-fw pi-sliders-h',
                        routerLink: ['/config/statuses'],
                    },
                ],
            },
            {
                label: 'Logs',
                icon: 'pi pi-fw pi-book',
                routerLink: ['/logs'],
            },
        ],
    },
];
