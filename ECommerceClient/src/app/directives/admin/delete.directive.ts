import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { AlertifyService, MessageType } from 'src/app/services/admin/alertify.service';
import { ProductsService } from 'src/app/services/common/models/products.service';

declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2, 
    private productsService: ProductsService,
    private spinner: NgxSpinnerService,
    private alertifyService: AlertifyService
  ) { 
    const img = this._renderer.createElement("img");
    img.setAttribute("src", "/assets/delete.png");
    img.setAttribute("style", "cursor:pointer;");
    img.width = 25;
    img.height = 25;
    _renderer.appendChild(element.nativeElement, img)
  }
  
  @Input() id : string;

  @Output() callback : EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  onclick(){
    
    this.spinner.show(SpinnerType.BallPulse)
    const td : HTMLTableCellElement = this.element.nativeElement;
    this.productsService.delete(
      this.id, 
      () => this.alertifyService.message("Successfully deleted.", {
        messageType: MessageType.Success,
        dismissOthers: true
      }), 
      (errorMessage) => this.alertifyService.message(errorMessage, {
        messageType: MessageType.Error,
        dismissOthers: true
      }));

    $(td.parentElement).fadeOut(500, ()=>{
      this.callback.emit();
    });
  }

}
