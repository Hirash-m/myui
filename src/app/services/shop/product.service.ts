import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { baseResponse } from '../../DTO/baseResponse';
import { product } from '../../DTO/Shop/product';
import { Domain } from '../../../utilities/Path';

@Injectable({
  providedIn: 'root'
})



export class ProductService {
  private apiUrl = Domain;
    
  constructor(private http: HttpClient) { }


  GetData(pageNumber : number,pageSize : number ,sortBy : string ,sortDirection:boolean):Observable<baseResponse<product>>{

    const requestPayload={
      pageNumber : pageNumber,
      pageSize : pageSize,
      sortBy : sortBy,
      sortDirection : sortDirection,
    };
    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    });
    
    return this.http.post<baseResponse<product>>(this.apiUrl+'/GetAll',requestPayload , {headers} ).
    pipe(tap(c=> console.log(c)));

    
  }



  insertProduct(product: product){



    const headers = new HttpHeaders({
      'accept': 'text/plain',
      'Content-Type': 'application/json'
    });

    return this.http.post<baseResponse<product>>(this.apiUrl+'/creat',product , {headers} );
  }


}
