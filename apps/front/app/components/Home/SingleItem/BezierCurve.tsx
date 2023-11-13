import { RawMaterial } from '@/app/types/item.type';

interface BezierCurveComponentProps {
  svgHeight: number;
  svgWidth: number;
  rawMaterials: RawMaterial[];
  style: React.CSSProperties;
}

interface Point {
  x: number;
  y: number;
}
const smoothing = 0.2;
const OFFSET_TOP = 0;

const line = (pointA: Point, pointB: Point) => {
  const lengthX = pointB.x - pointA.x;
  const lengthY = pointB.y - pointA.y;
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX),
  };
};

const controlPoint = (
  maxHeight: number,
  current: Point,
  previous: Point,
  next: Point,
  reverse?: Boolean,
): Point => {
  const previousPoint = previous || current;
  const nextPoint = next || current;

  const opposedLine = line(previousPoint, nextPoint);

  const angle = opposedLine.angle + (reverse ? Math.PI : 0);
  const length = opposedLine.length * smoothing;

  let x = current.x + Math.cos(angle) * length;
  let y = current.y + Math.sin(angle) * length;

  // Clamping the y-coordinate
  y = Math.min(y, maxHeight);

  return { x, y };
};

const bezierCommand = (
  point: Point,
  i: number,
  a: Point[],
  maxHeight: number,
) => {
  const cps = controlPoint(maxHeight, a[i - 1], a[i - 2], point);
  const cpe = controlPoint(maxHeight, point, a[i - 1], a[i + 1], true);
  return `C ${cps.x},${cps.y - OFFSET_TOP} ${cpe.x},${cpe.y - OFFSET_TOP} ${
    point.x
  },${point.y - OFFSET_TOP}`;
};

export const BezierCurveComponent: React.FC<BezierCurveComponentProps> = ({
  rawMaterials,
  svgWidth,
  svgHeight,
  style,
}) => {
  const gapBetweenPoints = svgWidth / rawMaterials.length;
  const values = rawMaterials.map((aRawMaterial) => aRawMaterial.weight);
  const points = values.map((value, index) => ({
    x: gapBetweenPoints / 2 + index * gapBetweenPoints,
    y: svgHeight - value * 3,
  }));

  const svgPath = (points: Point[], sampleSize: number) => {
    const d = points.reduce(
      (acc, point, i, a) =>
        i === 0
          ? `L ${point.x},${point.y}`
          : `${acc} ${bezierCommand(point, i, a, svgHeight)}`,
      '',
    );
    const hidingLine = `M ${gapBetweenPoints / 2} ${svgHeight} L ${
      sampleSize * gapBetweenPoints - gapBetweenPoints / 2
    } ${svgHeight}`;

    return (
      <>
        <path
          d={`M ${gapBetweenPoints / 2},${svgHeight} ${d} L ${
            sampleSize * gapBetweenPoints - gapBetweenPoints / 2
          } ${svgHeight} z`}
        />
        <path d={hidingLine} stroke="var(--slate-1)" strokeWidth="1" />
      </>
    );
  };
  return (
    <svg
      style={style}
      fill="var(--accent-a3)"
      stroke="var(--accent-a11)"
      opacity="1"
      className="svg"
      viewBox={`0 10 ${svgWidth} ${svgHeight}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      {svgPath(points, values.length)}
    </svg>
  );
};
