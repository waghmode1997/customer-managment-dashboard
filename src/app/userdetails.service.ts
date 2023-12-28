import { Injectable } from '@angular/core';
import { PeriodicElement } from '../app/feature/index';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TOAST_MSG} from '../app/index.ts/constant';
@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  constructor(private toastr: ToastrService) { }
  private dataSubject = new BehaviorSubject<PeriodicElement[]>([]);
  public data$: Observable<PeriodicElement[]> = this.dataSubject.asObservable();


  getData(): PeriodicElement[] {
    return this.dataSubject.value;
  }

  setData(data: PeriodicElement[]): void {
    this.dataSubject.next(data);
  }

  addRow(row: PeriodicElement): void {
    const currentData = this.getData();
    const newData = [...currentData, row];
    this.toastr.success(TOAST_MSG.ADD_USER);
    this.setData(newData);
  }

  updateRow(updatedRow: PeriodicElement, rowId: number) {
    const currentData = this.getData();
    const updatedData: any = currentData.map((row, index) => {
      return index == rowId ? updatedRow : row
    });
    this.toastr.success(TOAST_MSG.EDIT_USER);
    this.setData(updatedData);
  }

  deleteRow(rowId: number) {
    const currentData = this.getData();
    const updatedData = currentData.slice();
    updatedData.splice(rowId, 1);
    this.toastr.success(TOAST_MSG.DELETE_USER);
    this.setData(updatedData);
  }
}

