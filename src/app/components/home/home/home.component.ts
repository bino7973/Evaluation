import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AgentService} from "../../../services/Agents/agent.service";

@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private agentService : AgentService) {

  }

  ngOnInit(): void {

  }

}
