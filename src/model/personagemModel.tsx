import { Personagem } from "../interface/personagemProps";

export class PersonagemModel implements Personagem {
  name: string;
  race: string;
  gender: string;
  affiliation: string;
  ki: number;

  constructor(obj: any) {
    this.name = obj.name;
    this.race = obj.race;
    this.gender = obj.gender;
    this.affiliation = obj.affiliation;

    this.ki = Number(obj.ki.replace(/\./g, '')) 
  }
}
