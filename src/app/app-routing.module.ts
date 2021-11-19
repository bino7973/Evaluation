import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Compoent Import statement
// import { SignInComponent } from './components/Agents/signIn/sign-in.component';

import {LoginComponent} from './components/Agents/login/login/login.component';
import {SignInComponent} from './components/Agents/signIn/sign-in/sign-in.component';
import {HomeComponent} from "./components/home/home/home.component";
import {AjouterCourrierComponent} from "./components/Courriers/ajouterCourrier/ajouter-courrier/ajouter-courrier.component";
import {ListeCourrierComponent} from "./components/Courriers/listeCourrier/liste-courrier/liste-courrier.component";
import {ListComponent} from "./components/Agents/list/list/list.component";
import {AjouterNatureComponent} from "./components/Natures/ajouterNature/ajouter-nature/ajouter-nature.component";
import {ListeNatureComponent} from "./components/Natures/listeNature/liste-nature/liste-nature.component";
import {AuthGuardService} from "./services/Agents/auth-guard/auth-guard.service";
import {AjouterTypeComponent} from "./components/Types/ajouterType/ajouter-type/ajouter-type.component";
import {ListeTypeComponent} from "./components/Types/listeType/liste-type/liste-type.component";
import {ListeDossierComponent} from "./components/Dossiers/listeDossier/liste-dossier/liste-dossier.component";
import {AjouterDossierComponent} from "./components/Dossiers/ajouterDossier/ajouter-dossier/ajouter-dossier.component";
import {AjouterContactComponent} from "./components/Contacts/ajouterContact/ajouter-contact/ajouter-contact.component";
import {ListeContactComponent} from "./components/Contacts/listeContact/liste-contact/liste-contact.component";
import {AjouterUniteComponent} from "./components/Unites/ajouterUnite/ajouter-unite/ajouter-unite.component";
import {ListeUniteComponent} from "./components/Unites/listeUnite/liste-unite/liste-unite.component";
import {AjouterRoleComponent} from "./components/Roles/ajouterRole/ajouter-role/ajouter-role.component";
import {ListeRoleComponent} from "./components/Roles/listeRole/liste-role/liste-role.component";
import {ListeCourrierSupprimerComponent} from "./components/CourrierSupprimer/listeCourrierSupprimer/liste-courrier-supprimer/liste-courrier-supprimer.component";
import {DetailCourrierComponent} from "./components/Courriers/detailCourrier/detail-courrier/detail-courrier.component";
import {DetailNatureComponent} from "./components/Natures/detailNature/detail-nature/detail-nature.component";
import {DetailRoleComponent} from "./components/Roles/detailRole/detail-role/detail-role.component";
import {DetailTypeComponent} from "./components/Types/detailType/detail-type/detail-type.component";
import {DetailUniteComponent} from "./components/Unites/detailUnite/detail-unite/detail-unite.component";
import {DetailContactComponent} from "./components/Contacts/detailContact/detail-contact/detail-contact.component";
import {DetailDossierComponent} from "./components/Dossiers/detailDossier/detail-dossier/detail-dossier.component";

const routes: Routes = [
  {path : 'agent/connexion', component : LoginComponent},
  {path : 'agent/inscription', component : SignInComponent},
  {path : 'home', canActivate : [AuthGuardService],component : HomeComponent,
    children : [
      //Courrier
      {path : 'courrier/ajouter', component : AjouterCourrierComponent},
      {path : 'courrier/liste', component : ListeCourrierComponent},
      {path : 'courrier/detail/:id', component : DetailCourrierComponent},

      //Courriers arrivées
      //{path : 'courrier/'}

      //Agents
      {path : 'agent/ajouter', component : SignInComponent},
      {path : 'agent/liste', component : ListComponent},
      //Nature
      {path : 'nature/ajouter', component : AjouterNatureComponent},
      {path : 'nature/liste', component : ListeNatureComponent},
      {path : 'nature/detail/:id', component : DetailNatureComponent},
      //types
      {path : 'type/ajouter', component : AjouterTypeComponent},
      {path : 'type/liste', component : ListeTypeComponent},
      { path : 'type/detail/:id', component : DetailTypeComponent},
      //Dossier
      {path : 'dossier/ajouter', component : AjouterDossierComponent},
      {path : 'dossier/liste', component : ListeDossierComponent},
      {path : 'dossier/detail/:id', canActivate : [AuthGuardService] ,component : DetailDossierComponent},
      //Reponse
      //Contact
      {path : 'contact/ajouter', canActivate : [AuthGuardService], component : AjouterContactComponent},
      {path : 'contact/liste', canActivate : [AuthGuardService], component : ListeContactComponent},
      {path : 'contact/detail/:id', canActivate : [AuthGuardService], component : DetailContactComponent},
      //Unité
      {path : 'unite/ajouter', canActivate : [AuthGuardService], component : AjouterUniteComponent},
      {path : 'unite/liste', canActivate : [AuthGuardService], component : ListeUniteComponent},
      {path : 'unite/detail/:id', canActivate : [AuthGuardService], component : DetailUniteComponent},
      //Role
      {path : 'role/ajouter', canActivate : [AuthGuardService], component : AjouterRoleComponent},
      {path : 'role/liste', canActivate : [AuthGuardService], component : ListeRoleComponent},
      {path : 'role/detail/:id', canActivate : [AuthGuardService], component : DetailRoleComponent},
      //Courrier Supprimer
      {path : 'courrierSupprime/liste', canActivate : [AuthGuardService], component : ListeCourrierSupprimerComponent}
    ]
  },

  {path : '', pathMatch : 'full', redirectTo : '/agent/connexion'},
  {path : '**', redirectTo : '/agent/connexion'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
