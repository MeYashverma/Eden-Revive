// Headless logic tests: runs the real game script from ../index.html with real three.js (r128) and a stubbed renderer/DOM.
// Usage: npm i && npm test   (rendering itself cannot be verified here; see README "Known limitations")
const fs=require('fs'),path=require('path'),T3={...require('three')};
T3.WebGLRenderer=class{constructor(){this.shadowMap={}}setSize(){}setPixelRatio(){}render(){this.n=(this.n||0)+1}};
const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8'),game=html.split('<script>')[1].split('</script>')[0];
const c2={createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)}),getImageData:(x,y,w,h)=>({data:new Uint8ClampedArray(w*h*4)}),putImageData(){},fillRect(){},fillText(){},beginPath(){},arc(){},fill(){},moveTo(){},lineTo(){},stroke(){}};
const el=()=>new Proxy({style:{},value:'',textContent:'',disabled:false,width:300,height:300,getContext:()=>c2},{get:(t,k)=>k in t?t[k]:()=>undefined,set:(t,k,v)=>(t[k]=v,true)}),E={},LS={};
Object.assign(globalThis,{THREE:T3,LS,document:{getElementById:i=>E[i]||(E[i]=el()),addEventListener(){},pointerLockElement:null,exitPointerLock(){}},addEventListener(){},innerWidth:1280,innerHeight:720,devicePixelRatio:1,requestAnimationFrame(){},localStorage:{getItem:k=>LS[k]??null,setItem:(k,v)=>{LS[k]=v}}});
new Function(game+`;globalThis.__t=async function(){const out=[],ok=(n,c,x)=>out.push((c?'PASS ':'FAIL ')+n+(x!==undefined?' ['+x+']':''));
 SEED=11;const a=[...Array(40)].map((_,i)=>terr(i*37,i*91));SEED=12;const b=[...Array(40)].map((_,i)=>terr(i*37,i*91));SEED=11;const c=[...Array(40)].map((_,i)=>terr(i*37,i*91));
 ok('same seed -> same terrain',a.every((v,i)=>v===c[i]));ok('different seed -> different terrain',a.some((v,i)=>Math.abs(v-b[i])>1));
 let e=0;for(let i=0;i<200;i++){const x=i*5.3+.7,z=i*3.1+.2;e=Math.max(e,Math.abs(H(x,z)-H(x+.01,z)),Math.abs(H(x,z)-H(x,z+.01)))}ok('terrain continuous (no seams/NaN)',e<.5&&isFinite(e),'max step '+e.toFixed(3));
 $('seed').value='eden';let t0=performance.now();await begin(false);const ms=performance.now()-t0;
 ok('world generated',started&&ready&&chunks.size>10,'chunks='+chunks.size+' total '+ms.toFixed(0)+'ms');ok('spawn on land',H(P.x,P.z)>WL,'h='+H(P.x,P.z).toFixed(1));
 ok('villages, people, deer, wolves exist',vil.length>0&&people.length>0&&deer.length>0&&wolves.length>0,'vil='+vil.length+' people='+people.length+' deer='+deer.length+' wolves='+wolves.length);
 for(let i=0;i<30;i++){last=performance.now()-16;frame()}ok('30 frames ran',rd.n>=30);
 const seen={};let T0=T;const t1=performance.now();while(T-T0<24){sim(2);const k=Math.floor(T%24);if(!seen[k]){const m={};for(const p of people)m[p.st]=(m[p.st]||0)+1;seen[k]=m}}
 const st=new Set();Object.values(seen).forEach(m=>Object.keys(m).forEach(k=>st.add(k)));ok('24 sim hours: citizens cycle through activities',st.size>=5,[...st].join(',')+' in '+(performance.now()-t1).toFixed(0)+'ms');
 ok('night = asleep, day = working',(seen[2].sleeping||0)>=people.length*.8&&(seen[10].working||0)>=people.length*.6);
 ok('animal populations bounded',deer.length<=100&&wolves.length<=20,'deer='+deer.length+' wolves='+wolves.length+' births d/w '+born.deer+'/'+born.wolf+' deaths d/w '+died.deer+'/'+died.wolf);
 let lx=P.x,lz=P.z;for(let r=10;r<60;r+=5){const x=P.x+r,z=P.z;if(H(x,z)>WL+2&&H(x+22,z)>WL+2){lx=x;lz=z;break}}
 const w=mkA(wolves,'Wolf',lx,lz),d=mkA(deer,'Deer',lx+20,lz);w.hg=.8;d.stam=.1;d.hg=0;d.th=0;let k0=died.deer,i=0;for(;i<400&&!d.dead;i++)sim(1);ok('hungry wolf hunts and kills deer',!!d.dead&&died.deer>k0,'after '+i+' sim-seconds');
 const h0={x:P.x+8,z:P.z+8};h0.y=H(h0.x,h0.z);const before=H(h0.x,h0.z);sculpt(h0,1);sculpt(h0,1);ok('sculpt raises terrain',H(h0.x,h0.z)>before+1,before.toFixed(1)+' -> '+H(h0.x,h0.z).toFixed(1));for(let i=0;i<6;i++)frame();
 const np=planted.length;plantAt({x:P.x+20,z:P.z+20,y:Math.max(H(P.x+20,P.z+20),3)});ok('plant tree',planted.length===np+1);
 const ns=structs.length,npe=people.length;let pl=false;for(let r=30;r<120&&!pl;r+=10)for(let a=0;a<12&&!pl;a++){const x=P.x+Math.cos(a)*r,z=P.z+Math.sin(a)*r;if(okH(x,z,0)){placeB({x,z,y:H(x,z)});pl=true}}ok('place house + settlers',structs.length===ns+1&&people.length>npe);
 let wx_=null;for(let r=20;r<3000&&!wx_;r+=15)for(let a=0;a<16&&!wx_;a++){const x=P.x+Math.cos(a)*r,z=P.z+Math.sin(a)*r;if(H(x,z)<WL-2)wx_=[x,z]}ok('building in water is rejected',wx_?!okH(wx_[0],wx_[1],0):false,wx_?'water at '+(wx_[0]|0)+','+(wx_[1]|0):'no water found');
 const snap={e:edits.size,pl:planted.length,hs:structs.length,pe:people.length,v:vil.length,T};ok('save',save()===1,'bytes='+LS[SK].length);await begin(false);ok('new world is clean',edits.size===0&&planted.length===0);await begin(true);
 ok('reload restores edits/trees/houses/people/villages',edits.size===snap.e&&planted.length===snap.pl&&structs.length===snap.hs&&people.length===snap.pe&&vil.length===snap.v);ok('reload restores clock',Math.abs(T-snap.T)<1e-6);
 LS[SK]='{bad';await begin(true);ok('corrupt save is rejected without crashing',true);LS[SK]='';return out};`)();
const urls=[...html.matchAll(/https?:\/\/[^"'\s)<]+/g)].map(m=>m[0]);
globalThis.__t().then(o=>{o.push((/localhost|src="\/|href="\//.test(html)?'FAIL':'PASS')+' no localhost or root-absolute asset paths (GitHub Pages subpath safe)');
 o.push((urls.every(u=>u.startsWith('https://cdnjs.cloudflare.com/'))?'PASS':'FAIL')+' only external URL is the pinned three.js r128 on cdnjs ['+[...new Set(urls)].join(', ')+']');
 console.log(o.join('\n'));process.exit(o.some(l=>l.startsWith('FAIL'))?1:0)}).catch(e=>{console.log('TEST CRASH',e.stack||e);process.exit(1)});
