// jobController.test.js
import { NextFunction, Request, Response } from "express";
import JobController from "./../api/controllers/jobController";
import JobRepository from "./../api/repositories/jobRepository";

jest.mock('./../api/repositories/jobRepository');

describe('JobController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock<NextFunction, []>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(), // Mock the chaining behavior of status().send()
      send: jest.fn(),
    };
    next = jest.fn() as jest.Mock<NextFunction, []>;
  });

  describe('getAllUnpaidJobs', () => {
    it('should get all unpaid jobs', async () => {
      const mockResponse = [{ id: 1, description: 'Job 1' }];
      (JobRepository.getAllUnpaidJobs as jest.Mock).mockResolvedValueOnce(mockResponse);

      await JobController.getAllUnpaidJobs(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Successful',
        data: mockResponse,
      });
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      (JobRepository.getAllUnpaidJobs as jest.Mock).mockRejectedValueOnce(mockError);

      await JobController.getAllUnpaidJobs(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('payForJob', () => {
    it('should pay for a job', async () => {
      const mockResponse = 'Amount 100 is successfully transferred to contractor 2 from client 1';
      (JobRepository.payForJob as jest.Mock).mockResolvedValueOnce(mockResponse);

      await JobController.payForJob(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Successful',
        data: mockResponse,
      });
    });

    it('should handle errors', async () => {
      const mockError = new Error('Test error');
      (JobRepository.payForJob as jest.Mock).mockRejectedValueOnce(mockError);

      await JobController.payForJob(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});
