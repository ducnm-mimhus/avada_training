const getUser = () => {
  const user: { id: number; userName: string; userStatus: string } = {
    id: 1,
    userName: "Minh Duc",
    userStatus: "active",
  };
  return user;
};

const { userName: a, userStatus: b } = getUser();
console.log(a, b);
console.log(getUser());

const logInfo = ({
  userName,
  age = 19,
}: {
  userName: string;
  age?: number;
}) => {
  console.log(`Hi, I'm ${userName}. I'm ${age}`);
};

logInfo({ age: 19, userName: "John Doe" });

const listt: number[] = [10, 20, 30, 40, 50];
const { 0: first, 3: fourth } = listt;

console.log(first, fourth);
