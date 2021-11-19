import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UniteService} from "../../../../services/Unite/unite.service";
import {UniteModel} from "../../../../models/unite-model.model";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-detail-unite',
  templateUrl: './detail-unite.component.html',
  styleUrls: ['./detail-unite.component.sass']
})
export class DetailUniteComponent implements OnInit {

  modifierUniteFormGroup !: FormGroup;
  idUniteSelected : any
  loading = false;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private activatedRoute : ActivatedRoute, private uniteService : UniteService, private router : Router, private alertService : AlertService) {
    this.idUniteSelected = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.modifierUniteFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required],
      adresse : ['', Validators.required],
      fonction : ['', Validators.required]
    })

    this.uniteService.getOneUniteFromServer(this.idUniteSelected).subscribe((resultat)=>{
      let unite = resultat.unite
      this.modifierUniteFormGroup.setValue({
        slug : unite.slug,
        nom : unite.nom,
        adresse : unite.adresse,
        fonction : unite.fonction
      })
    }, (erreur)=>{
      console.log(erreur)
    })

  }

  modifierUnite(){
    this.submitted = true
    if(this.modifierUniteFormGroup.invalid){
      return
    }
    this.loading = true
    let slug= this.modifierUniteFormGroup.value.slug
    let nom= this.modifierUniteFormGroup.value.nom
    let adresse = this.modifierUniteFormGroup.value.adresse
    let fonction = this.modifierUniteFormGroup.value.fonction
    let uniteModifier = new UniteModel(slug, nom, adresse, fonction);
    this.uniteService.updateUniteFromServer(uniteModifier, this.idUniteSelected).subscribe((resultat)=>{
      this.router.navigate(['/home', 'unite','liste']);
      this.alertService.emettreUnToast("Modification de l'unité effectuée avec succès !", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec de la modification d'unité !", 'error');
    })
  }

}
