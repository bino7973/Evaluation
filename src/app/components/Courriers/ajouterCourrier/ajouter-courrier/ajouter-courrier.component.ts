import { Component, OnInit } from '@angular/core';
import {CourrierService} from "../../../../services/Courriers/courrier.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UniteService} from "../../../../services/Unite/unite.service";
import {TypeService} from "../../../../services/Types/type.service";
import {NatureService} from "../../../../services/Natures/nature.service";
import {ContactService} from "../../../../services/Contacts/contact.service";
import {AgentService} from "../../../../services/Agents/agent.service";
import {DossierService} from "../../../../services/Dossiers/dossier.service";
import {CourrierModel} from "../../../../models/courrier-model.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-courrier',
  templateUrl: './ajouter-courrier.component.html',
  styleUrls: ['./ajouter-courrier.component.sass']
})
export class AjouterCourrierComponent implements OnInit {

  ajoutCourrierFormGroup !: FormGroup;
  loading = false;
  submitted = false;

  listeUnite : any;
  listeType : any;
  listeNature : any;
  listeContact : any;
  listeAgent : any;
  listeDossier : any;

  constructor(private router : Router,private courrierService : CourrierService, private formBuilder : FormBuilder, private uniteService : UniteService, private typeService : TypeService, private natureService : NatureService, private contactService : ContactService, private agentService : AgentService, private dossierService : DossierService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.ajoutCourrierFormGroup = this.formBuilder.group({
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

  }

  //Lors de l'envoi du formulaire d'ajout cette methode est appelé
  ajouterNouveauCourrier() {
    this.submitted = true
    let slug = this.ajoutCourrierFormGroup.value.slug
    let ref_courrier = this.ajoutCourrierFormGroup.value.ref_courrier
    let id_unite_administrative = this.ajoutCourrierFormGroup.value.id_unite_administrative
    let id_type = this.ajoutCourrierFormGroup.value.id_type
    let id_nature = this.ajoutCourrierFormGroup.value.id_nature
    let id_contact = this.ajoutCourrierFormGroup.value.id_contact
    let id_dossier = this.ajoutCourrierFormGroup.value.id_dossier
    let id_suiveur = this.ajoutCourrierFormGroup.value.id_suiveur
    let id_responsable = this.ajoutCourrierFormGroup.value.id_responsable
    let num_ref_interne = this.ajoutCourrierFormGroup.value.num_ref_interne
    let date_courrier = this.ajoutCourrierFormGroup.value.date_courrier
    let date_arrive = this.ajoutCourrierFormGroup.value.date_arrive
    let date_creation = this.ajoutCourrierFormGroup.value.date_creation
    let demande = this.ajoutCourrierFormGroup.value.demande
    let objet = this.ajoutCourrierFormGroup.value.objet
    let commentaire = this.ajoutCourrierFormGroup.value.commentaire
    let devise = this.ajoutCourrierFormGroup.value.devise
    let montant = this.ajoutCourrierFormGroup.value.montant
    let statut = this.ajoutCourrierFormGroup.value.statut
    if(this.ajoutCourrierFormGroup.invalid){
      return
    }
    this.loading = true
    let nouveauCourrier = new CourrierModel(slug, ref_courrier, id_unite_administrative, id_type, id_nature, id_contact,
                                            id_dossier, id_suiveur, id_responsable, num_ref_interne, date_courrier,
                                            date_arrive, date_creation, demande, objet, commentaire, devise, montant, statut);
    console.log(nouveauCourrier)
    this.courrierService.addNewCourrierToServer(nouveauCourrier).subscribe((resultat)=>{
      this.router.navigate(['/home', 'courrier', 'liste'])
    }, (erreur)=>{
      console.log(erreur)
    })
  }
}
