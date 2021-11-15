import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UniteModel} from "../../../../models/unite-model.model";
import {UniteService} from "../../../../services/Unite/unite.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-unite',
  templateUrl: './ajouter-unite.component.html',
  styleUrls: ['./ajouter-unite.component.sass']
})
export class AjouterUniteComponent implements OnInit {

  ajouterUniteFormGroup !: FormGroup;

  constructor(private formBuilder : FormBuilder, private uniteService : UniteService, private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ajouterUniteFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required],
      adresse : ['', Validators.required],
      fonction : ['', Validators.required]
    })
  }

  ajouterNouvelleUnite() {
    let slug= this.ajouterUniteFormGroup.value.slug
    let nom= this.ajouterUniteFormGroup.value.nom
    let adresse= this.ajouterUniteFormGroup.value.adresse
    let fonction= this.ajouterUniteFormGroup.value.fonction
    let nouvelleUnite = new UniteModel(slug, nom, adresse, fonction);
    this.uniteService.addNewUniteToServer(nouvelleUnite).subscribe((resultat)=>{
      this.router.navigate(['/home', 'unite', 'liste']);
    }, (erreur)=>{
      console.log(erreur)
    })
  }
}
