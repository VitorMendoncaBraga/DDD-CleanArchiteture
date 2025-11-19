import { expect, test } from "vitest";
import { Left, left, Right, right, type Either } from "./either.js";

function doSomething(x: boolean) : Either<string, number>{ 
    if(x) {
       return right(10)
    }

    return left("error")
}

test("success result", () => {
    const result = doSomething(true)
    if(result.isRight()){
        console.log(result.value)
    }
   expect(result.isRight()).toBe(true)
})

test("error result", () => {
    const result = doSomething(false)
    expect(result.isLeft()).toBe(true)
})