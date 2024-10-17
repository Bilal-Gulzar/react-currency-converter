import sign from './img.png'
import './App.css';
import { useEffect, useState } from 'react';
import { countryList } from './code';
 import { ToastContainer, toast } from "react-toastify";
   import "react-toastify/dist/ReactToastify.css";
  

function App() {
  
    let [get,setGet]=useState(true)
  let [preAmount, setPreAmount] = useState(0);
  let [check,setCheck]=useState(0)
  let [amount,setAmount]=useState(0);
  let [flag,setFlag]=useState('USD');
  let [flagg,setFlagg]=useState('PKR');
  let [select1,setSelect1]=useState("USD");
  let [select2, setSelect2] = useState('PKR');
  let [apiData,setApiData]=useState('');

 let Api = `https://v6.exchangerate-api.com/v6/f4badcaa29eea6a110259653/latest/`; 
 
 let nf = new Intl.NumberFormat();
 
let code = Object.keys(countryList).map((v,i)=>{
  return (
    <option key={i} >{v}</option>
    )
    
    });
   
    let getData=()=>{
      
      fetch(`${Api}${select1}`)
            .then((res) => res.json())
            .then((res) => {
              setApiData(res)
            })
            .catch((err)=>{
              toast.warning("Network problem:",err);
            })
        
    }
    useEffect(()=>{
     if(apiData){
     setCheck(apiData.conversion_rates[select2]);
    setPreAmount(1)                        
   }
              
},[apiData])
                

    useEffect(() => {
      getData()
        }, []);


let getValue2=(evt)=>{
  let data2 = evt.target.value
  setFlagg(data2);
  setSelect2(data2);
   if (apiData !== "") {
     let sum1 = apiData.conversion_rates[data2];
     let sum2 = apiData.conversion_rates[select1];
     let sum3 = 1 / sum1;
     let sum4 = 1 / sum2;
     let evalute = sum4 / sum3;
     setCheck(evalute.toFixed(3));
    setPreAmount(1)
     }

    
    }
 

let getValue1 = (evt) => {
  let data = evt.target.value;
  setFlag(data);
  setSelect1(data);
  if(apiData!==""){
    let sum1 = apiData.conversion_rates[select2];
    let sum2 = apiData.conversion_rates[data];
   let sum3 = 1/sum1;
   let sum4 = 1/sum2;
   let evalute = sum4/sum3;
   setCheck(evalute.toFixed(3))
   
  setPreAmount(1);
   }

};

let handle =(evt)=>{

  setTimeout(() => {
  setGet(true);
}, 1300); 

if(apiData!==""){
   let sum1 = apiData.conversion_rates[select2];
   let sum2 = apiData.conversion_rates[select1];
   let sum3 = 1 / sum1;
   let sum4 = 1 / sum2;
   let evalute = sum4 / sum3;  
  let exchangeValue = evalute * amount
  setCheck(exchangeValue.toFixed(3));
  setPreAmount(amount);
  }
setAmount(0)

  evt.preventDefault()

}

  return (
    <div className="flex overflow-hidden justify-center items-center bg-[#675AFE] w-[100%] h-[100vh]">
      <div className="bg-white w-[300px] sm:w-[350px] h-auto rounded">
        <div className="mx-8 py-6">
          <h1 className="text-2xl sm:text-3xl text-center font-bold">
            Currency&nbsp;Converter
          </h1>
        </div>
        <form onSubmit={handle}>
          <div className='-ml-1.5 sm:ml-0'>
            <div className="mx-7 py-3">
              <div className="text-1xl mb-3 font-semibold">
                <p>Enter Amount</p>
              </div>
              <div>
                <input
                  className="w-[260px] sm:w-[300px] h-[43px] border-[#ccc] border-[1.5px] rounded-[5px] outline-none pl-2 focus:border-indigo-400 focus:ring-2 focus:ring-indigo"
                  type="text"
                  value={amount}
                  onChange={(evt) => setAmount(evt.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 mt-5 grid-[50%_auto]">
                <div className="text-1xl ml-4 font-semibold">From</div>
                <div className="text-1xl ml-[75px] font-semibold">TO</div>

                <div className="mt-2 relative flex w-[260px] sm:w-[300px]">
                  <div className="grid grid-cols-2 grid-[55%_auto  border-[2px] rounded-[22px] w-[99px] h-[42px]">
                    <figure className="w-[30px] mt-1 ml-[8px] relative z-1">
                      <img
                        src={`https://flagsapi.com/${countryList[flag]}/flat/64.png`}
                      ></img>
                    </figure>
                    <div className=" border-none mt-[6px] ml-[-10px]">
                      <select
                        onChange={getValue1}
                        value={select1}
                        className="w-[48px]  cursor-pointer outline-none text-[14px]"
                      >
                        {code}
                      </select>
                    </div>
                  </div>
                  <figure className="absolute w-5 right-[125px] sm:right-[143px] mt-3">
                    <img src={sign} className="" />
                  </figure>
                  <div className=" grid grid-cols-2 grid-[55%_auto  border-[2px] rounded-[22px] w-[100px] h-[43px] absolute right-0 mt-[2px]">
                    <figure className="w-[30px] mt-1 ml-[8px]  relative z-1">
                      <img
                        src={`https://flagsapi.com/${countryList[flagg]}/flat/64.png`}
                      ></img>
                    </figure>
                    <div className=" border-none mt-[6px] ml-[-10px] ">
                      <select
                        onChange={getValue2}
                        value={select2}
                        className="w-[49px]  cursor-pointer outline-none text-[14px]"
                      >
                        {code}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-6 my-3">
              {get ? (
                <p>
                  {nf.format(preAmount)}{" "}
                  <pan className="font-semibold">{select1}</pan>
                  <pan className="font-bold"> = </pan>
                  {nf.format(check)}
                  <span className="font-semibold"> {select2}</span>
                </p>
              ) : (
                <div>
                  <p className="font-semibold">Getting Exchange Rate....</p>
                </div>
              )}
            </div>
            <div className=" mt-6 mx-auto ml-5   mb-[15px] w-[90%]  bg-[#675AFE] text-white h-[46px] rounded pt-2 pl-[85px] font-semibold cursor-pointer hover:-translate-y-1 hover:scale-100 hover:bg-blue-500 duration-300 ...">
              <button onClick={() => setGet(false)} className="outline-none">
                Get Exchange Rate
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
