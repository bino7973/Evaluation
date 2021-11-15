import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CourrierService} from "../../../../services/Courriers/courrier.service";
import {UniteService} from "../../../../services/Unite/unite.service";
import {TypeService} from "../../../../services/Types/type.service";
import {NatureService} from "../../../../services/Natures/nature.service";
import {ContactService} from "../../../../services/Contacts/contact.service";
import {AgentService} from "../../../../services/Agents/agent.service";
import {DossierService} from "../../../../services/Dossiers/dossier.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-detail-courrier',
  templateUrl: './detail-courrier.component.html',
  styleUrls: ['./detail-courrier.component.sass']
})
export class DetailCourrierComponent implements OnInit {
  idCourrier : any;
  courrierSelectionner : any;
  updateCourrierFormGroup !: FormGroup;

  loading = false;
  submitted = false;

  listeUnite : any;
  listeType : any;
  listeNature : any;
  listeContact : any;
  listeAgent : any;
  listeDossier : any;

  constructor(private datePipe : DatePipe, private formBuilder : FormBuilder, private router : Router, private activatedRoute : ActivatedRoute, private courrierService : CourrierService, private uniteService : UniteService, private typeService : TypeService, private natureService : NatureService, private contactService : ContactService, private agentService : AgentService, private dossierService : DossierService) {
    this.idCourrier = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm(this.idCourrier)
  }

  initForm(id : any){
    //Recuperer les agents dans l'api et afficher dans le formulaire
    this.uniteService.getAllUnitesFromServer().subscribe((resultat)=>{
      this.listeUnite = resultat.unites
    }, (erreur)=>{
      console.log(erreur)
    })
    //Recuperer les types dans l'api et afficher dans le formulaire
    this.typeService.getAllTypesFromServer().subscribe((resultat)=>{
      this.listeType = resultat.types
    }, (erreur)=>{
      console.log(erreur)
    })
    //Recuperer les natures dans l'api et afficher dans le formulaire
    this.natureService.getAllNaturesFromServer().subscribe((resultat)=>{
      this.listeNature = resultat.natures
    }, (erreur)=>{
      console.log(erreur)
    })
    //Recuperer les contacts dans l'api et afficher dans le formulaire
    this.contactService.getAllContactsFromServer().subscribe((resultat)=>{
      this.listeContact = resultat.contacts
    }, (erreur)=>{
      console.log(erreur)
    })
    //Recuperer les agents dans l'api et afficher dans le formulaire
    this.agentService.getAllAgentFromServer().subscribe((resultat)=>{
      this.listeAgent = resultat.agents
    }, (erreur)=>{
      console.log(erreur)
    })
    //Recuperer les dossier dans l'api et afficher dans le formulaire
    this.dossierService.getAllDossiersFromServer().subscribe((resultat)=>{
      this.listeDossier = resultat.dossiers
    }, (erreur)=>{
      console.log(erreur)
    })

    this.updateCourrierFormGroup = this.formBuilder.group({
      slug : ['', Validators.required],
      ref_courrier : ['', Validators.required],
      id_unite_administrative : ['', Validators.required],
      id_type : ['', Validators.required],
      id_nature : ['', Validators.required],
      id_contact : ['', Validators.required],
      id_dossier : [''],
      id_suiveur : ['', Validators.required],
      id_responsable : ['', Validators.required],
      num_ref_interne : ['', Validators.required],
      date_courrier : ['', Validators.required],
      date_arrive : ['', Validators.required],
      date_creation : ['', Validators.required],
      demande : [''],
      objet : [''],
      commentaire : [''],
      devise : [''],
      montant : [''],
      statut : ['']
    });

    this.courrierService.getOneCourrierFromServer(id).subscribe((resultat)=>{
      let courrier = resultat.courrier
      this.courrierSelectionner = courrier
      this.updateCourrierFormGroup.setValue({
        slug : courrier.slug,
      ref_courrier : courrier.ref_courrier,
      id_unite_administrative : courrier.id_unite_administrative.nom,
      id_type : courrier.id_type.nom,
      id_nature : courrier.id_nature.nom,
      id_contact : courrier.id_contact.nom,
      id_dossier : [''],
      id_suiveur : courrier.id_suiveur.nom,
      id_responsable : courrier.id_responsable.nom,
      num_ref_interne : courrier.num_ref_interne,
      date_courrier : this.datePipe.transform(courrier.date_courrier, 'yyyy-MM-dd'),
      date_arrive : this.datePipe.transform(courrier.date_arrive, 'yyyy-MM-dd'),
      date_creation : this.datePipe.transform(courrier.date_creation, 'yyyy-MM-dd'),
      demande : courrier.demande,
      objet : courrier.objet,
      commentaire : courrier.commentaire,
      devise : courrier.devise,
      montant : courrier.montant,
      statut : courrier.statut
      })
      console.log(this.courrierSelectionner)
    }, (erreur)=>{

    })


  }

  modifierCourrier(){
    console.log(this.updateCourrierFormGroup.value)
  }

}
