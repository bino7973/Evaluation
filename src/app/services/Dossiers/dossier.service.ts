import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DossierModel} from "../../models/dossier-model.model";

@Injectable({
  providedIn: 'root'
})
export class DossierService {

  API_URL_BASE = environment.apiUrl+'/dossiers';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  //get all dossier from server
  getAllDossiersFromServer() : Observable<any>{
    return this.httpClient.get(this.API_URL_BASE);
  }

  //get one dossier from server
  getOneDossierFromServer(id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.get(single_url, {headers : this.httpHeaders})
  }

  //add new dossier to server
  addNewDossierToServer(nouveauDossier : DossierModel) : Observable<any>{
    return this.httpClient.post(this.API_URL_BASE, nouveauDossier);
  }

  //Update dossier from server
  updateDossierFromServer(dossierModifier : DossierModel, id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.patch(single_url, dossierModifier, {headers : this.httpHeaders});
  }

  //Delete dossier from server
  deleteDossierFromServer(id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.delete(single_url, {headers : this.httpHeaders});
  }

}
