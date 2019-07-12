import {Component, OnInit} from '@angular/core';
import {User} from '../../../../shared/models/user.modele';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


    date: Date = new Date();
    user: User;

    constructor() {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    onLogout() {

    }

}
