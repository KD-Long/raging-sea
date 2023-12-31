import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

THREE.ColorManagement.enabled = false

/**
 * Base 
 */
// Debug
const gui = new dat.GUI({ width: 340 })
const debugObject ={}
debugObject.depthColor = '#186691'
debugObject.surfaceColor = '#9bd8ff'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/** 
 * Water 
 */
// Geometry
const waterGeometry = new THREE.PlaneGeometry(2, 2, 512, 512)
// const waterGeometry = new THREE.SphereGeometry(1, 512, 256)
// const waterGeometry = new THREE.TorusGeometry( 2, 1, 512, 512 ); 
// Material
const waterMaterial = new THREE.ShaderMaterial({
    vertexShader:vertexShader,
    fragmentShader:fragmentShader,
    uniforms:{
        uTime: {value:0},

        uBigWavesElevation:{value: 0.2},
        uBigWavesFrequency:{value: new THREE.Vector2(4,1.5)}, // x and y values for waves
        uBigWavesSpeed:{value:0.75},

        uSmallWavesElevation:{value:0.15},
        uSmallWavesFrequency:{value:3},
        uSmallWavesSpeed:{value:0.2},
        uSmallWavesIterations:{value:4.0},

        uDepthColor:{value: new THREE.Color(debugObject.depthColor)},
        uSurfaceColor:{value: new THREE.Color(debugObject.surfaceColor)},
        uColorOffset:{value:0.08},
        uColorMultiplier:{value:5},


    }
})

gui.add(waterMaterial.uniforms.uBigWavesElevation,'value',0,1,0.001).name('uBigWavesElevation')
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x',0,10,0.1).name("uBigWavesFrequency.x")
gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y',0,10,0.1).name("uBigWavesFrequency.y")
gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value',0,10,0.1).name("uBigWavesSpeed")

gui.add(waterMaterial.uniforms.uColorOffset, 'value',0,2,0.01).name("uColorOffset")
gui.add(waterMaterial.uniforms.uColorMultiplier, 'value',0,10,0.01).name("uColorMultiplier")

gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value',0,0.5,0.01).name("uSmallWavesElevation")
gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value',0,8,0.01).name("uSmallWavesFrequency")
gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value',0,0.6,0.01).name("uSmallWavesSpeed")
gui.add(waterMaterial.uniforms.uSmallWavesIterations, 'value',0,15.0,1).name("uSmallWavesIterations")


gui.addColor(debugObject, 'depthColor').name("depthColor")
    .onChange(()=>{
        waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor)
    })
gui.addColor(debugObject, 'surfaceColor').name("surfaceColor")
    .onChange(()=>{
        waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor)
    })



// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial)
water.rotation.x = - Math.PI * 0.5
scene.add(water)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 1)
scene.add(camera)

// const axesHelper = new THREE.AxesHelper(2)
// scene.add(axesHelper)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    waterMaterial.uniforms.uTime.value = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()