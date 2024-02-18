import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

declare var $:any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2, 
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
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
  @Input() controller: string;
  @Output() callback : EventEmitter<any> = new EventEmitter();

  @HostListener("click")
  async onclick(){
    this.openDialog(async () => {
      this.spinner.show(SpinnerType.BallPulse)
      const td : HTMLTableCellElement = this.element.nativeElement;
      await this.httpClientService.delete({
        controller: this.controller
      }, this.id).subscribe(data => { 
        $(td.parentElement).animate({
          opacity:0,
          left: "+=50",
          height: "toogle"
        }, 700, () => {
          this.callback.emit();
          this.spinner.hide(SpinnerType.BallPulse);
          this.alertifyService.message("The item is deleted permanently.", {
            dismissOthers: true,
            messageType: MessageType.Success,
            position: Position.TopRight
          })
        })
      }, (errorResponse: HttpErrorResponse) =>{
        this.spinner.hide(SpinnerType.BallPulse);
        this.alertifyService.message("An error occurred while deleting the item.", {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        })
      });
    })
  }
  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: DeleteState.Yes
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.Yes){
        afterClosed();
      }
    });
  }

}
