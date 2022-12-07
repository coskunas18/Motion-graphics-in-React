import './App.css';
import React,{useEffect, useState} from "react";
import ChartItem from './components/ChartItem';
import Area from './components/Area'


function App() {

const getRandomNumber = () =>{
  return Math.floor(Math.random()*100+1)
}

const [barData,setBarData] = useState([
  {
    id:1,
    title:"Facebook",
    color:"#4530F9",
    value:getRandomNumber(),
  },
  {
    id:2,
    title:"Amazon",
    color:"#EABF13",
    value:getRandomNumber(),
  },
  {
    id:3,
    title:"Youtube",
    color:"#F72323",
    value:getRandomNumber(),
  },
  {
    id:4,
    title:"Google",
    color:"#DEF1EF",
    value:getRandomNumber(),
  },
]);

const findBigBarItem=(data)=>{
  return data.sort((val1,val2) => val2.value - val1.value)[0].value;
}

const [bigBarData,setBigBarData] = useState(findBigBarItem(barData));

const setBarDataWithRandom = () => {
  let data = [...barData];
  data.forEach((item)=>{
  item.value+=getRandomNumber();
  })
  setBigBarData(findBigBarItem(data));
  setBarData(data);
}

useEffect(()=>{
  let timer;
  timer=setInterval(()=>{
   setBarDataWithRandom();
  },500)
});

const renderBarItem =(item,index) => {
  let rate = item.value/bigBarData;
  rate = rate * (1000 - 40);
  const percent =(rate * 100)/1040;
  return <ChartItem
          key={item.id}
          backgroundColor={item.color}
          width={percent+"%"}
          text={item.title}
          count={item.value}
          top={(index === 0 ? 10: (index * 40)+20)+'px'}
          />
}

return(

  <>
  <div className='app-title'>Firmaların Müşteri Sayıları</div>
  <Area data={barData}>
  {barData.map((item,index) => renderBarItem(item,index))}
  </Area>
  </>

);

}

export default App;
