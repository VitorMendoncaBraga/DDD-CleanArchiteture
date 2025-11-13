import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import {
  Question,
  type QuestionProps,
} from '@/domain/forum/enterprise/entities/question.js'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'
import { faker } from '@faker-js/faker'
// Override tem as mesmas props de Question porém com todas as props sendo opcionais, e quando passo algum parâmetro, ele sobreescreve os que já existem

export function makeQuestion(
  override?: Partial<QuestionProps>,
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: UniqueEntityId.create(),
      content: faker.lorem.text(),
      title: faker.lorem.sentence(),
      ...override,
    },
    id,
  )

  return question
}
