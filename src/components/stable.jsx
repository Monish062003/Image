import React,{useState,useEffect} from 'react'
import  '../css/stable.css'
import download from "../images/download.png"
import Popup from './popup';

export default function Stable() {

    const[input,setInput]=useState({
      prompt:"",
      bool:false
      });
    let selectedapi;
    let radiovalue=document.getElementsByName("number");
    let callstable;
    let rvalue;
    useEffect(() => {
      localStorage.clear();
    }, []);
    
    let handleChange=((event)=>{
      let name=event.target.name;
      let value=event.target.value;
      
      setInput({...input,[name]:value})
    });
    
    if (localStorage.getItem("color")=="Black") {
      for (let index = 0; index < 4; index++) {
        try {
          document.getElementsByClassName("card")[index].style.visibility="visible";
          document.getElementsByClassName("cardcontainer")[index].style.visibility="visible";
        } catch (error) {
        }
      }
      document.body.style.backgroundColor="Black";
    }
    
    let changekey=((event)=>{
      localStorage.setItem('color',"rgb(128,128,128)")
      document.body.style.backgroundColor="rgb(128,128,128)";
      for (let index = 0; index < 4; index++) {
        document.getElementsByClassName("cardcontainer")[index].style.visibility="hidden";
        document.getElementsByClassName("card")[index].style.visibility="hidden";
      }
      setInput({...input,[event.target.name]:true});
    });
    
    let fetchAPI=(async()=>{
      for (let index = 0; index < radiovalue.length; index++) {
        if (radiovalue[index].checked) {
          rvalue=index+1;
        }
      }
      
      if (rvalue==undefined || input.prompt=="") {
        if (rvalue==undefined) {
          alert("Please pick the number of image for generation")
        }
        else{
          alert("Please Enter a Prompt")
        }
      }
      else{
        selectedapi=document.getElementsByTagName("select")[0].value;
        
        if (selectedapi==1) {
          callstable=require("../backend/stableback").stable;
        }
        else{
          callstable=require("../backend/dalleback").dalle;
        }
        let data= await callstable(input.prompt,parseInt(rvalue));
        if (data!=null) {
          data.map(async(element,index)=>{
              try {
                const response= await fetch(element);

                if (!response.ok) {
                    throw new Error("Failed to download image");
                }
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                document.getElementsByTagName("a")[index].href = objectUrl;
              } catch (error) {
                document.getElementsByTagName("a")[index].href = element;
              }
              document.getElementsByClassName("card")[index].setAttribute('src',element);
              document.getElementsByClassName("card")[index].style.display="block";
              document.getElementsByClassName("downloadimg")[index].style.display="block";

              for (let index = data.length; index < 4; index++) {
                document.getElementsByClassName("card")[index].style.display="none";
                document.getElementsByClassName("downloadimg")[index].style.display="none";
              }
            }) 

          }
        }
      });
      

  return (
    <div>
      <div className="container">
        <Popup trigger={input} setTrigger={setInput} />
        <div className="head">
          <button type="button" class="btn btn-outline-primary" name='bool' id='btn1' onClick={changekey} disabled={input.bool}>Change API Key</button>
          <div className="title">Image Generation</div>
        </div>
        
        <div className="cards">
          <div className="row">
            <div className="cardcontainer"><img className="card" /><a download><img src={download}className='downloadimg' alt="download" /></a></div>
            <div className="cardcontainer"><img className="card" /><a download={true} ><img src={download}className='downloadimg' alt="download" /></a></div>
          </div>
          <div className="row">
            <div className="cardcontainer"><img className="card" /><a download={true} ><img src={download}className='downloadimg' alt="download" /></a></div>
            <div className="cardcontainer"><img className="card" /><a download={true} ><img src={download}className='downloadimg' alt="download" /></a></div>
          </div>
        </div>
        <div className="generationcontainer">
            <div class="input-group mb-3" id='expand'>
                <span class="input-group-text" id="basic-addon1">Prompt</span>
                <input type="text" class="form-control" name='prompt' value={input.prompt} placeholder="Input" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChange} disabled={input.bool}/>
            </div>
            <select class="form-select" aria-label="Disabled select example" onChange={handleChange} disabled={input.bool}> 
              <option value="1">Stable Diffusion</option>
              <option value="2">Dalle</option>
            </select>
            <div className="btnrow">
            
              <button type="button" class="btn btn-outline-primary" name='bool' id='btn3' onClick={changekey} disabled={input.bool}>Change API Key</button>
              <button type="button" class="btn btn-outline-primary" id='btn2'  disabled={input.bool} onClick={fetchAPI}>Generate</button>
            </div>
        </div>
        <div class="form-check form-check-inline">
          Number of Images to Generate
          <div className="radiofields">
            <div className="sectionop">
              <div className="form-check-label">
                <input class="form-check-input" type="radio" id="inlineCheckbox1" name='number' value="1" />
                <label class="form-check-label" for="inlineCheckbox1" disabled={input.bool}>1</label>
              </div>
              <div className="form-check-label">
                <input class="form-check-input" type="radio" id="inlineCheckbox1" name='number' value="2" />
                <label class="form-check-label" for="inlineCheckbox1" disabled={input.bool}>2</label>
              </div>
            </div>
            <div className="sectionop">
              <div className="form-check-label">
                <input class="form-check-input" type="radio" id="inlineCheckbox1" name='number' value="3" />
                <label class="form-check-label" for="inlineCheckbox1" disabled={input.bool}>3</label>
              </div>
              <div className="form-check-label">
                <input class="form-check-input" type="radio" id="inlineCheckbox1" name='number' value="4" />
                <label class="form-check-label" for="inlineCheckbox1" disabled={input.bool}>4</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
