import {Injectable} from '@angular/core';
import {HttpHandler} from "../../utils/httpHandler";
@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpHandler) {
  }

  getSchemaData(params:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.getData('https://wkgf09u9ba.execute-api.us-east-1.amazonaws.com/development/').then((data)=>{
        resolve(data)
      })
    })
  }
  getGraphData(params:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.getData('https://2m2ujd9wg3.execute-api.us-west-2.amazonaws.com/dev/',params).then((data)=>{
        resolve(data)
      })
    })
  }
}
