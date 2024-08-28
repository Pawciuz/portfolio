<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import islandSceneUrl from '~/assets/3d/island.glb?url'
import { DRACOLoader } from 'three-stdlib'

const props = defineProps<{
    isRotating: boolean
    currentFocusPoint: object | null
}>()

const emit = defineEmits(['update:isRotating', 'update:currentStage'])
const container = ref<HTMLDivElement | null>(null)
const isLoaded = ref(false) // Dodajemy stan śledzenia załadowania

let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let island: THREE.Object3D | null = null
let clouds: THREE.Group | null = null
let rotationSpeed = 0
const lastX = ref(0)
const dampingFactor = 0.95

const handlePointerDown = (event: PointerEvent) => {
    event.stopPropagation()
    event.preventDefault()
    emit('update:isRotating', true)
    lastX.value = event.clientX
}

const handlePointerUp = (event: PointerEvent) => {
    event.stopPropagation()
    event.preventDefault()
    emit('update:isRotating', false)
}

const handlePointerMove = (event: PointerEvent) => {
    event.stopPropagation()
    event.preventDefault()
    if (props.isRotating && island && clouds) {
        const clientX = event.clientX
        const delta = (clientX - lastX.value) / window.innerWidth
        island.rotation.y += delta * 0.5 * Math.PI
        clouds.rotation.y += delta * 0.5 * Math.PI
        lastX.value = clientX
        rotationSpeed = delta * 0.01
    }
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (island && clouds) {
        if (event.key === 'ArrowLeft') {
            if (!props.isRotating) emit('update:isRotating', true)
            rotationSpeed = 0.01
        } else if (event.key === 'ArrowRight') {
            if (!props.isRotating) emit('update:isRotating', true)
            rotationSpeed = -0.01
        }
    }
}

const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        emit('update:isRotating', false)
    }
}

const createCloud = () => {
    const cloudGroup = new THREE.Group()
    const numBlobs = Math.floor(Math.random() * 5) + 3

    for (let i = 0; i < numBlobs; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 3 + 1, 32, 32)
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: -3,
        })
        const cloudPart = new THREE.Mesh(geometry, material)

        cloudPart.position.set(
            Math.random() * 4 - 2,
            Math.random() * 2,
            Math.random() * 4 - 2,
        )
        cloudGroup.add(cloudPart)
    }

    return cloudGroup
}

const setupClouds = () => {
    clouds = new THREE.Group()
    const numClouds = 100

    for (let i = 0; i < numClouds; i++) {
        const cloud = createCloud()
        const phi = Math.random() * Math.PI * 2
        const theta = Math.random() * Math.PI
        const radius = Math.random() * 50 + 100

        cloud.position.setFromSpherical(new THREE.Spherical(radius, theta, phi))
        cloud.lookAt(new THREE.Vector3(0, 0, 0))
        cloud.scale.multiplyScalar(Math.random() * 2 + 1)

        clouds.add(cloud)
    }
    scene.add(clouds)
}

const animate = () => {
    requestAnimationFrame(animate)

    if (island && clouds) {
        if (!props.isRotating) {
            rotationSpeed *= dampingFactor
            if (Math.abs(rotationSpeed) < 0.001) {
                rotationSpeed = 0
            }

            island.rotation.y += rotationSpeed
            clouds.rotation.y += rotationSpeed
        } else {
            const rotation = island.rotation.y
            const normalizedRotation =
                ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
            let currentStage: number | null
            switch (true) {
                case normalizedRotation >= 5.25 && normalizedRotation <= 5.85:
                    currentStage = 4
                    break
                case normalizedRotation >= 0.65 && normalizedRotation <= 1.3:
                    currentStage = 3
                    break
                case normalizedRotation >= 2.3 && normalizedRotation <= 2.7:
                    currentStage = 2
                    break
                case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
                    currentStage = 1
                    break
                default:
                    currentStage = null
            }
            emit('update:currentStage', currentStage)
        }

        clouds.children.forEach((cloud: THREE.Object3D) => {
            cloud.rotation.y += 0.0005
            cloud.position.y +=
                Math.sin(Date.now() * 0.0005 + cloud.position.x) * 0.005
        })
    }

    if (renderer && scene && camera) {
        renderer.render(scene, camera)
    }
}

const handleResize = () => {
    if (container.value && camera && renderer) {
        camera.aspect =
            container.value.clientWidth / container.value.clientHeight

        camera.updateProjectionMatrix()
        renderer.setSize(
            container.value.clientWidth,
            container.value.clientHeight,
        )
    }
}

onMounted(() => {
    if (container.value) {
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera(
            75,
            container.value.clientWidth / container.value.clientHeight,
            0.1,
            1000,
        )
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(
            container.value.clientWidth,
            container.value.clientHeight,
        )
        container.value.appendChild(renderer.domElement)
        renderer.setClearColor(0x87ceeb)

        setupClouds()

        camera.position.z = 60
        camera.position.y = 10
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
        directionalLight.position.set(5, 10, 7.5)
        scene.add(directionalLight)

        const loader = new GLTFLoader()
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/')
        loader.setDRACOLoader(dracoLoader)

        loader.load(islandSceneUrl, (gltf) => {
            island = gltf.scene
            island.rotation.y = 4.67
            emit('update:currentStage', 1)
            scene.add(island)
            isLoaded.value = true // Ustawiamy isLoaded na true po załadowaniu sceny
            animate()
        })

        container.value.addEventListener('pointerdown', handlePointerDown)
        container.value.addEventListener('pointerup', handlePointerUp)
        container.value.addEventListener('pointermove', handlePointerMove)
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        window.addEventListener('resize', handleResize)
    }
})

onUnmounted(() => {
    if (container.value) {
        container.value.removeEventListener('pointerdown', handlePointerDown)
        container.value.removeEventListener('pointerup', handlePointerUp)
        container.value.removeEventListener('pointermove', handlePointerMove)
    }
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('keyup', handleKeyUp)
    window.removeEventListener('resize', handleResize)
})

// watch(
//     () => props.currentFocusPoint,
//     (newFocusPoint) => {
//         // Handle focus point changes here
//     },
// )
</script>
<template>
    <div ref="container" class="w-full overflow-hidden cursor-pointer h-full">
        <div v-if="!isLoaded" class="fallback">
            <Icon name="svg-spinners:12-dots-scale-rotate" size="90" />
        </div>
    </div>
</template>

<style scoped>
.fallback {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: #ffffff;
}
</style>
