import { useEffect, useState } from 'react';
import { Download, FileSpreadsheet, Info, AlertCircle } from 'lucide-react';
import { parseCsv } from '../lib/csv';
import { CJENICI, cjenikUrl, formatDatum } from '../data/cjenici';

type Ucitano = {
  zaglavlje: string[];
  stavke: string[][];
  napomene: string[];
};

const vazeci = CJENICI[0];

/** Stupac s dodatnom (sidrenom) cijenom - mora biti jasno vidljiv uz vazecu cijenu. */
const jeDodatnaCijena = (naslov: string) => /dodatn|sidren/i.test(naslov);

/** Redak bez ijedne cijene = napomena ispod cjenika, a ne stavka cjenika. */
const jeNapomena = (redak: string[]) => redak.slice(1).every((c) => c === '');

/**
 * Redoslijed stupaca za prikaz: naziv usluge, maloprodajna cijena, pa odmah do
 * nje dodatna (sidrena) cijena, kako bi bila jasno i citljivo istaknuta uz
 * vazecu cijenu. Preostali stupci iz cjenika slijede iza njih, bez izostavljanja.
 */
function poredakStupaca(zaglavlje: string[]): number[] {
  const istaknuti = [
    ...new Set(
      [
        0,
        zaglavlje.findIndex((n) => /maloprodajn/i.test(n)),
        zaglavlje.findIndex(jeDodatnaCijena),
      ].filter((i) => i >= 0)
    ),
  ];

  const ostali = zaglavlje
    .map((_, i) => i)
    .filter((i) => !istaknuti.includes(i));

  return [...istaknuti, ...ostali];
}

function Cjenik() {
  const [podaci, setPodaci] = useState<Ucitano | null>(null);
  const [greska, setGreska] = useState(false);

  useEffect(() => {
    let otkazano = false;

    fetch(cjenikUrl(vazeci))
      .then((odgovor) => {
        if (!odgovor.ok) throw new Error(String(odgovor.status));
        return odgovor.text();
      })
      .then((tekst) => {
        if (otkazano) return;
        const redci = parseCsv(tekst);
        const [zaglavlje, ...ostatak] = redci;
        setPodaci({
          zaglavlje: zaglavlje.map((c) => c.replace(/\s*\n\s*/g, ' ')),
          stavke: ostatak.filter((r) => !jeNapomena(r)),
          napomene: ostatak.filter(jeNapomena).map((r) => r[0]),
        });
      })
      .catch(() => {
        if (!otkazano) setGreska(true);
      });

    return () => {
      otkazano = true;
    };
  }, []);

  const stupci = podaci ? poredakStupaca(podaci.zaglavlje) : [];

  return (
    <section id="cjenik" className="py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Cjenik usluga</h2>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Cjenik vrijedi od {formatDatum(vazeci.datum)} i objavljen je u skladu s
          Odlukom o objavi cjenika proizvoda i usluga (Nar. nov., br. 101/26).
          Uz važeću maloprodajnu cijenu istaknuta je i dodatna (sidrena) cijena
          koja je vrijedila 10. rujna 2026. godine.
        </p>

        {greska && (
          <div className="max-w-2xl mx-auto mb-8 flex items-start bg-red-50 border border-red-200 text-red-800 rounded-lg p-4">
            <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
            <p>
              Cjenik se trenutačno ne može prikazati.{' '}
              <a
                href={cjenikUrl(vazeci)}
                download
                className="underline font-semibold"
              >
                Preuzmite cjenik u .csv formatu
              </a>{' '}
              ili nas nazovite na (091) 932-1421.
            </p>
          </div>
        )}

        {podaci && (
          <>
            {/* Tablicni prikaz - veci zasloni */}
            <div className="hidden md:block overflow-x-auto rounded-lg shadow-lg">
              <table className="w-full bg-white text-left">
                <caption className="sr-only">
                  Cjenik usluga čišćenja obrta KLAHEL, vrijedi od{' '}
                  {formatDatum(vazeci.datum)}
                </caption>
                <thead className="bg-blue-600 text-white">
                  <tr>
                    {stupci.map((stupac) => (
                      <th
                        key={stupac}
                        scope="col"
                        className="px-4 py-4 font-semibold align-bottom"
                      >
                        {podaci.zaglavlje[stupac]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {podaci.stavke.map((redak, i) => (
                    <tr key={i} className={i % 2 ? 'bg-gray-50' : 'bg-white'}>
                      {stupci.map((stupac, mjesto) => (
                        <td
                          key={stupac}
                          className={
                            mjesto === 0
                              ? 'px-4 py-4 font-medium text-gray-900'
                              : jeDodatnaCijena(podaci.zaglavlje[stupac])
                              ? 'px-4 py-4 font-semibold text-blue-700'
                              : 'px-4 py-4 text-gray-700'
                          }
                        >
                          {redak[stupac] || '–'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Karticni prikaz - mobilni uredaji */}
            <div className="md:hidden space-y-4">
              {podaci.stavke.map((redak, i) => (
                <div key={i} className="bg-white rounded-lg shadow-lg p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    {redak[0]}
                  </h3>
                  <dl className="space-y-2 text-sm">
                    {stupci.slice(1).map((stupac) => (
                      <div key={stupac} className="flex justify-between gap-4">
                        <dt className="text-gray-500">
                          {podaci.zaglavlje[stupac]}
                        </dt>
                        <dd
                          className={
                            jeDodatnaCijena(podaci.zaglavlje[stupac])
                              ? 'text-right font-semibold text-blue-700'
                              : 'text-right text-gray-800'
                          }
                        >
                          {redak[stupac] || '–'}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>

            {podaci.napomene.length > 0 && (
              <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
                <div className="flex items-center mb-3 text-blue-800 font-semibold">
                  <Info className="w-5 h-5 mr-2" />
                  Napomene uz cjenik
                </div>
                <ul className="space-y-2 text-gray-700">
                  {podaci.napomene.map((napomena, i) => (
                    <li key={i}>{napomena}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        {/* Strojno citljivi cjenik i arhiva objavljenih cjenika */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center mb-3 font-semibold text-gray-900">
              <FileSpreadsheet className="w-5 h-5 mr-2 text-blue-600" />
              Cjenik u strojno čitljivom obliku
            </div>
            <p className="text-gray-600 mb-4">
              Važeći cjenik od {formatDatum(vazeci.datum)} u .csv formatu,
              pogodnom za automatsku obradu.
            </p>
            <a
              href={cjenikUrl(vazeci)}
              download
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              <Download className="w-5 h-5 mr-2" />
              Preuzmi cjenik (.csv)
            </a>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="font-semibold text-gray-900 mb-3">
              Arhiva objavljenih cjenika
            </div>
            <p className="text-gray-600 mb-4">
              Svaki objavljeni cjenik ostaje dostupan 30 dana od dana objave.
            </p>
            <ul className="space-y-2">
              {CJENICI.map((unos) => (
                <li key={unos.datoteka}>
                  <a
                    href={cjenikUrl(unos)}
                    download
                    className="inline-flex items-center text-blue-700 hover:text-blue-900 underline"
                  >
                    <Download className="w-4 h-4 mr-2 flex-shrink-0" />
                    Cjenik od {formatDatum(unos.datum)} (.csv)
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cjenik;
