import { X } from 'lucide-react';

export function BulletinModal({ bulletinData, onClose }) {
  if (!bulletinData) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex justify-center items-center p-2">
      <div className="bg-white shadow-2xl w-full max-w-6xl overflow-hidden flex flex-col max-h-[95vh] relative text-[10px] md:text-xs">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black z-10 bg-white rounded-full shadow p-1 border">
          <X size={24}/>
        </button>
        <div className="p-4 md:p-8 overflow-y-auto" style={{fontFamily: 'Arial, sans-serif'}}>
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="font-bold leading-tight">
              <div>République TUNISIENNE</div>
              <div className="mt-1">Ministère de l'éducation</div>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-green-700 font-bold bg-[#013511] text-white px-4 py-1 text-[8px] md:text-[10px]">الجمهورية التونسية</div>
              <div className="bg-[#013511] p-1"><img src="/images/logo%20excellence.png" alt="Logo" style={{height: '35px', filter: 'brightness(0) invert(1)'}} /></div>
              <div className="text-[#c69c4e] font-bold bg-[#013511] px-4 py-1 text-[8px] md:text-[10px] w-full">وزارة التربية</div>
            </div>
            <div className="font-bold">EXCELLENCE SCHOOL</div>
          </div>
          
          <div className="text-center mb-6">
            <h1 className="text-xl md:text-2xl font-bold">Bulletin de résultats scolaires</h1>
            <div className="font-bold mt-1">PREMIER TRIMESTRE - Année scolaire : 2026 - 2027</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 font-bold mb-6 max-w-2xl text-xs md:text-sm">
            <div className="flex"><div className="w-44 shrink-0">Nom et prénom</div><div>: {bulletinData.eleve.nom.toUpperCase()}</div></div>
            <div className="flex"><div className="w-32 shrink-0">Date et lieu de naissance</div><div>: [...]</div></div>
            <div className="flex"><div className="w-44 shrink-0">Classe</div><div>: {bulletinData.className}</div></div>
            <div className="flex"><div className="w-32 shrink-0">Effectif</div><div>: [...]</div></div>
            <div className="flex"><div className="w-44 shrink-0">Rang</div><div>: [...]</div></div>
            <div className="flex"><div className="w-32 shrink-0">Matricule</div><div>: {bulletinData.eleve.identifiant}</div></div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-black text-center mb-6 min-w-[700px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black p-1 text-left w-48" rowSpan="2">Matières</th>
                  <th className="border border-black p-1 w-10" rowSpan="2">Coef.</th>
                  <th className="border border-black p-1" rowSpan="2">Oral</th>
                  <th className="border border-black p-1" rowSpan="2">TP</th>
                  <th className="border border-black p-1" rowSpan="2">TEST</th>
                  <th className="border border-black p-1" colSpan="2">DC</th>
                  <th className="border border-black p-1" rowSpan="2">DS<br/>x2</th>
                  <th className="border border-black p-1" rowSpan="2">Moy.<br/>trimestre</th>
                  <th className="border border-black p-1" rowSpan="2">Rang</th>
                  <th className="border border-black p-1" rowSpan="2">Total</th>
                  <th className="border border-black p-1 text-left" rowSpan="2">Observations, noms et signatures des enseignant.e.s</th>
                </tr>
                <tr className="bg-gray-200">
                  <th className="border border-black p-1">DC 1</th>
                  <th className="border border-black p-1">DC 2</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  let subjects = [];
                  if (bulletinData.emploiDuTemps && bulletinData.emploiDuTemps.length > 0) {
                    const matMap = new Map();
                    bulletinData.emploiDuTemps.forEach(s => {
                      if (s.matiere && !matMap.has(s.matiere)) {
                        const coef = s.matiere.toLowerCase().includes('math') || s.matiere.toLowerCase().includes('arabe') ? "3" : "1";
                        matMap.set(s.matiere, {
                          n: s.matiere, c: coef, o: "--,--",
                          tp: "--,--", test: "--,--", dc1: "--,--", dc2: "--,--", ds: "--,--",
                          moy: "--,--", r: "[...]", t: "--,--", obs: "",
                          p: s.professeur?.nom || "[...]"
                        });
                      }
                    });
                    subjects = Array.from(matMap.values());
                  }
                  
                  if (subjects.length === 0) {
                    subjects = [
                      {n:"ARABE", c:"4", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"},
                      {n:"ANGLAIS", c:"1.5", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"},
                      {n:"HISTOIRE", c:"1", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"},
                      {n:"GEOGRAPHIE", c:"1", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"},
                      {n:"SVT", c:"1", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"},
                      {n:"MATHEMATIQUES", c:"3", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"},
                      {n:"INFORMATIQUE", c:"1", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"},
                      {n:"MUSIQUE", c:"1", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"},
                      {n:"EDUCATION PHYSIQUE", c:"1", o:"--,--", tp:"--,--", test:"--,--", dc1:"--,--", dc2:"--,--", ds:"--,--", moy:"--,--", r:"[...]", t:"--,--", obs:"", p:"[...]"}
                    ];
                  }

                  return (
                    <>
                      {subjects.map((row, idx) => (
                        <tr key={idx} className="border-b border-black">
                          <td className="border border-black p-1 font-bold text-left">{row.n}</td>
                          <td className="border border-black p-1 font-bold">{row.c}</td>
                          <td className="border border-black p-1">{row.o}</td><td className="border border-black p-1">{row.tp}</td><td className="border border-black p-1">{row.test}</td><td className="border border-black p-1">{row.dc1}</td><td className="border border-black p-1">{row.dc2}</td><td className="border border-black p-1">{row.ds}</td>
                          <td className="border border-black p-1 font-bold">{row.moy}</td><td className="border border-black p-1 font-bold">{row.r}</td><td className="border border-black p-1 font-bold">{row.t}</td>
                          <td className="border border-black p-1 text-left text-[10px] relative h-10">{row.obs}<br/><span className="absolute bottom-1 right-1 uppercase">{row.p}</span></td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 font-bold border-t-2 border-black" id="tfoot-row">
                        <td colSpan="2" className="border border-black p-2 text-left">TOTAL</td>
                        <td colSpan="8" className="border border-black p-2">[...]</td>
                        <td colSpan="2" className="border border-black p-2 text-left">[...]</td>
                      </tr>
                      <style>{`.computed-moy:after { content: '[...]'; } .computed-mention:after { content: '[...]'; }`}</style>
                    </>
                  );
                })()}
              </tbody>
            </table>
          </div>

          {/* Bottom Layout block */}
          <div className="flex gap-4 items-stretch mb-4 mt-6">
            <table className="border-collapse border border-black text-center flex-1">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-black p-2 col-span-4" colSpan="4">Résultats</th>
                  <th className="border border-black p-2 col-span-4" colSpan="4">Sanctions</th>
                  <th className="border border-black p-2 col-span-2" colSpan="2">Présence</th>
                </tr>
                <tr className="bg-gray-100 text-[10px]">
                  <th className="border border-black p-1">Période</th>
                  <th className="border border-black p-1 p-x-2">Moy.</th>
                  <th className="border border-black p-1">Rang</th>
                  <th className="border border-black p-1">Mentions</th>
                  <th className="border border-black p-1">Sanctions</th>
                  <th className="border border-black p-1">Révision</th>
                  <th className="border border-black p-1">Averti.</th>
                  <th className="border border-black p-1">Exclus.</th>
                  <th className="border border-black p-1">Absence</th>
                  <th className="border border-black p-1">Retard</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-8 font-bold">
                  <td className="border border-black p-2">PREMIER TRIMESTRE</td>
                  <td className="border border-black p-2 computed-moy"></td>
                  <td className="border border-black p-2">[...]</td>
                  <td className="border border-black p-2 text-left px-4 computed-mention"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                  <td className="border border-black p-2"></td>
                </tr>
              </tbody>
            </table>
            <div className="border border-black p-4 w-64 flex flex-col relative text-[11px]">
              <div className="font-bold mb-8">Décision du conseil de classe et observations du directeur :</div>
              <div className="mt-auto flex justify-between absolute bottom-4 left-4 right-4">
                <span className="font-bold">Directeur :</span>
                <span className="text-gray-500 italic flex text-right text-[9px] w-28">Le Directeur (Nom et prénom non renseignés)</span>
              </div>
            </div>
          </div>
          <div className="border border-black p-2 px-4 font-bold max-w-5xl">
            Légende : --,-- sans note, (A.J) Absence Justifiée, (D) Dispensé, (A.N.J) Absence Non Justifiée (J) Jour, (H) Heure, M (Minute)
          </div>
        </div>
      </div>
    </div>
  );
}
