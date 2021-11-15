import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {NatureModel} from "../../models/nature-model.model";

@Injectable({
  providedIn: 'root'
})
export class NatureService {

  API_URL_BASE = environment.apiUrl+'/natures';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient : HttpClient) { }

  //get all nature to  server
  getAllNaturesFromServer() : Observable<any>{
    return this.httpClient.get(this.API_URL_BASE);
  }

  //Add new nature to server
  addNewNatureToServer(nouveauNature : NatureModel) : Observable<any>{
    return this.httpClient.post(this.API_URL_BASE, nouveauNature);
  }

  //Delete nature from server
  deleteNatureFromServer(id : string) : Observable<any>{
    let delete_url = `${this.API_URL_BASE}/${id}`;
    return this.httpClient.delete(delete_url, {headers : this.httpHeaders});
  }

  //get one nature from server
  getOneNatureFromServer(id : string) : Observable<any>{
    let get_url = `${this.API_URL_BASE}/${id}`;
    return this.httpClient.get(get_url, {headers : this.httpHeaders})
  }

  //Update Nature from server
  updateNatureFromServer(natureModifier : NatureModel, id : string) : Observable<any>{
     let update_url = `${this.API_URL_BASE}/${id}`;
     return this.httpClient.patch(update_url, natureModifier, {headers : this.httpHeaders});
  }
}
