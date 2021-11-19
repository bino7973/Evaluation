import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DossierService} from "../../../../services/Dossiers/dossier.service";
import {AgentService} from "../../../../services/Agents/agent.service";
import {UniteService} from "../../../../services/Unite/unite.service";
import {DossierModel} from "../../../../models/dossier-model.model";
import {Router} from "@angular/router";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-ajouter-dossier',
  templateUrl: './ajouter-dossier.component.html',
  styleUrls: ['./ajouter-dossier.component.sass']
})
export class AjouterDossierComponent implements OnInit {

  ajouterDossierFormGroup !: FormGroup;

  listeAgent : any;
  listeUnite : any;

  loading = false;
  submitted = false;

  constructor(private formBuilder : FormBuilder, private agentService : AgentService, private uniteService : UniteService, private dossierService : DossierService, private router : Router, private alertService : AlertService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(){
    this.ajouterDossierFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      ref_dossier : ['', Validators.required],
      intitule : ['', Validators.required],
      objet : ['', Validators.required],
      id_unite_administrative : ['', Validators.required],
      id_agent : ['', Validators.required],
      date_creation : ['', Validators.required],
      date_cloture : ['', Validators.required],
      statut : ['ouvert', Validators.required]
    })


    this.agentService.getAllAgentFromServer().subscribe((resultat)=>{
      this.listeAgent = resultat.agents
    }, (erreur)=>{
      console.log(erreur)
    })

    this.uniteService.getAllUnitesFromServer().subscribe((resultat)=>{
      this.listeUnite = resultat.unites
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  ajouterNouveauDossier() {
    this.submitted = true
    if(this.ajouterDossierFormGroup.invalid){
      return
    }
    let slug = this.ajouterDossierFormGroup.value.slug;
    let ref_dossier = this.ajouterDossierFormGroup.value.ref_dossier;
    let intitule = this.ajouterDossierFormGroup.value.intitule;
    let objet = this.ajouterDossierFormGroup.value.objet;
    let id_unite_administrative = this.ajouterDossierFormGroup.value.id_unite_administrative;
    let id_agent = this.ajouterDossierFormGroup.value.id_agent;
    let date_creation = this.ajouterDossierFormGroup.value.date_creation;
    let date_cloture = this.ajouterDossierFormGroup.value.date_cloture;
    let statut = this.ajouterDossierFormGroup.value.statut;

    let nouveauDossier = new DossierModel(slug, ref_dossier, intitule, objet, id_unite_administrative, id_agent, date_creation, date_cloture, statut);

    this.dossierService.addNewDossierToServer(nouveauDossier).subscribe((resultat)=>{
      this.router.navigate(['/home','dossier', 'liste'])
      this.alertService.emettreUnToast("Enrégistrement d'un nouveau dossier effectué avec succès !", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec d'enrégistrement d'un nouveau dossier !", 'error');
    })
  }
}
