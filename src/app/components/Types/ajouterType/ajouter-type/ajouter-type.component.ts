import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TypeModel} from "../../../../models/type-model.model";
import {TypeService} from "../../../../services/Types/type.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-type',
  templateUrl: './ajouter-type.component.html',
  styleUrls: ['./ajouter-type.component.sass']
})
export class AjouterTypeComponent implements OnInit {

  ajouterTypeFormGroup !: FormGroup;

  constructor(private formBuilder : FormBuilder, private typeService : TypeService, private router : Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  ajouterNouveauType() {
    let slug = this.ajouterTypeFormGroup.value.slug
    let nom = this.ajouterTypeFormGroup.value.nom
    let nouveauType = new TypeModel(slug, nom);
    this.typeService.addNewTypeToServer(nouveauType).subscribe((resultat)=>{
      this.router.navigate(['/home', 'type', 'liste']);
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  initForm(){
    this.ajouterTypeFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      nom : ['', Validators.required]
    })
  }
}
