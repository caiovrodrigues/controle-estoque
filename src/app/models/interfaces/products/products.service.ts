import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, map } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { GetAllProductsResponse } from './response/GetAllProductsResponse.';
import { DeleteProductResponse } from './response/DeleteProductResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private API_URL = Environment.API_URL;
  private JWT_TOKEN = this.cookie.get("token");

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  }

  constructor( private http: HttpClient, private cookie: CookieService) { }

  getAllProducts(): Observable<GetAllProductsResponse[]>{
    return this.http.get<GetAllProductsResponse[]>(
    `${this.API_URL}/products`,
    this.httpOptions)
    .pipe( //Pipe é como se fosse um cano que passa várias informações ali dentro, daí podemos manipular esse dados
      map((product) => product.filter((product) => product.amount > 0))//Aqui filtramos os produtos para retornar somente os com amount > 0
      )
  }

  deleteProduct(id: string): Observable<DeleteProductResponse> {
    // return this.http.delete<DeleteProductResponse>(`${this.API_URL}/product/delete`,
    // {...this.httpOptions, params: new HttpParams().set('product_id', data.id)}
    // );
    return this.http.delete<DeleteProductResponse>(`${this.API_URL}/product/delete`,
    {...this.httpOptions, params: {product_id: id}}
    );
  }
}
