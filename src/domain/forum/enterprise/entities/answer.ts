import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { Optional } from '@/core/types/optional.js'

export interface AnswerProps {
  content: string
  instructorId: UniqueEntityId
  questionId: UniqueEntityId
  created_at: Date
  updated_at?: Date
}

export class Answer extends Entity<AnswerProps> {
  get content() {
    return this.props.content
  }

  get instructorId() {
    return this.props.instructorId
  }

  get questionId() {
    return this.props.questionId
  }

  get created_at() {
    return this.props.created_at
  }

  get update_at() {
    return this.props.updated_at
  }

  get excerpt() {
    return this.props.content.substring(0, 128).trimEnd().concat('...')
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<AnswerProps, 'created_at'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    )

    return answer
  }
}
