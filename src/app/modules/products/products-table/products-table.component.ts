import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAllProductsResponse } from 'src/app/models/interfaces/products/response/GetAllProductsResponse.';

import { ProductEvent } from 'src/app/models/interfaces/ProductEvent';
import { EventAction } from 'src/app/models/interfaces/EventAction';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent {
  @Input() products: GetAllProductsResponse[] = [];
  @Output() productEventEmitter = new EventEmitter<EventAction>();
  @Output() deleteProductEmitter: EventEmitter<any> = new EventEmitter();

  productSelected!: GetAllProductsResponse;

  public addProductEvent = ProductEvent.ACT_ADD_PRODUCT;
  public editProductEvent = ProductEvent.ACT_EDIT_PRODUCT;

  ngOnInit(){
    console.log('componente da tabela: ', this.products);
  }

  handlerProductAction(action: string, id?: string) {
    const productEventData = id && id !== '' ? {action, id} : {action};

    //Emitir o valor do evento

    this.productEventEmitter.emit(productEventData);
    
  }
  deleteProduct(product_id: string, product_name: string){
    this.deleteProductEmitter.emit({product_id, product_name});
  }
}
