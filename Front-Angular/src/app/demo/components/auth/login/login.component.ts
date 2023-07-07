import { Component } from '@angular/core';
import { AuthService } from 'src/app/demo/service/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .p-password input {
                width: 100%;
                padding: 1rem;
            }

            :host ::ng-deep .pi-eye {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }

            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    usuario: any = {
        usuario: '',
        senha: '',
    };

    hidden: boolean = true;

    onSubmit(form: any) {
        this.hidden = false;
        if (form.valid) {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            const emailValid = emailRegex.test(form.value.email);
            if (!emailValid) {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Endereço de e-mail inválido',
                    detail: 'Por favor, insira um endereço de e-mail válido.',
                });
                this.hidden = true;
                return;
            }
            this.authService.login(form.value.email, form.value.senha).subscribe(
                async (res) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Sua solicitação foi processada com sucesso!',
                        detail: `Estamos lhe redirecionando para a página principal.`,
                    });
                    this.hidden = true;
                    this.authService.saveToken(res.object.token ?? '');
                    this.router.navigate(['']);
                }
            );
            this.hidden = true;
        }
    }


    constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }
}
