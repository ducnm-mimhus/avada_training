/*
Async/Await
1. Async/Await la mot co cau de lam viec voi Promise de code de doc hon, no khong thay the Promise ma chi la mot cach khac de lam viec voi Promise.
2. Tu khoa "async" duoc su dung de khai bao mot ham bat dong bo (asynchronous function). Mot ham async luon tra ve mot Promise.
3. Tu khoa "await" duoc su dung de doi mot Promise hoan thanh truoc khi tiep tuc thuc hien cac lenh tiep theo trong ham.
4. Khi mot ham duoc khai bao voi "async", no se tu dong tra ve mot Promise.
5. Khi su dung "await", chi co the su dung no ben trong mot ham duoc khai bao voi "async".
6. Su dung Async/Await giup tranh callback hell va lam cho code de doc hon va quan ly hon.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _this = this;
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
var getListPokemon = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(_this, __spreadArray([], args_1, true), void 0, function (limit) {
        var response, pokemon, error_1;
        if (limit === void 0) { limit = 10; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    return [4 /*yield*/, fetch("https://pokeapi.co/api/v2/pokemon?limit=".concat(limit), { method: "GET" })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    pokemon = _a.sent();
                    console.log(pokemon);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 5];
                case 4:
                    console.log("Hoan thanh cong viec getListPokemon.");
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
};
getListPokemon();
