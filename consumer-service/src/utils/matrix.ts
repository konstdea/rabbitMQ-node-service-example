type Matrix = Array<Array<BigInt | Number>>

export interface MatrixObject {
    matrix1: Matrix,
    matrix2: Matrix
}

export const multiplyMatrix: (matrices: MatrixObject) => Matrix = (matrices) => {
    const rows = matrices.matrix1.length;
    const columns = matrices.matrix1[0].length; // matrices have equal length
    const resultMatrix = new Array(rows);

    for (let r = 0; r < rows; ++r) {
        resultMatrix[r] = new Array(columns);
        for (let c = 0; c < columns; ++c) {
            resultMatrix[r][c] = BigInt(0);
            for (let i = 0; i < columns; ++i) {
                resultMatrix[r][c] += BigInt(matrices.matrix1[r][i]) * BigInt(matrices.matrix2[i][c]);
            }
        }
    }
    return resultMatrix;
};
