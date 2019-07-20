import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from '../../shared/models/category.model';
import {AppEventModel} from '../../shared/models/event.model';

@Component({
    selector: 'app-history-events',
    templateUrl: './history-events.component.html',
    styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

    @Input() categories: CategoryModel[];
    @Input() events: AppEventModel[];
    searchValue = '';
    searchPlaceholder = 'Сумма';
    searchField = 'amount';

    constructor() {
    }

    ngOnInit() {
        this.events.forEach((e: AppEventModel) => {
            e.catName = this.categories.find((c) => c.id === e.category).name;
        });
    }


    getEventClass(e: AppEventModel) {
        return {
            label: true,
            'label-danger': e.type === 'outcome',
            'label-success': e.type === 'income',
        };
    }

    changeCriteria(field: string) {
        const namesMap = {
            amount: 'Сумма',
            date: 'Дата',
            category: 'Категории',
            type: 'Тип'
        };
        this.searchPlaceholder = namesMap[field];
        this.searchField = field;
    }

}
