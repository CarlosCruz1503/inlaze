import { Test, TestingModule } from '@nestjs/testing';
import { ImdbController } from './imdb.controller';

describe('ImdbController', () => {
  let controller: ImdbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImdbController],
    }).compile();

    controller = module.get<ImdbController>(ImdbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
