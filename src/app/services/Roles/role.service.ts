import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoleModel} from "../../models/role-model.model";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  API_URL_BASE = environment.apiUrl+'/roles';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient : HttpClient) { }

  //Obtenir tout les roles de l'api
  getAllRolesFromServer() : Observable<any>{
    return this.httpClient.get(this.API_URL_BASE);
  }

  //Ajouter un nouveau role dans l'api
  addNewRoleToServer(role : RoleModel) : Observable<any>{
    return this.httpClient.post(this.API_URL_BASE, role);
  }

  //Get one role from server
  getOneRoleFromServer(id : string) : Observable<any>{
    let singleUrl = this.API_URL_BASE+'/'+id;
    return this.httpClient.get(singleUrl, {headers : this.httpHeaders});
  }

  //Update role From server
  updateRoleFromServer(roleModifier : RoleModel, id : string) : Observable<any>{
    let singleUrl = this.API_URL_BASE+'/'+id;
    return this.httpClient.patch(singleUrl, roleModifier, {headers : this.httpHeaders});
  }

  //delete role from server
  deleteRoleFromServer(id : string) : Observable<any>{
    let singleUrl = this.API_URL_BASE+'/'+id;
    return this.httpClient.delete(singleUrl, {headers : this.httpHeaders})
  }

}
