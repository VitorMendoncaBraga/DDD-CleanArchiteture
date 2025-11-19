import { beforeEach, describe, expect, test } from 'vitest'

import type { AnswerCommentRepository } from '../repositories/anwer-comment-repository.js'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import { CommentOnAnswerUseCase } from './comment-on-answer.js'
import { InMemoryAnswerCommentRepository } from '@/test/repository/in-memory-answer-comment-repository.js'
import { InMemoryAnswersRepository } from '@/test/repository/in-memory-answer-repository.js'
import { makeAnswer } from '@/test/factories/make-answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'

let answerCommentRepository: AnswerCommentRepository
let answerRepository: AnswerRepository
let sut: CommentOnAnswerUseCase

beforeEach(() => {
  answerCommentRepository = new InMemoryAnswerCommentRepository()
  answerRepository = new InMemoryAnswersRepository()
  sut = new CommentOnAnswerUseCase(answerRepository, answerCommentRepository)
})

describe('Comment On Answer', () => {
  test('it should be able to comment on answer', async () => {
    const answer = makeAnswer()
    await answerRepository.create(answer)
    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: '1',
      content: 'answer-commentary-example',
    })
    expect(result.isRight()).toBeTruthy()
  })
})
