---
title: "Kalorieberegner"
description: "Beregn dit daglige kaloriebehov (TDEE) gratis. Indtast din vægt, højde, alder og aktivitetsniveau og få antal kalorier til vedligeholdelse, vægttab eller muskelopbygning."
pubDate: 2026-08-04
author: "Karsten Hansen"
category: "Værktøj"
---

# Kalorieberegner

Beregn hvor mange kalorier du skal have på en dag. Det tager 10 sekunder.

<div id="kcal-calculator">
  <div class="calc-inputs">
    <label for="kcal-gender">Køn</label>
    <select id="kcal-gender">
      <option value="male">Mand</option>
      <option value="female">Kvinde</option>
    </select>
    
    <label for="kcal-age">Alder</label>
    <input type="number" id="kcal-age" placeholder="30" min="15" max="100" />
    
    <label for="kcal-height">Højde (cm)</label>
    <input type="number" id="kcal-height" placeholder="180" min="100" max="250" />
    
    <label for="kcal-weight">Vægt (kg)</label>
    <input type="number" id="kcal-weight" placeholder="80" min="30" max="300" />
    
    <label for="kcal-activity">Aktivitetsniveau</label>
    <select id="kcal-activity">
      <option value="1.2">Stillesiddende (ingen træning)</option>
      <option value="1.375">Let aktiv (1-3 dage/uge)</option>
      <option value="1.55" selected>Moderat aktiv (3-5 dage/uge)</option>
      <option value="1.725">Meget aktiv (6-7 dage/uge)</option>
      <option value="1.9">Ekstremt aktiv (hård træning + fysisk arbejde)</option>
    </select>
    
    <label for="kcal-goal">Mål</label>
    <select id="kcal-goal">
      <option value="cut">Vægttab (spise 500 kcal under TDEE)</option>
      <option value="maintain" selected>Vedligeholdelse (spise ved TDEE)</option>
      <option value="bulk">Muskelopbygning (spise 300 kcal over TDEE)</option>
    </select>
    
    <button id="kcal-calc" onclick="calculateKcal()">Beregn kaloriebehov</button>
  </div>
  
  <div id="kcal-result" class="calc-result" style="display:none">
    <div class="kcal-value" id="kcal-target"></div>
    <div class="kcal-breakdown" id="kcal-breakdown"></div>
    <div class="kcal-macros" id="kcal-macros"></div>
  </div>
</div>

## Hvad er TDEE?

TDEE står for Total Daily Energy Expenditure. Det er det samlede antal kalorier din krop forbrænder på en dag. Kender du dit TDEE, ved du præcis hvor meget du skal spise for at tabe dig, holde vægten eller bygge muskler.

Læs mere i vores [TDEE ordbog](/ordbog/hvad-er-tdee).

## Sådan bruger du resultatet

**Vil du tabe dig?** Spis 300-500 kalorier under dit TDEE. Det giver et [vægttab](/blog/10-punkter-til-et-hurtigt-vaegttab) på ca. 0,5 kg pr. uge.

**Vil du bygge muskler?** Spis 300-500 kalorier over dit TDEE. Kombiner med [styrketræning](/blog/hvad-er-styrketræning) og sørg for at få nok [protein](/blog/proteinpulver-fakta).

**Vil du holde vægten?** Spis præcis ved dit TDEE.

## Makroer

Når du kender dit kaloriebehov, kan du fordele det på de tre [makronæringsstoffer](/ordbog/hvad-er-makronæringsstoffer): protein, kulhydrat og fedt. En god start for en der styrketræner er 30% protein, 45% kulhydrat og 25% fedt.

Brug også vores [BMI beregner](/tools/bmi-beregner) til at tjekke om din nuværende vægt er sund.

<script is:inline>
function calculateKcal() {
  var age = parseInt(document.getElementById('kcal-age').value);
  var height = parseFloat(document.getElementById('kcal-height').value);
  var weight = parseFloat(document.getElementById('kcal-weight').value);
  var gender = document.getElementById('kcal-gender').value;
  var activity = parseFloat(document.getElementById('kcal-activity').value);
  var goal = document.getElementById('kcal-goal').value;
  
  if (!age || !height || !weight) {
    alert('Udfyld alle felter');
    return;
  }
  
  // Mifflin-St Jeor formula
  var bmr;
  if (gender === 'male') {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  
  var tdee = Math.round(bmr * activity);
  var target;
  var goalText;
  
  if (goal === 'cut') {
    target = tdee - 500;
    goalText = 'Vægttab';
  } else if (goal === 'bulk') {
    target = tdee + 300;
    goalText = 'Muskelopbygning';
  } else {
    target = tdee;
    goalText = 'Vedligeholdelse';
  }
  
  // Macros: 30% protein, 45% carbs, 25% fat
  var proteinCal = target * 0.30;
  var carbCal = target * 0.45;
  var fatCal = target * 0.25;
  var proteinG = Math.round(proteinCal / 4);
  var carbG = Math.round(carbCal / 4);
  var fatG = Math.round(fatCal / 9);
  
  document.getElementById('kcal-target').innerHTML = 
    '<div style="font-size:0.9rem;color:#64748b;margin-bottom:0.25rem">Dit daglige kaloriebehov til ' + goalText.toLowerCase() + ':</div>' +
    '<span style="font-size:3rem;font-weight:900;color:#22c55e">' + target + '</span>' +
    '<span style="font-size:1.2rem;color:#64748b"> kcal</span>';
  
  document.getElementById('kcal-breakdown').innerHTML = 
    '<div style="margin-top:1.5rem;padding:1rem;background:#fff;border-radius:8px;border:1px solid #e2e8f0">' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>BMR (hvileforbrænding):</span><strong>' + Math.round(bmr) + ' kcal</strong></div>' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>TDEE (samlet forbrug):</span><strong>' + tdee + ' kcal</strong></div>' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Mål (' + goalText + '):</span><strong style="color:#22c55e">' + target + ' kcal</strong></div>' +
    '</div>';
  
  document.getElementById('kcal-macros').innerHTML = 
    '<div style="margin-top:1rem;padding:1rem;background:#fff;border-radius:8px;border:1px solid #e2e8f0">' +
    '<h3 style="font-size:1rem;font-weight:700;margin-bottom:0.5rem">Makroer (30/45/25)</h3>' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Protein:</span><strong>' + proteinG + ' g</strong></div>' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Kulhydrat:</span><strong>' + carbG + ' g</strong></div>' +
    '<div style="display:flex;justify-content:space-between;padding:0.25rem 0"><span>Fedt:</span><strong>' + fatG + ' g</strong></div>' +
    '</div>';
  
  document.getElementById('kcal-result').style.display = 'block';
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