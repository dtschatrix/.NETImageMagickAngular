import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/shared/config.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { ImageFilterOptions, PostImage } from 'src/app/shared/models/list-filters';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  private imageImplode = new BehaviorSubject<PostImage>(null);

  get listFilters(): Observable<ImageFilterOptions> {
    return this.filtersData.asObservable();
  }

  get ImageImplode(): Observable<any> {
    return this.imageImplode.asObservable();
  }

  private filtersData = new BehaviorSubject<ImageFilterOptions>(null);

  fetchData(token: string): Observable<ImageFilterOptions> {
    const httpOptions = {
      headers: new HttpHeaders({
        ContentType: 'application/json',
        Authorization: token
      })
    };

    return this.http.get<ImageFilterOptions>(this.configService.resourceApiURI + '/images', httpOptions);
  }

  sendPhoto(token: string, data: any): Observable<PostImage> {
    const httpOptions = {
      headers: new HttpHeaders({
        ContentType: 'application/json',
        Authorization: token,
        AccessControlAllowOrigin: '*'
      })
    };
    return this.http.post<PostImage>(this.configService.resourceApiURI + '/images/implode', data, httpOptions);
  }
}
