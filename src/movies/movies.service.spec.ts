import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import exp from 'constants';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it ("should return array", () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe("getOne", () => {
    it("should return movie", () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2020
      });
      const movie = service.getOne(1);

      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it("should throw error", () => {
      try {
        service.getOne(999);
      } catch(err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Movie with ID 999 not found`);
      }
    });
  });

  describe('deleteOne', () => {

    it('delete a movie', () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2020
      });

      const allMovies = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(allMovies);

    });

    it("should return 404", () => {
      try {
        service.deleteOne(999);
      } catch(err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Movie with ID 999 not found`);
      }
    });

  });

  describe("Create", () => {
    it("should create a movie", () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2020
      });
      const afterCreate = service.getAll().length;

      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe("Update", () => {
    it("should update a movie", () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2020
      });

      service.update(1, {
        title: "updated Test"
      });

      const movie = service.getOne(1);
      expect(movie.title).toEqual("updated Test");

    });

    it("should return 404", () => {
      try {
        service.update(999, {});
      } catch(err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Movie with ID 999 not found`);
      }
    });

  });

});
