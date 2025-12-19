/*
PROMISE: 
1. promise la mot doi tuong dai dien cho mot tac vu bat dong bo, cung cap mot cach de xu ly ket qua cua tac vu do khi no hoan thanh.
2. Mot promise co the o mot trong ba trang thai: pending (cho den), fulfilled (hoan thanh), hoac rejected (bi tu choi).
3. Khi mot promise duoc fulfilled, no tra ve mot gia tri. Khi no bi rejected, no tra ve mot ly do loi.
4. Promise co the duoc ket hop voi cac phuong thuc nhu .then() de xu ly ket qua khi no hoan thanh, va .catch() de xu ly loi neu no bi tu choi.
5. Su dung promise giup tranh callback hell va lam cho code de doc hon va quan ly hon.
*/

// //EG1: test trang thai choi game
// let game_status = new Promise((resolve, rejects) => {
//   let done: boolean = false;
//   setTimeout(() => {
//     if (done) {
//       resolve("Da choi xong game!");
//     } else {
//       rejects("Van chua choi xong game!");
//     }
//   }, 2000);
// });

// game_status
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   })
//   .finally(() => {
//     console.log("Toi rat thich game nay!");
//   });

//EG2: test gia lap doc file
console.log("B1: Day la buoc 1");
let dataFile: string = "";
let checkReadingFile = new Promise((resolve, rejects) => {
  let readFileSuccess = false;
  setTimeout(() => {
    if (readFileSuccess) {
      resolve("B3: Doc file thanh cong");
      dataFile = "Toi la Nguyen Minh Duc";
    } else {
      rejects("B3: Doc file that bai");
    }
  }, 2000);
});

console.log("B2: Tien hanh doc file");

checkReadingFile
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    console.log(`B4: Noi dung file la ${dataFile}`);
  });

//EG3: test goi API fetch
const getAllPokemon = (limit = 10) => {
  // fetch API mac dinh return mot Promise roi nen khong can dinh nghia mot Promise thu cong nua
  return fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`, {
    method: "GET",
  })
    .then((response) => {
      console.log("Response: ", response);
      return response.json();
    })
    .then((data) => {
      console.log("Data: ", data.results);
    })
    .catch((error) => {
      console.log("Co loi khi goi API: ", error);
    })
    .finally(() => {
      console.log("Ket thuc hanh dong getAllPokemon");
    });
};

getAllPokemon();
