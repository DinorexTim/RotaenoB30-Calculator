const songlist = document.getElementById('songlist');

async function getSongInfo(sortord=0){
    try{
        const response = await fetch('./songs.json');
        const responseUser = await fetch('./userdata.json');
        const data = await response.json();
        const dataUser = await responseUser.json();
        console.log(data);
        let songs=data.songs;
        processSortord(sortord,songs);
        for(let index =0;index<songs.length;index++){
            let songindex=dataUser.info.findIndex(item => item.title === processTitle(songs[index].id) && item.ratingClass === 3);
            if(songindex==-1){
                songlist.innerHTML+=` 
                <div class="unit">
                    <div class="songName">${processTitle(songs[index].id)}</div>
                    <div class="songArtist">${songs[index].artist}</div>
                    <div class="ratingClass">${transferRatingClass(songs[index].difficulties[3].ratingClass)}</div>
                    <div class="ratingReal">${songs[index].difficulties[3].ratingReal}</div>
                    <div class="score"><input type="number" min="0" max="10010000"></div>
                </div>`;
            }else{
                songlist.innerHTML+=` 
                <div class="unit">
                    <div class="songName">${processTitle(songs[index].id)}</div>
                    <div class="songArtist">${songs[index].artist}</div>
                    <div class="ratingClass">${transferRatingClass(songs[index].difficulties[3].ratingClass)}</div>
                    <div class="ratingReal">${songs[index].difficulties[3].ratingReal}</div>
                    <div class="score"><input type="number" min="0" max="10010000" value=${dataUser.info[songindex].score}></div>
                </div>`;
            }
        }
        songlist.innerHTML+="<br><br><br><br><br>";
        document.querySelector(".spinner").remove();
        songlist.scrollHeight=200;
        adjustScrollContentWidth();
        const contents = document.querySelectorAll('.unit');
        
        contents.forEach(content=>{
            const inputs = content.querySelectorAll('input[type="number"]');
            inputs.forEach(input=>{
                input.addEventListener('change',(event)=>{
                    const score = event.target.value;
                    fetch('/updateScore',{
                        method:"POST",
                        body:JSON.stringify({
                            "title":content.querySelector(".songName").innerText,
                            "ratingClass":3,
                            "ratingReal":parseFloat(content.querySelector(".ratingReal").innerText),
                            "score":score
                        })
                    })
                })
            });
        });
    }catch(error){
        console.error('Error reading JSON file:', error);      
    }
}

//歌曲列表排序方式
function processSortord(sortord,songlist){
    switch(sortord){
        case 0:{
            songlist.sort((a,b)=>{
                return b.difficulties[3].ratingReal-a.difficulties[3].ratingReal;
            });
            break;
        }
        case 1:{
            songlist.sort((a,b)=>{
                return b.difficulties[3].ratingReal-a.difficulties[3].ratingReal;
            });
            break;
        }
        case 2:{
            songlist.sort((a,b)=>{
                return b.difficulties[3].ratingReal-a.difficulties[3].ratingReal;
            });
            break;
        }
        case 3:{
            songlist.sort((a,b)=>{
                return b.difficulties[3].ratingReal-a.difficulties[3].ratingReal;
            });
            break;
        }
        default: break;
    }
}


//将ratingClass转化为实际难度等级
function transferRatingClass(ratingClass){
    switch(ratingClass){
        case 0:{
            return "I";   
        }
        case 1:{
            return "II";
        }
        case 2:{
            return "III";
        }
        case 3:{
            return "IV";
        }
        default:
            return null
    }
}

//处理歌曲标题
function processTitle(title){
    //删除“-”
    return title.replace(/-/g," ")
}

function adjustScrollContentWidth() {
    const container = document.querySelector('.songlist');
    const contents = document.querySelectorAll('.unit');
    
    contents.forEach(content=>{
        const radius = container.offsetWidth / 2;
        const centerY = container.offsetHeight / 2;
        const elemRect = content.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();
        const offsetY = elemRect.top - contRect.top;
        const y = Math.abs(centerY - offsetY - content.offsetHeight / 2);
        const chordWidth = Math.sqrt(radius * radius - y * y) * 2;
        content.style.width = `${chordWidth-60}px`;
    });
  }

//监测调整歌曲条宽度
document.getElementById('songlist').addEventListener('scroll',adjustScrollContentWidth);

window.onload=async()=>{
    getSongInfo();
}