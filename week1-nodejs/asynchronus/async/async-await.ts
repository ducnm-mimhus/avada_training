/*
Async/Await
1. Async/Await la mot co cau de lam viec voi Promise de code de doc hon, no khong thay the Promise ma chi la mot cach khac de lam viec voi Promise.
2. Tu khoa "async" duoc su dung de khai bao mot ham bat dong bo (asynchronous function). Mot ham async luon tra ve mot Promise.
3. Tu khoa "await" duoc su dung de doi mot Promise hoan thanh truoc khi tiep tuc thuc hien cac lenh tiep theo trong ham.
4. Khi mot ham duoc khai bao voi "async", no se tu dong tra ve mot Promise.
5. Khi su dung "await", chi co the su dung no ben trong mot ham duoc khai bao voi "async".
6. Su dung Async/Await giup tranh callback hell va lam cho code de doc hon va quan ly hon. 
*/

// const foodStatus = new Promise((resolve, rejects) => {
//   let done: boolean = false;
//   setTimeout(() => {
//     if (done) {
//       resolve("Toi da an xong");
//     } else {
//       rejects("Toi chua an xong");
//     }
//   }, 2000);
// });

// console.log("Bat dau an!");

// const handleFoodStatus = async () => {
//   try {
//     const result = await foodStatus;
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     console.log("Mon an rat ngon, toi thich an mon nay!");
//   }
// };

//handleFoodStatus();

// console.log("B1: Day la buoc 1.");
// let file_data: string = "";
// const readData = new Promise((resolve, rejects) => {
//   setTimeout(() => {
//     resolve("B3: Day la buoc 3.");
//     file_data = "Da doc file thanh cong";
//   }, 2000);
// });

// const handleReadingData = async () => {
//   try {
//     const result = await readData;
//     console.log(result);
//   } catch (error) {
//     console.error(error);
//   } finally {
//     console.log("B4:", file_data);
//   }
// };

// console.log("B2: Day la buoc 2.");
// handleReadingData();

const getListPokemon = async (limit = 10) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}`,
      { method: "GET" }
    );
    const pokemon = await response.json();
    console.log(pokemon);
  } catch (error) {
    console.error(error);
  } finally {
    console.log("Hoan thanh cong viec getListPokemon.");
  }
};

getListPokemon();
