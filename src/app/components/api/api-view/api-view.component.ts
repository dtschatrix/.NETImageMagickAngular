import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/auth.service';
import { ApiHandlerService } from 'src/app/components/api/apiservice/apihandler.service';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ImageFilterOptions, Image, Filter, PostImage } from 'src/app/shared/models/list-filters';

@Component({
  selector: 'app-api-view',
  templateUrl: './api-view.component.html',
  styleUrls: ['./api-view.component.css']
})
export class ApiViewComponent implements OnInit {
  @ViewChild('fileDropRef', { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  filterData$: Observable<Filter>;
  filterData: Filter;
  filter: any;
  img: PostImage;
  imgPromise: Observable<PostImage>;
  imgURL: any;
  claims$: Observable<ImageFilterOptions>;
  constructor(private authService: AuthService, private apiHandlerService: ApiHandlerService) { }

  ngOnInit(): void {
    console.log('loaded');
    this.claims$ = this.apiHandlerService.fetchData(this.authService.AuthorizationHeaderValue);
  }

  implode(): void {
    const photoToSend: Image = {};
    photoToSend.filter = this.filterData;
    photoToSend.imagebase64 = this.imgURL;
    this.imgPromise = this.apiHandlerService.sendPhoto(this.authService.AuthorizationHeaderValue, photoToSend);
    this.imgPromise.subscribe();
    this.imgPromise.toPromise().then(data => this.img = data);
  }

  prepareFileList(files: Array<any>): void {
    for (const item of files) {
      this.files.push(item);
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
      console.log(this.imgURL);
    };
    this.fileDropEl.nativeElement.value = '';
  }

  onFileDropped($event): void {
    this.prepareFileList($event);
  }

  fileBrowseHandler(files: any): void {
    this.prepareFileList(files);
  }

  selectChangeHandler(event): any {
    this.filter = event.target.value;
    this.filterData$ = this.claims$.pipe(map(value => value.listFilters.find(data => data.name === this.filter)));
    this.filterData$.subscribe(data => this.filterData = data);
  }

  formatBytes(bytes, decimals = 2): number | string {
    if (bytes === 0) {
      return '0 bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
