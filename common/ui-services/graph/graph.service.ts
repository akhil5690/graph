import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http:HttpClient) { }

  getGraphData():Promise<any>{
    return new Promise((resolve, reject)=>{
      this.http.get('https://2m2ujd9wg3.execute-api.us-west-2.amazonaws.com/dev/').subscribe((data)=>{
        resolve(data);
      })
    })
  }

}
