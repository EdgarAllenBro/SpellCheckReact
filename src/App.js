import React,{useState,useEffect} from 'react'
import './App.css';

function App() {
  const [spells, setSpells] = useState([])
  const [filteredSpells,setFilter] = useState([])
  const [details,setDetails] = useState([])
  const [spellName,setSpellName] = useState('')
const filter = (event)=>{
  let name = event.target.value
setFilter(spells.filter(spell => spell.includes(name.charAt(0).toUpperCase()+name.slice(1))))
} 

useEffect(()=>{
fetch('https://www.dnd5eapi.co/api/spells')
      .then(res=>res.json())
      .then((data)=> {
        let spellNames = []
        data.results.forEach((e)=>{
          spellNames.push(e.name)
        })
        setSpells(spellNames)
      }).catch(err=>console.log(err))
    },[])
const searchFor = (event)=>{
  const search = event.target.innerHTML.toLowerCase().replace(/\s/g,'-').replace(/\//g,'-')
  fetch(`https://www.dnd5eapi.co/api/spells/${search}`)
  .then(res => res.json())
  .then(results => { 
    setDetails(results.desc)
    setSpellName(results.name)
  })
}

return(
  <div >
  <h1>spell list</h1>
  <input onChange={filter} placeholder='Search' type='text'/>
  <div id='book'>
    <div className='spellsBox'>
  {filteredSpells.map((e,i)=>{
    return <p className='spell' onClick={searchFor} key={i}>{e}</p>
  })}
    </div>
    <div className='detailsBox'>
  <h2>{spellName}</h2>
  <p>{details}</p>
    </div>
  </div>
  </div>
)
}


export default App;
