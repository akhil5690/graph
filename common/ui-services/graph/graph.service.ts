import {Injectable} from '@angular/core';
import {HttpHandler} from "../../utils/httpHandler";
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpHandler) {
  }

  getGraphData(params:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.getData('https://2m2ujd9wg3.execute-api.us-west-2.amazonaws.com/dev/',params).then((data)=>{
        resolve(data)
      })
    })
  }

  getOption():Promise<any>{
    return  new Promise((resolve)=>{
      this.http.getData('https://u66v1wvvq9.execute-api.us-west-2.amazonaws.com/dev/').then((data) => {
        resolve(data);
      })
    })
  }

}
