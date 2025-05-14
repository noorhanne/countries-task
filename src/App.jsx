import React , {useState ,useEffect}  from 'react'
import axios from 'axios';
import './App.css'
function App() {
const [data, setData] = useState(null);
const [inputValue , setInputValue] = useState('');
const [country , setCountry] = useState('');
function handleSearch(){
  if(inputValue.trim() !== ''){
   setCountry(inputValue.trim().toLowerCase())
  }
}
useEffect(()=> {
  axios.get(`https://restcountries.com/v3.1/name/${country}`)
  .then(res => {setData(res.data[0])})
  .catch(err => {console.log('err', err);
setData(null)}
)

} , [country])

  return (
    <div>
      <div className='main-section max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:justify-center max-sm:items-center'>
   <input type='text' required placeholder='Enter Your Country'
   value={inputValue}
   onChange={e => setInputValue(e.target.value)}
   className='outline-none border-none text-red-600 bg-sky-200 w-60 h-12 rounded-lg p-2 '
   />
   <button onClick={handleSearch} className='text-purple-800 p-10 ml-4 h-12 cursor-pointer'>Search</button>
   </div>
   <div className='main-answer p-10'>
{
  data? (
    <div className='flex justify-center gap-6 items-center flex-col bg-yellow-100 p-12'>
<h2>{data.name.common}</h2>
<img src={data.flags.svg} alt='flag' className='w-60'/>
<h2> {data.capital ? data.capital[0] : 'N/A'}</h2>
<h2>{data.population.toLocaleString()}</h2>
<h2>   
      {data.currencies
        ? `${Object.keys(data.currencies)[0]} - ${
            Object.values(data.currencies)[0].name
          }`
        : 'N/A'}</h2>
    </div>
  ):(<h3 className='text-green-900 rounded-lg w-30 h-10 mx-auto flex justify-center items-center bg-blue-200'>Search....</h3>)
}
   </div>
    </div>
  )
}

export default App
