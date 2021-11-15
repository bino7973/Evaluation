import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AgentService} from "../../../../services/Agents/agent.service";
import {Subscription} from "rxjs";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  connexionFormGroup !: FormGroup;
  loading = false;
  submitted = false;


  constructor(private formBuilder : FormBuilder, private router : Router, private agentService : AgentService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.connexionFormGroup = this.formBuilder.group({
      matricule : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmitConnexionForm() {
    this.submitted = true;
    let matricule = this.connexionFormGroup.value.matricule;
    let password = this.connexionFormGroup.value.password
    if(this.connexionFormGroup.invalid){
      return
    }
     this.loading = true;
    // this.agentService.login2FormServer(matricule, password);
    //  this.router.navigate(['/home'])
    this.agentService.loginFromServer(matricule, password).subscribe((agent)=>{
      let token = agent.token
      localStorage.setItem('token', token)
      this.router.navigate(['/home', 'courrier', 'liste']);
    }, (erreur)=>{
      var messageErreur = erreur.error.message

      messageErreur = ""
    })
  }

  //Fonction qui recharge la composant inscription
  redirigerInscription() {
    this.router.navigate(['/agent', 'inscription'])
  }
}
