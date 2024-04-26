import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
const isObjectempty=(obj)=>{
  return Object.keys(obj).length===0
}

function App() {
  const [searchInput,setSearchInput] = useState('')
  const [pokemondata,setPokemondata]=useState({})
  useEffect(  ()=>{
    const data= setTimeout(()=>{
        console.log("search input",searchInput)
    },500)
    axios.get(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
    .then((res)=>{
     setPokemondata(res.data);
     console.log(pokemondata);
    })
    return() => clearTimeout(data)
  },[searchInput])

  return (
    
     <main className=' bg-zinc-700 text-white w-screen h-screen '> 
     <h1 className=' text-center text-3xl font-extrabold p-4'>Search and get details of yor favorite pokemon</h1>
     <div className=' flex  flex-col items-cente m-3'>
       <input type="search" placeholder='Enter your pokemon name'  className=' p-2 rounded-lg mx-auto w-[40vw] focus:outline-none text-black ' value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} />
     </div>
     <div className=''>
      {
        
        <div>
          <div className=' mx-auto w-fit flex flex-col items-center justify-center '>
            { 
          pokemondata?.sprites === undefined   ? <div>
              <h1 className=' p-6 text-3xl font-bold'>{
                searchInput === "" ? "Enter pokemon name to search details about it ":" Cannot find given pokemon"
              } </h1>
            </div>
            :
             <div className=' flex flex-col items-center justify-center bg-purple-400 p-6 rounded-lg'>
              <img src={pokemondata?.sprites?.front_default} alt="pokemon-image"  className= ' w-52  ' />
              <div>
              <p className=' text-center font-semibold text-lg' >{` Base experience: ${pokemondata?.base_experience}`}</p>
              <p className=' text-center font-semibold text-lg'>{`Name:${pokemondata?.forms[0]?.name}`}</p>
              <p className='text-center font-semibold text-lg inline' >{`Encounter Location:`}</p> <span className='text-center font-semibold text-lg text-blue-600'>{`${pokemondata?.location_area_encounters}`}</span>
              <p className=' text-center font-semibold text-lg'>{`Height:${pokemondata?.height}`}</p>
              </div>
            </div>
            }
          </div>  
        </div>
      }
     </div>
     </main>
    
  )
}

export default App
