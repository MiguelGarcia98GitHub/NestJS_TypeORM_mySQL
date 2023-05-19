import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/createPost.dto';

@Injectable()
export class PostsService {

    // received from client: title, content, authorId: number

    constructor(
        @InjectRepository(Post) private postsRepository: Repository<Post>,
        private usersService: UsersService
    ) {}

    async createPost(post: CreatePostDto) {
      const userFound = await this.usersService.getUser(post.authorId)

        if (!userFound) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }


        const newPost = this.postsRepository.create(post)
        return this.postsRepository.save(newPost)
    }
    async getPosts() {

        return this.postsRepository.find({
            relations: ["author"]
        });
    }

}
