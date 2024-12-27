import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { pipe, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';


@Injectable()
export class DataService {

  private baseUrl = environment.apiBaseUrl;
  private baseUrl1 = environment.apiBaseUrl1;
  private baseUrl2 = environment.apiBaseUrl2;
  private baseUrl3 = environment.apiBaseUrl3;
  private baseurlg2c = environment.apibaseurlg2c;


  private cache: any = {};

  constructor(private http: HttpClient) {
  }

  getData(route:any, refresh:any) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl + route).pipe(map(response => {
        this.cache[route] = response;
        return response;
      }));
    }
  }
    getDataSample(route:any, refresh:any) {
      if (this.dataForRouteIsCached(route, refresh)) {
        return of(this.cache[route]);
      } else { // no cached data or refresh requested
        return this.http.get<any>(this.baseUrl1 + route).pipe(map(response => {
          this.cache[route] = response;
          return response;
        }));
      }
    }

  getDataSample1(route:any, refresh:any) {
      if (this.dataForRouteIsCached(route, refresh)) {
        return of(this.cache[route]);
      } else { // no cached data or refresh requested
        return this.http.get<any>(this.baseUrl2 + route).pipe(map(response => {
          this.cache[route] = response;
          return response;
        }));
      }
    }

  getDataWithParams(route:any, params:any, refresh:any) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(route, { params: params }).pipe(map(response => {
        this.cache[route] = response;
        return response;
      }));
    }
  }
  getDataSample2(route, refresh) {
    if (this.dataForRouteIsCached(route, refresh)) {
      return of(this.cache[route]);
    } else { // no cached data or refresh requested
      return this.http.get<any>(this.baseUrl3 + route).pipe(map(response => {
        this.cache[route] = response;
        return response;
      }));
    }
  }

  getRecord(route:any) {
    return this.http.get<any>(this.baseUrl + route);
  }

  getRecordWithParams(route:any, params:any) {
    return this.http.get<any>(this.baseUrl + route, { params: params });
  }

  post(route:any, data:any) {
    return this.http.post<any>(this.baseUrl + route, data);
  }
  put(route:any, data:any) {
    return this.http.put<any>(route, data);
  }

  pdf(route:any, data:any){
    return this.http.post(this.baseUrl + route,data,{
      responseType: 'arraybuffer'
    });  
  }

   delete(route:any) {
    return this.http.delete(this.baseUrl + route).pipe(map(response => {
      return response;
    }));
  }

  // getReport(route) {
  //   return this.http.get(this.baseUrl + route, { responseType: 'blob' });
  // }
  getReport(route:any) {
    return this.http.get(route, { responseType: 'blob' });
  }
  getExternalData(route:any) {
    return this.http.get<any>(route).pipe(map(response => {
      return response;
    }));
  }

  dataForRouteIsCached(route:any, refresh:any) {
    return this.cache[route] && (refresh === false || refresh === undefined);
  }

  clearCache() {
    this.cache = {};
  }

  clearRouteCache(route:any) {
    this.cache[route] = null;
  }

  getHttpParams(data: any) {
    let httpParams = new HttpParams();
    Object.keys(data).forEach(function (key) {
      httpParams = httpParams.append(key,
        data[key]
      );
    });
    return data;
  }

    getJSON(jsonurl:any){
      return this.http.get<any[]>(jsonurl);
    }

}
