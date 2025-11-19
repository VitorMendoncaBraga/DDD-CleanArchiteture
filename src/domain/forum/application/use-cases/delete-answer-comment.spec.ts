import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { makeAnswerComment } from "@/test/factories/make-answer-comment.js";
import { describe, test, expect, beforeEach } from "vitest";
import type { AnswerCommentRepository } from "../repositories/anwer-comment-repository.js";
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment.js";
import { InMemoryAnswerCommentRepository } from "@/test/repository/in-memory-answer-comment-repository.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

let answerCommentRepository: AnswerCommentRepository
let sut: DeleteAnswerCommentUseCase

beforeEach(() => {
    answerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new DeleteAnswerCommentUseCase(answerCommentRepository)
})

describe("Delete Answer Comment", () => {
    test("it should be able to delete an answer comment", async () => {
        const newAnswerComment = makeAnswerComment({ authorId: UniqueEntityId.create("1") }, UniqueEntityId.create("1"))
        await answerCommentRepository.create(newAnswerComment)

       const result = await sut.execute({ answerCommentId: newAnswerComment.id.toString(), authorId: newAnswerComment.authorId.toString() })
        expect(result.isRight()).toBe(true)
        console.log(result.value)
    })
    test("it shouldnt be able to delete an answer comment made by another user", async () => {
        const newAnswerComment = makeAnswerComment({ authorId: UniqueEntityId.create("1") }, UniqueEntityId.create("1"))
        await answerCommentRepository.create(newAnswerComment)

       const result = await sut.execute({answerCommentId: "1", authorId: "2"})
       expect(result.isLeft()).toBe(true)
       expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})