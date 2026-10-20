// src/components/HeritageModelViewer.jsx
// Reusable R3F viewer — ONE Canvas stays alive; only the GLB model swaps.
// Proper WebGL context disposal prevents context-exhaustion crashes.
import './HeritageModelViewer.css'
import { Suspense, useRef, useState, useEffect, useCallback, Component } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, useProgress, Html } from '@react-three/drei'
import * as THREE from 'three'
import { RotateCcw, Maximize2, Play, Pause, AlertTriangle } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
   fitCameraToModel
   Centers the scene at origin, positions camera at safe distance.
   Works for any GLB regardless of original scale.
───────────────────────────────────────────────────────────────────────────── */
function fitCameraToModel(scene, camera, controls) {
  const box = new THREE.Box3().setFromObject(scene)
  if (box.isEmpty()) return

  const size = new THREE.Vector3()
  const center = new THREE.Vector3()
  box.getSize(size)
  box.getCenter(center)

  // Center at origin
  scene.position.sub(center)

  const radius = Math.sqrt(size.x ** 2 + size.y ** 2 + size.z ** 2) / 2
  const fovRad = (camera.fov * Math.PI) / 180
  const distance = (radius / Math.sin(fovRad / 2)) * 1.25

  camera.position.set(distance * 0.65, radius * 0.35, distance)
  camera.near = Math.max(0.001, distance * 0.001)
  camera.far = distance * 20
  camera.lookAt(0, 0, 0)
  camera.updateProjectionMatrix()

  if (controls) {
    controls.target.set(0, 0, 0)
    controls.minDistance = distance * 0.15
    controls.maxDistance = distance * 5
    controls.update()
  }
}

/* ─── Progress loader ─── */
function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <div className="hmv-loader">
        <div className="hmv-spinner" />
        <p className="hmv-loader-text">Loading… {Math.round(progress)}%</p>
        <div className="hmv-progress-bar">
          <div className="hmv-progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </Html>
  )
}

/* ─── Error state inside canvas ─── */
function ModelError({ title }) {
  return (
    <Html center>
      <div className="hmv-error">
        <span className="hmv-error-icon">⚠</span>
        <p className="hmv-placeholder-title">{title}</p>
        <p className="hmv-placeholder-sub">Model could not be loaded</p>
      </div>
    </Html>
  )
}

/* ─── Placeholder when no modelPath ─── */
function Placeholder({ title }) {
  return (
    <Html center>
      <div className="hmv-placeholder">
        <div className="hmv-placeholder-icon">◈</div>
        <p className="hmv-placeholder-title">{title}</p>
        <p className="hmv-placeholder-sub">3D model coming soon</p>
      </div>
    </Html>
  )
}

/* ─── GLB Model — remounts only when `url` changes (keyed by parent) ─── */
function GLBModel({ url, onLoaded, controlsRef, autoRotate }) {
  const { scene: gltfScene } = useGLTF(url)
  const { camera, scene } = useThree()
  const modelRef = useRef()
  const fittedRef = useRef(false)

  // Clone so swapping models doesn't mutate shared cache
  const cloned = useRef(gltfScene.clone(true))

  useEffect(() => {
    const model = cloned.current
    fittedRef.current = false

    // Enable shadows
    model.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) child.material.needsUpdate = true
      }
    })

    // Frame: fit camera after one paint
    const raf = requestAnimationFrame(() => {
      fitCameraToModel(model, camera, controlsRef?.current)
      fittedRef.current = true
      if (onLoaded) onLoaded()
    })
    return () => cancelAnimationFrame(raf)
  }, [url]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <group ref={modelRef}>
      <primitive object={cloned.current} />
    </group>
  )
}

/* ─── Error boundary for GLBModel ─── */
class GLBErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch(err) {
    console.warn('[HeritageModelViewer] GLB load error:', err.message)
  }
  render() {
    if (this.state.hasError) return <ModelError title={this.props.title} />
    return this.props.children
  }
}

/* ─── Dispose hook: frees GPU memory when Canvas unmounts ─── */
function ContextDisposer() {
  const { gl, scene } = useThree()
  useEffect(() => {
    return () => {
      // Traverse and dispose geometries + materials
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m?.dispose())
          } else {
            obj.material?.dispose()
          }
        }
      })
      gl.dispose()
    }
  }, [gl, scene])
  return null
}

/* ─── Inner scene — lighting + controls + swappable model ─── */
function Scene({ modelPath, title, onLoaded, autoRotate, controlsRef, modelKey }) {
  return (
    <>
      <ContextDisposer />

      {/* Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={2.0}
        color="#fff8ee"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={500}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <directionalLight position={[-4, 3, -4]} intensity={0.45} color="#d0e0ff" />
      <hemisphereLight skyColor="#fff5e0" groundColor="#5c4a2a" intensity={0.35} />
      <Environment preset="sunset" />

      {/* Ground shadow catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[1000, 1000]} />
        <shadowMaterial opacity={0.12} />
      </mesh>

      {/* Model — key forces remount only when model changes */}
      {modelPath ? (
        <GLBErrorBoundary title={title} key={modelKey}>
          <Suspense fallback={<Loader />}>
            <GLBModel
              url={modelPath}
              onLoaded={onLoaded}
              controlsRef={controlsRef}
              autoRotate={autoRotate}
            />
          </Suspense>
        </GLBErrorBoundary>
      ) : (
        <Placeholder title={title} />
      )}

      {/* OrbitControls — stays alive across model swaps */}
      <OrbitControls
        ref={controlsRef}
        enablePan
        enableZoom
        enableRotate
        autoRotate={autoRotate}
        autoRotateSpeed={0.4}
        dampingFactor={0.08}
        enableDamping
        makeDefault
      />
    </>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   HeritageModelViewer — public API
   The Canvas is created ONCE. Switching modelPath only remounts the inner
   GLBModel, not the Canvas/WebGL context, preventing context-exhaustion.
───────────────────────────────────────────────────────────────────────────── */
export default function HeritageModelViewer({
  modelPath,
  modelUrl,
  title = 'Heritage Model',
  location,
  period,
}) {
  const resolvedModelPath = modelPath || modelUrl
  const [loaded, setLoaded] = useState(false)
  const [webglError, setWebglError] = useState(false)
  const [autoRotate, setAutoRotate] = useState(true)
  const wrapperRef = useRef(null)
  const controlsRef = useRef(null)
  // Unique key per modelPath so GLBModel remounts on model switch
  const modelKey = resolvedModelPath || 'placeholder'

  const handleLoaded = useCallback(() => setLoaded(true), [])

  // Reset loaded flag when model changes
  useEffect(() => {
    setLoaded(false)
    setWebglError(false)
  }, [resolvedModelPath])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      wrapperRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  if (webglError) {
    return (
      <div className="hmv-wrapper hmv-fatal">
        <AlertTriangle size={28} className="text-orange-400 mb-3" />
        <p className="hmv-placeholder-title">3D Viewer Unavailable</p>
        <p className="hmv-placeholder-sub">
          Your browser has run out of WebGL contexts.<br />
          Refresh the page to restore 3D viewing.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="hmv-reload-btn"
        >
          Refresh Page
        </button>
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className="hmv-wrapper">
      {/* Single persistent Canvas — never remounted between model switches */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        frameloop="demand"
        camera={{ position: [0, 2, 10], fov: 45, near: 0.01, far: 5000 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          // Listen for context loss at the WebGL level
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault()
            setWebglError(true)
          })
        }}
      >
        <Scene
          modelPath={resolvedModelPath}
          title={title}
          onLoaded={handleLoaded}
          autoRotate={autoRotate}
          controlsRef={controlsRef}
          modelKey={modelKey}
        />
      </Canvas>

      {/* Controls overlay */}
      <div className="hmv-controls-overlay">
        <button
          onClick={() => setAutoRotate((v) => !v)}
          className="hmv-ctrl-btn"
          title={autoRotate ? 'Pause rotation' : 'Resume rotation'}
        >
          {autoRotate ? <Pause size={13} /> : <Play size={13} />}
        </button>
        <button onClick={toggleFullscreen} className="hmv-ctrl-btn" title="Fullscreen">
          <Maximize2 size={13} />
        </button>
      </div>

      {/* Info overlay */}
      {loaded && (
        <div className="hmv-info-overlay">
          <div className="hmv-info-title">{title}</div>
          {location && <div className="hmv-info-meta">{location}</div>}
          {period && <div className="hmv-info-meta">{period}</div>}
        </div>
      )}

      {/* Hint */}
      {loaded && (
        <div className="hmv-hint">
          <span>Drag · Scroll · Right-drag to pan</span>
        </div>
      )}
    </div>
  )
}
