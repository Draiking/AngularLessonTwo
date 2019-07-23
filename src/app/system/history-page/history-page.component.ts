import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';

import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {CategoryModel} from '../shared/models/category.model';
import {AppEventModel} from '../shared/models/event.model';


@Component({
    selector: 'app-history-page',
    templateUrl: './history-page.component.html',
    styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(private categoryService: CategoriesService,
                private eventService: EventsService
    ) {
    }


    isLoaded = false;
    s1: Subscription;

    categories: CategoryModel[];
    events: AppEventModel[];
    filterEvents: AppEventModel[];


    charData = [];

    isFilterVisible = false;


    ngOnInit() {
        this.s1 = combineLatest(
            this.categoryService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data: any) => {
            this.categories = data[0];
            this.events = data[1];
            this.serOriginalEvents();
            this.buildChartData();
            this.isLoaded = true;
        });


    }

    private serOriginalEvents() {
        this.filterEvents = this.events.slice();
    }

    buildChartData(): void {
        this.charData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.filterEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
            this.charData.push({
                name: cat.name,
                value: catEvent.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            });
        });


        /*for (const category of this.categories) {
      const eventForCategory = this.events.filter((event) => {
          return event.category === category.id;
      });
      let ammountSum = 0;
      eventForCategory.forEach((event) => {
          if (event.type === 'income') {
              ammountSum -= event.amount;
          } else  {
              ammountSum += event.amount;
          }
      });
      console.log(ammountSum);
      this.charData.push({
          name: category.name,
          value: ammountSum
      });

  }*/


    }

    private toggleFilterVisibility(onFilt: boolean) {
        this.isFilterVisible = onFilt;
    }

    openFilter() {
        this.toggleFilterVisibility(true);
    }

    onFilterApply(filterData) {
        this.toggleFilterVisibility(false);
        this.serOriginalEvents();

        const startPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d');

        this.filterEvents = this.filterEvents
            .filter((e) => {
                return filterData.types.indexOf(e.type) !== -1;
            })
            .filter((e) => {
                return filterData.categories.indexOf(e.category.toString()) !== -1;
            })
            .filter((e) => {
                const momentDate = moment(e.date, 'DD.MM.YYYY');
                return momentDate.isBetween(startPeriod, endPeriod);
            });

        this.buildChartData();
    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
        this.serOriginalEvents();
        this.buildChartData();
    }

    ngOnDestroy(): void {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }

}

