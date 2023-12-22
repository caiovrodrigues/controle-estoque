import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { ProductsDataTransferService } from 'src/app/models/interfaces/products/products-data-transfer.service';
import { ProductsService } from 'src/app/models/interfaces/products/products.service';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse.';

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
  styleUrls: ['./products-home.component.css']
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  public productsList!: GetAllProductsResponse[];

  constructor(
    private productService: ProductsService,
    private productDataTransfer: ProductsDataTransferService,
    private messageService: MessageService,
    private router: Router
  ){}

  ngOnInit(){
    this.getServiceProductsDatas();
  }

  getServiceProductsDatas() {
    const productsLoaded = this.productDataTransfer.productsData$;

    if(productsLoaded.length > 0){
      this.productsList = productsLoaded;
      console.log(this.productsList);
      return;
    }

    this.getApiProductDatas();
  }

  getApiProductDatas(){
    this.productService.getAllProducts()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response){
          this.productsList = response;
          console.log(this.productsList);
        }
      },
      error: (err) => {
        console.log(err);
        this.router.navigate(['/dashboard']);
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Erro ao buscar produtos'});
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
