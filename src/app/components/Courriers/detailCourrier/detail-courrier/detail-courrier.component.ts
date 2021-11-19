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
import {CourrierModel} from "../../../../models/courrier-model.model";
import {AlertService} from "../../../../services/Alerts/alert.service";

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

  constructor(private datePipe : DatePipe, private formBuilder : FormBuilder, private router : Router, private activatedRoute : ActivatedRoute, private courrierService : CourrierService, private uniteService : UniteService,
              private typeService : TypeService, private natureService : NatureService, private contactService : ContactService, private agentService : AgentService, private dossierService : DossierService,
              private alertService : AlertService) {
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
    this.submitted = true
    if (this.updateCourrierFormGroup.invalid){
      return
    }
    this.loading = true
    let slug = this.updateCourrierFormGroup.value.slug
    let ref_courrier = this.updateCourrierFormGroup.value.ref_courrier
    let id_unite_administrative = this.updateCourrierFormGroup.value.id_unite_administrative
    let id_type = this.updateCourrierFormGroup.value.id_type
    let id_nature = this.updateCourrierFormGroup.value.id_nature
    let id_contact = this.updateCourrierFormGroup.value.id_contact
    let id_dossier = this.updateCourrierFormGroup.value.id_dossier
    let id_suiveur = this.updateCourrierFormGroup.value.id_suiveur
    let id_responsable = this.updateCourrierFormGroup.value.id_responsable
    let num_ref_interne = this.updateCourrierFormGroup.value.num_ref_interne
    let date_courrier = this.updateCourrierFormGroup.value.date_courrier
    let date_arrive = this.updateCourrierFormGroup.value.date_arrive
    let date_creation = this.updateCourrierFormGroup.value.date_creation
    let demande = this.updateCourrierFormGroup.value.demande
    let objet = this.updateCourrierFormGroup.value.objet
    let commentaire = this.updateCourrierFormGroup.value.commentaire
    let devise = this.updateCourrierFormGroup.value.devise
    let montant = this.updateCourrierFormGroup.value.montant
    let statut = this.updateCourrierFormGroup.value.statut

    let courrierModifier = new CourrierModel(slug, ref_courrier, id_unite_administrative, id_type, id_nature, id_contact,
      id_dossier, id_suiveur, id_responsable, num_ref_interne, date_courrier,
      date_arrive, date_creation, demande, objet, commentaire, devise, montant, statut);

    this.courrierService.updateCourrierFromServer(courrierModifier, this.idCourrier).subscribe((resultat)=>{
      this.router.navigate(['/home', 'courrier', 'liste']);
      this.alertService.emettreUnToast("Courrier modifié avec succès ! ", 'success');
    }, (erreur)=>{
      this.alertService.emettreUnToast("Echec de la modification du courrier !", 'error');
    })

  }

}
