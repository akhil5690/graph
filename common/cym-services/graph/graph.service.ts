import {Injectable} from '@angular/core';
import {HttpHandler} from "../../utils/httpHandler";
import config from '../../config.json'

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor(private http: HttpHandler) {
  }

  getSchemaData(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.getData(config.schema).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    })
  }

  getGraphData(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const queryParams = {params: params};
      this.http.getData(config.graph, queryParams).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    })
  }
}
