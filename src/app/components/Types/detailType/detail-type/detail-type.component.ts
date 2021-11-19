import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {TypeService} from "../../../../services/Types/type.service";
import {TypeModel} from "../../../../models/type-model.model";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-detail-type',
  templateUrl: './detail-type.component.html',
  styleUrls: ['./detail-type.component.sass']
})
export class DetailTypeComponent implements OnInit {

  updateTypeFormGroup !: FormGroup;
  idTypeSelected : any;
  loading = false;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute, private router : Router, private typeService : TypeService, private alertService : AlertService) {
    this.idTypeSelected = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.updateTypeFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required]
    })

    this.typeService.getOneTypeFromServer(this.idTypeSelected).subscribe((resultat)=>{
      let type = resultat.type
      this.updateTypeFormGroup.setValue({
        slug : type.slug,
        nom : type.nom
      })
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  modifierType() {
    this.submitted = true
    if(this.updateTypeFormGroup.invalid){
      return
    }
    this.loading = true
    let slug = this.updateTypeFormGroup.value.slug
    let nom = this.updateTypeFormGroup.value.nom
    let typeModifier = new TypeModel(slug, nom)
    this.typeService.updateTypeFromServer(typeModifier, this.idTypeSelected).subscribe((resultat)=>{
      this.router.navigate(['/home', 'type', 'liste'])
      this.alertService.emettreUnToast("Modification du type effectuée avec succès !", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec de la modification du type", 'error');
    })
  }
}
