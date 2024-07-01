//FizzBuzz

function solution(N) {
    function isPowerOfTwo(n) {
        return n > 0 && (n & (n - 1)) === 0;
    }

    for (let i = 1; i <= N; i++) {
        if (isPowerOfTwo(i)) {
            console.log("POWER");
        } else {
            console.log(i);
        }
    }
}

//CSS Content Position

.container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.outer-centered {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 0 45%;
}

.outer-left {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    position: relative;
}

.outer-right {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    position: relative;
}

.inner {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.outer-left .inner,
.outer-right .inner {
    text-align: left;
    padding: 10px;
    box-sizing: border-box;
}



//Cheap Letter Deletion

function solution(S, C) {
    let totalCost = 0;

    for (let i = 1; i < S.length; i++) {
        if (S[i] === S[i - 1]) {
            totalCost += Math.min(C[i], C[i - 1]);
            if (C[i] > C[i - 1]) {
                C[i - 1] = C[i];
            } else {
                C[i] = C[i - 1];
            }
        }
    }

    return totalCost;
}

//Fib Digits
function sumOfDigits(number) {
    return number.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}
function solution(N) {
    if (N === 0) return 0;
    if (N === 1) return 1;

    let a = 0, b = 1, c;

    for (let i = 2; i <= N; i++) {
        c = sumOfDigits(a) + sumOfDigits(b);
        a = b;
        b = c;
    }

    return b;
}


