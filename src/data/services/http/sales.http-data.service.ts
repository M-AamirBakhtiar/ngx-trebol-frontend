import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sell } from 'src/data/models/entities/Sell';
import { SellDetail } from 'src/data/models/entities/SellDetail';
import { HttpService } from 'src/data/services/http/http.abstract-service';
import { CompositeEntityDataIService } from '../composite-entity.data.iservice';

@Injectable()
export class SalesHttpDataService
  extends HttpService
  implements CompositeEntityDataIService<Sell, SellDetail> {

  constructor(
    protected http: HttpClient
  ) {
    super();
  }

  public create(sell: Sell): Observable<number> {
    return this.http.post<number>(
      this.baseURI + '/sell',
      sell
    );
  }

  public readById(sellId: number): Observable<Sell> {
    return this.http.get<Sell>(
      this.baseURI + `/sales/${sellId}`
    );
  }

  public readDetailsById(sellId: number): Observable<SellDetail[]> {
    return this.readById(sellId).pipe(
      map(s => s.details)
    );
  }

  public readAll(): Observable<Sell[]> {
    return this.http.get<Sell[]>(
      this.baseURI + '/sales'
    );
  }

  public readFiltered(filters: any): Observable<Sell[]> {
    return this.http.get<Sell[]>(
      this.baseURI + '/sales',
      this.httpParamsOf(filters)
    );
  }

  public update(sell: Sell, sellId: number): Observable<number> {
    return this.http.put<number>(
      this.baseURI + `/sell/${sellId}`,
      sell
    );
  }

  public deleteById(sellId: number): Observable<boolean> {
    return this.http.delete<boolean>(
      this.baseURI + `/sell/${sellId}`
    );
  }
}
