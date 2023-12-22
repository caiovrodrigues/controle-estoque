import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { GetAllProductsResponse } from './response/GetAllProductsResponse.';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataTransferService {
  //BehaviorSubject: É ideal para quando você quer prover o valor atual para os inscritos; diferente de um Subject, ele precisa de um valor inicial; 
  public productsDataEmitter$ = new BehaviorSubject<GetAllProductsResponse[] | null>(null); //Se comporta como um hot observable, ou seja, ele emitirá seu valor atual para quem estiver inscrito nele
  public productsData$: Array<GetAllProductsResponse> = []; //Assim, podemos acessar os produtos em qualquer outro componente sem precisarmos fazer outra requisição

  setProductsDatas(products: GetAllProductsResponse[]): void{
    this.productsDataEmitter$.next(products); //Vamos passar um novo dado para esse observable e quem estiver inscrito nele será notificado
    this.getProductsDatas();
  }

  getProductsDatas(): GetAllProductsResponse[] {
    this.productsDataEmitter$
    .pipe(
      take(1),//Após ele ser chamado, ele chama apenas uma vez e se desinscreve logo em seguida
      map((products) => products?.filter((data) => data.amount > 0 ))
    )
    .subscribe({
      next: (response) => {
        if(response){
          this.productsData$ = response;
        }
      },
      error: (error) => {
        console.log("Deu erro", error);
      }
    });
    return this.productsData$;
  }

}
