import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse.';

import { ProductsDataTransferService } from 'src/app/models/interfaces/products/products-data-transfer.service';
import { ProductsService } from 'src/app/models/interfaces/products/products.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EventAction } from 'src/app/models/interfaces/EventAction';

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
    private confirmationService: ConfirmationService,
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

  handlerProductEvent(event: EventAction) {
    console.log('Evento de handlerProductEvent do componente pai: butões de alterar e adicionar: ', event);
    
    
  }

  handlerDeleteProduct(data: {product_id: string; product_name: string}){
    console.log(data);
    
    this.confirmationService.confirm({
      header: 'Confirmação de exclusão?',
      message: `Confirma a exclusão do produto: ${data.product_name}?`,
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptLabel:"Sim",
      rejectLabel:"Não",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this.deleteProduct(data.product_id);
      },
      reject: () => {
      }
  });
    
  }

  deleteProduct(product_id: string): void{
    this.productService.deleteProduct(product_id)
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        console.log(response);
        this.getApiProductDatas();
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
