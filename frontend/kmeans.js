
function distance(a, b) {
    return Math.sqrt(
        (a[0]-b[0])**2 +
        (a[1]-b[1])**2 +
        (a[2]-b[2])**2
    );
}

function randomCenters(data, k) {
    let centers = [];
    for(let i=0;i<k;i++){
        centers.push(
            data[Math.floor(Math.random()*data.length)]
        );
    }
    return centers;
}

function kmeans(data, k, maxIter=10){

    let centers = randomCenters(data, k);
    let clusters = [];

    for(let iter=0; iter<maxIter; iter++){

        clusters = Array.from({length:k}, ()=>[]);

        // 分配
        data.forEach(point=>{

            let minDist = Infinity;
            let index = 0;

            centers.forEach((c,i)=>{
                let d = distance(point,c);
                if(d < minDist){
                    minDist = d;
                    index = i;
                }
            });

            clusters[index].push(point);
        });

        // 更新中心
        centers = clusters.map(cluster=>{

            if(cluster.length===0) return data[Math.floor(Math.random()*data.length)];

            let sum=[0,0,0];

            cluster.forEach(p=>{
                sum[0]+=p[0];
                sum[1]+=p[1];
                sum[2]+=p[2];
            });

            return [
                sum[0]/cluster.length,
                sum[1]/cluster.length,
                sum[2]/cluster.length
            ];
        });
    }

    return {centers, clusters};
}