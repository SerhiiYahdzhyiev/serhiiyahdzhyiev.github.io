import{r as l,j as e}from"./react-vendor.auj285-g.js";function k(d){if(!isFinite(d))return"0:00";const t=Math.floor(d/60),p=Math.floor(d%60);return`${t}:${p.toString().padStart(2,"0")}`}function z({tracks:d}){const[t,p]=l.useState(null),[m,h]=l.useState(!1),[f,v]=l.useState(0),[g,y]=l.useState(0),[b,w]=l.useState(.8),n=l.useRef(null),i=l.useMemo(()=>{const r=new Map;return d.forEach(a=>{const s=a.album??"—";r.has(s)||r.set(s,[]),r.get(s).push(a)}),r.forEach(a=>{a.sort((s,c)=>(parseInt(s.filename)||0)-(parseInt(c.filename)||0))}),Array.from(r.entries()).sort(([a,s],[c,u])=>{const M=s[0]?.year??0;return(u[0]?.year??0)-M||a.localeCompare(c)}).flatMap(([,a])=>a)},[d]),j=l.useMemo(()=>{const r=[];return i.forEach((a,s)=>{const c=a.album??"—",u=r[r.length-1];(!u||u.name!==c)&&r.push({name:c,cover:a.cover,year:a.year,tags:a.tags,entries:[]}),r[r.length-1].entries.push({track:a,idx:s})}),r},[i]),o=t!==null?i[t]:null;l.useEffect(()=>{const r=n.current;!r||t===null||(r.src=`/music/tracks/${i[t].filename}`,r.play().then(()=>h(!0)).catch(()=>h(!1)))},[t,i]),l.useEffect(()=>{n.current&&(n.current.volume=b)},[b]);const N=l.useCallback(()=>{n.current&&v(n.current.currentTime)},[]),C=l.useCallback(()=>{n.current&&y(n.current.duration)},[]),L=l.useCallback(()=>{t!==null&&t<i.length-1?p(t+1):(h(!1),v(0))},[t,i.length]),x=l.useCallback(()=>{const r=n.current;r&&(m?(r.pause(),h(!1)):r.play().then(()=>h(!0)).catch(()=>{}))},[m]),_=l.useCallback(r=>{r===t?x():(p(r),v(0),y(0))},[t,x]),S=l.useCallback(r=>{const a=parseFloat(r.target.value);v(a),n.current&&(n.current.currentTime=a)},[]);return i.length===0?e.jsx("div",{className:"player-empty",children:e.jsx("p",{children:"No tracks yet. Check back soon."})}):e.jsxs("div",{className:"audio-player",children:[e.jsx("audio",{ref:n,onTimeUpdate:N,onLoadedMetadata:C,onEnded:L}),e.jsxs("div",{className:"player-bar",children:[e.jsxs("div",{className:"player-bar__info",children:[e.jsx("div",{className:"player-bar__cover","aria-hidden":"true",children:o?.cover?e.jsx("img",{src:`/music/covers/${o.cover}`,alt:"",className:"player-bar__cover-img"}):e.jsx("div",{className:"player-bar__cover-placeholder"})}),e.jsx("div",{className:"player-bar__info-text",children:o?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"player-bar__title",children:o.title}),e.jsxs("span",{className:"player-bar__meta",children:[o.album&&e.jsx("span",{className:"player-bar__album",children:o.album}),e.jsx("span",{className:"player-bar__year",children:o.year})]})]}):e.jsx("span",{className:"player-bar__idle",children:"Select a track to play"})})]}),e.jsxs("div",{className:"player-bar__controls",children:[e.jsx("button",{className:"player-btn player-btn--prev",onClick:()=>t!==null&&t>0&&p(t-1),disabled:t===null||t===0,"aria-label":"Previous track",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("polygon",{points:"19 20 9 12 19 4 19 20"}),e.jsx("line",{x1:"5",x2:"5",y1:"19",y2:"5"})]})}),e.jsx("button",{className:"player-btn player-btn--play",onClick:o?x:()=>_(0),"aria-label":m?"Pause":"Play",children:m?e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("rect",{x:"6",y:"4",width:"4",height:"16"}),e.jsx("rect",{x:"14",y:"4",width:"4",height:"16"})]}):e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:e.jsx("polygon",{points:"5 3 19 12 5 21 5 3"})})}),e.jsx("button",{className:"player-btn player-btn--next",onClick:()=>t!==null&&t<i.length-1&&p(t+1),disabled:t===null||t===i.length-1,"aria-label":"Next track",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("polygon",{points:"5 4 15 12 5 20 5 4"}),e.jsx("line",{x1:"19",x2:"19",y1:"5",y2:"19"})]})})]}),e.jsxs("div",{className:"player-bar__seek",children:[e.jsx("span",{className:"player-bar__time",children:k(f)}),e.jsx("input",{type:"range",className:"player-seek",min:0,max:g||0,value:f,step:.5,onChange:S,"aria-label":"Seek",disabled:!o}),e.jsx("span",{className:"player-bar__time",children:k(g)})]}),e.jsxs("div",{className:"player-bar__volume",children:[e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5"}),e.jsx("path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14"}),e.jsx("path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07"})]}),e.jsx("input",{type:"range",className:"player-volume",min:0,max:1,step:.05,value:b,onChange:r=>w(parseFloat(r.target.value)),"aria-label":"Volume"})]})]}),e.jsx("div",{className:"album-list",children:j.map(r=>e.jsxs("div",{className:"album-section",children:[e.jsxs("div",{className:"album-header",children:[r.cover&&e.jsx("img",{src:`/music/covers/${r.cover}`,alt:"",className:"album-header__cover","aria-hidden":"true"}),e.jsx("span",{className:"album-header__name",children:r.name}),e.jsx("span",{className:"album-header__year",children:r.year}),e.jsx("span",{className:"album-header__tags",children:r.tags.map(a=>e.jsx("span",{className:"album-header__tag",children:a},a))})]}),e.jsx("ul",{className:"track-list",children:r.entries.map(({track:a,idx:s},c)=>e.jsxs("li",{className:`track-item${s===t?" track-item--active":""}`,children:[e.jsxs("button",{className:"track-item__btn",onClick:()=>_(s),"aria-label":`Play ${a.title}`,"aria-pressed":s===t&&m,children:[e.jsx("span",{className:"track-item__num",children:s===t&&m?e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"12",height:"12",viewBox:"0 0 24 24",fill:"currentColor",stroke:"none","aria-hidden":"true",children:[e.jsx("rect",{x:"6",y:"4",width:"4",height:"16"}),e.jsx("rect",{x:"14",y:"4",width:"4",height:"16"})]}):e.jsx("span",{children:(c+1).toString().padStart(2,"0")})}),e.jsx("span",{className:"track-item__title",children:a.title}),e.jsx("span",{className:"track-item__duration",children:a.duration})]}),e.jsx("a",{href:`/music/tracks/${a.filename}`,download:!0,className:"track-item__download","aria-label":`Download ${a.title}`,onClick:u=>u.stopPropagation(),children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[e.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}),e.jsx("polyline",{points:"7 10 12 15 17 10"}),e.jsx("line",{x1:"12",x2:"12",y1:"15",y2:"3"})]})})]},a.filename))})]},r.name))}),e.jsx("style",{children:`
        .audio-player {
          width: 100%;
        }

        .player-empty {
          color: var(--clr-text-muted);
          font-style: italic;
          padding: var(--sp-6) 0;
        }

        /* Player bar */
        .player-bar {
          display: grid;
          grid-template-columns: 1fr auto 1fr auto;
          align-items: center;
          gap: var(--sp-4);
          padding: var(--sp-4) var(--sp-5);
          background: var(--clr-bg-surface);
          border: 1px solid var(--clr-border-subtle);
          border-radius: var(--rd-lg);
          margin-bottom: var(--sp-5);
        }

        .player-bar__info {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: var(--sp-3);
          min-width: 0;
        }

        .player-bar__cover {
          flex-shrink: 0;
          width: 3rem;
          height: 3rem;
          border-radius: var(--rd-sm);
          overflow: hidden;
          border: 1px solid var(--clr-border-subtle);
          background: var(--clr-surface-1);
        }

        .player-bar__cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .player-bar__cover-placeholder {
          width: 100%;
          height: 100%;
          background: var(--clr-surface-2);
        }

        .player-bar__info-text {
          display: flex;
          flex-direction: column;
          gap: var(--sp-1);
          min-width: 0;
        }

        .player-bar__title {
          font-weight: var(--fw-medium);
          color: var(--clr-text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .player-bar__meta {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
        }

        .player-bar__album::after {
          content: "·";
          margin-left: var(--sp-2);
        }

        .player-bar__idle {
          font-size: var(--fs-1);
          color: var(--clr-text-muted);
          font-style: italic;
        }

        .player-bar__controls {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
        }

        .player-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 1px solid var(--clr-border-subtle);
          border-radius: var(--rd-md);
          color: var(--clr-text-muted);
          cursor: pointer;
          padding: var(--sp-2);
          transition: color 0.15s ease, border-color 0.15s ease, background 0.15s ease;
        }

        .player-btn:hover:not(:disabled) {
          color: var(--clr-accent);
          border-color: var(--clr-accent);
          background: var(--clr-surface-1);
        }

        .player-btn:disabled {
          opacity: 0.3;
          cursor: default;
        }

        .player-btn--play {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          border-color: var(--clr-border-strong);
          color: var(--clr-text-primary);
        }

        .player-bar__seek {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
          flex: 1;
        }

        .player-bar__time {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
          min-width: 3ch;
          text-align: center;
        }

        .player-seek,
        .player-volume {
          flex: 1;
          -webkit-appearance: none;
          appearance: none;
          height: 3px;
          background: var(--clr-border-strong);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }

        .player-seek::-webkit-slider-thumb,
        .player-volume::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--clr-text-primary);
          cursor: pointer;
        }

        .player-seek:disabled {
          opacity: 0.4;
          cursor: default;
        }

        .player-bar__volume {
          display: flex;
          align-items: center;
          gap: var(--sp-2);
          color: var(--clr-text-muted);
          min-width: 100px;
        }

        .player-volume {
          width: 80px;
          flex: none;
        }

        /* Album list */
        .album-list {
          display: flex;
          flex-direction: column;
          gap: var(--sp-4);
        }

        .album-section {
          border: 1px solid var(--clr-border-subtle);
          border-radius: var(--rd-lg);
          overflow: hidden;
        }

        .album-header {
          display: flex;
          align-items: center;
          gap: var(--sp-3);
          padding: var(--sp-3) var(--sp-5);
          background: var(--clr-bg-surface);
          border-bottom: 1px solid var(--clr-border-subtle);
        }

        .album-header__cover {
          flex-shrink: 0;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: var(--rd-sm);
          object-fit: cover;
          border: 1px solid var(--clr-border-subtle);
        }

        .album-header__name {
          font-weight: var(--fw-medium);
          font-size: var(--fs-1);
          color: var(--clr-text-primary);
          flex: 1;
        }

        .album-header__year {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
        }

        .album-header__tags {
          display: flex;
          gap: var(--sp-1);
        }

        .album-header__tag {
          font-family: var(--ff-mono);
          font-size: 0.7rem;
          padding: 0.15em 0.5em;
          border: 1px solid var(--clr-border-subtle);
          border-radius: 2px;
          color: var(--clr-text-muted);
        }

        /* Track list */
        .track-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .track-item {
          display: flex;
          align-items: center;
          border-bottom: 1px solid var(--clr-border-subtle);
        }

        .track-item:last-child {
          border-bottom: none;
        }

        .track-item--active {
          background: var(--clr-surface-1);
        }

        .track-item--active .track-item__title {
          color: var(--clr-text-primary);
          font-weight: var(--fw-medium);
        }

        .track-item__download {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--sp-4) var(--sp-4) var(--sp-4) var(--sp-2);
          color: var(--clr-text-muted);
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .track-item__download:hover {
          color: var(--clr-accent);
        }

        .track-item__btn {
          flex: 1;
          min-width: 0;
          display: grid;
          grid-template-columns: 2rem 1fr auto;
          align-items: center;
          gap: var(--sp-3);
          padding: var(--sp-3) var(--sp-5);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          color: inherit;
          transition: background 0.15s ease;
        }

        .track-item__btn:hover {
          background: var(--clr-surface-1);
        }

        .track-item--active .track-item__btn:hover {
          background: var(--clr-surface-2);
        }

        .track-item__num {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .track-item__title {
          font-size: var(--fs-1);
          color: var(--clr-text-secondary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.15s ease;
        }

        .track-item__btn:hover .track-item__title {
          color: var(--clr-accent);
        }

        .track-item__duration {
          font-family: var(--ff-mono);
          font-size: var(--fs-0);
          color: var(--clr-text-muted);
          min-width: 3.5ch;
          text-align: right;
        }

        @media (max-width: 600px) {
          .player-bar {
            grid-template-columns: 1fr auto;
            grid-template-rows: auto auto;
          }

          .player-bar__seek {
            grid-column: 1 / -1;
          }

          .player-bar__volume {
            display: none;
          }

          .album-header__tags {
            display: none;
          }
        }
      `})]})}export{z as default};
