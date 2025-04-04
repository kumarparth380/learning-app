export const getScoreColors = (score: number) => {
  if (score > 70)
    return {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
      hover: "hover:bg-emerald-100",
    };
  if (score >= 50)
    return {
      bg: "bg-yellow-50",
      text: "text-yellow-600",
      border: "border-yellow-200",
      hover: "hover:bg-yellow-100",
    };
  return {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-200",
    hover: "hover:bg-rose-100",
  };
};

export const calculateTotalTime = (time?: {
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  if (!time) return 0;
  return time.hours * 3600 + time.minutes * 60 + time.seconds;
};

export const formatTimeFromSeconds = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return {
    minutes,
    seconds,
    formatted: `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`,
  };
};
