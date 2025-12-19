var getUser = function () {
    var user = {
        id: 1,
        userName: "Minh Duc",
        userStatus: "active",
    };
    return user;
};
var _a = getUser(), a = _a.userName, b = _a.userStatus;
console.log(a, b);
console.log(getUser());
var logInfo = function (_a) {
    var userName = _a.userName, _b = _a.age, age = _b === void 0 ? 19 : _b;
    console.log("Hi, I'm ".concat(userName, ". I'm ").concat(age));
};
logInfo({ age: 19, userName: "John Doe" });
var listt = [10, 20, 30, 40, 50];
var first = listt[0], fourth = listt[3];
console.log(first, fourth);
