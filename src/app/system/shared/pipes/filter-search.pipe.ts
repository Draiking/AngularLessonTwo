import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'appFilterSearch'
})
export class FilterSearchPipe implements PipeTransform {

    transform(items: any, value: string, field: any): any {
        if (items.length === 0 || !value) {
            return items;
        }

        return items.filter((i) => {
            const t = Object.assign({}, i);
            if (!isNaN(t[field])) {
                t[field] += '';
            }


            if (field === 'category') {
                t[field] = t['catName'];
            }

            if (field === 'type') {
                t[field] = t[field] === 'income' ? 'доход' : 'расход';
            }


            return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
        });
    }


}
