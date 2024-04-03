import { IGakurenRepo } from "@repository/gakuren.repo";
import { Repo } from "@repository/repository";

export const newMockRepo = (repo: Partial<Repo>) => {
  return repo as Repo;
};

export const newMockGakurenRepo = (
  getGakurenWithAuthDataByEmail: jest.Mock,
  getGakurenById: jest.Mock,
  createGakuren: jest.Mock
) => {
  const repo = jest.fn<IGakurenRepo, []>().mockImplementation(() => ({
    getGakurenWithAuthDataByEmail,
    getGakurenById,
    createGakuren,
  }));
  return new repo();
};
