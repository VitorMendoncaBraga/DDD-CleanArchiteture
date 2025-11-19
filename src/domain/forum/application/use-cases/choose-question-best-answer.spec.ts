import { beforeEach, describe, expect, test } from 'vitest'
import type { QuestionRepository } from '../repositories/question-repository.js'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import { ChooseBestQuestionAnswerUseCase } from './choose-question-best-answer.js'
import { InMemoryQuestionsRepository } from '@/test/repository/in-memory-questions-repository.js'
import { InMemoryAnswersRepository } from '@/test/repository/in-memory-answer-repository.js'
import { Question } from '../../enterprise/entities/question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { makeAnswer } from '@/test/factories/make-answer.js'

let questionRepository: QuestionRepository
let answerRepository: AnswerRepository
let sut: ChooseBestQuestionAnswerUseCase

beforeEach(() => {
  questionRepository = new InMemoryQuestionsRepository()
  answerRepository = new InMemoryAnswersRepository()
  sut = new ChooseBestQuestionAnswerUseCase(
    questionRepository,
    answerRepository,
  )
})

describe('Choose Question Best Answer', () => {
  test('it should be able to choose question´s best answer', async () => {
    const newQuestion = makeQuestion(
      { authorId: UniqueEntityId.create('1') },
      UniqueEntityId.create('1'),
    )
    await questionRepository.create(newQuestion)
    const newAnswer = makeAnswer({}, UniqueEntityId.create('1'))
    await answerRepository.create(newAnswer)
    const result = await sut.execute({ authorId: '1', answerId: '1' })
    expect(result.isRight()).toBeTruthy()
    
  })
})
