import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Create_Product } from 'src/app/conctracts/create_product';
import { HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { List_Product } from 'src/app/conctracts/list_product';
import { List_Count_Product } from 'src/app/conctracts/list_count_product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private httpClientService: HttpClientService) { }

  create(product: Create_Product, successCallBack?: any, errorCallBack?: (errorMessage: string) => void) {
    this.httpClientService.post<Create_Product>({
      controller: "products"
    }, product)
      .subscribe({
        next: result => {
          successCallBack()
        },
        error: (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
          let message = "";
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            })
          })
          errorCallBack(message);
        }
      })
  }

  async read(page: number = 0, size:number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<List_Count_Product> {
    const promiseData: Promise<List_Count_Product> = firstValueFrom(this.httpClientService.get<List_Count_Product>({
      controller: "products",
      queryString: `page=${page}&size=${size}`
    }))

    promiseData.then(
      d => successCallBack()
    ).catch((errorResponse: HttpErrorResponse ) => errorCallBack(errorResponse.message));

    return await promiseData;
  }
}
