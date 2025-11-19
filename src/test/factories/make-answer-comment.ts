import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment.js'
import { faker } from '@faker-js/faker'

export function makeAnswerComment(
  override?: Partial<AnswerComment>,
  id?: UniqueEntityId,
) {
  const answerComment = AnswerComment.create(
    {
      answerId: UniqueEntityId.create('1'),
      authorId: UniqueEntityId.create('1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answerComment
}
