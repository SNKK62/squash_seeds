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

      const gakurenWithAuthData = {
        gakuren: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          grade: 1,
          universityId: 1,
          role: "幹部",
          region: "全日本",
        },
        authData: { email, hashedPassword },
      };

      const mockGetGakurenWithAuthDataByEmail = jest
        .fn()
        .mockResolvedValue(Promise.resolve(gakurenWithAuthData));

      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        jest.fn()
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      const result = await authService.login(email, password);

      expect(result).toEqual(gakurenWithAuthData);
      expect(
        mockGakurenRepo.getGakurenWithAuthDataByEmail
      ).toHaveBeenCalledWith(email);
    });

    it("should throw an error if login fails", async () => {
      const email = "test@example.com";
      const wrongPassword = "wrongPassword";
      const password = "password";
      const hashedPassword = hashString(password);

      const gakurenWithAuthData = {
        gakuren: {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          grade: 1,
          universityId: 1,
          role: "幹部",
          region: "全日本",
        },
        authData: { email, hashedPassword },
      };

      const mockGetGakurenWithAuthDataByEmail = jest
        .fn()
        .mockResolvedValue(Promise.resolve(gakurenWithAuthData));

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

      const gakurenWithAuthData = {
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
          hashedPassword: "",
        },
      };

      const mockCreateGakuren = jest
        .fn()
        .mockResolvedValue(gakurenWithAuthData.gakuren);

      const mockGetGakurenWithAuthDataByEmail = jest
        .fn()
        .mockResolvedValue(Promise.resolve(gakurenWithAuthData));
      const mockGakurenRepo = newMockGakurenRepo(
        mockGetGakurenWithAuthDataByEmail,
        jest.fn(),
        mockCreateGakuren
      );

      const authService = new AuthService(
        newMockRepo({ gakuren: mockGakurenRepo })
      );

      const result = await authService.signup(input);

      expect(result).toEqual(gakurenWithAuthData);
      expect(mockCreateGakuren).toHaveBeenCalled();
      expect(mockGetGakurenWithAuthDataByEmail).toHaveBeenCalledWith(
        input.email
      );
    });

    it("should return an error if signup failed", async () => {
      const email = "test@example.com";
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

      const gakurenWithAuthData = {
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
        },
      };

      const mockCreateGakuren = jest
        .fn()
        .mockRejectedValue(new Error("Error while create gakuren"));

      const mockGetGakurenWithAuthDataByEmail = jest
        .fn()
        .mockResolvedValue(Promise.resolve(gakurenWithAuthData));
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
      expect(mockCreateGakuren).toHaveBeenCalled();
      expect(
        mockGakurenRepo.getGakurenWithAuthDataByEmail
      ).not.toHaveBeenCalledWith(input.email);
    });
  });
});
