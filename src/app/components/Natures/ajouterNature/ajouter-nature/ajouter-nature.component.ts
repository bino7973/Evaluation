import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NatureService} from "../../../../services/Natures/nature.service";
import {Router} from "@angular/router";
import {NatureModel} from "../../../../models/nature-model.model";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-ajouter-nature',
  templateUrl: './ajouter-nature.component.html',
  styleUrls: ['./ajouter-nature.component.sass']
})
export class AjouterNatureComponent implements OnInit {

  ajouterNatureFormGroup !: FormGroup;
  loading = false;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private natureService : NatureService, private router : Router, private alertService : AlertService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ajouterNatureFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required]
    });
  }

  enregistrerNouvelleNature() {
    this.submitted = true
    if(this.ajouterNatureFormGroup.invalid){
      return
    }
    this.loading = true
    let slug = this.ajouterNatureFormGroup.value.slug
    let nom = this.ajouterNatureFormGroup.value.nom
    let nouveauNature = new NatureModel(slug, nom);
    this.natureService.addNewNatureToServer(nouveauNature).subscribe((resultat)=>{
      this.router.navigate(['/home', 'nature', 'liste']);
      this.alertService.emettreUnToast("Enrégistrement da la nouvelle nature effectuée avec succès !", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec d'enrégistrement da la nouvelle nature !", 'error');
    })
  }
}
