import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginComponent} from './login/login.component';
import {RegistationComponent} from './registation/registation.component';
import {AuthComponent} from './auth.component';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        RegistationComponent,
        AuthComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule
    ]
})

export class AuthModule {

}
