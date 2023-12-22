import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ProductsDataTransferService } from 'src/app/models/interfaces/products/products-data-transfer.service';
import { ProductsService } from 'src/app/models/interfaces/products/products.service';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse.';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  ngDestroy$ = new Subject<void>();

  products: GetAllProductsResponse[] = [];

  chartData!: ChartData;
  chartOptions!: ChartOptions;

  constructor(private productsService: ProductsService, private messageService: MessageService, private productsDataService: ProductsDataTransferService){}

  ngOnInit() {
    this.getProductsData();
  }

  getProductsData(){
    this.productsService.getAllProducts()
    .pipe(takeUntil(this.ngDestroy$))
    .subscribe({
      next: (data) => {
        this.products = data;
        this.productsDataService.setProductsDatas(this.products);
        this.setProductsData();
      },
      error: () => {
        console.log("Erro ao buscar produtos!");
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao buscar produtos!'});
      }
    });
  }

  setProductsData() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: this.products.map(product => product.name),
      datasets: [
          {
              label: 'Em estoque',
              data: this.products.map(product => product.amount),
              backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
              borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
              borderWidth: 1
          }
      ]
    };

    this.chartOptions = {
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          y: {
              beginAtZero: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          },
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder
              }
          }
      }
  };
  }

  ngOnDestroy(): void {
    this.ngDestroy$.next();
    this.ngDestroy$.complete();
  }
}
