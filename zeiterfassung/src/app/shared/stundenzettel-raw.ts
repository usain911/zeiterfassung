export class StundenzettelRaw {
    idstunden?: number;
    datum?: string;
    stunden?: number;
    fahrzeit?: number;
    mitarbeiter?: number;
    kunde?: number;
    kommentar?: string;

    constructor(datum: string, fahrzeit: number, kunde: number, mitarbeiter: number, stunden: number, kommentar: string) {
      this.datum = datum;
      this.fahrzeit = fahrzeit;
      this.kunde = kunde;
      this.mitarbeiter = mitarbeiter;
      this.stunden = stunden;
      this.kommentar = kommentar;
    }
}
