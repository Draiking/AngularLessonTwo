import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';


@Injectable()
export class UserService {

    constructor(private http: HttpClient) {
    }


    getUser(email, password: string): Promise<any> {
        return this.http.get(`http://localhost:3000/users?email=${email}`).toPromise()
            .then((res: any) => {
                if (res[0].password === password) {
                    const user = res[0];
                    delete user.password;
                    localStorage.setItem('user', JSON.stringify(user));
                    return res[0];
                } else {
                   return false;
                }
            });
    }

}

