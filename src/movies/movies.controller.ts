import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor (private readonly movieService: MoviesService) {}

    @Get('/') 
    getAll(): Movie[] {
        return this.movieService.getAll()
    }

    @Get(':id')
    getOne(@Param("id") id: number): Movie {
        return this.movieService.getOne(id)
    }

    @Post('/')
    createMovie(@Body() movieData: CreateMovieDto) {
        return this.movieService.create(movieData)
    }

    @Delete("/:id")
    deleteMovie(@Param("id") id: number) {
        return this.movieService.deleteOne(id)
    }

    @Patch('/:id')
    patchMovie(@Param("id") id: number, @Body() updateData: UpdateMovieDto) {
        return this.movieService.update(id, updateData)
    }
}
