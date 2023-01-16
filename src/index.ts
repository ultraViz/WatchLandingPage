import {
    ViewerApp,
    AssetManagerPlugin,

    addBasePlugins,
    ITexture, TweakpaneUiPlugin, AssetManagerBasicPopupPlugin, CanvasSnipperPlugin,


} from "webgi";
import "./styles.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)

async function setupViewer(){

    // Initialize the viewer
    const viewer = new ViewerApp({
        canvas: document.getElementById('webgi-canvas') as HTMLCanvasElement,
        useRgbm:false,
    })

    // Add some plugins
    const manager = await viewer.addPlugin(AssetManagerPlugin)

    const camera = viewer.scene.activeCamera

    // Add a popup(in HTML) with download progress when any asset is downloading.
    await viewer.addPlugin(AssetManagerBasicPopupPlugin)

    // or use this to add all main ones at once.
    await addBasePlugins(viewer)

    // Add more plugins not available in base, like CanvasSnipperPlugin which has helpers to download an image of the canvas.
    await viewer.addPlugin(CanvasSnipperPlugin)

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline()

    await manager.addFromPath("./assets/Watch.glb")    
    const tl = gsap.timeline({defaults: {duration:0.75, ease: "power1.out"}})

tl.fromTo('.cookie-container',
{
scale:0
},
{
scale:1,
ease:"elastic.out(1, 0.4)", duration:1.5
});

tl.fromTo('.cookie',{opacity:0, x:-50, rotation:'-45deg'}, {opacity:1, x:-0,  rotation:'-0deg'}, '<50%')

tl.fromTo('.text',{x:30, opacity:0}, {x:0, opacity:1}, '<' )

tl.fromTo('.cookie', {y:0, rotation:"0deg" }, {y:-20, rotation:'-20deg', yoyo:true, repeat:Infinity})
tl.fromTo('#crumbs', {y:0,  }, {y:-20,  yoyo:true, repeat:Infinity}, '<')

const closeButton =  document.getElementById('back') as HTMLElement
const modal =  document.getElementById('modal') as HTMLElement
const cookieContainer = document.querySelector('.cookie-container') as HTMLElement
const buynowButton = document.querySelector('.buyNow') as HTMLElement

closeButton.addEventListener('click', ()=>{   
    modal.classList.remove('show')    
    modal.classList.add('hide')  
})

buynowButton.addEventListener('click', ()=>{  
    modal.classList.add('show')
    modal.classList.remove('hide')  
    
}) 

}

setupViewer()




