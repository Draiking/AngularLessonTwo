import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppEventModel} from '../models/event.model';
import {Injectable} from '@angular/core';


@Injectable()
export class EventsService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: AppEventModel): Observable<AppEventModel> {
        return this.post('events', event);
    }

    getEvents(): Observable<AppEventModel[]> {
        return this.get('events');
    }

}
