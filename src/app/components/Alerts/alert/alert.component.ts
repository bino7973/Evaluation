import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AlertService} from "../../../services/Alerts/alert.service";

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

}
