# klahel

Mrežne stranice obrta KLAHEL — usluge čišćenja, Drinska 10A, 31000 Osijek.

Vite + React + TypeScript + Tailwind CSS.

```bash
npm install
npm run dev
npm run build
```

## Objava cjenika (Nar. nov., br. 132/26)

Od 17. 11. 2026. vrijede Pravilnik o načinu objave cjenika proizvoda i Pravilnik
o isticanju bazne cijene proizvoda (NN 132/2026), koji su zamijenili odluke iz
NN 101/2026. Za ovaj obrt to znači:

- cjenik usluga objavljuje se na mrežnoj stranici kao .csv datoteka (UTF-8,
  stupci odvojeni znakom `;`) sa stupcima, tim redoslijedom: **naziv usluge;
  maloprodajna cijena usluge; poseban oblik prodaje (DA/NE); bazna cijena usluge**,
- bazna cijena za usluge je cijena koja je vrijedila **10. 9. 2026.** i mora biti
  jasno, vidljivo i čitljivo istaknuta uz maloprodajnu cijenu,
- izmijenjeni cjenik objavljuje se najkasnije **do 11:00 sati** na dan izmjene,
- zamijenjeni (arhivski) cjenik mora ostati dostupan **15 dana** od zamjene,
- naziv datoteke uključuje matični broj, prodajno mjesto, adresu i oznaku
  prodajnog mjesta, oznaku `USLUGE`, broj pohrane i vrijeme objave
  `GGGGMMDD_SSMM`.

Na stranici to pokriva sekcija `#cjenik` (`src/components/Cjenik.tsx`), koja
tablicu gradi izravno iz objavljene .csv datoteke, pa su prikaz na stranici i
preuzeta datoteka uvijek isti podatak. Napomene uz cjenik su u komponenti, a ne
u .csv datoteci, kako bi datoteka sadržavala samo stavke cjenika.

### Kako objaviti novi cjenik

1. Spremite novu .csv datoteku u `public/cjenici/` pod nazivom
   `<MATIČNI BROJ>_TEREN_DRINSKA_10A_31000_OSIJEK_001_USLUGE_<BROJ POHRANE>_<GGGGMMDD>_<SSMM>.csv`
   (broj pohrane povećajte za 1 kod svake objave).
2. Dodajte novi unos na **vrh** popisa `CJENICI` u `src/data/cjenici.ts`
   (prvi unos je važeći cjenik).
3. Stranica sama prikazuje arhivski cjenik još 15 dana od zamjene; nakon toga
   unos i datoteku smijete obrisati.
4. `npm run build` i objavite stranicu (do 11:00 na dan izmjene).
