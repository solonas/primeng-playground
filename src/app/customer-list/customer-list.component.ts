import { Component, Input, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { FilterMetadata, MenuItem, MessageService } from 'primeng/api';
import { Table } from "primeng/table";

import { Customer, Representative } from "../customer";
import { CustomerService } from "../customer-service";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  providers: [MessageService]
})
export class CustomerListComponent {
  customers: Customer[] = [];

  representatives: Representative[] = [];

  statuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  cols: any[] = [];

  _selectedColumns: any[] = [];

  menuItems: MenuItem[];

  selectedCustomer: Customer;

  filters: {
    [s: string]: FilterMetadata | FilterMetadata[] | undefined;
  };

  @Input() get selectedColumns(): any[] {
      return this._selectedColumns;
  }

  @ViewChild('dt1') myTable!: Table;

  set selectedColumns(val: any[]) {
      // restore original order
      this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  constructor(private customerService: CustomerService, private router: Router) {
    this.menuItems = [
      {label: 'View', icon: 'pi pi-fw pi-search', command: () => this.viewCustomer(this.selectedCustomer)},
    ];
    this.selectedCustomer = null as unknown as Customer
    this.filters = {}
  }

  viewCustomer(selectedCustomer: Customer) {
    this.customerService.selectedFilters = this.myTable.filters
    this.router.navigate([`/customer-details/${selectedCustomer.id}`]);
  }

  ngOnInit() {
    if (this.customerService.selectedFilters !== null) {
      this.filters = this.customerService.selectedFilters
    }
    this.customerService.getCustomersLarge().then(customers => {
      this.customers = customers;
      this.loading = false;

      this.customers.forEach(
        customer => {
          if (typeof customer.date === 'string') {
            customer.date = new Date(customer.date)
          }
        }
      );

      this.cols = [
        { field: 'name', header: 'Name' },
        // disabled column country for better table readbility -> field type is same as name
        // { field: 'country', header: 'Country' },
        { field: 'representative', header: 'Agent'},
        { field: 'date', header: 'Date'},
        { field: 'balance', header: 'Balance'},
        { field: 'status', header: 'Status'},
        { field: 'activity', header: 'Activity'},
        { field: 'verified', header: 'Verified'}
      ];

      this._selectedColumns = this.cols;

    })

    this.representatives = [
      { name: "Amy Elsner", image: "amyelsner.png" },
      { name: "Anna Fali", image: "annafali.png" },
      { name: "Asiya Javayant", image: "asiyajavayant.png" },
      { name: "Bernardo Dominic", image: "bernardodominic.png" },
      { name: "Elwin Sharvill", image: "elwinsharvill.png" },
      { name: "Ioni Bowcher", image: "ionibowcher.png" },
      { name: "Ivan Magalhaes", image: "ivanmagalhaes.png" },
      { name: "Onyama Limba", image: "onyamalimba.png" },
      { name: "Stephen Shaw", image: "stephenshaw.png" },
      { name: "XuXue Feng", image: "xuxuefeng.png" }
    ];

    this.statuses = [
      { label: "Unqualified", value: "unqualified" },
      { label: "Qualified", value: "qualified" },
      { label: "New", value: "new" },
      { label: "Negotiation", value: "negotiation" },
      { label: "Renewal", value: "renewal" },
      { label: "Proposal", value: "proposal" }
    ];
  }
}
