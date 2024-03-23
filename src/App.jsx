
import { useCallback, useEffect, useRef, useState } from 'react'
function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setCHarAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*(){}:<>+-*/"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyToClip = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md
      rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white p-1 text-center my-2'>password generator</h1>
        <div className='flex w-96 shadow rounded-lg overflow-hidden mb-4'>
          <input type='text'
            value={password}
            className='outline-none w-full py-1 
            px-3 bg-white text-black'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button className='outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0 hover:bg-blue-500'onClick={copyToClip}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-2'>
            <input
              className='cursor-pointer'
              type='range'
              min={8}
              max={100}
              value={length}
              onChange={(e) => { setlength(e.target.value) }}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numberAllowed}
              onChange={() => { setnumberAllowed((prev) => !prev) }}
            />
            <label htmlFor='numberInput'>Numbers</label>

          </div>
          <div className='flex items-center gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              onChange={() => { setCHarAllowed((prev) => !prev) }}
            />
            <label htmlFor='characterInput'>Characters</label>

          </div>
        </div>
      </div>
    </>
  )
}

export default App
