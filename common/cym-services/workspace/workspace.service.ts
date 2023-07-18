import {Injectable} from '@angular/core';
import {HttpHandler} from "../../utils/httpHandler";
import config from '../../config.json'
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class workSpaceService {

  constructor(private http: HttpClient) {
  }

  getAllWorkspace(params: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let httpOptions = {
        headers: new HttpHeaders({
          'org-id': '0',
          'user-id': '7'
        })
      }
      this.http.get(config.workspace, httpOptions).subscribe((res) => {
        resolve(res);
      }, error => {
        resolve(error);
      })
    })
  }
}
