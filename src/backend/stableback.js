//Enter API KEY here
let [API_KEY,url]=["4y0RcvYwtkoh7t1okIfTdXoJyDyTQTT91fwTmyvTmHYd2E1zcBAezfY6yaBT","https://stablediffusionapi.com/api/v3/text2img"];

let stable=(async(input,imagecount)=>{
    if (API_KEY!="") {
        try {
            let response= await fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    key:`${API_KEY}`,
                    prompt:`${input}`,
                    samples: `${imagecount}`
                }),
            });        
            let getdata= await response.json();
            getdata= await getdata.output;
            let data=[...getdata]
    
            return data;
        } catch (error) {
            API_KEY=prompt("There's something wrong with your API key, Please use the right key");
        }
    }
    else{
        API_KEY=prompt("Sorry we Ran out of Tokens !! Use your API KEY to Make it Work");
    }
});

let changeapi=((api)=>{
    API_KEY=api
    return true;
});

module.exports={stable:stable,api:changeapi};