import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

import {CategoriesService} from '../../shared/services/categories.service';
import {CategoryModel} from '../../shared/models/category.model';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {


    @Output() onCategoryAdd = new EventEmitter<CategoryModel>();

    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {
    }

    onSubmit(form: NgForm) {
        let {capacity} = form.value;
        if (capacity < 0) {
            capacity *= -1;
        }

        const category = new CategoryModel(name, capacity);

        this.categoriesService.addCategory(category)
            .subscribe(() => {
                form.reset();
                form.form.patchValue({capacity: 1});
                this.onCategoryAdd.emit(category);
            });
    }

}
