


const C = {
  ink: "#1B1B16",
  paper: "#EFE7D8",
  paperDark: "#E3D9C4",
  cream: "#F7F2E7",
  oxblood: "#7A2E2E",
  oxbloodDark: "#5E2222",
  forest: "#37483B",
  gold: "#B08D57",
  sage: "#8B9A82",
};


function Footer (){
    return(
     <div style={{ backgroundColor: C.ink, color: C.cream }}>
             <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
               <div className="col-span-2 md:col-span-1">
                 <span className="text-xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}>
                   Foxed &amp; Bound
                 </span>
                 <p className="text-xs mt-3" style={{ color: "rgba(247,242,231,0.6)", fontFamily: "'Source Serif 4', serif" }}>
                   A shelf worth getting lost in.
                 </p>
               </div>
               {[
                 { h: "Shop", items: ["New Arrivals", "Staff Picks", "Gift Cards", "Sale"] },
                 { h: "About", items: ["Our Story", "Visit the Shop", "Events", "Careers"] },
                 { h: "Connect", items: ["Instagram", "Newsletter", "Support"] },
               ].map((col) => (
                 <div key={col.h}>
                   <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{ color: C.gold, fontFamily: "'IBM Plex Mono', monospace" }}>
                     {col.h}
                   </p>
                   <ul className="space-y-2 text-sm" style={{ fontFamily: "'Source Serif 4', serif" }}>
                     {col.items.map((it) => (
                       <li key={it} className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">
                         {it}
                       </li>
                     ))}
                   </ul>
                 </div>
               ))}
             </div>
             <div
               className="text-center text-xs py-4 border-t"
               style={{ borderColor: "rgba(247,242,231,0.15)", color: "rgba(247,242,231,0.5)", fontFamily: "'IBM Plex Mono', monospace" }}
             >
               © 2026 Foxed & Bound — bound with care.
             </div>
           </div>
    )
}
export default Footer