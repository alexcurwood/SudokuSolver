export default function Grid(grid) {
  return (
    <div className="grid grid-cols-9 grid-rows-9 w-60 h-60 justify-center divide-x divide-y border">
      {grid.numbers.map((num, index) => {
        if (num == 0) {
          return <div id={index} className=""></div>;
        }
        return (
          <div id={index} className="">
            {num}
          </div>
        );
      })}
    </div>
  );
}
