const Circle = ({ x, y, color }) => {
  return (
    <div
      style={{
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: color ?? "red",
      }}
      className={`h-24 w-24 border-2 border-gray-400 rounded-full absolute -translate-x-[48px] -translate-y-[48px]`}
    ></div>
  );
};

export default Circle;
