import { AuthService, hashString } from "@service/auth.service";
import { CreateGakurenInput } from "@repository/gakuren.repo";
import { newMockGakurenRepo, newMockRepo } from "@/utils/testUtils";

describe("AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return a Gakuren object if login is successful", async () => {
      const email = "test@example.com";
      const password = "password";
      const hashedPassword = hashString(password);

      const mockGetGakurenWithAuthDataByEmail = jest.fn().mockResolvedValue(
        Promise.resolve({
          gakuren: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            grade: 1,
            universityId: 1,
            role: "幹部",
            region: "全日本",
          },
          authData: { email, hashedPassword, hashedSessionToken: "" },
        })
      );

      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        jest.fn()
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      const result = await authService.login(email, password);

      expect(result).toEqual({
        id: "1",
        firstName: "John",
        lastName: "Doe",
        grade: 1,
        universityId: 1,
        role: "幹部",
        region: "全日本",
      });
      expect(
        mockGakurenRepo.getGakurenWithAuthDataByEmail
      ).toHaveBeenCalledWith(email);
    });

    it("should throw an error if login fails", async () => {
      const email = "test@example.com";
      const wrongPassword = "wrongPassword";
      const password = "password";
      const salt = "salt";
      const hashedPassword = hashString(password);

      const mockGetGakurenWithAuthDataByEmail = jest.fn().mockResolvedValue(
        Promise.resolve({
          gakuren: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            grade: 1,
            universityId: 1,
            role: "幹部",
            region: "全日本",
          },
          authData: { email, hashedPassword, salt, hashedSessionToken: "" },
        })
      );

      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        jest.fn()
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      await expect(authService.login(email, wrongPassword)).rejects.toThrow(
        "Invalid password"
      );
    });
  });

  describe("signup", () => {
    it("should return a Gakuren object if signup is successful", async () => {
      const email = "test@example.com";
      const salt = "salt";
      const password = "password";
      const input: CreateGakurenInput = {
        firstName: "John",
        lastName: "Doe",
        grade: 1,
        universityId: 1,
        role: "幹部",
        region: "全日本",
        email,
        password,
      };
      const hashedPassword = hashString(password);

      const mockCreateGakuren = jest.fn().mockResolvedValue(undefined);

      const mockGetGakurenWithAuthDataByEmail = jest.fn().mockResolvedValue(
        Promise.resolve({
          gakuren: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            grade: 1,
            universityId: 1,
            role: "幹部",
            region: "全日本",
          },
          authData: {
            email: email,
            hashedPassword,
            salt,
            hashedSessionToken: "",
          },
        })
      );
      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        mockCreateGakuren
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      const result = await authService.signup(input);

      expect(result).toEqual({
        id: "1",
        firstName: "John",
        lastName: "Doe",
        grade: 1,
        universityId: 1,
        role: "幹部",
        region: "全日本",
      });
      expect(mockCreateGakuren).toHaveBeenCalledWith(input);
      expect(
        mockGakurenRepo.getGakurenWithAuthDataByEmail
      ).toHaveBeenCalledWith(input.email);
    });

    it("should return an error if signup failed", async () => {
      const email = "test@example.com";
      const salt = "salt";
      const password = "password";
      const input: CreateGakurenInput = {
        firstName: "John",
        lastName: "Doe",
        grade: 1,
        universityId: 1,
        role: "幹部",
        region: "全日本",
        email,
        password,
      };
      const hashedPassword = hashString(password);

      const mockCreateGakuren = jest
        .fn()
        .mockRejectedValue(new Error("Error while create gakuren"));

      const mockGetGakurenWithAuthDataByEmail = jest.fn().mockResolvedValue(
        Promise.resolve({
          gakuren: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            grade: 1,
            universityId: 1,
            role: "幹部",
            region: "全日本",
          },
          authData: {
            email: email,
            hashedPassword,
            salt,
            hashedSessionToken: "",
          },
        })
      );
      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        mockCreateGakuren
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      await expect(authService.signup(input)).rejects.toThrow(
        "Error while create gakuren"
      );
      expect(mockCreateGakuren).toHaveBeenCalledWith(input);
      expect(
        mockGakurenRepo.getGakurenWithAuthDataByEmail
      ).not.toHaveBeenCalledWith(input.email);
    });
  });

  describe("checkSessionToken", () => {
    it("should return true if the session token is valid", async () => {
      const email = "test@example.com";
      const sessionToken = "sessionToken";
      const salt = "salt";
      const hashedSessionToken = hashString(sessionToken);

      const mockGetGakurenWithAuthDataByEmail = jest.fn().mockResolvedValue(
        Promise.resolve({
          gakuren: {
            id: "1",
            firstName: "John",
            lastName: "Doe",
            grade: 1,
            universityId: 1,
            role: "幹部",
            region: "全日本",
          },
          authData: { email, hashedPassword: "", salt, hashedSessionToken },
        })
      );

      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        jest.fn()
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      const result = await authService.checkSessionToken(email, sessionToken);

      expect(result).toBe(true);
      expect(
        mockGakurenRepo.getGakurenWithAuthDataByEmail
      ).toHaveBeenCalledWith(email);
    });

    it("should return false if the session token is invalid", async () => {
      const email = "test@example.com";
      const sessionToken = "SessionToken";
      const invalidSessionToken = "invalidSessionToken";
      const salt = "salt";
      const hashedSessionToken = hashString(sessionToken);

      const mockGetGakurenWithAuthDataByEmail = jest.fn().mockResolvedValue({
        gakuren: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          grade: 1,
          universityId: 1,
          role: "幹部",
          region: "全日本",
        },
        authData: { email, hashedPassword: "", salt, hashedSessionToken },
      });

      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        jest.fn()
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      const result = await authService.checkSessionToken(
        email,
        invalidSessionToken
      );

      expect(result).toBe(false);
      expect(
        mockGakurenRepo.getGakurenWithAuthDataByEmail
      ).toHaveBeenCalledWith(email);
    });

    it("should throw an error if an error occurs", async () => {
      const email = "test@example.com";
      const sessionToken = "sessionToken";

      const mockGetGakurenWithAuthDataByEmail = jest
        .fn()
        .mockRejectedValue(new Error("Error while getting gakuren"));

      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        jest.fn()
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      await expect(
        authService.checkSessionToken(email, sessionToken)
      ).rejects.toThrow("Error while getting gakuren");
      expect(
        mockGakurenRepo.getGakurenWithAuthDataByEmail
      ).toHaveBeenCalledWith(email);
    });
  });
});
