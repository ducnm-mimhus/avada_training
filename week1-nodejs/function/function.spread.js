const oldArray = [1, 2, 10];
const newArray = [6, 7, 8, 9];

const mergedArray = [...oldArray, ...newArray];
console.log(mergedArray);

const oddArray = mergedArray.filter((num) => num % 2 !== 0);
console.log(oddArray);

const sum = (...nums) => {
  return nums.reduce((preSum, currentValue) => preSum + currentValue, 0);
};
console.log(sum(1, 2, 3, 4, 5));

const mergeItems = (...items) => {
  let count = 1;
  return items.reduce((acc, item) => {
    acc[count] = item;
    count++;
    return acc;
  }, {});
};

const items = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
];
console.log(mergeItems(...items));

const person = {
  id: 1,
  name: "Minh Duc",
  age: 21,
};

const job = {
  id: "25121501",
  jobName: "NodeJs Intern",
  onboard: true,
};

console.log({ ...person, ...job });

const personPost = {
  userId: "001",
  userName: "Minh Duc",
  bio: "Toi la Duc, sinh nam 2004, toi la mot lap trinh vien.",
  description: "Toi muon tro thanh pro fullstack sau 3 nam va la PM sau 5 nam.",
};

const { userId, userName, ...personText } = personPost;
console.log(personText);
