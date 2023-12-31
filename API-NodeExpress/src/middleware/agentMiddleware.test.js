const { verifyToken } = require("../utils/jwtUtils");
const agentMiddleware = require("./agentMiddleware");

jest.mock("../utils/jwtUtils", () => ({
  verifyToken: jest.fn(),
}));

describe("Testes para o middleware de atendente", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      headers: {
        authorization: "Bearer token_valido",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Token válido e função de próxima chamada", () => {
    verifyToken.mockReturnValue({ role: "agent" });

    agentMiddleware(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith("Bearer token_valido");
    expect(next).toHaveBeenCalled();
  });

  test("Token inválido retorna erro 401", () => {
    verifyToken.mockImplementation(() => {
      throw new Error("Token inválido");
    });

    agentMiddleware(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith("Bearer token_valido");
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
  });

  test("Token não fornecido retorna erro 401", () => {
    req.headers.authorization = undefined;

    agentMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Não autorizado" });
  });

  test("Token fornecido com função de próxima chamada, mas sem permissão de atendente retorna erro 403", () => {
    verifyToken.mockReturnValue({ role: "user" });

    agentMiddleware(req, res, next);

    expect(verifyToken).toHaveBeenCalledWith("Bearer token_valido");
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Não autorizado" });
  });
});
