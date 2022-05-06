---
title: Demo2
author: OceanPresent
time: 2021-7-2
lang: zh-CN
categories: Hard-Boiled-Wonderland
---

# demo2
```javascript
function debounce(fn,delay){
    let timer = null;
    return function(){
        if(timer){
            clearTimeout(timer);
            timer = null;
        }
        timer = setTimeout(()=>{fn.apply(this,arguments)},delay);
    }
}


function throttle(fn,delay){
    let isTime = true;
    return function(){
        if(!isTime){return;}
        isTime = false;
        setTimeout(
            ()=>{fn.apply(this,arguments);isTime=true;}
            ,delay);
    }
}
```