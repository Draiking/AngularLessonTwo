import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../shared/service/user.service';
import {User} from '../../shared/models/user.modele';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {


    form: FormGroup;

    constructor(private usersService: UserService, private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails.bind(this)),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            name: new FormControl(null, [Validators.required]),
            agree: new FormControl(false, [Validators.requiredTrue]),
        });
    }

    async onSubmit() {
        const {email, password, name} = this.form.value;
        const user = new User(email, password, name);
        const res = await this.usersService.createNewUser(user);
        if (res) {
            this.router.navigate(['auth/login'], {queryParams: {nowCanLogin: true}});
        } else {
            alert('Создание пользователя не удалось');
        }

        /*        this.usersService.createNewUser(user)
                    .then(() => {
                        this.router.navigate(['/login'], {
                            queryParams: {
                                nowCanLogin: true
                            }
                        });
                    });*/
    }

    forbiddenEmails(control: FormControl): Promise<any> {
        return new Promise((resolve) => {
            this.usersService.createNewUser(control.value)
                .then((user: User) => {
                   if (user) {
                        resolve({forbiddenEmail: true});
                   } else {
                       resolve(null);
                   }
                });
        });
    }

}
