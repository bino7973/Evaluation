import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {ContactModel} from "../../models/contact-model.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  API_URL_BASE = environment.apiUrl+'/contacts';
  httpHeader = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient : HttpClient) { }

  //Obtenir tout les enrégistrement de contact du server
  getAllContactsFromServer() : Observable<any>{
    return this.httpClient.get(this.API_URL_BASE);
  }

  //ajout d'un nouvel enrégistrement de contact dans lapi
  addNewContactToApi(nouveauContact : ContactModel) : Observable<any>{
    return this.httpClient.post(this.API_URL_BASE, nouveauContact);
  }

  //get one contact from server
  getOneContactFromServer(id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.get(single_url, {headers : this.httpHeader})
  }
  //Update contact to server
  updateContactFromServer(contactModifier : ContactModel, id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.patch(single_url, contactModifier, {headers : this.httpHeader});
  }

  //Delete contact from server
  deleteContactFromServer(id : string) : Observable<any>{
    let single_url = this.API_URL_BASE+'/'+id;
    return this.httpClient.delete(single_url,  {headers : this.httpHeader});
  }

}
