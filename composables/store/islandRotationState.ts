import { reactive, readonly } from 'vue';

const state = reactive({
    rotationPosition: 4.67,
    currentStage: 1,
});

const setRotationPosition = (value: number) => {
    state.rotationPosition = value;
};
const setCurrentStage = (value: number | null) => {
    state.currentStage = value ? value : 0;
};

export const useGlobalState = () => ({
    state: readonly(state),
    setRotationPosition,
    setCurrentStage,
});
