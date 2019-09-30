type Matrix = Array<Array<BigInt>>

export interface MatrixObject {
    matrix1: Matrix,
    matrix2: Matrix
}

const MAX_SIZE = +process.env.MAX_MATRIX_SIZE || 500;
const MIN_SIZE = +process.env.MIN_MATRIX_SIZE || 10;

export const generateRandomMatrix: (dimension: Number) => Matrix = (dimension) => {
    const matrix = [];
    for (let i = 0; i < dimension; i++) {
        matrix[i] = [];
        for (let j = 0; j < dimension; j++) {
            matrix[i][j] = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE);
        }
    }
    return matrix;
};

export const getRandomDimensionLength: () => Number = () => {
    return Math.floor(Math.random() * (500 - 10) + 10);
};
