import type { Question } from "../../enterprise/entities/question.js";
import type { QuestionRepository } from "../repositories/question-repository.js";

interface EditQuestionUseCaseRequest {
    authorId: string,
    questionId: string,
    title: string,
    content: string
}

interface EditQuestionUseCaseResponse {
    question: Question
}

export class EditQuestionUseCase {
    constructor(private questionRepository: QuestionRepository){}
    
    async execute({questionId,authorId,content,title}: EditQuestionUseCaseRequest) : Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)
        if(!question) {
            throw new Error("Question not found")
        }

        if(authorId != question.authorId.toString()) {
            throw new Error("Not allowed")
        }

        question.content = content
        question.title = title
        
        await this.questionRepository.edit(question)
        return {
            question
        }
    }
}