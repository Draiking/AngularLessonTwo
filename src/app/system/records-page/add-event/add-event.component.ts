import {Component, Input, OnInit} from '@angular/core';

import {CategoryModel} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: CategoryModel[];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'},
  ];

  constructor() { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {}

}
