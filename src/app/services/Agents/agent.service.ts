import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {tsCastToAny} from "@angular/compiler-cli/src/ngtsc/typecheck/src/ts_util";

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  apiUrl !: " http://localhost:3000"
  URL_BASE : string = 'http://localhost:3000/agents';
  url_connexion = 'http://localhost:3000/agents/connexion';
  url_inscription = this.URL_BASE+'/inscription'
  agentConnecter : any;

   private currentUserSubject !: BehaviorSubject<any>;
   public currentUser !: Observable<any>;

  constructor(private httpClient : HttpClient, public router : Router) {

  }

  //Connexion des agents auprès du server
  loginFromServer(matricule : string, password : string) : Observable<any>{
    return this.httpClient.post(this.url_connexion, {matricule, password});
  }

  login2FormServer(matricule : string, password : string) {
    this.httpClient.post(this.url_connexion, {matricule, password}).pipe(map(resultat =>{
        localStorage.setItem('token', JSON.stringify(resultat))
        this.currentUserSubject.next(resultat)
        return resultat
    }))
  }

  public get currentUserValue(): any {
        return this.currentUserSubject.value;
    }


  //Obtenir tout les agents dans le server
  getAllAgentFromServer() : Observable<any>{
    return this.httpClient.get(this.URL_BASE);
  }

  private setStorageItem(cle : string, valeur : string){
    localStorage.setItem(cle, valeur);
  }

}
