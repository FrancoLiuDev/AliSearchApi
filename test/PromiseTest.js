

const promise = new Promise(function (resolve, reject) {
    // 成功時
    var value = 'ok'
    var Inter = 2
    resolve(value)
    // 失敗時
    //reject(value)
});

promise.then((value) => {

    const promise2 = new Promise(function (resolve, reject) {
        // 成功時
        var value = 'promise2 ok'
        var Inter = 2
        resolve(value)
        // 失敗時
        //reject(value)
    });

    promise2.then((value) => {
        console.log(value)
    }).catch((err) => console.log(err.message))
}).catch((err) => console.log(err.message))

