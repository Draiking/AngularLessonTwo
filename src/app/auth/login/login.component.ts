import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {UserService} from '../../shared/service/user.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;

    constructor(private userservice: UserService) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });
    }

    async onSubmit() {
        const formData = this.form.value;
        const user = await this.userservice.getUser(formData.email, formData.password) ;
        if (user) {
            alert('Добро пожаловать');
        } else {
            alert('Пользователя не существует');
        }
    }
}
