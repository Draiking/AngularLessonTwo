import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';

import {UserService} from '../../shared/service/user.service';
import {AuthService} from '../../shared/service/auth.service';
import {Message} from '../../shared/models/message.modele';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    form: FormGroup;
    message: Message;

    constructor(private userService: UserService, private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)])
        });

        this.route.queryParams
            .subscribe((params: Params) => {
                if (params[`nowCanLogin`]) {
                    this.showMessage({text: 'Теперь можете войти', type: 'success'});
                }
            });
    }

    private showMessage(message: Message) {
        this.message = message;
        window.setTimeout(() => {
            this.message.text = '';
        }, 5000);
    }


    async onSubmit() {
        const formData = this.form.value;
        const user = await this.userService.getUser(formData.email, formData.password);
        if (user) {
            this.showMessage({text: 'Добро пожаловать', type: 'danger'});
            this.authService.login();
        } else {
            this.showMessage({text: 'Пользователя не существует', type: 'danger'});
        }
    }
}
