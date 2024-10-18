import React, { useRef } from 'react'
import axios from 'axios'
import { useState , useEffect} from 'react'

function App() {

  const[question , setQuestion] =  useState(null)
  const[curentIndex , setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0);
 

  const input = useRef([])

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        console.log(res.data)
        setQuestion(res.data);  
      }).catch((err) => {
        console.log(err);
      })
  }, [])

  // next Question

  const nextQuestion = () =>{

   const selectedOption = input.current.find(item => 
    item && item.checked)
    console.log("Selected option:", selectedOption);
  console.log("Selected option value:", selectedOption.value)

          


  const correctAnswer = question[curentIndex].correctAnswer;

    if (selectedOption.value == correctAnswer) {
      setScore(prevScore => prevScore + 10);  
      console.log("Correct answer! 10 points added.");
    } else {
      console.log("Wrong answer. No points added.");
    }







    if(curentIndex < question.length - 1 ) {
      setCurrentIndex(curentIndex + 1 )
      return
    }else{
      console.log("Question katm hoogy hai")
    }
     
  
  
   
  }



  //shuffle function
  function shuffleArray(arr){
     const emptyArr = []
     const shuffleArr = []
     for(let i = 0 ;i<arr.length; i++){
      const randomNumber = Math.floor(Math.random() * arr.length )
      if(emptyArr.includes(randomNumber)){
        console.log("number already mujood ha");
        i--
      }else{
        emptyArr.push(randomNumber)
        // console.log(randomNumber)
        shuffleArr[randomNumber] =  arr[i]
      }
     }
    //  console.log(shuffleArr);
     return shuffleArr
  }
  shuffleArray([1, 2, 3, 4 ,5,6,7,8,9,10])
  return (
    

    <>
    <div className='w-full max-w-md mx-auto shadow-lg shadow-teal-300 rounded-2xl px-4 py-3 my-8 text-orange-500 bg-gray-800'> 
     <h1 className='text-white text-4xl font-bold mb-6'>Quiz App  {score}/100</h1>
          

          <div className='text-lg text-gray-200 mb-10'>
          {question ?
           <div>
            <h1>Q{curentIndex + 1}: {question[curentIndex].question.text} </h1>
            <br /> 
            <br />
            {shuffleArray([...question[curentIndex].incorrectAnswers , question[curentIndex].correctAnswer ]).map((item , index) =>{
              return <div   key={`option  ${index}`} >

             <input type="radio" name ="Question" value ={item} id={index} ref={el => input.current [index] = el } />
                <label htmlFor= {index} >{item}</label>
                
              </div>
            })
            }

           
                
            <button  className = 'bg-white text-indigo-600 font-bold py-2 px-6 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-indigo-500' onClick={nextQuestion} >Next</button>
          </div> :
           <h1>Loading...</h1> }
          
          </div>
         
          </div>    
    </> 
  )
}

export default App
