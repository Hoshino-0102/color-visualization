let imagePixels = [];

document.getElementById("imageInput")
.addEventListener("change", loadImage);

function loadImage(event) {

    const file = event.target.files[0];
    const img = new Image();

    img.onload = function () {

        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        const data = ctx.getImageData(
            0, 0,
            canvas.width,
            canvas.height
        ).data;

        imagePixels = [];

        for (let i = 0; i < data.length; i += 4) {

            imagePixels.push([
                data[i],     // R
                data[i + 1], // G
                data[i + 2]  // B
            ]);
        }

        console.log("pixels:", imagePixels.length);
    };

    img.src = URL.createObjectURL(file);
}
function runClustering(){

    if(imagePixels.length===0){
        alert("请先上传图片");
        return;
    }

    const k = parseInt(
        document.getElementById("kValue").value
    );

    console.log("Running KMeans, k =", k);

    const result = kmeans(imagePixels, k);

    console.log(result);

    drawChart(result);
    analyzeHarmonyAI(result);
    const harmony=evaluateHarmony(result);
    showHarmony(harmony);
}

async function runClustering(){

    const file =
        document.getElementById("imageInput").files[0];

    if(!file){
        alert("请先上传图片");
        return;
    }

    const k =
        document.getElementById("kValue").value;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("k", k);
    const space =
        document.getElementById("colorSpace").value;

    formData.append("space", space);

    const response = await fetch(
        "http://127.0.0.1:5000/cluster",
        {
            method:"POST",
            body:formData
        }
    );

    const result = await response.json();

    console.log(result);

    drawChart(result);
    analyzeHarmonyAI(result);

    const harmony=evaluateHarmony(result);
    showHarmony(harmony);
}

function drawChart(data){

    const chart =
        echarts.init(document.getElementById("chart"));

    const chartType =
        document.getElementById("chartType").value;

    if(chartType==="pie"){

        chart.setOption({
            series:[{
                type:"pie",
                data:data.map((d,i)=>({
                    name:"Cluster "+i,
                    value:d.count,
                    itemStyle:{
                        color:`rgb(${d.color[0]},${d.color[1]},${d.color[2]})`
                    }
                }))
            }]
        });

    }else{

        chart.setOption({
            xAxis:{
                type:"category",
                data:data.map((_,i)=>"Cluster "+i)
            },
            yAxis:{type:"value"},
            series:[{
                type:"bar",
                data:data.map(d=>({
                    value:d.count,
                    itemStyle:{
                        color:`rgb(${d.color[0]},${d.color[1]},${d.color[2]})`
                    }
                }))
            }]
        });

    }
}

async function testBackend(){

    const response = await fetch(
        "http://127.0.0.1:5000/test",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                hello:"frontend"
            })
        }
    );

    const result = await response.json();

    console.log("后端返回:", result);
}
async function analyzeHarmonyAI(data){

    const response = await fetch(
        "http://127.0.0.1:5000/harmony",
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                colors:data.map(d=>d.color)
            })
        }
    );

    const result = await response.json();

    showHarmony(result.analysis);
}