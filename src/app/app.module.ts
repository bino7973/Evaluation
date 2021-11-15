import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";



import { AppComponent } from './app.component';
import { LoginComponent } from './components/Agents/login/login/login.component';
import { SignInComponent } from './components/Agents/signIn/sign-in/sign-in.component';
import { ListComponent } from './components/Agents/list/list/list.component';
import { DetailComponent } from './components/Agents/detail/detail/detail.component';
import { HomeComponent } from './components/home/home/home.component';
import { AjouterCourrierComponent } from './components/Courriers/ajouterCourrier/ajouter-courrier/ajouter-courrier.component';
import { ListeCourrierComponent } from './components/Courriers/listeCourrier/liste-courrier/liste-courrier.component';
import {AgentService} from "./services/Agents/agent.service";
import {CourrierService} from "./services/Courriers/courrier.service";
import {HelpersService} from "./services/Helpers/helpers.service";
import { AjouterNatureComponent } from './components/Natures/ajouterNature/ajouter-nature/ajouter-nature.component';
import { ListeNatureComponent } from './components/Natures/listeNature/liste-nature/liste-nature.component';
import { ListeTypeComponent } from './components/Types/listeType/liste-type/liste-type.component';
import {NatureService} from "./services/Natures/nature.service";
import {TypeService} from "./services/Types/type.service";
import { AjouterDossierComponent } from './components/Dossiers/ajouterDossier/ajouter-dossier/ajouter-dossier.component';
import { ListeDossierComponent } from './components/Dossiers/listeDossier/liste-dossier/liste-dossier.component';
import {DossierService} from "./services/Dossiers/dossier.service";
import { AjouterContactComponent } from './components/Contacts/ajouterContact/ajouter-contact/ajouter-contact.component';
import { ListeContactComponent } from './components/Contacts/listeContact/liste-contact/liste-contact.component';
import { AjouterUniteComponent } from './components/Unites/ajouterUnite/ajouter-unite/ajouter-unite.component';
import { ListeUniteComponent } from './components/Unites/listeUnite/liste-unite/liste-unite.component';
import { AjouterRoleComponent } from './components/Roles/ajouterRole/ajouter-role/ajouter-role.component';
import { ListeRoleComponent } from './components/Roles/listeRole/liste-role/liste-role.component';
import { ListeCourrierSupprimerComponent } from './components/CourrierSupprimer/listeCourrierSupprimer/liste-courrier-supprimer/liste-courrier-supprimer.component';
import {RoleService} from "./services/Roles/role.service";
import {UniteService} from "./services/Unite/unite.service";
import { AlertComponent } from './components/Alerts/alert/alert.component';
import { AjouterTypeComponent } from './components/Types/ajouterType/ajouter-type/ajouter-type.component';
import { DetailCourrierComponent } from './components/Courriers/detailCourrier/detail-courrier/detail-courrier.component';
import {DatePipe} from "@angular/common";
import { DetailNatureComponent } from './components/Natures/detailNature/detail-nature/detail-nature.component';
import { DetailRoleComponent } from './components/Roles/detailRole/detail-role/detail-role.component';
import { DetailTypeComponent } from './components/Types/detailType/detail-type/detail-type.component';
import {DetailUniteComponent} from "./components/Unites/detailUnite/detail-unite/detail-unite.component";
import { DetailContactComponent } from './components/Contacts/detailContact/detail-contact/detail-contact.component';
import { DetailDossierComponent } from './components/Dossiers/detailDossier/detail-dossier/detail-dossier.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    ListComponent,
    DetailComponent,
    HomeComponent,
    AjouterCourrierComponent,
    ListeCourrierComponent,
    AjouterNatureComponent,
    ListeNatureComponent,
    ListeTypeComponent,
    AjouterDossierComponent,
    ListeDossierComponent,
    AjouterContactComponent,
    ListeContactComponent,
    AjouterUniteComponent,
    ListeUniteComponent,
    AjouterRoleComponent,
    ListeRoleComponent,
    ListeCourrierSupprimerComponent,
    AlertComponent,
    AjouterTypeComponent,
    DetailCourrierComponent,
    DetailNatureComponent,
    DetailRoleComponent,
    DetailTypeComponent,
    DetailUniteComponent,
    DetailContactComponent,
    DetailDossierComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
  providers: [DatePipe,AgentService, CourrierService, NatureService, TypeService, DossierService, RoleService, TypeService, UniteService,
              {provide : HTTP_INTERCEPTORS, useClass : HelpersService, multi : true}
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
