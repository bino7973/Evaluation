import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private router : Router) {

  }

  emettreAlert(titre : string, message : string, typeIcon : string){
    if(typeIcon == 'success'){
      Swal.fire(
        titre,
        message,
        'success'
      )
    }else{
      Swal.fire(
        titre,
        message,
        'error'
      )
    }
  }

  emettreConfirmationAlert(titre : string, nomObjet : string) : any{
    return Swal.fire({
      title: titre+' ?',
      text: "Cette opération n'est pas réversible !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer '+nomObjet+'.'
    })
  }

  emettreUnToast(title : string, typeIcon : string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    if(typeIcon == 'success'){
      Toast.fire({
        icon: 'success',
        title: title
      })
    }else {
      Toast.fire({
        icon: 'error',
        title: title
      })
    }

  }
}
