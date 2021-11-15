import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DossierService} from "../../../../services/Dossiers/dossier.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AgentService} from "../../../../services/Agents/agent.service";
import {UniteService} from "../../../../services/Unite/unite.service";

@Component({
  selector: 'app-detail-dossier',
  templateUrl: './detail-dossier.component.html',
  styleUrls: ['./detail-dossier.component.sass']
})
export class DetailDossierComponent implements OnInit {

  modifierDossierFormGroup !: FormGroup;
  idDossierSelectionner : any;

  listeAgent : any;
  listeUnite : any;

  constructor(private formBuilder : FormBuilder,private dossierService : DossierService, private activatedRoute : ActivatedRoute, private router : Router, private datePipe : DatePipe, private agentService : AgentService, private uniteService : UniteService) {
    this.idDossierSelectionner = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
  }

  initForm(){
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

    this.modifierDossierFormGroup = this.formBuilder.group({
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

    this.dossierService.getOneDossierFromServer(this.idDossierSelectionner).subscribe((resultat)=>{
      let dossier = resultat.dossier
      this.modifierDossierFormGroup.setValue({
        slug : dossier.slug,
        ref_dossier : dossier.ref_dossier,
        intitule : dossier.intitule,
        objet : dossier.objet,
        id_unite_administrative : dossier.id_unite_administrative,
        id_agent : dossier.id_agent,
        date_creation : this.datePipe.transform(dossier.date_creation, 'yyyy-MM-dd'),
        date_cloture : this.datePipe.transform(dossier.date_creation, 'yyyy-MM-dd'),
        statut : dossier.statut
      })
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  modifierDossier() {

  }
}
