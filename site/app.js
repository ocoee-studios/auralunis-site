"use strict";
const features = {
  see: {symbol:"✧",kicker:"A PLANETARIUM IN YOUR POCKET",title:"Turn ‘what is that?’ into a discovery.",copy:"Move your iPhone to explore a rendered sky aligned with your direction. Browse at your own pace in Manual Sky Map, or use Find Mode to seek out a celestial target.",foot:"Sky Lens uses location and motion sensors. No camera overlay."},
  plan: {symbol:"☾",kicker:"A LITTLE PLANNING. A LOT OF WONDER.",title:"Give tonight a reason to look up.",copy:"Check Tonight Score for a sense of stargazing conditions, explore observing forecasts in Astro Weather, and browse the Celestial Calendar for events that catch your curiosity.",foot:"Conditions and visibility vary by location. Forecasts are estimates."},
  keep: {symbol:"✦",kicker:"MAKE THE COSMOS PERSONAL",title:"Some skies stay with you.",copy:"Revisit the sky for a meaningful date, time, and place with Birth Sky. Keep notes and captures in your Vault, then share a little of what you discovered.",foot:"Birth Sky and premium experiences are included with AuraLunis Lifetime."}
};
const tabs = [...document.querySelectorAll('[role="tab"]')];
function selectFeature(tab) {
  const feature = features[tab.dataset.feature];
  tabs.forEach(item => {const selected = item === tab;item.setAttribute("aria-selected", String(selected));item.tabIndex = selected ? 0 : -1;});
  document.getElementById("feature-panel").setAttribute("aria-labelledby", tab.id);
  for (const key of ["symbol", "kicker", "title", "copy", "foot"]) document.getElementById(`panel-${key}`).textContent = feature[key];
}
tabs.forEach((tab,index) => {
  tab.addEventListener("click", () => selectFeature(tab));
  tab.addEventListener("keydown", event => {
    let next;
    if(event.key === "ArrowRight" || event.key === "ArrowDown") next = (index+1)%tabs.length;
    if(event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index+tabs.length-1)%tabs.length;
    if(event.key === "Home") next = 0;
    if(event.key === "End") next = tabs.length-1;
    if(next !== undefined){event.preventDefault();selectFeature(tabs[next]);tabs[next].focus();}
  });
});

// Scroll locally without relying on file-preview fragment navigation.
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.getElementById(link.getAttribute("href").slice(1));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({preventScroll: true});
  });
});
