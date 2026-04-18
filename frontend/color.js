 function rgbToHsl(r, g, b){

    r/=255;
    g/=255;
    b/=255;

    const max=Math.max(r,g,b);
    const min=Math.min(r,g,b);

    let h,s,l=(max+min)/2;

    if(max===min){
        h=s=0;
    }else{
        const d=max-min;
        s=l>0.5?d/(2-max-min):d/(max+min);

        switch(max){
            case r:h=(g-b)/d+(g<b?6:0);break;
            case g:h=(b-r)/d+2;break;
            case b:h=(r-g)/d+4;break;
        }

        h/=6;
    }

    return h*360;
}
function evaluateHarmony(data){

    const hues = data.map(d=>{
        return rgbToHsl(
            d.color[0],
            d.color[1],
            d.color[2]
        );
    });

    let diffSum=0;

    for(let i=1;i<hues.length;i++){
        diffSum+=Math.abs(hues[i]-hues[i-1]);
    }

    const avgDiff=diffSum/(hues.length-1);

    if(avgDiff<30)
        return "🎨 单色系，非常和谐";

    if(avgDiff<90)
        return "🌈 色彩协调";

    return "⚡ 对比强烈";
}
function showHarmony(text){

    let div=document.getElementById("harmony");

    if(!div){
        div=document.createElement("div");
        div.id="harmony";
        document.body.appendChild(div);
    }

    div.innerHTML=`<h2>${text}</h2>`;
}