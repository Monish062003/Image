import React,{useState} from 'react'
import "../css/popup.css"

export default function Popup(props) {
    const[api,setapi]=useState("");
    let handleChange=((event)=>{
        setapi(event.target.value);
    });
    let changeapi=(()=>{
        let backend;
        if(api.match("sk-"))
        {
            backend=require("../backend/dalleback").api;
        }
        else{
            backend=require("../backend/stableback").api;
        }
        let bool=backend(api);
        if (bool) {
            setTimeout(()=>{
                alert("API Changed")
            },1000)
            cancel();
        }
    });
    let cancel=(()=>{
        if (localStorage.getItem("color")=="rgb(128,128,128)") {
            localStorage.setItem("color","Black");
        }
        props.setTrigger({...props.trigger,["bool"]:false});
    })
    return ((props.trigger).bool)?(
        <div>
      <div className="panel">
        <div className="titler">Enter API Key</div>
        <div class="input-group mb-3">
            <input type="text" class="form-control" name='api' placeholder="Input" aria-label="Username" aria-describedby="basic-addon1" value={api} onChange={handleChange} style={{"width":"50vw"}}/>
        </div>
        <div className="btncontainer">
            <button type="button" class="btn btn-primary" id="btn4" onClick={changeapi}>Use</button>
            <button type="button" class="btn btn-danger" id='btn5' onClick={cancel}>Close</button>
        </div>
        <div className="note">The Site will automatically guess the API Model to which your API-Key belongs to</div>
      </div>
    </div>
  ):"";
}
