const { fifaData } = require('./fifa.js')

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

//(a) Home Team name for 2014 world cup final
const homeTeam2014 = fifaData.filter(a => {return a.Year === 2014})
const homeTeam2014Names = homeTeam2014.map(a =>{return a['Home Team Name']})
//console.log(homeTeam2014Names)

//(b) Away Team name for 2014 world cup final
const awayTeam2014Names = homeTeam2014.map(a =>{return a['Away Team Name']})
//console.log(awayTeam2014Names)

//(c) Home Team goals for 2014 world cup final
const homeTeam2014Goals = homeTeam2014.map(a =>{return a['Home Team Goals']})
//console.log(homeTeam2014Goals)

//(d) Away Team goals for 2014 world cup final
const awayTeam2014Goals = homeTeam2014.map(a =>{return a['Away Team Goals']})
//console.log(awayTeam2014Goals)

//(e) Winner of 2014 world cup final */
const totalHomeTeam2014Goals = homeTeam2014Goals.reduce((a,b)=> {return a + b})
//console.log(totalHomeTeam2014Goals)
const totalAwayTeam2014Goals = awayTeam2014Goals.reduce((a,b)=> {return a + b})
//console.log(totalAwayTeam2014Goals)

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use getFinals to do the following:
1. Receive data as a parameter
2. Return an array of objects with the data of the teams that made it to the final stage

hint - you should be looking at the stage key inside of the objects
*/

function getFinals(data) {
   return data.filter(a=> {return a.Stage === 'Final'})
}

//console.log(getFinals(fifaData))


/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function called getYears to do the following: 
1. Receive an array
2. Receive a callback function getFinals from task 2 
3. Return an array called years containing all of the years in the getFinals data set*/

function getYears(myArr, callback) {
    /* code here */
    const years = callback(myArr).map(a =>{return a.Year})
    return years
}

//console.log(getYears(fifaData,getFinals))



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher-order function getWinners to do the following:  
1. Receives an array
2. Receives the callback function getFinals from task 2 
3. Determines the winner (home or away) of each `finals` game. 
4. Returns the names of all winning countries in an array called `winners` */ 

function getWinners(myArr, callback) {
    /* code here */
    const winner = callback(myArr).map(a => a["Home Team Goals"] > a["Away Team Goals"] ? a["Home Team Name"] : a["Away Team Name"])
    return winner
}

//console.log(getWinners(fifaData, getFinals))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Use the higher-order function getWinnersByYear to do the following:
1. Receive an array
2. Receive a callback function getFinals from task 2
3. Receive a callback function getYears from task 3
4. Receive a callback function getWinners from task 4
5. Return an array of strings that say "In {year}, {country} won the world cup!" 

hint: the strings returned need to exactly match the string in step 4.
 */

function getWinnersByYear(myArr,finals,years,winners) {
    /* code here */
    const countries = winners(myArr,finals)
    const time = years(myArr,finals)
    const text = []
    for(let x in countries){
       text.push(`In ${time[x]}, ${countries[x]} won the world cup!`)
    }
    return text
}

//console.log(getWinnersByYear(fifaData, getFinals, getYears, getWinners))

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Use the higher order function getAverageGoals to do the following: 
 1. Receive the callback function getFinals from task 2 ensure you pass in the data as an argument
 2. Return the the average number of the total home team goals and away team goals scored per match and round to the second decimal place. 
 
 (Hint: use .reduce and do this in 2 steps) 
 
 Example of invocation: getAverageGoals(getFinals(fifaData));
*/

function getAverageGoals(finals) {
   /* code here */
   const home = (finals.reduce((a,b) => {return a + b["Home Team Goals"]+ b["Away Team Goals"]},0)/finals.length).toFixed(2)
   return (home.toString())
}

getAverageGoals(getFinals(fifaData))


/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data,initial) {
    let myData = data.map(a => a["Home Team Goals"] > a["Away Team Goals"] ? [a["Home Team Name"] , a["Home Team Initials"]] : [a["Away Team Name"], a["Away Team Initials"]])
    //console.log(myData)
    let count = 0
    for(let x in myData){
        if(myData[x][1] == initial){
            count+=1
        }
    }
    return console.log(count)
}


//getCountryWins(fifaData,"URU")

/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data) {

    let myData = data.filter(a => a["Stage"] === "Final").map(a => [a["Home Team Name"],a["Home Team Goals"],a["Away Team Name"], a["Away Team Goals"]])
    //console.log(myData)
    let goals = {}
    let highest = 0
    
    for(let x in myData){//create new object with country, goals, count and average
        //console.log(myData[x][0])
        if(goals[myData[x][0]] === undefined){ //create new obj with goals, count, avg if country does not exist
            goals[myData[x][0]] = {"Goals": myData[x][1],"Count": 1,"Avg": myData[x][1]}
        }else{//increment goal, count, calc avg
            goals[myData[x][0]]["Goals"] += myData[x][1]
            goals[myData[x][0]]['Count'] += 1
            goals[myData[x][0]]['Avg'] = (goals[myData[x][0]]["Goals"]/goals[myData[x][0]]['Count']).toFixed(2)
        }
        if(goals[myData[x][2]] === undefined){
            goals[myData[x][2]] = {"Goals": myData[x][3], "Count": 1,"Avg": myData[x][3]}
        }else{
            goals[myData[x][2]]["Goals"] += myData[x][3]
            goals[myData[x][2]]['Count'] += 1
            goals[myData[x][2]]['Avg'] = (goals[myData[x][2]]["Goals"]/goals[myData[x][2]]['Count']).toFixed(2)
        }
     }
     let win
     for(let y in goals){//loop for highest avg
        if(goals[y]["Avg"]>highest){
            win = y
            highest = goals[y]["Avg"]
        }
    }
    //console.log(goals)
    return win

}

//console.log(getGoals(fifaData))

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(data) {

    let myData = data.filter(a => a["Stage"] === "Final").map(a => [a["Home Team Name"], a["Home Team Goals"], a["Away Team Name"], a["Away Team Goals"]])
    console.log(myData)
    let defense = {}
    for(let x in myData){
        if(defense[myData[x][0]] === undefined){
            defense[myData[x][0]] = {'Goals Against': myData[x][3], 'Count': 1, "Avg": myData[x][3]}
        }else{
            defense[myData[x][0]]['Goals Against'] += myData[x][3]
            defense[myData[x][0]]['Count'] += 1
            defense[myData[x][0]]['Avg'] = (defense[myData[x][0]]['Goals Against']/defense[myData[x][0]]['Count']).toFixed(2)
        }
        if(defense[myData[x][2]] === undefined){
            defense[myData[x][2]] = {'Goals Against': myData[x][1], 'Count': 1, "Avg": myData[x][1]}
        }else{
            defense[myData[x][2]]['Goals Against'] += myData[x][1]
            defense[myData[x][2]]['Count'] += 1
            defense[myData[x][2]]['Avg'] = (defense[myData[x][2]]['Goals Against']/defense[myData[x][2]]['Count']).toFixed(2)
            
        }
    }
    console.log(defense)
}

badDefense(fifaData)

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
foo();
module.exports = {
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}
