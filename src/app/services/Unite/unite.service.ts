import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {UniteModel} from "../../models/unite-model.model";

@Injectable({
  providedIn: 'root'
})
export class UniteService {

  API_URL_BASE = environment.apiUrl+'/unites';

  httpHeader = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  //Obtenir toutes les unités du server
  getAllUnitesFromServer() : Observable<any>{
    return this.httpClient.get(this.API_URL_BASE);
  }

  //ajout d'une nouvelle unité dans l'api
  addNewUniteToServer(nouvelleUnite : UniteModel) : Observable<any>{
    return this.httpClient.post(this.API_URL_BASE, nouvelleUnite);
  }

  //get one unite from server by id
  getOneUniteFromServer(id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.get(single_url, {headers : this.httpHeader});
  }

  //update unite from server
  updateUniteFromServer(uniteModifier : UniteModel, id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.patch(single_url, uniteModifier, {headers : this.httpHeader});
  }

  //delete unite from server
  deleteUniteFromServer(id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.delete(single_url, {headers : this.httpHeader});
  }
}
