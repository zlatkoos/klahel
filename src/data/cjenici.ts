/**
 * Popis objavljenih cjenika u strojno čitljivom obliku (.csv).
 *
 * Odluka o objavi cjenika proizvoda i usluga (NN 101/2026), na snazi od 1. 10. 2026.:
 * pružatelj usluga koji ima mrežne stranice objavljuje cjenik u .csv ili .xml formatu,
 * ažurira ga kod svake promjene cijene najkasnije do 8:00 sati toga dana, a svaki
 * objavljeni cjenik mora ostati dostupan na stranici 30 dana od dana objave.
 *
 * KAKO OBJAVITI NOVI CJENIK:
 *  1. Novu .csv datoteku spremite u `public/cjenici/`.
 *  2. Dodajte novi unos na VRH ovog popisa (prvi unos = važeći cjenik).
 *  3. Unose starije od 30 dana slobodno obrišite s popisa i iz `public/cjenici/`.
 */
export type CjenikUnos = {
  /** Datum objave / početka važenja, ISO format (YYYY-MM-DD). */
  datum: string;
  /** Naziv datoteke unutar `public/cjenici/`. */
  datoteka: string;
};

export const CJENICI: CjenikUnos[] = [
  {
    datum: '2026-09-20',
    datoteka: 'servis za ciscenje KLAHEL Drinska 10a 31000 osijek 20.09.2026..csv',
  },
];

export const CJENICI_BASE = '/cjenici/';

export const cjenikUrl = (unos: CjenikUnos) =>
  CJENICI_BASE + encodeURIComponent(unos.datoteka);

export const formatDatum = (iso: string) => {
  const [g, m, d] = iso.split('-');
  return `${Number(d)}. ${Number(m)}. ${g}.`;
};
