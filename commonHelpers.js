import{a as w,S as b,i as L}from"./assets/vendor-b11e2a50.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();async function S(t,r){const o="https://pixabay.com/api/?",s={key:"44040237-e4cc253c6c6f225197cba954d",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r};return w.get(o,{params:s})}function v(t){return t.map(r).join("");function r(o){return`<li class="card">
                <a href="${o.largeImageURL}">
                <div class="img-wrapper">
                <img src="${o.webformatURL}" alt="${o.tags}">
                </div>
                </a>
            <table>
                <tr>
                    <th>Likes</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Downloads</th>
                </tr>
                <tr>
                    <td>${o.likes}</td>
                    <td>${o.views}</td>
                    <td>${o.comments}</td>
                    <td>${o.downloads}</td>
                </tr>
            </table>
        </li>`}}const x="/goit-js-hw-12/assets/cross-icon-4f06a8ee.svg",q="/goit-js-hw-12/assets/cross-00850542.svg",P=new b(".gallery a",{captionsData:"alt",captionDelay:250}),d=document.querySelector(".loader-wrapper"),i=document.querySelector(".load-more");i.addEventListener("click",E);const h=document.querySelector(".gallery"),g=document.querySelector(".form");g.addEventListener("submit",$);let l="",c=1;function $(t){t.preventDefault(),h.innerHTML="",u(i),c=1,l=g.querySelector("input").value,l!==""&&y()}async function y(){u(i),f(d);try{const{data:t}=await S(l,c);t.hits.length===0?m():(h.insertAdjacentHTML("beforeend",v(t.hits)),P.refresh(),t.totalHits>c*15?f(i):T())}catch{m()}u(d)}async function E(){const t=document.querySelector(".gallery > li:last-child"),r=Math.ceil(t.getBoundingClientRect().bottom);c+=1,await y(),window.scrollBy({top:r,behavior:"smooth"})}function f(t){t.setAttribute("style","display: flex;")}function u(t){t.setAttribute("style","display: none;")}function p(t,r,o){L.show({title:t,backgroundColor:r,timeout:5e3,titleColor:"#fff",titleSize:"16px",iconUrl:o,buttons:[[`<button style="background: transparent; padding: 0; margin-left: 30px" width="20" height="20"><img src=${q}></button>`,function(s,e){s.hide({transitionOut:"fadeOutUp"},e,"buttonName")}]],close:!1})}function m(){p("Sorry, there are no images matching<br>your search query. Please, try again!","#EF4040",x)}function T(){p("No more photos found","#FFA000","")}
//# sourceMappingURL=commonHelpers.js.map
