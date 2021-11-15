import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {TypeModel} from "../../models/type-model.model";

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  API_URL_BASE = environment.apiUrl+'/types';

  httpHeader = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  //get all type from server
  getAllTypesFromServer() : Observable<any>{
    return this.httpClient.get(this.API_URL_BASE);
  }
  //add new type to server
  addNewTypeToServer(nouveauType : TypeModel) : Observable<any>{
    return this.httpClient.post(this.API_URL_BASE, nouveauType);
  }

  //get one type from server
  getOneTypeFromServer(id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.get(single_url, {headers : this.httpHeader});
  }

  //update type from server
  updateTypeFromServer(typeModifier : TypeModel, id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.patch(single_url, typeModifier, {headers : this.httpHeader})
  }

  //delete Type From Server
  deleteTypeFromServer(id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.delete(single_url, {headers : this.httpHeader});
  }

}
