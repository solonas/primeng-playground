import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CustomerService } from '../customer-service';
import { Customer } from "../customer";

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html'
})
export class CustomerDetailsComponent implements OnInit {

  customerId: number
  customer: Customer

  constructor(private customerService: CustomerService, private route: ActivatedRoute) {
    this.customerId = Number(this.route.snapshot.paramMap.get('customer-id'))
    this.customer = null as unknown as Customer
  }

  ngOnInit() {
    this.customerService.getCustomersLarge().then(customers => {
      customers.forEach(
        customer => {
          if (customer.id === this.customerId) {
            this.customer = customer
          }
        }
      )
    })
  }
}
