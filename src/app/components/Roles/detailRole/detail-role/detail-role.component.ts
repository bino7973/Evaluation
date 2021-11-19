import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../../services/Roles/role.service";
import {RoleModel} from "../../../../models/role-model.model";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.sass']
})
export class DetailRoleComponent implements OnInit {

  updateRoleFormGroup !: FormGroup;

  idRoleSelected : any;
  loading = false;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute, private roleService : RoleService, private router : Router, private alertService : AlertService) {
    this.idRoleSelected = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.updateRoleFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required]
    })

    this.roleService.getOneRoleFromServer(this.idRoleSelected).subscribe((resultat)=>{
      let role = resultat.role
      this.updateRoleFormGroup.setValue({
        slug : role.slug,
        nom : role.nom
      })
    }, (erreur)=>{

    })

  }

  modifierRole(){
    this.submitted = true
    if(this.updateRoleFormGroup.invalid){
      return
    }
    this.loading = true
    let slug = this.updateRoleFormGroup.value.slug
    let nom = this.updateRoleFormGroup.value.nom
    let roleModifier = new RoleModel(slug, nom)
    this.roleService.updateRoleFromServer(roleModifier, this.idRoleSelected).subscribe((resultat)=>{
      this.router.navigate(['/home', 'role', 'liste'])
      this.alertService.emettreUnToast("Modification du rôle effectuée avec succès !", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec de la modification du rôle !", 'error');
    })
  }

}
