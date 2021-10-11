import { Kunde } from "./kunde";
import { Mitarbeiter } from "./mitarbeiter";

export interface StundenzettelTag {
  idstunden:number;
  datum: Date;
  stunden: number;
  fahrzeit: number;
  mName?: string;
  kName?: string;
  kunde: Kunde;
  mitarbeiter: Mitarbeiter;
  kommentar: string;
  timestamp: Date;
}
