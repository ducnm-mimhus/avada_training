const myTechStack: string[] = ["NodeJs", "Fire base", "ReactJs"];
const myTechStatus = myTechStack.map((stack) => {
  return {
    name: stack,
    status: "not-finished",
  };
});

console.log(myTechStatus);

const list: number[] = [11, 22, 33, 11, 33, 22, 45];
const onlyUnique = (value: number, index: number, self: number[]) => {
  return self.indexOf(value) === index;
};
const filterList: number[] = list.filter(onlyUnique);
console.log(filterList);
