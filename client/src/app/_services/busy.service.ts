import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequest = 0

  constructor(private spinnerService : NgxSpinnerService) { }
  
  busy()
  {
    this.busyRequest++ 
    this.spinnerService.show(undefined , {
      type : 'line-spin-fade' ,
      bdColor: "rgba(0, 0, 1, 0)",
      color: "gray"
    })
  }

  idle()
  {
    this.busyRequest--
    if(this.busyRequest <= 0)
    {
      this.busyRequest = 0
      this.spinnerService.hide()
    }
  }
}

