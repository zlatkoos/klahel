/**
 * Popis objavljenih cjenika u strojno čitljivom obliku (.csv).
 *
 * Pravilnik o načinu objave cjenika proizvoda (NN 132/2026) i Pravilnik o
 * isticanju bazne cijene proizvoda (NN 132/2026), na snazi od 17. 11. 2026.:
 *  - cjenik usluga sadrži, tim redoslijedom stupaca: naziv usluge; maloprodajnu
 *    cijenu usluge i informaciju je li primijenjena tijekom posebnog oblika
 *    prodaje; baznu cijenu usluge (za usluge: cijena na dan 10. 9. 2026.),
 *  - datoteka je .csv (ili .xml), UTF-8, stupci odvojeni znakom točka zarez (;),
 *  - izmijenjeni cjenik objavljuje se najkasnije do 11:00 sati na dan izmjene,
 *  - zamijenjeni (arhivski) cjenik mora ostati dostupan 15 dana od zamjene,
 *  - naziv datoteke uključuje: matični broj (trgovac – fizička osoba) odnosno
 *    OIB (pravna osoba), prodajno mjesto, adresu i oznaku prodajnog mjesta,
 *    oznaku cjenika robe/usluge, broj pohrane i vrijeme objave GGGGMMDD_SSMM.
 *
 * KAKO OBJAVITI NOVI CJENIK:
 *  1. Novu .csv datoteku spremite u `public/cjenici/` pod nazivom oblika
 *     <MATIČNI BROJ>_TEREN_DRINSKA_10A_31000_OSIJEK_001_USLUGE_<BROJ POHRANE>_<GGGGMMDD>_<SSMM>.csv
 *     (broj pohrane povećajte za 1 kod svake nove objave).
 *  2. Dodajte novi unos na VRH ovog popisa (prvi unos = važeći cjenik).
 *  3. Arhivski cjenik stranica sama prikazuje još 15 dana od zamjene; nakon
 *     toga njegov unos i datoteku smijete obrisati.
 */
export type CjenikUnos = {
  /** Vrijeme objave datoteke, ISO format (YYYY-MM-DDTHH:MM). */
  objavljeno: string;
  /** Naziv datoteke unutar `public/cjenici/`. */
  datoteka: string;
};

export const CJENICI: CjenikUnos[] = [
  {
    objavljeno: '2026-11-20T15:05',
    datoteka:
      '75404698941_TEREN_DRINSKA_10A_31000_OSIJEK_001_USLUGE_0002_20261120_1505.csv',
  },
  {
    objavljeno: '2026-09-20T07:55',
    datoteka: 'TEREN_DRINSKA_10A_31000_OSIJEK_001_0001_20260920_0755.csv',
  },
];

/** Broj dana koliko arhivski cjenik ostaje dostupan nakon zamjene (čl. 3. st. 6.). */
export const DANA_U_ARHIVI = 15;

/** Referentni datum bazne cijene za usluge (Pravilnik o isticanju bazne cijene, čl. 3.). */
export const DATUM_BAZNE_CIJENE = '10. 9. 2026.';

export const CJENICI_BASE = '/cjenici/';

export const vazeciCjenik = CJENICI[0];

const DAN_MS = 24 * 60 * 60 * 1000;

/**
 * Arhivski cjenici koji još moraju biti dostupni: svaki je zamijenjen u trenutku
 * objave sljedećeg (novijeg) cjenika i ostaje dostupan 15 dana od zamjene.
 */
export function arhivskiCjenici(sada = new Date()) {
  return CJENICI.slice(1)
    .map((unos, i) => {
      const zamijenjen = new Date(CJENICI[i].objavljeno);
      return {
        ...unos,
        dostupanDo: new Date(zamijenjen.getTime() + DANA_U_ARHIVI * DAN_MS),
      };
    })
    .filter((unos) => unos.dostupanDo > sada);
}

export const cjenikUrl = (unos: CjenikUnos) =>
  CJENICI_BASE + encodeURIComponent(unos.datoteka);

export const formatDatum = (vrijeme: string | Date) => {
  const d = typeof vrijeme === 'string' ? new Date(vrijeme) : vrijeme;
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}.`;
};
