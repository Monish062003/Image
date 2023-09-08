//Enter API KEY here
let API_KEY="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";
let dalle=(async(inputbox,imagecount)=>{
    if (API_KEY!="") {
        try {
            const options={
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "prompt" : inputbox,
                    "n": imagecount,
                    "size": "512x512"
                })
                }
                const response = await fetch('https://api.openai.com/v1/images/generations',options)
                const data = await response.json();
                let count=[];
                data?.data.forEach(element => {
                    count.push(element.url);
                });
                return count;
        } catch (error) {
            API_KEY=prompt("There's something wrong with your API key, Please use the right key");
        }
    } else {
        API_KEY=prompt("Sorry we Ran out of Tokens !! Use your API KEY to Make it Work");
    }

});

let changeapi=((api)=>{
    API_KEY=api
    return true;
});

module.exports={dalle:dalle,api:changeapi};