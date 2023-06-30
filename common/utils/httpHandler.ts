import {HttpClient, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class HttpHandler {
  constructor(private http: HttpClient) {
  }

  getData(apiUrl: string, params?: HttpParams) {
    return new Promise((resolve, reject) => {
      this.http.get(apiUrl, {params: params}).subscribe({
        next: (data) => {
          resolve(data)
        }, error: (err) => {
          reject(err)
        }
      })
    })

  }
}
