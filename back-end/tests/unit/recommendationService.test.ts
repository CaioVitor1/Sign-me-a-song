import { jest } from '@jest/globals';
import {recommendationRepository} from "../../src/repositories/recommendationRepository"
import {recommendationService} from "../../src/services/recommendationsService"
import { conflictError } from '../../src/utils/errorUtils';
import * as recomendationFactory from "../factory/recomendantionFactory"

describe('', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.clearAllMocks();
      });

    it('create: reject recommendation with name already register', async () => {
        
    const recommendation = await recomendationFactory.createBodyTest()

    jest.spyOn(recommendationRepository, "findByName")
    .mockResolvedValueOnce({
                            id:1, 
                            name: "link música favorita",
                            youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
                            score: 0 
                            });
    jest.spyOn(recommendationRepository, "create")
    .mockImplementationOnce(async () => {});

    const promise = recommendationService.insert(recommendation);

    expect(promise).rejects.toEqual(
        conflictError("Recommendations names must be unique")
      );
      expect(recommendationRepository.create).not.toBeCalled();
    });
    
    it('create: create a new recommendation', async () => {
        
        const recommendation = await recomendationFactory.createBodyTest()
    
        jest.spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce((): any => {});

        jest.spyOn(recommendationRepository, "create")
        .mockImplementationOnce(async () => {});
    
       await recommendationService.insert(recommendation);
          
        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
      
        });
    
    it('upvote: create a new recommendation', async () => {
        
        const recommendation = await recomendationFactory.createBodyTest()
      
        jest.spyOn(recommendationRepository, "findByName")
        .mockImplementationOnce((): any => {});
  
        jest.spyOn(recommendationRepository, "create")
        .mockImplementationOnce(async () => {});
      
        await recommendationService.insert(recommendation);
            
        expect(recommendationRepository.findByName).toBeCalled();
        expect(recommendationRepository.create).toBeCalled();
        
        });










})

