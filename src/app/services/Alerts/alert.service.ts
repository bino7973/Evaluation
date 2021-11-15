import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router : Router) {

  }

  emettreSuccessAlert(){

  }

  emettreDeleteAlert(){

  }
}
