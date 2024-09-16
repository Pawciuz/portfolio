<script setup lang="ts">
import { ref, shallowRef, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import islandSceneUrl from '~/assets/3d/island.glb?url';
import { DRACOLoader } from 'three-stdlib';
import { useGlobalState } from '@/lib/store/islandRotationState';

const props = defineProps<{
    isRotating: boolean;
    currentFocusPoint: number | null;
}>();

const globalState = useGlobalState();
const emit = defineEmits(['update:isRotating']);
const container = ref<HTMLDivElement | null>(null);
const isLoaded = ref(false);

const scene = shallowRef<THREE.Scene | null>(null);
const camera = shallowRef<THREE.PerspectiveCamera | null>(null);
const renderer = shallowRef<THREE.WebGLRenderer | null>(null);
const island = shallowRef<THREE.Object3D | null>(null);
const clouds = shallowRef<THREE.Group | null>(null);

let rotationSpeed = 0;
const lastX = ref(0);
const dampingFactor = 0.95;
let animationFrameId: number | null = null;

const handlePointerDown = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    emit('update:isRotating', true);
    lastX.value = event.clientX;
};

const handlePointerUp = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    emit('update:isRotating', false);
};

const handlePointerMove = (event: PointerEvent) => {
    event.stopPropagation();
    event.preventDefault();
    if (props.isRotating && island.value && clouds.value) {
        const clientX = event.clientX;
        const delta = (clientX - lastX.value) / window.innerWidth;
        island.value.rotation.y += delta * 0.5 * Math.PI;
        clouds.value.rotation.y += delta * 0.5 * Math.PI;
        lastX.value = clientX;
        rotationSpeed = delta * 0.01;
    }
};

const handleKeyDown = (event: KeyboardEvent) => {
    if (island.value && clouds.value) {
        if (event.key === 'ArrowLeft') {
            if (!props.isRotating) emit('update:isRotating', true);
            rotationSpeed = 0.01;
        } else if (event.key === 'ArrowRight') {
            if (!props.isRotating) emit('update:isRotating', true);
            rotationSpeed = -0.01;
        }
    }
};

const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        emit('update:isRotating', false);
    }
};

const createCloud = () => {
    const cloudGroup = new THREE.Group();
    const numBlobs = Math.floor(Math.random() * 5) + 3;

    for (let i = 0; i < numBlobs; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 3 + 1, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: -3,
        });
        const cloudPart = new THREE.Mesh(geometry, material);

        cloudPart.position.set(Math.random() * 4 - 2, Math.random() * 2, Math.random() * 4 - 2);
        cloudGroup.add(cloudPart);
    }

    return cloudGroup;
};

const setupClouds = () => {
    const cloudsGroup = new THREE.Group();
    const numClouds = 100;

    for (let i = 0; i < numClouds; i++) {
        const cloud = createCloud();
        const phi = Math.random() * Math.PI * 2;
        const theta = Math.random() * Math.PI;
        const radius = Math.random() * 50 + 100;

        cloud.position.setFromSpherical(new THREE.Spherical(radius, theta, phi));
        cloud.lookAt(new THREE.Vector3(0, 0, 0));
        cloud.scale.multiplyScalar(Math.random() * 2 + 1);

        cloudsGroup.add(cloud);
    }
    clouds.value = cloudsGroup;
    scene.value?.add(cloudsGroup);
};

const animate = () => {
    if (!isLoaded.value) return;

    animationFrameId = requestAnimationFrame(animate);

    if (island.value && clouds.value) {
        if (!props.isRotating) {
            rotationSpeed *= dampingFactor;
            if (Math.abs(rotationSpeed) < 0.001) {
                rotationSpeed = 0;
            }

            island.value.rotation.y += rotationSpeed;
            clouds.value.rotation.y += rotationSpeed;
        } else {
            const rotation = globalState.state.rotationPosition;
            const normalizedRotation = ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
            let currentStage: number | null;
            switch (true) {
                case normalizedRotation >= 5.25 && normalizedRotation <= 6.5:
                    currentStage = 4;
                    break;
                case normalizedRotation >= 0.45 && normalizedRotation <= 1.3:
                    currentStage = 3;
                    break;
                case normalizedRotation >= 1.8 && normalizedRotation <= 3.2:
                    currentStage = 2;
                    break;
                case normalizedRotation >= 4 && normalizedRotation <= 4.75:
                    currentStage = 1;
                    break;
                default:
                    currentStage = null;
                    break;
            }
            globalState.setCurrentStage(currentStage);
            globalState.setRotationPosition(((island.value.rotation.y % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
        }

        clouds.value.children.forEach((cloud: THREE.Object3D) => {
            cloud.rotation.y += 0.0005;
            cloud.position.y += Math.sin(Date.now() * 0.0005 + cloud.position.x) * 0.005;
        });
    }

    if (renderer.value && scene.value && camera.value) {
        renderer.value.render(scene.value, camera.value);
    }
};

const handleResize = () => {
    if (container.value && camera.value && renderer.value) {
        camera.value.aspect = container.value.clientWidth / container.value.clientHeight;
        camera.value.updateProjectionMatrix();
        renderer.value.setSize(container.value.clientWidth, container.value.clientHeight);
    }
};

const initializeScene = () => {
    if (container.value && !scene.value) {
        scene.value = new THREE.Scene();
        camera.value = new THREE.PerspectiveCamera(
            75,
            container.value.clientWidth / container.value.clientHeight,
            0.1,
            1000,
        );
        renderer.value = new THREE.WebGLRenderer({ antialias: true });
        renderer.value.setSize(container.value.clientWidth, container.value.clientHeight);
        container.value.appendChild(renderer.value.domElement);
        renderer.value.setClearColor(0x87ceeb);

        setupClouds();

        camera.value.position.z = 60;
        camera.value.position.y = 10;
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.value.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7.5);
        scene.value.add(directionalLight);

        const loader = new GLTFLoader();
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
        loader.setDRACOLoader(dracoLoader);

        loader.load(islandSceneUrl, (gltf) => {
            island.value = gltf.scene;
            island.value.rotation.y = globalState.state.rotationPosition;
            scene.value?.add(island.value);
            isLoaded.value = true;
            animate();
        });
    }
};
const handlePointerLeave = () => {
    emit('update:isRotating', false);
};

const setupEventListeners = () => {
    if (container.value) {
        container.value.addEventListener('pointerdown', handlePointerDown);
        container.value.addEventListener('pointerup', handlePointerUp);
        container.value.addEventListener('pointermove', handlePointerMove);
        container.value.addEventListener('pointerleave', handlePointerLeave);
    }
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);
};

const cleanupEventListeners = () => {
    if (container.value) {
        container.value.removeEventListener('pointerdown', handlePointerDown);
        container.value.removeEventListener('pointerup', handlePointerUp);
        container.value.removeEventListener('pointermove', handlePointerMove);
        container.value.removeEventListener('pointerleave', handlePointerLeave);
    }
    window.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('keyup', handleKeyUp);
    window.removeEventListener('resize', handleResize);
};

onMounted(() => {
    initializeScene();
    setupEventListeners();
});

onBeforeUnmount(() => {
    cleanupEventListeners();
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
    }
});
</script>

<template>
    <div ref="container" class="h-full w-full cursor-pointer overflow-hidden" />
</template>
