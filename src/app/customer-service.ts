import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterMetadata } from 'primeng/api';
import { Customer } from './customer';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) {
      this.selectedFilters = null as any
    }

    selectedFilters: {
      [s: string]: FilterMetadata | FilterMetadata[] | undefined;
    };

    getCustomersLarge() {
        return this.http.get<any>('assets/customers-large.json')
            .toPromise()
            .then(res => <Customer[]>res.data)
            .then(data => { return data; });
    }
}
