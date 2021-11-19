import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../../services/Roles/role.service";
import {RoleModel} from "../../../../models/role-model.model";
import {Router} from "@angular/router";
import {AlertService} from "../../../../services/Alerts/alert.service";


@Component({
  selector: 'app-ajouter-role',
  templateUrl: './ajouter-role.component.html',
  styleUrls: ['./ajouter-role.component.sass']
})
export class AjouterRoleComponent implements OnInit {

  ajouterRoleFormGroup !: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private roleService : RoleService, private router : Router, private alertService : AlertService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ajouterRoleFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required]
    })
  }

  ajouterNouveauRole() {
    this.submitted = true
    if(this.ajouterRoleFormGroup.invalid){
      return
    }
    this.loading = true
    let slug = this.ajouterRoleFormGroup.value.slug
    let nom = this.ajouterRoleFormGroup.value.nom
    let role = new RoleModel(slug, nom);
    this.roleService.addNewRoleToServer(role).subscribe((resultat)=>{
      this.router.navigate(['/home','role','liste']);
      this.alertService.emettreUnToast("Enrégistrement d'un nouveau rôle effectué avec succès !", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec d'enrégistrement d'u nouveau rôle !", 'error');
    })
  }
}
