import { beforeEach, describe, expect, test } from 'vitest'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers.js'
import { InMemoryAnswersRepository } from '@/test/repository/in-memory-answer-repository.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { InMemoryQuestionsRepository } from '@/test/repository/in-memory-questions-repository.js'
import { makeAnswer } from '@/test/factories/make-answer.js'

let answerRepository: AnswerRepository
let questionRepository: QuestionRepository
let sut: FetchQuestionAnswersUseCase

beforeEach(() => {
  questionRepository = new InMemoryQuestionsRepository()
  answerRepository = new InMemoryAnswersRepository()
  sut = new FetchQuestionAnswersUseCase(answerRepository)
})

describe('Fetch Question Answers', () => {
  test('it should be able to fetch a question´s answers', async () => {
    const question = makeQuestion({}, UniqueEntityId.create('1'))
    await questionRepository.create(question)

    for (let i = 0; i < 10; i++) {
      await answerRepository.create(
        makeAnswer({ questionId: UniqueEntityId.create('1') }),
      )
    }

    const result = await sut.execute({ page: 1, questionId: '1' })
    expect(result.isRight()).toBeTruthy()
    if(result.isRight()) {
      expect(result.value.answers).toHaveLength(10)
    }
  })
})
