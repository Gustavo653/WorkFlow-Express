import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AuthService } from '../demo/service/auth.service';
import { Router } from '@angular/router';
import { MenuRoutes } from '../demo/api/base';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    styles: [
        `
            .user-profile {
                display: flex;
                align-items: center;
                margin-top: 30px;
            }
        `,
    ],
})
export class AppMenuComponent implements OnInit {
    model: any[] = MenuRoutes.filter((x) => {
        const roles = JSON.parse(this.authService.getRole()!).map((item: { role: { normalizedName: any; }; }) => item.role.normalizedName);

        if (roles.includes('ADMIN')) {
            return true;
        }

        const routeRoles = x.role;
        if (routeRoles && Array.isArray(routeRoles)) {
            return routeRoles.some((routeRole) => roles.includes(routeRole));
        }

        return false;
    });




    constructor(public layoutService: LayoutService, private authService: AuthService, private router: Router) { }

    public logout(): void {
        this.authService.clearData();
        this.router.navigate(['/login']);
    }

    public showName(): string {
        const user = this.authService.getFirstName();
        const username = typeof user === 'string' ? user.toUpperCase() : 'USER';
        return username;
    }

    ngOnInit() { }
}
