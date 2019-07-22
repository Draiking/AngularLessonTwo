import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {RegistrationComponent} from './registation/registration.component';

const routes: Routes = [
    {path: '', pathMatch: 'full',  redirectTo: 'login'},
    {path: '', component: AuthComponent, children: [
            {path: 'login', component: LoginComponent},
            {path: 'registration', component: RegistrationComponent},
        ]
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AuthRoutingModule {
    constructor( ) {

    }
}
