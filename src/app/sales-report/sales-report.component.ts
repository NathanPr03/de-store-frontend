import {Component, OnInit, ViewChild} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import Highcharts from 'highcharts';
import { ChartModule } from 'primeng/chart';
import {ProductReport, ReportService, SignUps} from "../services/reports.service";

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  standalone: true,
  imports: [
    BaseChartDirective,
    BaseChartDirective,
    BaseChartDirective,
    BaseChartDirective,
    BaseChartDirective,
    ChartModule,
  ],
  styleUrls: ['./sales-report.component.css']
})
export class SalesReportComponent implements OnInit {
  productData: any;
  productOptions: any;

  signUpData: any;
  signUpOptions: any;

  constructor(private reportService: ReportService) {}
  ngOnInit(): void {
    this.reportService.getProductReport().subscribe((reports: ProductReport[]) => {
      this.productData = this.formatChartData(reports);

      this.productOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Most Purchased Items'
          }
        }
      };
    });

    this.reportService.getMonthlySignUps().subscribe((signUps: SignUps[]) => {
      this.signUpData = this.formatBarChartData(signUps);

      this.signUpOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false // Not necessary for a single dataset bar chart
          },
          title: {
            display: true,
            text: 'Monthly Sign-Ups'
          }
        }
      };
    });
  }

  private formatBarChartData(signUps: SignUps[]): any {
    return {
      labels: signUps.map(signUp => this.formatMonth(signUp.month)),
      datasets: [{
        label: 'Sign-Ups',
        data: signUps.map(signUp => signUp.sign_up_count),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }]
    };
  }

  private formatMonth(month: string): string {
    const date = new Date(month);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' });
  }

  private formatChartData(reports: ProductReport[]): any {
    return {
      labels: reports.map(report => report.productName),
      datasets: [{
        data: reports.map(report => report.amountPurchased),
        backgroundColor: this.getRandomColors(reports.length),
        borderColor: reports.map(() => 'rgba(0, 0, 0, 1)'),
        borderWidth: 1
      }]
    };
  }

  private getRandomColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
      colors.push(color);
    }
    return colors;
  }

}
