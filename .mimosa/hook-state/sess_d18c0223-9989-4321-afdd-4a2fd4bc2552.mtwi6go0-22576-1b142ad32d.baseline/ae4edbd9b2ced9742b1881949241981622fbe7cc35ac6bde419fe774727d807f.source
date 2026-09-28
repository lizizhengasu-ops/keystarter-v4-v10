import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export default function AnimInit() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero entrance
    gsap.from('.hero-title', {y:80,opacity:0,duration:1.5,ease:'expo.out',delay:0.15});
    gsap.from('.hero-subtitle', {y:40,opacity:0,duration:1.2,ease:'expo.out',delay:0.4});
    gsap.from('.hero-cta', {y:30,opacity:0,duration:1,ease:'power3.out',delay:0.7,scale:0.96});
    gsap.from('.hero-link-large', {y:10,opacity:0,duration:0.6,ease:'power2.out',delay:0.9});
    
    // Scroll reveal animations
    gsap.from('.float-in', {y:60,opacity:0,duration:0.9,stagger:0.08,ease:'back.out(1.2)',scrollTrigger:{trigger:'.float-in',start:'top 85%'}});
    gsap.from('.scale-in', {scale:0.98,opacity:0,duration:0.8,ease:'power3.out',scrollTrigger:{trigger:'.scale-in',start:'top 85%'}});
    gsap.from('.section-title', {y:20,opacity:0,duration:0.6,ease:'power2.out',scrollTrigger:{trigger:'.section-title',start:'top 90%'}});
    
    // Card grid entrance with stagger
    gsap.set('.card-item', {opacity:0,y:30});
    gsap.to('.card-item', {opacity:1,y:0,stagger:0.1,duration:0.7,ease:'power3.out',scrollTrigger:{trigger:'.card-grid',start:'top 85%'}});
    
    // Stagger items with delay
    gsap.set('.stagger-item', {opacity:0,y:20});
    gsap.to('.stagger-item', {opacity:1,y:0,stagger:0.08,duration:0.6,ease:'power2.out',scrollTrigger:{trigger:'.stagger-grid',start:'top 85%'}});
    
    // Parallax scroll effects
    gsap.from('.hero-image', {scale:1.08,opacity:0,duration:1.5,ease:'power1.out',scrollTrigger:{trigger:'.hero-image',start:'top 60%',end:'bottom top',scrub:1.2}});
    gsap.from('.parallax-up', {y:80,opacity:0,duration:0.8,ease:'power2.out',scrollTrigger:{trigger:'.parallax-up',start:'top 85%',end:'bottom 60%',scrub:1}});
    gsap.to('.parallax-slow', {y:-50,ease:'none',scrollTrigger:{trigger:'.parallax-slow',start:'top bottom',end:'bottom top',scrub:2}});
    
    // Card stagger with back.out
    gsap.from('.stagger-cards', {y:30,opacity:0,stagger:0.05,duration:0.65,ease:'back.out(1.2)',scrollTrigger:{trigger:'.stagger-cards',start:'top 85%'}});
    
    // Content block with stagger
    gsap.from('.content-block', {y:30,opacity:0,duration:0.6,stagger:0.08,ease:'power2.out',scrollTrigger:{trigger:'.content-block',start:'top 85%'}});
    
    // Section entrance scale
    gsap.from('.section-in', {y:40,opacity:0,scale:0.99,duration:0.7,ease:'power2.out',scrollTrigger:{trigger:'.section-in',start:'top 88%',end:'bottom 30%',scrub:0.5}});
    
    // Image zoom on scroll
    gsap.from('.img-zoom', {scale:1.1,opacity:0.8,duration:0.8,ease:'power1.out',scrollTrigger:{trigger:'.img-zoom',start:'top 80%'}});
    
    // Quick fade up utility
    gsap.from('.fade-up', {y:20,opacity:0,duration:0.5,stagger:0.04,ease:'power2.out',scrollTrigger:{trigger:'.fade-up',start:'top 85%'}});
    
    // Section divider glow
    gsap.from('.divider', {scaleX:0,opacity:0,duration:0.6,ease:'power2.inOut',scrollTrigger:{trigger:'.divider',start:'top 90%'}});
    
    // Text reveal
    gsap.from('.text-reveal', {y:10,opacity:0,duration:0.4,stagger:0.03,ease:'power1.out',scrollTrigger:{trigger:'.text-reveal',start:'top 85%'}});
    
    // Nav entrance
    gsap.from('nav', {y:-44,opacity:0,duration:0.5,ease:'power2.out',delay:0.2});
    
    setTimeout(() => ScrollTrigger.refresh(), 200);
  }, []);
  return null;
}