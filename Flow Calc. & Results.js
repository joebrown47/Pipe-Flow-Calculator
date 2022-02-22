// Listen for submit
document.getElementById('flow-form').addEventListener('submit', function(e){
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  setTimeout(calculateResults, 2000);

  e.preventDefault();

});

// Calculate Results
function calculateResults(){
  console.log('calculating..');

  // UI Variables
  const diameter = document.getElementById('diameter');
  const pipeLength = document.getElementById('length');
  const roughness = document.getElementById('roughness');
  const velocity = document.getElementById('velocity');
  const density = document.getElementById('density');
  const viscosity = document.getElementById('viscosity');
  const reynoldsNumber = document.getElementById('reynolds-number');
  const flowType = document.getElementById('flow-type');
  const frictionalHeadLoss = document.getElementById('frictional-head-loss');
  const relativeRoughness = document.getElementById('rel-roughness');
  const frictionFactor = document.getElementById('friction-factor');

  const principalDiameter = parseFloat(diameter.value);
  const principalVelocity = parseFloat(velocity.value);
  const principalDensity = parseFloat(density.value);
  const principalViscosity = parseFloat(viscosity.value);
  const principalRoughness = parseFloat(roughness.value);
  const principalPipeLength = parseFloat(pipeLength.value);

  // Calculate Reynolds Number
  const calculatedReynoldsNumber = (principalDiameter*principalVelocity*principalDensity)/(principalViscosity);

  // Calculate Relative Roughness, e
  const rel = (principalRoughness)/(principalDiameter*1000);

  // Calculate Friction Factor for Laminar flow
  const fLaminar = (64/calculatedReynoldsNumber);

  // Calculate Frictional Head Loss for Laminar flow
  const vSquared = Math.pow(principalVelocity, 2);
  const laminarFrictionHeadLoss = (fLaminar*principalPipeLength*vSquared)/(principalDiameter*2*9.81);

  // Organize and display results
  if(calculatedReynoldsNumber >= 2300 && calculatedReynoldsNumber <= 4000){
    reynoldsNumber.value = calculatedReynoldsNumber.toFixed(2);
    flowType.value = 'Transitional';
    frictionalHeadLoss.value = '';
    relativeRoughness.value = rel;

    // Enable friction factor input
    frictionFactor.value = '';
    document.getElementById('friction-factor').disabled = false;
    document.getElementById('friction-factor').placeholder = 'Use Moody Chart to find value';

    // Show results and calculate button
    document.getElementById('results').style.display = 'block';
    document.getElementById('button').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

    // Display message
    showMessage('Transitional Flow, input the Friction Factor below and calculate again to find Frictinal Head Loss');
  
  } else if(calculatedReynoldsNumber < 2300) {
    reynoldsNumber.value = calculatedReynoldsNumber.toFixed(2);
    flowType.value = 'Laminar';
    frictionalHeadLoss.value = laminarFrictionHeadLoss.toFixed(2);
    relativeRoughness.value = rel;
    frictionFactor.value = fLaminar.toFixed(4);

    // Show results but hide calculate button and loader
    document.getElementById('results').style.display = 'block';
    document.getElementById('button').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
 
  } else if(calculatedReynoldsNumber > 4000){
    reynoldsNumber.value = calculatedReynoldsNumber.toFixed(2);
    flowType.value = 'Turbulent';
    frictionalHeadLoss.value = '';
    relativeRoughness.value = rel;

    // Enable friction factor input
    frictionFactor.value = '';
    document.getElementById('friction-factor').disabled = false;
    document.getElementById('friction-factor').placeholder = 'Use Moody Chart to find value';

    // Show results and calculate button
    document.getElementById('results').style.display = 'block';
    document.getElementById('button').style.display = 'block';

    // Hide loader
    document.getElementById('loading').style.display = 'none';

    // Display message
    showMessage('Turbulent Flow, input the Friction Factor below and calculate again to find Frictional Head Loss');

  } else {
    // Hide loader
    document.getElementById('loading').style.display = 'none';

    showMessage('Please check your numbers');
  }
}

// Show Message
function showMessage(message){
  // Create a div
  const messageDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('#results');

  // Add class
  messageDiv.idName = 'message';
  messageDiv.className = 'alert alert-danger';

  // Create text node and append to div
  messageDiv.appendChild(document.createTextNode(message));

  // Insert message above heading
  card.insertBefore(messageDiv, heading);

  // Clear message after 5 seconds
  setTimeout(clearMessage, 60000);
}

// Clear message
function clearMessage(){
  document.querySelector('.alert').remove();
}



// // Listen for Second submit
// document.getElementById('button').addEventListener('submit', function(x){

// // Calculate Results Again
//   console.log('Further Calculating...');
//   // UI Variables
//   const frictionFactor = document.getElementById('friction-factor');
//   const principalFrictionFactor = parseFloat(frictionFactor.value);

//   // Calculate Frictional Head Loss
//   const headLoss = (principalFrictionFactor*principalPipeLength*vSquared)/(principalDiameter*2*9.81);

//   // Complete Results
//   if(calculatedReynoldsNumber < 2300){
//     reynoldsNumber.value = calculatedReynoldsNumber.toFixed(2);
//     flowType.value = 'Laminar';
//     frictionalHeadLoss.value = laminarFrictionHeadLoss.toFixed(2);
//     relativeRoughness.value = rel;

//   } else if(calculatedReynoldsNumber > 4000){
//     reynoldsNumber.value = calculatedReynoldsNumber.toFixed(2);
//     flowType.value = 'Turbulent';
//     frictionalHeadLoss.value = headLoss.toFixed(2);
//     relativeRoughness.value = rel;

//   } else {
//     reynoldsNumber.value = calculatedReynoldsNumber.toFixed(2);
//     flowType.value = 'Transitional';
//     frictionalHeadLoss = headLoss.toFixed(2);
//     relativeRoughness.value = rel;
//   }

//   x.preventDefault();

// });