import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './login/login.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';
import {SharedModule} from '../shared/shared.module';
import {RegistrationComponent} from './registation/registration.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        SharedModule
    ]
})

export class AuthModule {
    constructor() {
    }
}
