const songlist = document.getElementById('songlist');

async function getSongInfo(sortord){
    try{
        const response = await fetch('./songs.json');
        const responseUser = await fetch('./userdata.json');
        const data = await response.json();
        const dataUser = await responseUser.json();
        console.log(data);
        let songs=data.songs;
        processSortord(sortord,songs);
        document.querySelector(".spinner").remove();
        for(let index =0;index<songs.length;index++){
            let songindex=dataUser.info.findIndex(item => item.title === songs[index].title_localized.default && item.ratingClass === 3);
            if(songindex==-1 || dataUser.info[songindex].score == null){
                songlist.innerHTML+=` 
                <div class="unit">
                    <div class="songName">${songs[index].title_localized.default}</div>
                    <div class="songArtist">${songs[index].artist}</div>
                    <div class="ratingClass">${transferRatingClass(songs[index].difficulties[3].ratingClass)}</div>
                    <div class="ratingReal">${songs[index].difficulties[3].ratingReal}</div>
                    <div class="score"><input  class='input' type="number" min="0" max="10010000"></div>
                </div>`;
            }else{
                songlist.innerHTML+=` 
                <div class="unit">
                    <div class="songName">${songs[index].title_localized.default}</div>
                    <div class="songArtist">${songs[index].artist}</div>
                    <div class="ratingClass">${transferRatingClass(songs[index].difficulties[3].ratingClass)}</div>
                    <div class="ratingReal">${songs[index].difficulties[3].ratingReal}</div>
                    <div class="score"><input class='input' type="number" min="0" max="10010000" value=${dataUser.info[songindex].score}></div>
                </div>`;
            }
        }
        songlist.innerHTML+="<br><br><br><br><br>";
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
        const inputs = document.querySelectorAll('.input');
        let currentIndex = 0;

        document.addEventListener('keydown', function(event) {
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                currentIndex = (currentIndex - 1 + inputs.length) % inputs.length;
                focusInput(currentIndex);
                songlist.scrollTop-=50;
            } else if (event.key === 'ArrowDown' || event.key === 'Enter') {
                event.preventDefault();
                currentIndex = (currentIndex + 1) % inputs.length;
                focusInput(currentIndex);
                songlist.scrollTop+=50;
            }
        });

        function focusInput(index) {
            inputs.forEach((input, i) => {
                if (i === index) {
                    input.focus();
                } else {
                    input.blur();
                }
            });
        }
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
                return a.title_localized.default.localeCompare(b.title_localized.default);
            });
            break;
        }
        case 2:{
            songlist.sort((a,b)=>{
                return a.artist.localeCompare(b.artist);
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

document.getElementById('sortLevel').addEventListener('click',()=>{
    songlist.innerHTML=`<br><br><br><br><br><br><div class="spinner"></div>`;
    getSongInfo(0);
});
document.getElementById('sortName').addEventListener('click',()=>{
    songlist.innerHTML=`<br><br><br><br><br><br><div class="spinner"></div>`;
    getSongInfo(1);
});
document.getElementById('sortArtist').addEventListener('click',()=>{
    songlist.innerHTML=`<br><br><br><br><br><br><div class="spinner"></div>`;
    getSongInfo(2);
});

window.onload=async()=>{
    getSongInfo(0);
}