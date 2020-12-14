import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import {WineDetail} from './wine.models'



const SERVER = 'http://localhost:3000'
@Injectable()
export class WineService {
    constructor(private http : HttpClient){}

    fetchCountryList():Promise<any>{
       return this.http.get(`/countries`)
            .toPromise()
            
    }

    fetchWineDetails(country): Promise<WineDetail[]> {
        return this.http.get<WineDetail[]>(`/country/${country}`)
            .toPromise()
    }
}