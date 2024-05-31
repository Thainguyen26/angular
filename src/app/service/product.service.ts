import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../types/products';
import { ToastrService } from 'ngx-toastr';

const _api = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(_limit: number = 4): Observable<Array<Products>> {
    return this.http.get<Array<Products>>(
      `${_api}products/?_limit=` + _limit + `&_sort=id&_order=desc`
    );
    //limit chọn
    //sort=id&_order=desc sắp xếp giảm dần
  }
  getSearch(Search_key: any): Observable<Array<Products>> {
    return this.http.get<Array<Products>>(
      `${_api}products/?title_like=${Search_key}`
    );
    //limit chọn
    //sort=id&_order=desc sắp xếp giảm dần
  }
  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${_api}products/` + id);
  }
  //Thêm
  Create(data: any): Observable<any> {
    return this.http.post<Array<Products>>(`${_api}products/`, data);
  }

  //Sửa
  Update(id: number, data: any): Observable<any> {
    return this.http.put<Array<Products>>(`${_api}products/` + id, data);
  }
  //Xóa
  DeleteProducts(id: number): Observable<any> {
    return this.http.delete(`${_api}products/` + id);
  }
}
