import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeModel} from "../../../../models/type-model.model";
import {TypeService} from "../../../../services/Types/type.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-ajouter-type',
  templateUrl: './ajouter-type.component.html',
  styleUrls: ['./ajouter-type.component.sass']
})
export class AjouterTypeComponent implements OnInit {

  ajouterTypeFormGroup !: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private typeService : TypeService, private router : Router, private alertService : AlertService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ajouterNouveauType() {
    this.submitted = true
    if(this.ajouterTypeFormGroup.invalid){
      return
    }
    this.loading = true
    let slug = this.ajouterTypeFormGroup.value.slug
    let nom = this.ajouterTypeFormGroup.value.nom
    let nouveauType = new TypeModel(slug, nom);
    this.typeService.addNewTypeToServer(nouveauType).subscribe((resultat)=>{
      this.router.navigate(['/home', 'type', 'liste']);
      this.alertService.emettreUnToast("Enrégistrement d'un nouveau type effectué avec succès!", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec d'enregistrement du nouveau type", 'error')
    })
  }

  initForm(){
    this.ajouterTypeFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required]
    })
  }
}
