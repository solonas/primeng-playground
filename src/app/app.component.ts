import { Component, Input } from "@angular/core";
import { Customer, Representative } from "./customer";
import { CustomerService } from "./customer-service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [MessageService]
})
export class AppComponent {
  customers: Customer[] = [];

  representatives: Representative[] = [];

  statuses: any[] = [];

  loading: boolean = true;

  activityValues: number[] = [0, 100];

  cols: any[] = [];

  _selectedColumns: any[] = [];

  @Input() get selectedColumns(): any[] {
      return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
      //restore original order
      this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
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
        { field: 'country', header: 'Country' },
        { field: 'status', header: 'Status' },
        { field: 'verified', header: 'Verified' },
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
