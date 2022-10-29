type ControlData = {
    show: boolean;
    target: string;
    intensity: number;
    direction: [number, number, number];
    position: [number, number, number];
    rotation: [number, number, number];
    scaling: [number, number, number];
    color: [number, number, number];
    toggle: boolean;
    materialID: string;
};

export function createData(): ControlData {
    return {
        show: true,
        target: '',
        intensity: 0.3,
        direction: [0, 1, 0],
        position: [0, 0.5, 0],
        rotation: [0, 0, 0],
        scaling: [5, 5, 5],
        color: [1, 0, 0],
        toggle: false,
        materialID: 'standard'
    };
}
