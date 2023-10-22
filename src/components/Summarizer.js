import React, { useState } from 'react'
import wordsCount from 'words-count';
import Spinner from './Spinner'
import Error from './Error';
import { LuCopy,LuDownload } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import './Summarizer.css'

function Summarizer() {  

    const NLPCloudClient = require('nlpcloud');
    const apiKey = process.env.REACT_APP_API_KEY;

    const [text,setText] = useState('');
    const [output,setOutput] = useState('');
    const [size,setSize] = useState('small');
    const [loading,setLoading] = useState(false);
    const [isActive,setActive] = useState(false);
    const [dialog,setDialog] = useState(false);
    const [status,setStatus] = useState('');

    function handler(event){
        setText(event.target.value);
    }

    function summarize(){
        fetchData();
    }

    function DialogOff(){
        setDialog(false);
    }

    function sizeHandler(event){
        setSize(event.target.value);
    }

    async function fetchData(){

        if(text.length === 0){
            setStatus(400);
            console.log(status ,{status});
            setDialog(true);
            return;
        }

        setLoading(true);
        const client = new NLPCloudClient('bart-large-cnn',apiKey, false)
        client.summarization(`${text}`,`${size}`
        ).then(function (response) {
                setLoading(false);
                setOutput(response.data.summary_text);
                console.log(response);
        }).catch(function (err) {
            setLoading(false);
            setDialog(true);
            setOutput('');
            console.log(err);
            
            if(err?.response?.status)
                setStatus(err.response.status);
        });
    }

  return (
    <>
        {
            dialog && <Error statusCode = {status} DialogOff = {DialogOff} />
        }

    <div className="grid divide-y-2 divide-gray-400 w-11/12 border-solid mx-auto mt-10 border-2 rounded-xl border-orange-400 bg-white">

        <div className='grid grid-cols-2 divide-x-4 divide-orange-400 relative'>
            
            <div className='flex items-center flex-row-reverse text-2xl font-bold'>
                <div className='border-[#eb7f05] border-2 m-2 rounded-3xl'>
                <button className={size === 'small' ? 'active deactive' : 'deactive'} onClick={sizeHandler} value='small'>Small</button>
                <button className={size === 'large' ? 'active deactive' : 'deactive'} onClick={sizeHandler} value='large'>Large</button>
                </div>
                <div>Summary Size:</div>
            </div>
            
            {
                isActive && (<span className='border-none absolute top-[-50px] right-[5px] bg-orange-500 p-2 font-medium text-white text-base rounded-xl'>Copied!</span>)
            }

            <div className='flex justify-end items-center'>
                <div className='flex mx-3'>

                    <div className='border-gray-400 border-2 rounded-md w-8 h-8 mx-2'><MdDelete onClick={()=>{setOutput('')}} className='text-3xl p-[2px] cursor-pointer text-gray-600'/></div>

                    <div className='border-gray-400 border-2 rounded-md w-8 h-8 mx-2'><LuDownload className='text-3xl p-[3px] cursor-pointer text-gray-600' onClick={()=>{
                                        const blob = new Blob([output], { type: "text/plain" });
                                        const url = URL.createObjectURL(blob);

                                        const link = document.createElement("a");
                                        link.download = "Summary.txt";
                                        link.href = url;
                                        link.click();
                    }}/></div>

                    <div className='border-gray-400 border-2 rounded-md w-8 h-8 mx-2'><LuCopy onClick={(event)=>{ 
                        if(output.length !== 0){
                            navigator.clipboard.writeText(output);
                            setActive(true);
                            setTimeout(()=>{setActive(false)},2000);
                        }
                        }} 
                        className='text-3xl p-[4px] text-gray-600 cursor-pointer'/></div>

                </div>
            </div>

        </div>

        <div className='grid grid-cols-2 divide-x-4 divide-orange-400'>
            <div>
                <textarea value={text} onChange={handler} placeholder=' Write or Paste your article and click on "Summarize."' className='border-none outline-none p-4 text-gray-700 text-lg w-full h-[450px] resize-none'></textarea>  
            </div>
            <div>
                {
                    loading ? (<div className='w-full h-[450px] flex justify-center items-center'><Spinner/></div>) : 
                    (<textarea readOnly value={output} className='resize-none border-none outline-none text-lg p-4 w-full h-[450px] text-gray-700'></textarea>)
                }
            </div>
        </div>

        <div className='grid grid-cols-2 divide-x-4 divide-orange-400'>

            <div className='flex items-center px-5 py-2 justify-between'>
                <div className='text-lg font-semibold'>Word Count: {wordsCount(text)}</div>
                <button onClick={summarize} className='bg-black text-white rounded-2xl w-32 p-1 text-lg font-semibold hover:bg-orange-400 active:bg-orange-600'>Summarize</button>
            </div>

            <div className='text-lg font-semibold px-5 py-3'>Word Count: {wordsCount(output)}</div>
        </div>
    
       
    </div>
    </>  
  )}

export default Summarizer