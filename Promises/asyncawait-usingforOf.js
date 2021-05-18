async function printf (){

const waitFor = (ms) => new Promise(r => setTimeout(r, ms));

// [1, 2, 3].forEach(async (num) => {
//     await waitFor(50);
//     console.log(num);
// });
async function newTree() {
    for(const num of [1,2,3]){
        await waitFor(500);
        console.log(num);
    }
    // [1, 2, 3].forEach(async (num) => {
    //     await waitFor(500);
    //     console.log(num);
    // });
}
async function newTree2() {
    for(const num of [4,5,6]){
        await waitFor(100);
        console.log(num);
    }
    // [4,5,6].forEach(async (num) => {
    //     await waitFor(100);
    //     console.log(num);
    // });
}
async function newTree3() {
    for(const num of [7,8,9]){
        await waitFor(10);
        console.log(num);
    }
    // [7,8,9].forEach(async (num) => {
    //     await waitFor(10);
    //     console.log(num);
    // });
}
await newTree();
await newTree2();
await newTree3();
console.log('Done');
}
printf();
// async function asyncForEach(array, callback) {
//     for (let index = 0; index < array.length; index++) {
//       await callback(array[index]);
//     }
//   };

//   const start = async () => {
//     console.log('Started');
//     await asyncForEach([1, 2, 3], async (num) => {
//         console.log(num+' --------->>');
//         await asyncForEach([4, 5, 6], async (num1) => {
//             await waitFor(500);
//             console.log(num1+num);
//         });
//     });
//     console.log('Done');
//   }
//   const end = async () => {
//     console.log('Started');
//     await asyncForEach([1, 2, 3], async (num) => {
//         console.log(num+' --------->>');
//         await asyncForEach([7, 8, 9], async (num1) => {
//             await waitFor(500);
//             console.log(num1+num);
//         });
//     });
//     console.log('Done');
//   }

//   async function callMe(){
//     await start();
//     await end();
//   }
//   callMe();