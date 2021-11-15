import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../../../services/Roles/role.service";
import {RoleModel} from "../../../../models/role-model.model";
import {Router} from "@angular/router";


@Component({
  selector: 'app-ajouter-role',
  templateUrl: './ajouter-role.component.html',
  styleUrls: ['./ajouter-role.component.sass']
})
export class AjouterRoleComponent implements OnInit {

  ajouterRoleFormGroup !: FormGroup;

  constructor(private formBuilder : FormBuilder, private roleService : RoleService, private router : Router) { }

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
    let slug = this.ajouterRoleFormGroup.value.slug
    let nom = this.ajouterRoleFormGroup.value.nom
    let role = new RoleModel(slug, nom);
    this.roleService.addNewRoleToServer(role).subscribe((resultat)=>{
      this.router.navigate(['/home','role','liste']);
    }, (erreur)=>{
      console.log(erreur)
    })
  }
}
