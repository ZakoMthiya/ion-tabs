import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class UserDataResolver {

    constructor(private auth: AuthService) { }

    resolve() {
        return this.auth.getUserData();
        
    }
}
