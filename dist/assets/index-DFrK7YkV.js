(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function u(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=u(e);fetch(e.href,t)}})();function m(){const d=new Array,n=3,u=2,s=document.getElementById("grid");function e(o,l,f){for(let i=0;i<o;i++){const r=new Array;for(let c=0;c<l;c++){const a={aLive:0,position:{x:c,y:i}};r.push(a)}f.push(r)}}function t(o){const l=r=>`<div> ${r} </div>`,f=()=>o.insertAdjacentHTML("beforeend",l("<i>test</i>"));function i(r,c){return r}console.log(i("none")),d.forEach(r=>{r.forEach(c=>{f()})})}e(n,u,d),t(s)}m();
