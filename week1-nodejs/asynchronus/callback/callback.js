/*
1. Ham callback() trong TypeScript la mot ham duoc truyen vao nhu mot doi so cua ham khac.
No cho phep ban truyen mot ham vao mot ham khac de thuc hien mot cong viec cu the hoac xu ly mot su kien nao do.
2. Ham callback() se duoc goi sau khi ham chinh hoan thanh cong viec cua no.
*/
var fileData = "";
console.log("B1: Day la buoc 1");
var getFileData = function (callback) {
    if (callback === void 0) { callback = function (data) {
        console.log("B4: ".concat(data));
    }; }
    setTimeout(function () {
        console.log("B3: Day la buoc 3");
        fileData = "Du lieu da duoc doc thanh cong";
        callback(fileData);
    }, 3000);
};
console.log("B2: Day la buoc 2");
getFileData();
