import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'role' })
export class RolePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return '';
        }

        const roles: string[] = value.toLowerCase().split(',');

        const transformedRoles: string[] = [];

        for (const role of roles) {
            switch (role) {
                case 'admin':
                    transformedRoles.push('Administrador');
                    break;
                case 'requester':
                    transformedRoles.push('Solicitante');
                    break;
                case 'agent':
                    transformedRoles.push('Atendente');
                    break;
                default:
                    transformedRoles.push(role);
                    break;
            }
        }

        return transformedRoles.join(', ');
    }
}
