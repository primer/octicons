let body = l("body");
let main = body.l(".main");
fetch("./css/octicon-map.json").then((response)=>response.json()).then((jso)=>{
    for (let key in jso) {
        let icon = l.CE("i");
        icon.classList.add("oi");
        icon.classList.add("oi-" + jso[key]);
        let wrapper = l.CE("div");
        wrapper.setattr({
            class:"icon-wrapper"
        })
        wrapper.apCh(icon);
        main.apCh(wrapper);
    }
})