import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()

export class BillService extends BaseApi {


    constructor(public http: HttpClient) {
        super(http);
    }

    /*getBill(): Observable<any > {
        return  this.http.get('http://localhost:3000/bill')
            .pipe(map((res: Response) => res.json()));
    }*/

    getBill(): Observable<any> {
        return this.get('bill');
    }

    getCurrency(base: string = 'RUB'): Observable<any> {
        return  this.http.get(`http://data.fixer.io/api/latest?access_key=c9eab66403051c16142d640aea0a6bee`);
    }
}
