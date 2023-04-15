import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    
    const [tenzies, setTenzies] = React.useState(false)
    
    const[count, setCount] = React.useState(0)
    
    const [trackCount, setTrackCount] =React.useState(count)
    
    React.useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValaue = dice.every(die => die.value === firstValue)
        if(allHeld && allSameValaue){
            setTenzies(true)
        }
     
    },[dice])    

    function generateNewDie(){
        return{
            value: Math.ceil(Math.random() * 6), 
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        //console.log(newDice)
        return newDice
    }
   
 
 
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setCount(addCount => addCount+1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            
            setTrackCount(count)
           
            setCount(0)
           
        }
         console.log(dice)
    }
    //console.log(trackCount)
    
    
 
    const oldData = localStorage.getItem("countData")
    
    localStorage.setItem("countData", trackCount)

    
    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    
    const diceElements = dice.map(die => (
        <Die key ={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)}/>
        ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <p className="count-rolls">Rolls: {count}</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game":"Roll" }</button>
            <p className="current-roll">Current Best: {oldData}</p>
        
        </main>
    )
}