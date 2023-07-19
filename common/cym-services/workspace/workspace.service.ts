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

//   Post request

  postWorkspace(headers: any, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(headers),
      };
      const apiUrl = config.workspace;
      this.http.postData(apiUrl, httpOptions, body).then((data) => {
        resolve(data);
      }).catch(e => {
        reject(e)
      })
    })
  }
  postTask(headers: any, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(headers),
      };
      const apiUrl = config.task;
      this.http.postData(apiUrl, httpOptions, body).then((data) => {
        resolve(data);
      }).catch(e => {
        reject(e)
      })
    })
  }

  postModel(headers: any, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(headers),
      };
      const apiUrl = config.model;
      this.http.postData(apiUrl, httpOptions, body).then((data) => {
        resolve(data);
      }).catch(e => {
        reject(e)
      })
    })
  }

  postObservables(headers: any, body: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(headers),
      };
      const apiUrl = config.observables;
      this.http.postData(apiUrl, httpOptions, body).then((data) => {
        resolve(data);
      }).catch(e => {
        reject(e)
      })
    })
  }

//   delete data
  deleteModels(id: any, headers: any) {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(headers),
      };
      const apiUrl = id ? config.model + `${id}/` : config.model;
      this.http.deleteData(apiUrl, httpOptions).then((data) => {
        resolve(data);
      }).catch(e => {
        reject(e)
      })
    })
  }

  deleteTask(id: any, headers: any) {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(headers),
      };
      const apiUrl = id ? config.task + `${id}/` : config.task;
      this.http.deleteData(apiUrl, httpOptions).then((data) => {
        resolve(data);
      }).catch(e => {
        reject(e)
      })
    })
  }

  deleteObservables(id: any, headers: any) {
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(headers),
      };
      const apiUrl = id ? config.observables + `${id}/` : config.observables;
      this.http.deleteData(apiUrl, httpOptions).then((data) => {
        resolve(data);
      }).catch(e => {
        reject(e)
      })
    })
  }
  deleteWorkspace(id: any, headers: any){
    return new Promise<any>((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders(headers),
      };
      const apiUrl = id ? config.workspace + `${id}/` : config.workspace;
      this.http.deleteData(apiUrl, httpOptions).then((data) => {
        resolve(data);
      }).catch(e => {
        reject(e)
      })
    })
  }
}
