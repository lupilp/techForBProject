import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  infoUser: any = {};
  balance: any = [];
  transacciones: any = [];
  tarjetas: any = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getInfo().subscribe(
      (res) => {
        console.log(res);
        this.infoUser = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.dashboardService.getBalance().subscribe(
      (res) => {
        console.log({ balance: res });
        this.balance = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.dashboardService.getTransacciones().subscribe(
      (res) => {
        console.log({ transacciones: res });
        this.transacciones = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.dashboardService.getTarjetas().subscribe(
      (res) => {
        console.log({ tarjetas: res });
        this.tarjetas = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
