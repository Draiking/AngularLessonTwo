import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter();
  @Output() onFilterApply = new EventEmitter();

  timePeriods = [
    {type: 'd', label: 'День'},
    {type: 'w', label: 'Неделя'},
    {type: 'M', label: 'Месяц'},
  ];

  constructor() { }

  ngOnInit() {
  }

  closeFilter() {
    this.onFilterCancel.emit();
  }

}
