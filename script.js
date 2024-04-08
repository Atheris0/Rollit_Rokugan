document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rollButton').addEventListener('click', rollDice);
    document.getElementById('rerollButton').addEventListener('click', reroll10s);
    document.getElementById('resetButton').addEventListener('click', resetAll);
});

function rollDice() {
    var numDice = parseInt(document.getElementById('numDice').value);
    var numPicked = parseInt(document.getElementById('numPicked').value);
    var results = [];
    var rerollResults = [];
    for (var i = 0; i < numDice; i++) {
        var roll = Math.floor(Math.random() * 10) + 1;
        console.log(roll);
        results.push(roll);
        if (roll === 10) {
            rerollResults.push(roll);
            document.getElementById('calculationAreaAfterReroll').style.display = 'block';
        }
    }
    results.sort(function(a, b) {
        return b - a;
    });
    document.getElementById('diceResults').innerHTML = "Results: " + results.join(', ');
    
    if (rerollResults.length > 0) {
        document.getElementById('rerollArea').style.display = 'block';
        document.getElementById('rerollResults').innerHTML = "Rerolling: " + rerollResults.join(', ');
    } else {
        document.getElementById('rerollArea').style.display = 'none';
    }
    
    document.getElementById('calculationAreaBeforeReroll').style.display = 'block';
    document.getElementById('numPicked').setAttribute('max', numDice);
    document.getElementById('numPicked').disabled = false;
    calculateTotalBeforeReroll();
}

function calculateTotalBeforeReroll() {
    var numPicked = parseInt(document.getElementById('numPicked').value);
    var results = document.getElementById('diceResults').innerHTML;
    results = results.replace('Results: ', '').split(', ');
    
    var totalBeforeReroll = 0;
    for (var i = 0; i < numPicked; i++) {
        totalBeforeReroll += parseInt(results[i]);
    }
    
    document.getElementById('totalBeforeReroll').innerText = totalBeforeReroll;
}

function calculateTotalAfterReroll() {
    var numPickedAfterReroll = parseInt(document.getElementById('numPickedAfterReroll').value);
    var totalBeforeReroll = parseInt(document.getElementById('totalBeforeReroll').innerText);
    var results = document.getElementById('diceResults').innerHTML;
    results = results.replace('Results: ', '').split(', ');
    
    var rerollResults = document.getElementById('rerollResults').innerHTML;
    rerollResults = rerollResults.replace('Rerolling: ', '').split(', ');
    
    var total = totalBeforeReroll;
    
    for (var i = 0; i < numPickedAfterReroll; i++) {
        total += parseInt(results[i]);
    }
    
    for (var j = 0; j < rerollResults.length; j++) {
        total += parseInt(rerollResults[j]);
    }
    
    document.getElementById('totalAfterReroll').innerText = total;
}

function reroll10s() {
    var rerollResults = document.getElementById('rerollResults').innerHTML;
    rerollResults = rerollResults.replace('Rerolling: ', '').split(', ');
    console.log("Rerolling 10s");
    
    var newRerolls = [];
    for (var i = 0; i < rerollResults.length; i++) {
        var reroll = Math.floor(Math.random() * 10) + 1;
        newRerolls.push(reroll);
    }
    
    document.getElementById('rerollResults').innerHTML = "Rerolling: " + newRerolls.join(', ');
}

function resetAll() {
    document.getElementById('numDice').value = '1';
    document.getElementById('diceResults').innerHTML = '';
    document.getElementById('calculationAreaBeforeReroll').style.display = 'none';
    document.getElementById('calculationAreaAfterReroll').style.display = 'none';
    document.getElementById('rerollArea').style.display = 'none';
    document.getElementById('numPicked').value = '1';
    document.getElementById('numPicked').disabled = true;
    document.getElementById('numPickedAfterReroll').value = '1';
    document.getElementById('numPickedAfterReroll').disabled = true;
    document.getElementById('totalBeforeReroll').innerText = '';
    document.getElementById('totalAfterReroll').innerText = '';
}
