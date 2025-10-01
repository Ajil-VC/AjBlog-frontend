import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private _toast: ToastrService) { }

  showError(message: string, title: string = 'Error') {
    this._toast.error(message, title);
  }

  showSuccess(message: string, title: string = 'Success') {
    this._toast.success(message, title);
  }

  showWarning(message: string, title: string = 'Warning') {
    this._toast.warning(message, title);
  }

  showInfo(message: string, title: string = 'Info') {
    this._toast.info(message, title);
  }

}
