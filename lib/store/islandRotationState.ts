import { reactive, readonly } from 'vue';

// Define the reactive state
const state = reactive({
    rotationPosition: 4.67,
    currentStage: 1,
});

// Method to update the rotation position
const setRotationPosition = (value: number) => {
    state.rotationPosition = value;
};
const setCurrentStage = (value: number | null) => {
    state.currentStage = value ? value : 0;
};

// Export the state and the method
export const useGlobalState = () => ({
    state: readonly(state),
    setRotationPosition,
    setCurrentStage,
});
