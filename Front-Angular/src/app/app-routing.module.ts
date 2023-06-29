import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './demo/components/auth/auth.guard';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: 'login',
                    loadChildren: () => import('./demo/components/auth/login/login.module').then((m) => m.LoginModule),
                },
                {
                    path: 'error',
                    loadChildren: () => import('./demo/components/auth/error/error.module').then((m) => m.ErrorModule),
                },
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            canActivate: [AuthGuard],
                            loadChildren: () => import('./demo/components/home/home.module').then((m) => m.HomeModule),
                        },
                        {
                            path: 'users',
                            canActivate: [AuthGuard],
                            loadChildren: () => import('./demo/components/user/user.module').then((m) => m.UserModule),
                        },
                        {
                            path: 'logs',
                            canActivate: [AuthGuard],
                            loadChildren: () => import('./demo/components/log/log.module').then((m) => m.LogModule),
                        },
                        {
                            path: 'config',
                            canActivate: [AuthGuard],
                            loadChildren: () => import('./demo/components/config/config.module').then((m) => m.ConfigModule),
                        },
                        {
                            path: 'order',
                            canActivate: [AuthGuard],
                            loadChildren: () => import('./demo/components/order/order.module').then((m) => m.OrderModule),
                        },
                    ],
                },
                { path: 'pages/notfound', component: NotfoundComponent },
                { path: '**', redirectTo: 'pages/notfound' },
            ],
            {
                scrollPositionRestoration: 'enabled',
                anchorScrolling: 'enabled',
                onSameUrlNavigation: 'reload',
            }
        ),
    ],
    exports: [RouterModule],
    providers: [AuthGuard],
})
export class AppRoutingModule {}
