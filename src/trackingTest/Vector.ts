// export interface Vector3 { x: number; y: number; z: number };

// /**
//  * Berechnet das Kreuzprodukt zweier 3D-Vektoren.
//  */
// export function crossProduct(v1: Vector3, v2: Vector3): Vector3 {
//     return {
//         x: v1.y * v2.z - v1.z * v2.y,
//         y: v1.z * v2.x - v1.x * v2.z,
//         z: v1.x * v2.y - v1.y * v2.x,
//     };
// }

// // subtract 2 vectors
// export function minus(v: Vector3, w: Vector3): Vector3 {
   
//     return {
//         x: v.x-w.x,
//         y: v.y-w.y,
//         z: v.z-w.z
//     };
// }

// export function intersectionPoint(p1: Vector3, p2: Vector3, q1: Vector3, q2: Vector3): Vector3{

//     // vec between points
//     let r = minus(p2, p1);
//     let s = minus(q2, q1);

//     t = (q − p) × s / (r × s)

//     let t = crossProduct(minus(q1, p1), s)


// }


export type Point = { x: number; y: number };

export function getIntersection(p1: Point, p2: Point, p3: Point, p4: Point): Point | null {
    const denominator = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);

    if (denominator === 0) {
        return null; // Die Linien sind parallel oder identisch
    }

    const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / denominator;
    const u = ((p1.x - p3.x) * (p1.y - p2.y) - (p1.y - p3.y) * (p1.x - p2.x)) / denominator;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        return {
            x: p1.x + t * (p2.x - p1.x),
            y: p1.y + t * (p2.y - p1.y),
        };
    }

    return null; // Die Segmente schneiden sich nicht
}

