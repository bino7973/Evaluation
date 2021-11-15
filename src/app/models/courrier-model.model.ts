export class CourrierModel {
  constructor(public slug : string, public ref_courrier : string, public id_unite_administrative : string,public id_type : string, public id_nature : string, public id_contact : string, public id_dossier : string, public id_suiveur : string, public id_responsable :string, public num_ref_interne : string, public date_courrier : Date, public date_arrive : Date, public date_creation : Date,public demande : string,public objet : string,public commentaire : string,public devise : string,public montant : Number,public statut : string) {
  }
}
