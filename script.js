document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('rollButton').addEventListener('click', rollDice);
    document.getElementById('rerollButton').addEventListener('click', reroll10s);
    document.getElementById('resetButton').addEventListener('click', resetAll);
});

function rollDice() {
    var numDice = parseInt(document.getElementById('numDice').value);
    var numPicked = parseInt(document.getElementById('numPicked').value);
    //console.log("num picked" + numPicked);
    var results = [];
    var rerollResults = [];
    for (var i = 0; i < numDice; i++) {
        var roll = Math.floor(Math.random() * 10) + 1;
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
        if (rerollResults.length > numPicked) {
            rerollResults = rerollResults.slice(0, numPicked);
        }
        document.getElementById('rerollArea').style.display = 'block';
        document.getElementById('rerollResults').innerHTML = "Rerolling: " + rerollResults.join(', ');
        //console.log("Reroll results: " + rerollResults);
        
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
    
    var totalBeforeReroll = parseInt(document.getElementById('totalBeforeReroll').innerText);
    //var rerollResults = document.getElementById('rerollResults').innerHTML;
    var newTotal = totalBeforeReroll;
    console.log("first check "+ newTotal);
    
    for (var j = 0; j < newRerolls.length; j++) {
        newTotal += parseInt(newRerolls[j]);
        console.log("second check "+ newTotal);
    }
    
    document.getElementById('totalAfterReroll').innerText = newTotal;
}

function reroll10s() {
    var rerollResults = document.getElementById('rerollResults').innerHTML;
    rerollResults = rerollResults.replace('Rerolling: ', '').split(', ');
    
    var newRerolls = [];
    for (var i = 0; i < rerollResults.length; i++) {
        var reroll = Math.floor(Math.random() * 10) + 1;
        newRerolls.push(reroll);
    }
    
    document.getElementById('rerollResults').innerHTML = "Rerolling: " + newRerolls.join(', ');
    calculateTotalAfterReroll();
}

function resetAll() {
    document.getElementById('numDice').value = '1';
    document.getElementById('diceResults').innerHTML = '';
    document.getElementById('calculationAreaBeforeReroll').style.display = 'none';
    document.getElementById('calculationAreaAfterReroll').style.display = 'none';
    document.getElementById('rerollArea').style.display = 'none';
    document.getElementById('numPicked').value = '1';
    document.getElementById('numPickedAfterReroll').value = '1';
    document.getElementById('numPickedAfterReroll').disabled = true;
    document.getElementById('totalBeforeReroll').innerText = '';
    document.getElementById('totalAfterReroll').innerText = '';
}
