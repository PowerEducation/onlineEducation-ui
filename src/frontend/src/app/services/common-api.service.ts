import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import {Observable} from "rxjs/Rx";
import {Headers, Http, Response, RequestOptions} from "@angular/http";
import {DefinedConstants} from '../app.defined.constants';


@Injectable()
export class CommonApiService {

  constructor(private http:Http, public definedConstants: DefinedConstants) {
  }

 private handleError(error:Response) {
    if (error.status == 401) {
      return Observable.throw(error);
    }
    else {
      return Observable.throw(error.json().error || ' server error');
    }
  }
  
  genericGet(urlString:string){
    console.log("Generic Get Method" +urlString);  
      return this.http.get(urlString)
        .map(res => res.json())
        .catch(this.handleError);
  }

  genericDelete(urlString:string){
    console.log("Generic Delete Method" +urlString);  
      return this.http.delete(urlString)
        .map(res => res.json())
        .catch(this.handleError);
  }

genericPost(urlString:string,payLoad:any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log("HI In post method" +urlString);  
      return this.http.post(urlString,payLoad,options)
        .map(res => res.json())
        .catch(this.handleError);
  }

  fileUploadPost(urlString:string,selectedFile:File){
    const uploadData = new FormData();
    // uploadData.append('uploadFile', selectedFile, selectedFile.name);
    uploadData.append("file", selectedFile);
    uploadData.append("ad",JSON.stringify(selectedFile));
    let headers = new Headers();
    headers.append('enctype','multipart/form-data')
    let options = new RequestOptions({ headers: headers });
    return this.http.post(urlString, uploadData,options)
     .map(res => res.json())
     .catch(this.handleError);
  }

  genericPut(urlString:string,payLoad:any){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    console.log("In Put method" +urlString);  
      return this.http.put(urlString,payLoad,options)
        .map(res => res.json())
        .catch(this.handleError);
  }
  
  genericMockedData(mockedObjectName ) :Observable<any>{
    
     return new Observable(observer =>{
      observer.next(mockedObjectName);
    });
  }
}
