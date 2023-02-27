import { Component, Input } from "@angular/core";

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { Customer, Representative } from "./customer";
import { CustomerService } from "./customer-service";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
  }
}
