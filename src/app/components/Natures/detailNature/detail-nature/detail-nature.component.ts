import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NatureService} from "../../../../services/Natures/nature.service";
import {NatureModel} from "../../../../models/nature-model.model";

@Component({
  selector: 'app-detail-nature',
  templateUrl: './detail-nature.component.html',
  styleUrls: ['./detail-nature.component.sass']
})
export class DetailNatureComponent implements OnInit {

  updateNatureFormGroup !: FormGroup;
  idNatureSelected : any;

  constructor(private router : Router,private formBuilder : FormBuilder, private routerActivated : ActivatedRoute, private natureService : NatureService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.updateNatureFormGroup = this.formBuilder.group({
      nom : ['', Validators.required],
      slug : ['',Validators.required]
    })
    this.idNatureSelected = this.routerActivated.snapshot.paramMap.get('id');
    this.natureService.getOneNatureFromServer(this.idNatureSelected).subscribe((resultat)=>{
      let nature = resultat.nature
      this.updateNatureFormGroup.setValue({
        nom : nature.nom,
        slug : nature.slug
      })
    })
  }

  modificationNature() {
    let slug = this.updateNatureFormGroup.value.slug
    let nom = this.updateNatureFormGroup.value.nom
    let natureModifier = new NatureModel(slug, nom)
    this.natureService.updateNatureFromServer(natureModifier, this.idNatureSelected).subscribe((resultat)=>{
      this.router.navigate(['/home','nature','liste'])
    }, (erreur)=>{
      console.log(erreur)
    })
  }
}
