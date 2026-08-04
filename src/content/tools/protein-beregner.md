---
title: "Protein beregner"
description: "Beregn hvor meget protein du skal have om dagen. Indtast din vægt og aktivitetsniveau og få dit daglige proteinbehov med det samme."
pubDate: 2026-08-04
author: "Karsten Hansen"
category: "Værktøj"
---

# Protein beregner

Hvor meget protein skal du egentlig have om dagen? Indtast din vægt og mål herunder.

<div id="protein-calculator">
  <div class="calc-inputs">
    <label for="prot-weight">Vægt (kg)</label>
    <input type="number" id="prot-weight" placeholder="80" min="30" max="300" />
    
    <label for="prot-goal">Dit mål</label>
    <select id="prot-goal">
      <option value="sedentary">Stillesiddende (ingen træning)</option>
      <option value="active">Let aktiv (træner 1-3 gange/uge)</option>
      <option value="maintenance" selected>Styrketræning (vedligehold)</option>
      <option value="building">Styrketræning (muskelopbygning)</option>
      <option value="cutting">Styrketræning (vægttab/fedttab)</option>
    </select>
    
    <button id="prot-calc" onclick="calculateProtein()">Beregn proteinbehov</button>
  </div>
  
  <div id="protein-result" class="calc-result" style="display:none">
    <div id="protein-target"></div>
    <div id="protein-info"></div>
    <div id="protein-sources"></div>
  </div>
</div>

## Hvor meget protein har du brug for?

Dit proteinbehov afhænger af hvor meget du vejer og hvad du træner for. Her er de anbefalede mængder:

| Mål | Gram protein pr. kg kropsvægt |
|---|---|
| Stillesiddende | 0,8-1,0 g/kg |
| Let aktiv | 1,0-1,2 g/kg |
| Styrketræning (vedligehold) | 1,2-1,6 g/kg |
| Styrketræning (muskelopbygning) | 1,6-2,2 g/kg |
| Styrketræning (vægttab) | 2,2-2,8 g/kg |

Læs mere om protein og [proteinkvotient](/ordbog/hvad-er-proteinkvotient) i vores ordbog.

## Gode proteinkilder

Du behøver ikke [proteinpulver](/blog/proteinpulver-fakta) for at få nok protein. Gode madkilder er:

- **Kylling** ca. 31 g protein pr. 100 g
- **Æg** ca. 13 g protein pr. 100 g (2 æg = ca. 12 g)
- **Laks** ca. 20 g protein pr. 100 g
- **Skyr** ca. 11 g protein pr. 100 g
- **Bønner og linser** ca. 9 g protein pr. 100 g
- **[Proteinpulver](/blog/proteinpulver-fakta)** ca. 75-80 g protein pr. 100 g

Hvis du har svært ved at få nok protein gennem maden, er et [proteintilskud](/blog/proteinpulver-fakta) en nem og effektiv måde at nå dit mål på.

Brug også vores [kalorieberegner](/tools/kalorieberegner) til at se dit samlede kaloriebehov.

<script is:inline>
function calculateProtein() {
  var weight = parseFloat(document.getElementById('prot-weight').value);
  var goal = document.getElementById('prot-goal').value;
  
  if (!weight || weight < 30) {
    alert('Indtast din vægt');
    return;
  }
  
  var min, max, info;
  
  if (goal === 'sedentary') {
    min = 0.8; max = 1.0;
    info = 'Hvis du ikke træner, har du ikke brug for meget protein. Spis en varieret kost med kød, fisk, æg og bælgfrugter.';
  } else if (goal === 'active') {
    min = 1.0; max = 1.2;
    info = 'Let aktiv betyder at du træner 1-3 gange om ugen. Du har brug for lidt mere protein end en stillesiddende person.';
  } else if (goal === 'maintenance') {
    min = 1.2; max = 1.6;
    info = 'Styrketræner du for at holde din muskelmasse, skal du have lidt mere protein for at undgå muskelnedbrydning.';
  } else if (goal === 'building') {
    min = 1.6; max = 2.2;
    info = 'For at bygge muskler skal du have ekstra protein. Fordel det over 3-5 måltider med 20-40 g per måltid. Læs vores [styrketræningsguide](/blog/hvad-er-styrketræning).';
  } else if (goal === 'cutting') {
    min = 2.2; max = 2.8;
    info = 'Når du vil tabe fedt og beholde muskler, skal du have meget protein. Det hjælper med at bevare muskelmassen i et [kalorieunderskud](/ordbog/hvad-er-kalorieunderskud).';
  }
  
  var minG = Math.round(weight * min);
  var maxG = Math.round(weight * max);
  
  document.getElementById('protein-target').innerHTML = 
    '<div style="font-size:0.9rem;color:#64748b;margin-bottom:0.25rem">Dit daglige proteinbehov:</div>' +
    '<span style="font-size:3rem;font-weight:900;color:#22c55e">' + minG + '-' + maxG + '</span>' +
    '<span style="font-size:1.2rem;color:#64748b"> g protein</span>';
  
  document.getElementById('protein-info').innerHTML = 
    '<p style="margin-top:1rem;color:#475569">' + info + '</p>';
  
  // Examples
  var chicken = Math.round(maxG / 31 * 100);
  var eggs = Math.round(maxG / 6);
  var powder = Math.round(maxG / 80 * 100);
  
  document.getElementById('protein-sources').innerHTML = 
    '<div style="margin-top:1.5rem;padding:1rem;background:#fff;border-radius:8px;border:1px solid #e2e8f0;text-align:left">' +
    '<h3 style="font-size:1rem;font-weight:700;margin-bottom:0.5rem">Sådan får du ' + maxG + ' g protein:</h3>' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Kylling:</span><strong>' + chicken + ' g</strong></div>' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Æg (ca. 6 g pr. æg):</span><strong>' + eggs + ' æg</strong></div>' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Proteinpulver:</span><strong>' + powder + ' g</strong></div>' +
    '</div>';
  
  document.getElementById('protein-result').style.display = 'block';
}
</script>

<style>
.calc-inputs{display:flex;flex-direction:column;gap:0.75rem;max-width:400px;margin:0 auto;padding:2rem;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0}
.calc-inputs label{font-weight:700;font-size:0.9rem;color:#0f172a}
.calc-inputs input,.calc-inputs select{padding:0.75rem 1rem;border-radius:8px;border:2px solid #e2e8f0;font-size:1rem;outline:none;background:#fff}
.calc-inputs input:focus,.calc-inputs select:focus{border-color:#22c55e}
.calc-inputs button{background:#22c55e;color:#fff;padding:0.875rem 2rem;border-radius:50px;border:none;font-weight:800;font-size:1rem;cursor:pointer;margin-top:0.5rem}
.calc-inputs button:hover{background:#16a34a}
.calc-result{text-align:center;padding:2rem;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-top:1.5rem}
</style>