const variables = {
    energyCount: 0,
    energyCap: 100,
    energyPerSecond: 1,
    matterCount: 0,
    atomCount: 0,
    moleculeCount: 0,
    galaxyExpansionCount: 0,
    galaxyInflationCount: 0,
    totalCosts: 0
}

const costs = {
    atomCost: 0,
    moleculeCost: 0,
}

let production = 100

const mainContainer = document.querySelector('#mainInterface')
const galaxyContainer = document.querySelector('#galaxyInterface')

let interface = true


function Round(number) {
    return (Math.floor(number))
} 

function addEnergy() {
    if ((variables.energyCount + variables.energyPerSecond) < variables.energyCap) {
        variables.energyCount += variables.energyPerSecond
        production = 100
    }
    else if (variables.energyCount < (variables.energyCap * 2)) {
        variables.energyCount += variables.energyPerSecond/10
        production = 10
    }
    else {
        variables.energyCount += variables.energyPerSecond/100
        production = 1
    }
}

function Update() {
    // Update Costs
    costs.atomCost = 10 * (Math.pow(1.5, variables.atomCount))
    costs.moleculeCost = 50 * (Math.pow(2, variables.moleculeCount))
    costs.galaxyExpansionCost = 5 * (Math.pow(2, variables.galaxyExpansionCount))
    costs.galaxyInflationCost = 2 * (Math.pow(2, variables.galaxyInflationCount))

    // Update Matter
    variables.matterCount = ((variables.atomCount) + (variables.moleculeCount*2))

    // Update HTML
    document.getElementById('energyCount').innerHTML = Round(variables.energyCount)
    document.getElementById('energyCap').innerHTML = variables.energyCap
    document.getElementById('matterCount').innerHTML = variables.matterCount
    document.getElementById('matterCount2').innerHTML = variables.matterCount
    document.getElementById('atomCount').innerHTML = variables.atomCount
    document.getElementById('moleculeCount').innerHTML = variables.moleculeCount
    document.getElementById('energyPerSecond').innerHTML = Round(variables.energyPerSecond)
    document.getElementById('atomMatter').innerHTML = variables.atomCount
    document.getElementById('moleculeMatter').innerHTML = variables.moleculeCount * 2
    document.getElementById('atomCost').innerHTML = Round(costs.atomCost)
    document.getElementById('moleculeCost').innerHTML = Round(costs.moleculeCost)
    document.getElementById('productionPercent').innerHTML = production
    document.getElementById('galaxyExpansionCount').innerHTML = variables.galaxyExpansionCount
    document.getElementById('galaxyInflationCount').innerHTML = variables.galaxyInflationCount
    document.getElementById('totalMatterCount').innerHTML = variables.matterCount
    document.getElementById('totalCosts').innerHTML = variables.totalCosts
}

function createAtom() {
    if (variables.energyCount > costs.atomCost) {
        variables.energyCount -= costs.atomCost
        variables.atomCount++
        Update()
    }
}

function createMolecule() {
    if (variables.energyCount > costs.moleculeCost) {
        variables.energyCount -= costs.moleculeCost
        variables.moleculeCount++
        Update()
    }
}

function createGalaxy() {
    interface = !interface

    if (interface) {
        mainContainer.style.display = 'block'
        galaxyContainer.style.display = 'none'
    }
    else {
        mainContainer.style.display = 'none'
        galaxyContainer.style.display = 'block'
    }
}

function galaxyExpansionUp() {
    variables.galaxyExpansionCount++;
    variables.totalCosts += variables.galaxyExpansionCount
    Update()
}

function galaxyExpansionDown() {
    if (variables.galaxyExpansionCount > 0) {
        variables.totalCosts -= variables.galaxyExpansionCount
        variables.galaxyExpansionCount--;
        Update()
    }
}

function galaxyInflationUp() {
    variables.galaxyInflationCount++;
    variables.totalCosts += variables.galaxyInflationCount
    Update()
}

function galaxyInflationDown() {
    if (variables.galaxyInflationCount > 0) {
        variables.totalCosts -= variables.galaxyInflationCount
        variables.galaxyInflationCount--;
        Update()
    }
}

function galaxyCreation() {
    if (variables.totalCosts <= variables.matterCount) {
        interface = !interface
        variables.atomCount = 0
        variables.moleculeCount = 0
        variables.energyCount = 0
        variables.energyPerSecond = 1 * (Math.pow(1.5, variables.galaxyInflationCount))
        variables.energyCap = Round(100 * (Math.pow(2, variables.galaxyExpansionCount)))
        if (interface) {
            mainContainer.style.display = 'block'
            galaxyContainer.style.display = 'none'
        }
        else {
            mainContainer.style.display = 'none'
            galaxyContainer.style.display = 'block'
        }
    }
}

function save () {
    localStorage.setItem('save', JSON.stringify(variables))
  }

  function load () {
    const savegame = JSON.parse(localStorage.getItem('save'))
    for (const key in savegame) {
      if (savegame[key] !== 'undefined') variables[key] = savegame[key] ?? defaults[key]
    }
    Update()
  }

load()
setInterval(addEnergy, 200)
setInterval(Update, 100)
setInterval(save, 5000)