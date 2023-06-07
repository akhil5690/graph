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
      this.http.getData('https://wkgf09u9ba.execute-api.us-east-1.amazonaws.com/development/').then((data)=>{
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
