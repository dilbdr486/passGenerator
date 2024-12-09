import React, { useCallback, useEffect, useRef, useState } from "react";

function Generator() {

  const [password,setPassword] = useState("");
  const [length,setLength] = useState(8);
  const [number,setNumber] = useState(false)
  const [character,setCharacter] = useState(false)
  const passRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789"
    }
    if (character) {
      str += "!@#$%^&*()"
    }

    for (let i = 0; i <length; i++) {
      let randomPassword = Math.floor(Math.random() * str.length+1)
      console.log(randomPassword);
      
      pass += str.charAt(randomPassword)
      
    }
    setPassword(pass)

  },[number,length,character,setPassword])

  useEffect(()=>{
    passwordGenerator();
  },[number,length,character,passwordGenerator]);

  const copyPassword = useCallback(()=>{
    passRef.current?.select();
    window.navigator.clipboard.writeText(password)
    
  },[password])

  return (
    <>
      <h1 className="text-4xl text-center py-10 text-white">
        Password Generator
      </h1>
      <div className="w-full shadow-md bg-gray-500 text-2xl px-8 py-10 max-w-md mx-auto rounded-2xl">
        <div className="flex shadow rounded-lg overflow-hidden mb-5">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button onClick={copyPassword} className="text-white text-2 bg-green-500 rounded-lg hover:bg-blue-500 transition duration-300">copy</button>
        </div>
        <div className="flex gap-x-2 text-lg  text-yellow-400">
          <div className="flex gap-x-1 items-center">
            <input onChange={(e)=>{setLength(e.target.value)}} type="range" min={6} max={100} value={length} className="cursor-pointer" />
            <label >Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkBox" onChange={()=>{setNumber((prev)=>!prev)}}/>
            <label>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkBox" onChange={()=>{setCharacter((prev)=>!prev)}}/>
            <label>character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Generator;
