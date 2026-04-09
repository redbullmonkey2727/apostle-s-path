// Catmull-Rom spline interpolation for smooth journey paths
// Produces smooth curves through all control points

function catmullRomPoint(
  p0: [number, number], p1: [number, number],
  p2: [number, number], p3: [number, number],
  t: number
): [number, number] {
  const t2 = t * t;
  const t3 = t2 * t;
  return [
    0.5 * ((2 * p1[0]) + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
    0.5 * ((2 * p1[1]) + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
  ];
}

export function smoothPath(points: [number, number][], segmentsPerPoint = 8): [number, number][] {
  if (points.length < 3) return points;
  const result: [number, number][] = [];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const p1 = points[i];
    const p2 = points[Math.min(points.length - 1, i + 1)];
    const p3 = points[Math.min(points.length - 1, i + 2)];

    for (let t = 0; t < segmentsPerPoint; t++) {
      result.push(catmullRomPoint(p0, p1, p2, p3, t / segmentsPerPoint));
    }
  }
  result.push(points[points.length - 1]);
  return result;
}
