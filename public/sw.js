if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const r=e=>n(e,c),o={module:{uri:c},exports:t,require:r};s[c]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(i(...e),t)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/9YEu2eH7xBqTpoiMCH1uJ/_buildManifest.js",revision:"95d313c16ce8162b4ff282ffc97173d5"},{url:"/_next/static/9YEu2eH7xBqTpoiMCH1uJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/664-ed2e5b2e7f454ca1.js",revision:"ed2e5b2e7f454ca1"},{url:"/_next/static/chunks/675-cadafe4612252715.js",revision:"cadafe4612252715"},{url:"/_next/static/chunks/framework-66d32731bdd20e83.js",revision:"66d32731bdd20e83"},{url:"/_next/static/chunks/main-c4c39955b2194a4a.js",revision:"c4c39955b2194a4a"},{url:"/_next/static/chunks/pages/_app-4932b991fc6aef07.js",revision:"4932b991fc6aef07"},{url:"/_next/static/chunks/pages/_error-ee5b5fb91d29d86f.js",revision:"ee5b5fb91d29d86f"},{url:"/_next/static/chunks/pages/index-07c6463ad7d2185e.js",revision:"07c6463ad7d2185e"},{url:"/_next/static/chunks/pages/login-9ce85aabc2c32a04.js",revision:"9ce85aabc2c32a04"},{url:"/_next/static/chunks/pages/profile-12900677dd125e0a.js",revision:"12900677dd125e0a"},{url:"/_next/static/chunks/pages/story/%5Bid%5D-69d5a801a3123a94.js",revision:"69d5a801a3123a94"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-ee7e63bc15b31913.js",revision:"ee7e63bc15b31913"},{url:"/_next/static/css/176cfe42cac695e8.css",revision:"176cfe42cac695e8"},{url:"/_next/static/css/431944509084d071.css",revision:"431944509084d071"},{url:"/favicon.ico",revision:"c30c7d42707a47a3f4591831641e50dc"},{url:"/google.png",revision:"1e01fe36388e7453ab926c23b190827c"},{url:"/hero.jpg",revision:"cceacec9f8ff81aa83236286e8f8278d"},{url:"/house.svg",revision:"1def23b8caae909218514926ee42feea"},{url:"/icon-128x128.png",revision:"5a8a7cc8a79f4030d233e4ff6675158f"},{url:"/icon-144x144.png",revision:"788d9998f51533cfba2e8a943f5fb15f"},{url:"/icon-152x152.png",revision:"6465c83b09e156d106c61ea8f8689eb2"},{url:"/icon-192x192.png",revision:"571363f6b34a7c31c367839a99dd7a87"},{url:"/icon-384x384.png",revision:"66fca9f0daa4c870a70ffd6276d6f51d"},{url:"/icon-512x512.png",revision:"a85220e876b34c10c524d992a20421b7"},{url:"/icon-72x72.png",revision:"b08023d3834e0dcce27d93219a277105"},{url:"/icon-96x96.png",revision:"6568fd33c004ba756acdf8f48c850551"},{url:"/logo.png",revision:"5ce6125fec3948f2c07aabe7e5de758e"},{url:"/manifest.json",revision:"d1845d44663e361b26f7d93312b0c74f"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/play-button-svgrepo-com.svg",revision:"f1bb3a75abd368d93ac72b57a6e2dc25"},{url:"/play-solid.svg",revision:"db5bf3ceb1660ef42bfe07cdb533e728"},{url:"/profile.svg",revision:"8e24b46b4a08671e161098322f0b822a"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
