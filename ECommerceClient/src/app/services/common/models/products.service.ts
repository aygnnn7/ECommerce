import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/conctracts/create_product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?:any){
    this.httpClientService.post<Create_Product>({
      controller: "products"
    }, product)
    .subscribe(result => {
      
      successCallBack()
    });
  }
}
