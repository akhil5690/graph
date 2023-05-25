import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpClient) {
  }

  getGraphData(params:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('https://2m2ujd9wg3.execute-api.us-west-2.amazonaws.com/dev/', {params: params}).subscribe((data) => {
        resolve(data);
      })
    })
  }

  getOption():Promise<any>{
    return  new Promise((resolve)=>{
      this.http.get('https://u66v1wvvq9.execute-api.us-west-2.amazonaws.com/dev/').subscribe((data) => {
        resolve(data);
      })
    })
  }

}
