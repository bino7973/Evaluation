import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../../../services/Alerts/alert.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass']
})
export class AlertComponent implements OnInit, OnDestroy{

  private subscription !: Subscription;
  message : any;

  constructor( private alertService : AlertService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  makeAlert(titre : string, message : string, typeIcon : string){
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

  makeErrorAlert(titre : string, ) : boolean{
    return true;
  }

}
