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
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditEventComponent } from './records-page/edit-event/edit-event.component';

@NgModule({
    imports: [CommonModule, SharedModule, SystemRoutingModule],
    declarations: [BillPageComponent, HistoryPageComponent, PlanningPageComponent, RecordsPageComponent, SystemComponent, SlidebarComponent, HeaderComponent, DropdownDirective, BillCardComponent, CurrencyCardComponent, MomentPipe, AddEventComponent, AddCategoryComponent, EditEventComponent],
    providers: [BillService]
})

export class SystemModule {

}
