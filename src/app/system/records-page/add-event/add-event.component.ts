import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {mergeMap} from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';

import {CategoryModel} from '../../shared/models/category.model';
import {AppEventModel} from '../../shared/models/event.model';
import {EventsService} from '../../shared/services/events.service';
import {BillService} from '../../shared/services/bill.service';
import {BillModel} from '../../shared/models/bill.model';
import {Message} from '../../../shared/models/message.modele';
import {Subscription} from 'rxjs';


@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

    sub1: Subscription;
    sub2: Subscription;
    @Input() categories: CategoryModel[];

    message: Message;

    types = [
        {type: 'income', label: 'Доход'},
        {type: 'outcome', label: 'Расход'},
    ];

    constructor(private eventService: EventsService,
                private billService: BillService
    ) {
    }

    ngOnInit() {
        this.message = new Message('danger', '');
    }

    private showMessage(text: string) {
        this.message.text = text;
        setTimeout(() => this.message.text = '', 5000);
    }

    onSubmit(form: NgForm) {
        let {amount, description, category, type} = form.value;
        if (amount < 0) {
            amount *= -1;
        }

        const event = new AppEventModel(type, amount, +category, moment().format('DD.MM.YYYY HH:mm:ss'), description);


        this.sub1 = this.billService.getBill()
            .subscribe((bill: BillModel) => {
                let value = 0;
                if (type === 'outcome') {
                    if (amount > bill.value) {
                        this.showMessage(`На счету недостаточно средств. Вам не хватает${amount - bill.value}`);
                        return;
                    } else {
                        value = bill.value - amount;
                    }
                } else {
                    value = bill.value + amount;
                }

                this.sub2 = this.billService.updateBill({value, currency: bill.currency})
                    .pipe(mergeMap(() => this.eventService.addEvent(event)))
                    .subscribe(() => {
                        form.setValue({
                            amount: 0,
                            description: ' ',
                            category: 1,
                            type: 'outcome'
                        });
                    });
            });


    }

    ngOnDestroy() {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
        if (this.sub2) {
            this.sub2.unsubscribe();
        }
    }

}
