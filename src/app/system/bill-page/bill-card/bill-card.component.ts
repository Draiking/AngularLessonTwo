import {Component, Input, OnInit} from '@angular/core';
import {BillModel} from '../../shared/models/bill.model';

@Component({
    selector: 'app-bill-card',
    templateUrl: './bill-card.component.html',
    styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

    @Input() bill: BillModel;
    @Input() currency: any;


    dollar: number;
    rubles: number;


    constructor() {
    }

    ngOnInit() {
        const {rates} = this.currency;
        this.dollar = rates.USD * this.bill.value;
        this.rubles = rates.RUB * this.bill.value;
        console.log(this.currency);
    }

}
