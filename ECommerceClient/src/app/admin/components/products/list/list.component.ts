import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Count_Product } from 'src/app/conctracts/list_count_product';
import { List_Product } from 'src/app/conctracts/list_product';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { ProductsService } from 'src/app/services/common/models/products.service';

declare var $;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']

})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(private productService: ProductsService, spinner: NgxSpinnerService, private alertifyService: AlertifyService) {
    super(spinner)
  }
  displayedColumns: string[] = ['name', 'stock', 'price', 'createdDate', 'updatedDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Product> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getProducts();
  }
  
  async getProducts() {
    this.showSpinner(SpinnerType.BallPulse);
    const allProducts: List_Count_Product = await this.productService.read(
      this.paginator ? this.paginator.pageIndex : 0,
      this.paginator ? this.paginator.pageSize : 5,
      () => this.hideSpinner(SpinnerType.BallAtom),
      (errorMessage) => this.alertifyService.message(errorMessage, {
        messageType: MessageType.Error,
        dismissOthers: true
      })
    )
    this.dataSource = new MatTableDataSource<List_Product>(allProducts.products);
    this.paginator.length = allProducts.totalCount;
  }
  async pageChanged(){
    await this.getProducts()
  } 
  
}
