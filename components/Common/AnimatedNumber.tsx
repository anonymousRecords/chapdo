import useCountUp from "@/hooks/useCountUp";

interface AnimatedNumberProps {
  number: number;
  duration?: number;
  style: React.CSSProperties;
}

function AnimatedNumber({
  number,
  duration = 2000,
  style,
}: AnimatedNumberProps) {
  const count = useCountUp(number, duration);
  return <span style={style}>{count}</span>;
}

export default AnimatedNumber;
