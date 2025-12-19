var myTechStack = ["NodeJs", "Fire base", "ReactJs"];
var myTechStatus = myTechStack.map(function (stack) {
    return {
        name: stack,
        status: "not-finished",
    };
});
console.log(myTechStatus);
var list = [11, 22, 33, 11, 33, 22, 45];
var onlyUnique = function (value, index, self) {
    return self.indexOf(value) === index;
};
var filterList = list.filter(onlyUnique);
console.log(filterList);
var user = {
    name: "minh duc",
    age: 21,
    married: false,
};
var age = user.age, married = user.married;
console.log(age);
console.log(married);
