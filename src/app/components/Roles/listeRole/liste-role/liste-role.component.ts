import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {RoleService} from "../../../../services/Roles/role.service";

@Component({
  selector: 'app-liste-role',
  templateUrl: './liste-role.component.html',
  styleUrls: ['./liste-role.component.sass']
})
export class ListeRoleComponent implements OnInit {

  listeRole : any = [];

  constructor(private roleService : RoleService, private router : Router) { }

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
    this.roleService.deleteRoleFromServer(_id).subscribe((resultat)=>{
      this.listeRole.splice(i, 1)
    }, (erreur)=>{
      console.log(erreur)
    })

  }
}
