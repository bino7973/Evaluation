export class DossierModel {
  constructor(private slug: string,private ref_dossier : string, private intitule : string, private objet : string, private id_unite_administrative : string, private id_agent : string, private date_creation : Date, private date_cloture : Date, private statut : string) {
  }
}
