/*
1. Ham callback() trong TypeScript la mot ham duoc truyen vao nhu mot doi so cua ham khac. 
No cho phep ban truyen mot ham vao mot ham khac de thuc hien mot cong viec cu the hoac xu ly mot su kien nao do.
2. Ham callback() se duoc goi sau khi ham chinh hoan thanh cong viec cua no.
*/

let fileData: string = "";

console.log("B1: Day la buoc 1");

const getFileData = (
  callback = (data: string) => {
    console.log(`B4: ${data}`);
  }
) => {
  setTimeout(() => {
    console.log("B3: Day la buoc 3");
    fileData = "Du lieu da duoc doc thanh cong";
    callback(fileData);
  }, 3000);
};

console.log("B2: Day la buoc 2");
getFileData();

/*
VAN DE CUA CALLBACK HELL:
Khi su dung callback de xu ly cac tac vu bat dong bo, chung ta co the gap phai van de goi la "callback hell" (dia nguc callback). 
Day la tinh trang ma cac ham callback duoc lap di lap lai mot cach long nhau, lam cho code tro nen kho doc va kho quan ly.

De giai quyet van de nay, chung ta co the su dung cac phuong phap nhu:
1. Su dung Promises: Promises cung cap mot cach tiep can tot hon de xu ly cac tac vu bat dong bo va giup tranh callback hell.
2. Su dung async/await: Cac tu khoa async va await trong TypeScript cho phep viet code bat dong bo theo kieu dong bo, lam cho code de doc hon.
3. Tach biet cac ham: Tach biet cac ham lon thanh cac ham nho hon de giam do sau cua callback.
*/
