import {Injectable} from '@angular/core';
import {HttpHandler} from "../../utils/httpHandler";
import config from '../../config.json'
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class workSpaceService {

  constructor(private http: HttpHandler) {
  }

  getWorkspace(header: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(header)
      };
      this.http.getData(config.workspace, httpOptions).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    })
  }

  getTask(header: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(header)
      };
      this.http.getData(config.task, httpOptions).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    });
  }

  getObservables(header: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(header)
      };
      this.http.getData(config.observables, httpOptions).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    });
  }

  getModel(header: any, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(header),
        params: new HttpParams(params)
      };
      this.http.getData(config.model, httpOptions).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    });
  }
}
