export default function Grid(numbers) {
  const grid = [];
  for (let i = 0; i < 9; i++) {
    let row = numbers.numbers[i];
    for (let j = 0; j < 9; j++) {
      grid.push(row[j]);
    }
  }

  //   let topLeft = [];
  //   let topMiddle = [];
  //   let topRight = [];
  //   let middleLeft = [];
  //   let middleMiddle = [];
  //   let middleRight = [];
  //   let bottomLeft = [];
  //   let bottomMiddle = [];
  //   let bottomRight = [];

  return (
    <div className="grid grid-cols-9 grid-rows-9 w-60 h-60 justify-center divide-x divide-y">
      {grid.map((num, index) => {
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
