var currentIndex = 0;
var audio = new Audio();
audio.autoplay = true;
audio.volume = 0.1;
getmusicList(function(list){
    musicList = list;
    loadMusic(list[currentIndex]);
    MusicList(list);
});
audio.ontimeupdate = function(){
    $('.progress-now').style.width = (this.currentTime/this.duration)*100 +"%";
    var min = Math.floor(this.currentTime/60);
    var sec = Math.floor(this.currentTime)%60 +'';
    sec = sec.length===2? sec : '0' + sec;
    $('.time').innerText = min +":"+sec;
}
$('.play').onclick = function(){
    if(audio.paused){
        audio.play();
        this.querySelector('.fa').classList.remove('fa-play');
        this.querySelector('.fa').classList.add('fa-pause');
        
    }else{
        audio.pause();
        this.querySelector('.fa').classList.remove('fa-pause');
        this.querySelector('.fa').classList.add('fa-play');
    }
}
$('.forward').onclick = function(){
    currentIndex = (++currentIndex)%musicList.length;
    loadMusic(musicList[currentIndex]);
};
$('.back').onclick = function(){
    currentIndex = (musicList.length+(--currentIndex))%musicList.length;
    loadMusic(musicList[currentIndex]);
}
$('.bar').onclick = function(e){
    var perrent = e.offsetX/parseInt(getComputedStyle(this).width);
    audio.currentTime = audio.duration*perrent;
}
audio.onended = function (){
    currentIndex = ++currentIndex%musicList.length;
    loadMusic(musicList[currentIndex]);
}
function getmusicList(callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','https://easy-mock.com/mock/5b51e1519ce5fe26a0a304c1/music/date',true);
    xhr.onload = function(){
        if(xhr.status>=200&&xhr.status<=300||xhr.status===304){
            callback(JSON.parse(this.responseText));
        }else{
            console.log("获取数据失败");
        }
    };
    xhr.onerror = function(){
        console.log("网络异常");
    };
    xhr.send();
};
function loadMusic(musicObj){
    audio.src = musicObj.src;
    $('.info .title').innerText = musicObj.title;
    $('.info .auther').innerText = musicObj.auther;
    $('.cover').style.backgroundImage = 'url('+musicObj.img+')';
}
function $(selector){
    return document.querySelector(selector);
}
function MusicList(list){
    var html = '';
    for(var key in list){
        html += '<li>'+ list[key].title +'</li>';
    }
    $('.music-list').innerHTML = html;
}
