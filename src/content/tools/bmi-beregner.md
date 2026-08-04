---
title: "BMI beregner"
description: "Beregn dit BMI (Body Mass Index) hurtigt og nemt. Indtast din højde og vægt og få resultatet med det samme. Forstå hvad dit BMI betyder for din træning."
pubDate: 2026-08-04
author: "Karsten Hansen"
category: "Værktøj"
---

# BMI beregner

Beregn dit BMI på sekundert. Indtast din højde og vægt herunder.

<div id="bmi-calculator">
  <div class="calc-inputs">
    <label for="bmi-height">Højde (cm)</label>
    <input type="number" id="bmi-height" placeholder="180" min="100" max="250" />
    
    <label for="bmi-weight">Vægt (kg)</label>
    <input type="number" id="bmi-weight" placeholder="80" min="30" max="300" />
    
    <button id="bmi-calc" onclick="calculateBMI()">Beregn BMI</button>
  </div>
  
  <div id="bmi-result" class="calc-result" style="display:none">
    <div class="bmi-number" id="bmi-value"></div>
    <div class="bmi-category" id="bmi-category"></div>
    <div class="bmi-scale" id="bmi-scale"></div>
    <div class="bmi-info" id="bmi-info"></div>
  </div>
</div>

## Hvad er BMI?

BMI står for Body Mass Index. Det er et tal der viser forholdet mellem din vægt og din højde. Det giver dig et hurtigt overblik over om du er undervægtig, normalvægtig eller overvægtig.

**BMI er ikke det samme som fedtprocent.** Det fortæller dig ikke hvor meget af din kropsvægt der er muskler vs fedt. En [styrketræner](/blog/hvad-er-styrketræning) med 100 kg og 10% fedtprocent vil have et BMI i overvægts-kategorien, men er tydeligvis ikke overvægtig.

## Sådan beregnes BMI

Formlen er simpel:

**BMI = vægt (kg) / (højde (m) × højde (m))**

Eksempel: En person på 80 kg og 180 cm:
BMI = 80 / (1,80 × 1,80) = 24,7

## BMI skalaen

| BMI | Kategori | Hvad det betyder |
|---|---|---|
| Under 18,5 | Undervægt | Du kan have brug for at tage på |
| 18,5 - 24,9 | Normalvægt | Din vægt er sund |
| 25 - 29,9 | Overvægt | Du kan have gavn af et [vægttab](/blog/10-punkter-til-et-hurtigt-vaegttab) |
| Over 30 | Svær overvægt | Tal med din læge om en plan |

## Begrænsninger ved BMI

BMI er et groft mål. Det virker bedst for folk med et gennemsnitligt muskeliveau. Hvis du [styrketræner](/blog/hvad-er-styrketræning) meget, vil dit BMI sandsynligvis være for højt, fordi muskler vejer mere end fedt.

En bedre måde at vurdere din kropssammensætning er at måle din [fedtprocent](/ordbog/hvad-er-fedtprocent). Det fortæller dig hvor meget af din vægt der faktisk er fedt vs muskler.

Hvis du vil tabe dig, er det vigtigt at kende dit daglige kaloriebehov. Brug vores [kalorieberegner](/tools/kalorieberegner) til at regne det ud.

<script is:inline>
function calculateBMI() {
  var height = parseFloat(document.getElementById('bmi-height').value);
  var weight = parseFloat(document.getElementById('bmi-weight').value);
  
  if (!height || !weight || height < 100 || weight < 30) {
    alert('Indtast venligst gyldig højde og vægt');
    return;
  }
  
  var heightM = height / 100;
  var bmi = weight / (heightM * heightM);
  var bmiRounded = Math.round(bmi * 10) / 10;
  
  var category, color, info;
  
  if (bmi < 18.5) {
    category = 'Undervægt';
    color = '#3b82f6';
    info = 'Dit BMI er under det normale område. Hvis du ønsker at tage på, kan du overveje at spise i et lille kalorieoverskud. Tal med din læge hvis du er bekymret.';
  } else if (bmi < 25) {
    category = 'Normalvægt';
    color = '#22c55e';
    info = 'Dit BMI er i det sunde område. Fortsæt med at træne og spise sundt. Hvis du vil bygge muskler, så tjek vores [styrketræningsguide](/blog/hvad-er-styrketræning).';
  } else if (bmi < 30) {
    category = 'Overvægt';
    color = '#f59e0b';
    info = 'Dit BMI er over det normale område. Et moderat [vægttab](/blog/10-punkter-til-et-hurtigt-vaegttab) på 0,5-1 kg om ugen kan forbedre din sundhed. Start med at beregne dit kaloriebehov.';
  } else {
    category = 'Svær overvægt';
    color = '#ef4444';
    info = 'Dit BMI er højt. Det anbefales at tale med din læge om en plan for vægttab. En kombination af kosttilpasning og motion er effektiv.';
  }
  
  document.getElementById('bmi-value').innerHTML = '<span style="font-size:3rem;font-weight:900;color:' + color + '">' + bmiRounded + '</span>';
  document.getElementById('bmi-category').innerHTML = '<span style="font-size:1.5rem;font-weight:700;color:' + color + '">' + category + '</span>';
  
  // Scale bar
  var scale = '<div style="display:flex;height:12px;border-radius:6px;overflow:hidden;margin:1rem 0">';
  scale += '<div style="width:25%;background:#3b82f6"></div>';
  scale += '<div style="width:25%;background:#22c55e"></div>';
  scale += '<div style="width:25%;background:#f59e0b"></div>';
  scale += '<div style="width:25%;background:#ef4444"></div>';
  scale += '</div>';
  scale += '<div style="position:relative;height:20px">';
  var markerPos = Math.min(Math.max((bmi - 15) / 25 * 100, 0), 100);
  scale += '<div style="position:absolute;left:' + markerPos + '%;transform:translateX(-50%);font-size:1.5rem">▼</div>';
  scale += '</div>';
  scale += '<div style="display:flex;justify-content:space-between;font-size:0.75rem;color:#64748b;margin-top:0.25rem">';
  scale += '<span>15</span><span>18,5</span><span>25</span><span>30</span><span>40</span>';
  scale += '</div>';
  document.getElementById('bmi-scale').innerHTML = scale;
  
  document.getElementById('bmi-info').innerHTML = '<p style="margin-top:1rem;color:#475569">' + info + '</p>';
  document.getElementById('bmi-result').style.display = 'block';
}
</script>

<style>
.calc-inputs{display:flex;flex-direction:column;gap:1rem;max-width:320px;margin:0 auto;padding:2rem;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0}
.calc-inputs label{font-weight:700;font-size:0.9rem;color:#0f172a}
.calc-inputs input{padding:0.75rem 1rem;border-radius:8px;border:2px solid #e2e8f0;font-size:1.1rem;outline:none}
.calc-inputs input:focus{border-color:#22c55e}
.calc-inputs button{background:#22c55e;color:#fff;padding:0.875rem 2rem;border-radius:50px;border:none;font-weight:800;font-size:1rem;cursor:pointer;margin-top:0.5rem}
.calc-inputs button:hover{background:#16a34a}
.calc-result{text-align:center;padding:2rem;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-top:1.5rem}
</style>