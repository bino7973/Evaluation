import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RoleService} from "../../../../services/Roles/role.service";
import {AlertService} from "../../../../services/Alerts/alert.service";

@Component({
  selector: 'app-liste-role',
  templateUrl: './liste-role.component.html',
  styleUrls: ['./liste-role.component.sass']
})
export class ListeRoleComponent implements OnInit {

  listeRole : any = [];

  constructor(private roleService : RoleService, private router : Router, private alertService : AlertService) { }

  ngOnInit(): void {
    this.getAllRolesFromRoleServer();
  }

  redirigerAjoutRole() {
    this.router.navigate(['/home', 'role', 'ajouter']);
  }

  getAllRolesFromRoleServer(){
    this.roleService.getAllRolesFromServer().subscribe((resultat)=>{
      this.listeRole = resultat.roles
    }, (erreur)=>{
      console.log(erreur)
    })
  }

  supprimerRole(_id: any, i: number) {
    this.alertService.emettreConfirmationAlert("Voulez vous supprimer ce rôle","ce rôle").then((resultat: { isConfirmed: any; })=>{
      if(resultat.isConfirmed){
        this.roleService.deleteRoleFromServer(_id).subscribe((resultat)=>{
          this.listeRole.splice(i, 1)
          this.router.navigate(['/home', 'role', 'liste'])
          this.alertService.emettreUnToast("La suppression du rôle a été effectuée avec succès !", 'success');
        }, (erreur)=>{
          this.alertService.emettreUnToast("Echec de la suppression du rôle !", 'error');
        })
      }
    })
  }
}
