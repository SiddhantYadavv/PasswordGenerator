import React, { useCallback, useEffect, useRef, useState} from 'react'
import './App.css'


const App = () => {

  const [length,setLength]=useState(8)
  const [characterAllowed,setCharacterAllowed]=useState(false)
  const [numberAllowed,setNumberAllowed]= useState(false)
  const [password,setPassword]= useState("")
  const passwordReference = useRef()

  const passwordGenerator= useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed){
      str += "0123456789"
    }
    if(characterAllowed){
      str+="!@#$%^&*()_+"
    }
    for (let index = 0; index <length; index++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)

  },[length,characterAllowed,numberAllowed])

  useEffect(() => {
    passwordGenerator()
  }, [length,characterAllowed,numberAllowed])
  
  const copyToClipboard = ()=>{
    passwordReference.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  return (

    <div className='main'>
    <div className='mainDiv'>

      <h1 className='heading'>Password generator</h1>
      <div>
      <input className='password' type="text" value={password} ref={passwordReference}/>
      <button className='copy' onClick={copyToClipboard}>Copy</button>
      </div>
      <div>
       <input type='range' min={6} max={25} name='range' value={length} onChange={(e)=>setLength(e.target.value)}/>
       <label htmlFor='range'>Length:{length}</label>
       <input type='checkbox'  name='number' value={numberAllowed} onChange={()=>setNumberAllowed(!numberAllowed)}/>
       <label htmlFor='number'>Numbers</label>
       <input type='checkbox'  name='Characters' value={characterAllowed} onChange={()=>setCharacterAllowed(!characterAllowed)}/>
       <label htmlFor='Characters'>Characters</label>


        </div>

    </div>
    </div>
  )
}

export default App