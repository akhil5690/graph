import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpHandler {
  constructor(private http: HttpClient) {
  }

  getData(apiUrl: string, params?: HttpParams | any) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl, params).subscribe({
        next: (data) => {
          resolve(data)
        }, error: (err) => {
          reject(err)
        }
      })
    })
  }

  postData(apiURL: string, params: any, body: any) {
    return new Promise((resolve, reject)=>{
      this.http.post(apiURL,body,params).subscribe({
        next:(data)=>{
          resolve(data)
        },error:(error)=>{ reject(error)}
      })
    })
  }
}
