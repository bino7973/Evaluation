import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {RoleService} from "../../../../services/Roles/role.service";
import {RoleModel} from "../../../../models/role-model.model";

@Component({
  selector: 'app-detail-role',
  templateUrl: './detail-role.component.html',
  styleUrls: ['./detail-role.component.sass']
})
export class DetailRoleComponent implements OnInit {

  updateRoleFormGroup !: FormGroup;

  idRoleSelected : any;

  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute, private roleService : RoleService, private router : Router) {
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
    let slug = this.updateRoleFormGroup.value.slug
    let nom = this.updateRoleFormGroup.value.nom
    let roleModifier = new RoleModel(slug, nom)
    this.roleService.updateRoleFromServer(roleModifier, this.idRoleSelected).subscribe((resultat)=>{
      this.router.navigate(['/home', 'role', 'liste'])
    }, (erreur)=>{

    })
  }

}
