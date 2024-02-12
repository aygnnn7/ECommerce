import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/conctracts/create_product';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?:any, errorCallBack?:(errorMessage:string) => void){
    this.httpClientService.post<Create_Product>({
      controller: "products"
    }, product)
    .subscribe({
      next: result => {
        successCallBack()
      },
      error: (errorResponse: HttpErrorResponse) => {
        const _error : Array<{key:string, value: Array<string>}> = errorResponse.error;
        let message ="";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          })
        })
        errorCallBack(message);
      }
  })
  }
}
