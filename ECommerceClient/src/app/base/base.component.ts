import { NgxSpinnerService } from "ngx-spinner";

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerNameTypep: SpinnerType){
    this.spinner.show(spinnerNameTypep)
    setTimeout(()=> this.hideSpinner(spinnerNameTypep), 1000)
  }
  hideSpinner(spinnerNameTypep: SpinnerType){
    this.spinner.hide(spinnerNameTypep)
  }
  
}

export enum SpinnerType{
  BallPulse = "s1",
  BallPulseSync = "s2",
  BallAtom = "s3"
}