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

  getTask(id: any, header: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(header)
      };
      let apiUrl = id ? config.model + `${id}/` : config.task;
      this.http.getData(apiUrl, httpOptions).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    });
  }

  getObservables(id: any, header: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(header)
      };
      let apiUrl = id ? config.model + `${id}/` : config.observables;
      this.http.getData(apiUrl, httpOptions).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    });
  }

  getModel(id: any, header: any, params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(header),
        params: new HttpParams(params)
      };
      let apiUrl = id ? config.model + `${id}/` : config.model;
      this.http.getData(apiUrl, httpOptions).then((data) => {
        resolve(data)
      }).catch((e) => reject(e))
    });
  }
}
