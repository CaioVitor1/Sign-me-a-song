import { jest } from '@jest/globals';
import { type } from 'os';
import {recommendationRepository} from "../../src/repositories/recommendationRepository"
import {recommendationService} from "../../src/services/recommendationsService"
import { conflictError, notFoundError } from '../../src/utils/errorUtils';
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
    
    it('upvote: id not valid', async () => {
        
        const number = 0;
      
        jest.spyOn(recommendationRepository, "find")
        .mockImplementationOnce((): any => {});
  
        jest.spyOn(recommendationRepository, "updateScore")
        .mockImplementationOnce((): any => {});
      
        const promise = recommendationService.upvote(number)
          
        expect(promise).rejects.toEqual({
          message: '',
          type: 'not_found'
        }); 
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).not.toBeCalled();
        
        });

    it('upvote: add new point to score', async () => {
        
        const number = 1;
        
        jest.spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce({
          id:1, 
          name: "link música favorita",
          youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
          score: 0 
          });
    
        jest.spyOn(recommendationRepository, "updateScore")
        .mockImplementationOnce((): any => {});
          
        const promise = await recommendationService.upvote(number)
        
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
       
        });
    
    it('downvote: id not valid', async () => {
        
        const number = 0;
      
        jest.spyOn(recommendationRepository, "find")
        .mockImplementationOnce((): any => {});
        jest.spyOn(recommendationRepository, "updateScore")
        .mockImplementationOnce((): any => {});
        jest.spyOn(recommendationRepository, "remove")
        .mockImplementationOnce((): any => {});
      
        const promise = recommendationService.downvote(number)
          
        expect(recommendationRepository.find).toBeCalled();
        expect(promise).rejects.toEqual({
          message: '',
          type: 'not_found'
        });
        expect(recommendationRepository.updateScore).not.toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
        
        });

    it('downvote: remove point to score', async () => {
        const number = 1;
        
        jest.spyOn(recommendationRepository, "find")
        .mockResolvedValueOnce({
          id:1, 
          name: "link música favorita",
          youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
          score: 0 
          });
        jest.spyOn(recommendationRepository, "updateScore")
        .mockResolvedValueOnce({
          id:1, 
          name: "link música favorita",
          youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
          score: -1 
          });
        jest.spyOn(recommendationRepository, "remove")
        .mockImplementationOnce((): any => {});     
        
        const promise = await recommendationService.downvote(number)
            
        expect(recommendationRepository.find).toBeCalled();
        expect(recommendationRepository.updateScore).toBeCalled();
        expect(recommendationRepository.remove).not.toBeCalled();
        });   
  
    it('downvote: remove point to score and delete recommendation', async () => {
      const number = 1;
          
      jest.spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce({
        id:1, 
        name: "link música favorita",
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
        score: -5 
        });
      jest.spyOn(recommendationRepository, "updateScore")
      .mockResolvedValueOnce({
        id:1, 
        name: "link música favorita",
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
        score: -6 
        });
      jest.spyOn(recommendationRepository, "remove")
      .mockImplementationOnce((): any => {});
      
      const promise = await recommendationService.downvote(number)
          
      expect(recommendationRepository.find).toBeCalled();
      expect(recommendationRepository.updateScore).toBeCalled();
      expect(recommendationRepository.remove).toBeCalled();       
      });    
      
    it('get all recommendation', async () => {
      jest.spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce((): any => []);

      const promise = await recommendationService.get()

      expect(promise).toBeInstanceOf(Array);
      expect(recommendationRepository.findAll).toBeCalled()
    })

    it('get recommendations order by score', async () => {
      const recommendations = await recomendationFactory.makeRecommendations()
      const amount = recommendations.length

      jest.spyOn(recommendationRepository, "getAmountByScore")
      .mockImplementationOnce((): any => recommendations);

      const promise = await recommendationService.getTop(amount)

      expect(promise).toBeInstanceOf(Array);
      expect(promise.length).toEqual(amount)
      expect(recommendationRepository.getAmountByScore).toBeCalled()
    })
    
    it('random: when no have recommendation: notFound Error', async() => {
     
      jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);
      
      const promise = recommendationService.getRandom()

      expect(promise).rejects.toEqual({
        message: '',
        type: 'not_found'
      });
      expect(recommendationRepository.findAll).toBeCalled()

    })

    it('random: get random recommendation when random is lte', async() => {
      const recommendation = await recomendationFactory.makeRecommendations()

      jest.spyOn(Math, "random").mockReturnValue(0.8);
      jest.spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(recommendation);

      const promise = await recommendationService.getRandom()

      expect(recommendationRepository.findAll).toBeCalled()
      expect(promise).toBeInstanceOf(Object);
      expect(promise).toHaveProperty('name')
      expect(promise).toHaveProperty('youtubeLink')
      expect(promise).toHaveProperty('score')  

    })

    it('random: get random recommendation when random is gt', async() => {
      const recommendation = await recomendationFactory.makeRecommendations()

      jest.spyOn(Math, "random").mockReturnValue(0.2);
      jest.spyOn(recommendationRepository, "findAll")
      .mockResolvedValueOnce(recommendation);
      
      const promise = await recommendationService.getRandom()

      expect(recommendationRepository.findAll).toBeCalled()
      expect(promise).toBeInstanceOf(Object);
      expect(promise).toHaveProperty('name')
      expect(promise).toHaveProperty('youtubeLink')
      expect(promise).toHaveProperty('score')  

    })









})

