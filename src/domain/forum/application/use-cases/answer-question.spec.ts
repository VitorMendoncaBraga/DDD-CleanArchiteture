import { expect, test, beforeEach } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question.js'
import { InMemoryAnswersRepository } from '@/test/repository/in-memory-answer-repository.js'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let answerQuestionUseCase: AnswerQuestionUseCase

beforeEach(() => {
  inMemoryAnswersRepository = new InMemoryAnswersRepository()
  answerQuestionUseCase = new AnswerQuestionUseCase(inMemoryAnswersRepository)
})

test('create an answer', async () => {
  console.log(answerQuestionUseCase)

  const { answer } = await answerQuestionUseCase.execute({
    content: 'Nova resposta',
    instructorId: '1',
    questionId: '1',
  })
  expect(answer.content).toEqual('Nova resposta')
})
