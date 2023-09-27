import { useRef, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { RiFileCopyLine, RiArrowRightLine } from "react-icons/ri";

const sth = {
  weak: "WEAK",
  medium: "MEDIUM",
  strong: "STRONG"
}


function App() {

  const [password, setPassword ] = useState('')
  const [strength, setStrength ] = useState('')
  const [characterLength, setCharacterLength] = useState(4);
  const [includeUppercase, setIncludeUppercase] = useState(false);
  const [includeLowercase, setIncludeLowercase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);

  const passwordRef = useRef<HTMLInputElement>(null);


  const handlePasswordChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleCharacterLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterLength(Number(e.target.value))
  }

  const includeUppercaseChange = () => {
    setIncludeUppercase(!includeUppercase)
  }

  const includeLowercaseChange = () => {
    setIncludeLowercase(!includeLowercase)
  }

  const includeNumbersChange = () => {
    setIncludeNumbers(!includeNumbers)
  }

  const includeSymbolsChange = () => {
    setIncludeSymbols(!includeSymbols)
  }

  const errorForm = () => toast.error("Select at least one option")
  const errorLength = () => toast.error("No password to copy")
  const toastCopy = () => toast.success("Password copied to clipboard.")

  const handleGeneratePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
    let passwordGenerated = ""
    let selectedCharacters = ""

    if(!includeLowercase && !includeUppercase && !includeNumbers && !includeSymbols){
      errorForm()
      return
    }

    if(includeLowercase){
      selectedCharacters+=lowercase
    }

    if(includeUppercase){
      selectedCharacters+=uppercase
    }

    if(includeNumbers){
      selectedCharacters+=numbers
    }

    if(includeSymbols){
      selectedCharacters+=symbols
    }

    for(let i = 0; i < characterLength; i++){
      const randomIndex = Math.floor(Math.random() * selectedCharacters.length)
      passwordGenerated+= selectedCharacters.charAt(randomIndex)
    }
    setPassword(passwordGenerated)
    passwordStrength()
  }

  const passwordStrength = () => {
    let strengthCount = 0

    if(includeLowercase){
      strengthCount++
    }
    if(includeUppercase){
      strengthCount++
    }
    if(includeNumbers){
      strengthCount++
    }
    if(includeSymbols){
      strengthCount++
    }

    if(strengthCount >= 3 && characterLength >= 6){
      setStrength(sth.strong)
    }else if(strengthCount >= 3 ||( strengthCount >= 2 && characterLength >= 6)){
      setStrength(sth.medium)
    }else{
      setStrength(sth.weak)
    }
  }

  const copyToClipBoard = () => {
    if(password.length === 0) {
      errorLength()
      return
    }
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
      toastCopy()
    }
  }
  
  return (
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <h1 className="text-center text-gray-400 text-xl font-bold mb-3">Password Generator</h1>

        {/** Formulario de contraseña aqui se muestra la contraseña generada */}
        <div className="w-[360px] mb-5">
            <form className="relative">
              <input className="py-3 px-4 w-full bg-[#24232B] outline-none text-gray-400 text-xl" type="text" placeholder="Password here..." value={password} onChange={handlePasswordChange} ref={passwordRef} readOnly/>           
              <RiFileCopyLine className="absolute right-4 top-4 text-xl hover:cursor-pointer hover:text-gray-600 text-[#A4FDAF] transition-colors" onClick={copyToClipBoard}/>
            </form>
        </div>

        <div className="w-[360px] bg-[#24232B]">
          <div className="flex justify-between items-center text-gray-400 p-4">
            <h2>Character length</h2>
            <span className="text-2xl font-bold text-[#A4FDAF]"> { characterLength } </span>
          </div>
          {/** Formulario de rango de letras */}
          <div className="w-[360px] p-4">
            <form>
              <input className="w-full range" type="range" min="4" max="20" value={characterLength} onChange={handleCharacterLengthChange}/>
            </form>
          </div>

          {/** Formulario Checkbox */}
          <div className="w-[360px] p-4">
            <form className="flex flex-col gap-2">
              <div>
                <input
                  type="checkbox"
                  name="uppercase"
                  checked={includeUppercase}
                  onChange={includeUppercaseChange}
                />
                <label htmlFor="uppercase" className="text-gray-300"> Include Uppercase Letters</label>
              </div>
              
              <div>
                <input
                  type="checkbox"
                  name="lowercase"
                  checked={includeLowercase}
                  onChange={includeLowercaseChange}
                />
                <label htmlFor="lowercase" className="text-gray-300"> Include Lowercase Letters</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="numbers"
                  checked={includeNumbers}
                  onChange={includeNumbersChange}
                />
                <label htmlFor="numbers" className="text-gray-300"> Include Numbers</label>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="symbols"
                  checked={includeSymbols}
                  onChange={includeSymbolsChange}
                />
                <label htmlFor="symbols" className="text-gray-300"> Include Symbols</label>
              </div>
            </form>
          </div>

          {/** Fortaleza de la contraseña */}
          <div className="flex justify-between p-4 m-4 bg-[#121117]">
            <h3 className="uppercase text-gray-600">Strength</h3>
            <div className="flex gap-2 items-center">
              <p className="uppercase text-gray-400">{strength}</p>

              { strength === sth.weak
              ?
              (
              <>
                <div className="border bg-red-500 border-red-500 border-solid w-[6px] h-[18px]"></div>
                <div className="border border-gray-100 border-solid w-[6px] h-[18px]"></div>
                <div className="border border-gray-100 border-solid w-[6px] h-[18px]"></div>
                <div className="border border-gray-100 border-solid w-[6px] h-[18px]"></div>
              </>
              ): strength === sth.medium ?
              (
                <>
                  <div className="border bg-yellow-500 border-yellow-500 border-solid w-[6px] h-[18px]"></div>
                  <div className="border bg-yellow-500 border-yellow-500 border-solid w-[6px] h-[18px]"></div>
                  <div className="border bg-yellow-500 border-yellow-500 border-solid w-[6px] h-[18px]"></div>
                  <div className="border border-gray-100 border-solid w-[6px] h-[18px]"></div>
                </>
              ):
              (
                <>
                  <div className="border bg-green-500 border-green-500 border-solid w-[6px] h-[18px]"></div>
                  <div className="border bg-green-500 border-green-500 border-solid w-[6px] h-[18px]"></div>
                  <div className="border bg-green-500 border-green-500 border-solid w-[6px] h-[18px]"></div>
                  <div className="border bg-green-500 border-green-500 border-solid w-[6px] h-[18px]"></div>
                </>
              )
              }
              
            </div>
          </div>

          {/** Boton de generar contraseña */}
          <div className="w-[360px] p-4">
            <button className="w-full p-4 bg-[#a4fdaf] text-lg font-bold text-[#24232B] border border-[#a4fdaf] border-solid hover:border hover:border-[#a4fdaf] hover:border-solid hover:bg-[#24232B] hover:text-[#a4fdaf] transition-colors" onClick={handleGeneratePassword}>GENERATE  <RiArrowRightLine className="inline-flex"/></button>
            
          </div>
        </div>
        <Toaster />
      </div>
  )
}

export default App
