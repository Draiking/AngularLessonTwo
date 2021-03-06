import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';


@Pipe({
    name: 'appmoment'
})
export class MomentPipe implements PipeTransform {

    transform(value: string, formatFrom: string, formatTo: string = 'D.MM.YYYY'): string {
        return moment(value, formatFrom).format(formatTo);
        moment.locale('ru');
    }

}
