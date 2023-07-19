import {Injectable} from '@angular/core';
import {HttpHandler} from "../../utils/httpHandler";
import config from '../../config.json'
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class workSpaceService {

  constructor(private http: HttpHandler) {
  }

  getAllWorkspace(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(params)
      };
      this.http.getData(config.workspace, httpOptions).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    })
  }
}
