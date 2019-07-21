import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {CategoryModel} from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter();
  @Output() onFilterApply = new EventEmitter();


  @Input() categories: CategoryModel[];


  selectedPeriod = 'd';

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'},
  ];


  types = [
    {type: 'income', label: 'доход'},
    {type: 'outcome', label: 'расход'}
  ];

  constructor() { }

  ngOnInit() {
  }

  closeFilter() {
    this.onFilterCancel.emit();
  }

  handleChangeType(target) {

  }

  handleChangeCategory(target) {

  }

}
