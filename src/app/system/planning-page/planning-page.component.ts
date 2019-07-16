import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {BillModel} from '../shared/models/bill.model';
import {CategoryModel} from '../shared/models/category.model';
import {AppEventModel} from '../shared/models/event.model';


@Component({
    selector: 'app-planning-page',
    templateUrl: './planning-page.component.html',
    styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

    isLoaded = false;
    s1: Subscription;


    bill: BillModel[];
    category: CategoryModel[];
    events: AppEventModel[];

    constructor(private billService: BillService, private categoryService: CategoriesService, private eventService: EventsService) {
    }

    ngOnInit() {
        this.s1 = combineLatest(
            this.billService.getBill(),
            this.categoryService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data: [BillModel[], CategoryModel[], AppEventModel[]]): any => {
            this.bill = data[0];
            this.category = data[1];
            this.events = data[2];

            this.isLoaded = true;
        });
    }

    getCategoryCost(cat: CategoryModel): number {
        const catEvent = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
        return catEvent.reduce((total, e) => {
            total += e.amount;
            return total;
        }, 0);
    }

    private getPercent(cat: CategoryModel): number{
            const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
            return percent > 100 ? 100 : percent;
    }

    getCatPercent(cat: CategoryModel): string {
        return this.getPercent(cat) + '%';
    }

    getCatColorClass(cat: CategoryModel): string {
        const percent = this.getPercent(cat);
        return percent < 50 ? 'success' : percent >= 90 ? 'danger' : 'warning';
    }

    ngOnDestroy(): void {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }

}
