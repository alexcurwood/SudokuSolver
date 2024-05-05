export default function Grid({ numbers }) {
  return (
    <div className="grid grid-cols-9 grid-rows-9 w-60 h-60 justify-center divide-x divide-y border">
      {numbers.map((num, index) => {
        if (num == 0) {
          return <div key={`${num}${index}`} id={index} className=""></div>;
        }
        return (
          <div key={`${num}${index}`} id={index} className="">
            {num}
          </div>
        );
      })}
    </div>
  );
}
