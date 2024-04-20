//计算单曲rating
function calcSingleRating(difficulty, score){
    if(score >= 1008000){
        return difficulty+3.4+(score-1008000)*0.2/2000;
    }else if(score >= 1004000){
        return difficulty+2.4+(score-1004000)/4000;
    }else if(score >= 1000000){
        return difficulty+2+(score-1000000)*0.4/4000;
    }else if(score >= 980000){
        return difficulty+1+(score-980000)/20000;
    }else if(score >= 950000){
        return difficulty+(score-950000)/30000;
    }else if(score >= 900000){
        return difficulty+(score-900000)/50000;
    }else{
        return difficulty-(1000000-score)/100000;
    }
}

//计算B30
function calcB30(ratings){
    let b30=0.0;
    let weight1=0.7/10;
    let weight2=0.3/20;
    for(let index=0;index < 30;index ++){
        //若未填满直接结束
        if(!ratings[index]){
            break;
        }
        //前十首权重占据0.7
        if(index<10){
            b30+=weight1*calcSingleRating(ratings[index].ratingReal,ratings[index].score);
        }else{
            b30+=weight2*calcSingleRating(ratings[index].ratingReal,ratings[index].score);
        }
    }
    return b30.toFixed(3);
}

//计算R10
async function calcR10(b30){
    const response = await fetch('./userdata.json');
    const data = await response.json();
    return (4*data.rating-3*b30).toFixed(3);
}

//计算maxRating
function calcMaxRating(b30,best1){
    return (0.75*b30+0.25*best1).toFixed(3);
}

async function displayB30(){
    try{
        const response = await fetch('/getb30',{
            method:"POST"
        });
        const data = await response.json();
        let best1=0;
        console.log(data.grade);
        // 按计算的单曲rating排序
        processSortord(data.grade);
        for(let index=0;index<data.grade.length;index++){
            if(index==30){
                break;
            }
            //获取b1
            if(index==0){
                best1=calcSingleRating(data.grade[index].ratingReal,data.grade[index].score);
            }
            if(!data.grade[index].title){
                break;
            }
            //添加成绩单元
            document.getElementById('blocklist').innerHTML+=`
            <div class="block">
                <div class="songname">
                    ${data.grade[index].title}
                </div>
                <div class="cover_rating">
                    <img src="/images/song_covers/100px Songs_${data.grade[index].title}.png" alt="">
                    <div class="rating">
                        <p class="score">${data.grade[index].score}</p>
                        <p>${data.grade[index].ratingReal}→${calcSingleRating(data.grade[index].ratingReal,data.grade[index].score).toFixed(3)}</p>
                    </div>
                </div>
            </div>`;
        }
        document.getElementById('userB30').innerText=`${calcB30(data.grade)}`;
        document.getElementById('userR10').innerText=await calcR10(calcB30(data.grade));
        document.getElementById('userMaxRating').innerText=`${calcMaxRating(calcB30(data.grade),best1)}`;
    }catch(error){
        console.error(error);
    }
}

function processSortord(songlist){  
    songlist.sort((a,b)=>{
        return calcSingleRating(b.ratingReal,b.score)-calcSingleRating(a.ratingReal,a.score)
    });
}

//检查屏幕宽度
function checkScreenWidth() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth;
    if (screenWidth < 1120) {
        document.getElementById('logo').style.display='none';
    }else{
        document.getElementById('logo').style.display='block';
    }
}  

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);
  

window.onload=async()=>{
    displayB30();
}