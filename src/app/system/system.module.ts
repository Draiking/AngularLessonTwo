import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {PlanningPageComponent} from './planning-page/planning-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {SystemComponent} from './system.component';
import {SlidebarComponent} from './shared/components/slidebar/slidebar.component';
import {HeaderComponent} from './shared/components/header/header.component';
import {DropdownDirective} from './shared/directives/dropdown.directive';
import {BillCardComponent} from './bill-page/bill-card/bill-card.component';
import {CurrencyCardComponent} from './bill-page/currency-card/currency-card.component';
import {BillService} from './shared/services/bill.service';
import {MomentPipe} from './shared/pipes/moment.pipe';
import {AddEventComponent} from './records-page/add-event/add-event.component';
import {AddCategoryComponent} from './records-page/add-category/add-category.component';
import {EditEventComponent} from './records-page/edit-event/edit-event.component';
import {CategoriesService} from './shared/services/categories.service';
import {EventsService} from './shared/services/events.service';
import {HistoryChartComponent} from './history-page/history-chart/history-chart.component';
import {HistoryEventsComponent} from './history-page/history-events/history-events.component';
import {HistoryDetailComponent} from './history-page/history-detail/history-detail.component';
import {HistoryFilterComponent} from './history-page/history-filter/history-filter.component';
import {PieChartModule} from '@swimlane/ngx-charts';
import {FilterSearchPipe} from './shared/pipes/filter-search.pipe';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SystemRoutingModule,
        PieChartModule
    ],
    declarations: [BillPageComponent, HistoryPageComponent, PlanningPageComponent, RecordsPageComponent, SystemComponent, SlidebarComponent,
        HeaderComponent, DropdownDirective, BillCardComponent, CurrencyCardComponent, MomentPipe, AddEventComponent, AddCategoryComponent,
        EditEventComponent, HistoryChartComponent, HistoryEventsComponent, HistoryDetailComponent, HistoryFilterComponent,
        FilterSearchPipe],
    providers: [BillService, CategoriesService, EventsService]
})

export class SystemModule {

}
