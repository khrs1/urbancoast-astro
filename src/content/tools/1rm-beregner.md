---
title: "1RM beregner"
description: "Beregn din 1RM (one-repetition maximum) ud fra en vægt og antal repetitioner. Se også hvor mange kilo du skal bruge ved forskellige procentdele af din max."
pubDate: 2026-08-04
author: "Karsten Hansen"
category: "Værktøj"
---

# 1RM beregner

Vil du vide hvor meget du kan løfte én gang? Indtast en vægt du kan løfte flere gange og se din estimerede 1RM.

<div id="onerm-calculator">
  <div class="calc-inputs">
    <label for="onerm-weight">Vægt løftet (kg)</label>
    <input type="number" id="onerm-weight" placeholder="80" min="1" max="1000" />
    
    <label for="onerm-reps">Antal repetitioner</label>
    <input type="number" id="onerm-reps" placeholder="5" min="1" max="20" />
    
    <button id="onerm-calc" onclick="calculate1RM()">Beregn 1RM</button>
  </div>
  
  <div id="onerm-result" class="calc-result" style="display:none">
    <div id="onerm-value"></div>
    <div id="onerm-table"></div>
  </div>
</div>

## Hvad er 1RM?

1RM står for one-repetition maximum. Det er den tungeste vægt du kan løfte præcis én gang med korrekt [teknik](/blog/bænkpres) i en given øvelse.

Det er den mest præcise måde at måle din styrke på. Mange [styrketræningsprogrammer](/blog/hvad-er-styrketræning) angiver vægten som en procentdel af din 1RM. Læs mere i vores [1RM ordbog](/ordbog/hvad-er-1rm).

## Hvordan beregnes 1RM?

Den mest præcise metode er at teste det direkte i træningscenteret. Men det kræver en spotter og god teknik.

En mere sikker metode er at bruge Epley-formlen:

**1RM = vægt × (1 + 0,0333 × antal repetitioner)**

Eksempel: Kan du [bænkpresse](/blog/bænkpres) 80 kg i 5 repetitioner, er din estimerede 1RM: 80 × (1 + 0,0333 × 5) = 93,4 kg.

## Procentskala

Når du kender din 1RM, kan du planlægge din træning:

| % af 1RM | Repetitioner | Formål |
|---|---|---|
| 95-100% | 1 | Maksimal styrke |
| 85-90% | 3-5 | Styrke |
| 75-80% | 8-10 | Hypertrofi (muskelvækst) |
| 65-70% | 12-15 | Udholdenhed |

Brug også vores [RPE ordbog](/ordbog/hvad-er-rpe) til at justere intensiteten fra dag til dag.

<script is:inline>
function calculate1RM() {
  var weight = parseFloat(document.getElementById('onerm-weight').value);
  var reps = parseInt(document.getElementById('onerm-reps').value);
  
  if (!weight || !reps) {
    alert('Indtast vægt og repetitioner');
    return;
  }
  
  if (reps > 20) {
    alert('For mere end 20 repetitioner bliver beregningen upræcis');
    return;
  }
  
  // Epley formula
  var onerm = weight * (1 + 0.0333 * reps);
  var onermRounded = Math.round(onerm);
  
  document.getElementById('onerm-value').innerHTML = 
    '<div style="font-size:0.9rem;color:#64748b;margin-bottom:0.25rem">Din estimerede 1RM:</div>' +
    '<span style="font-size:3rem;font-weight:900;color:#22c55e">' + onermRounded + '</span>' +
    '<span style="font-size:1.2rem;color:#64748b"> kg</span>';
  
  // Percentage table
  var percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55];
  var reps = [1, 2, 4, 6, 8, 10, 12, 15, 18, 20];
  
  var table = '<div style="margin-top:1.5rem;padding:1rem;background:#fff;border-radius:8px;border:1px solid #e2e8f0;text-align:left">';
  table += '<h3 style="font-size:1rem;font-weight:700;margin-bottom:0.5rem">Træningstabel</h3>';
  table += '<table style="width:100%;border-collapse:collapse">';
  table += '<tr style="border-bottom:1px solid #e2e8f0"><th style="text-align:left;padding:0.3rem 0">%</th><th style="text-align:right;padding:0.3rem 0">Vægt</th><th style="text-align:right;padding:0.3rem 0">Ca. reps</th></tr>';
  
  for (var i = 0; i < percentages.length; i++) {
    var kg = Math.round(onerm * percentages[i] / 100);
    table += '<tr style="border-bottom:1px solid #f1f5f9"><td style="padding:0.3rem 0">' + percentages[i] + '%</td><td style="text-align:right;padding:0.3rem 0;font-weight:700">' + kg + ' kg</td><td style="text-align:right;padding:0.3rem 0;color:#64748b">' + reps[i] + '</td></tr>';
  }
  
  table += '</table></div>';
  
  document.getElementById('onerm-table').innerHTML = table;
  document.getElementById('onerm-result').style.display = 'block';
}
</script>

<style>
.calc-inputs{display:flex;flex-direction:column;gap:0.75rem;max-width:400px;margin:0 auto;padding:2rem;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0}
.calc-inputs label{font-weight:700;font-size:0.9rem;color:#0f172a}
.calc-inputs input{padding:0.75rem 1rem;border-radius:8px;border:2px solid #e2e8f0;font-size:1rem;outline:none}
.calc-inputs input:focus{border-color:#22c55e}
.calc-inputs button{background:#22c55e;color:#fff;padding:0.875rem 2rem;border-radius:50px;border:none;font-weight:800;font-size:1rem;cursor:pointer;margin-top:0.5rem}
.calc-inputs button:hover{background:#16a34a}
.calc-result{text-align:center;padding:2rem;background:#f8fafc;border-radius:12px;border:1px solid #e2e8f0;margin-top:1.5rem}
</style>