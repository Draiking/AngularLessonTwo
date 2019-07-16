import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoryModel} from '../../shared/models/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.modele';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit, OnDestroy {

    sub1: Subscription;
    @Input() categories: CategoryModel[];
    @Output() onCategoryEdit = new EventEmitter<CategoryModel>();

    currentCategoryId = 1;
    currentCategory: CategoryModel;
    message: Message;

    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {
        this.message = new Message('success', '');
        this.onCategoryChange();
    }


    onCategoryChange() {
        this.currentCategory = this.categories
            .find(c => c.id === +this.currentCategoryId);
    }

    onSubmit(form: NgForm) {
        let {capacity, name} = form.value;
        if (capacity < 0) {
            capacity *= -1;
        }

        const category = new CategoryModel(name, capacity, +this.currentCategoryId);

        this.sub1 = this.categoriesService.updateCategory(category)
            .subscribe(() => {
                this.onCategoryEdit.emit(category);
                this.message.text = 'Success';
                setTimeout(() => this.message.text = '', 2000);
            });

    }

    ngOnDestroy(): void {
        if (this.sub1) {
            this.sub1.unsubscribe();
        }
    }

}
