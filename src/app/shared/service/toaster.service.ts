import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {progressBar: true});
  }

  showError(message: string, title: string) {
    this.toastr.error(message, title, {progressBar: true, timeOut: 4000});
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, {progressBar: true});
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, {progressBar: true});
  }
}
