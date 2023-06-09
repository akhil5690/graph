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
      this.http.getData('https://0te5h1qtrg.execute-api.us-east-1.amazonaws.com/Stage/dev-query-neptune-data-lambda',params).then((data)=>{
        resolve(data)
      })
    })
  }
}
