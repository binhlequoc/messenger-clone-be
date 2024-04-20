import { AppError } from "@src/core/error";
import { Request, Response, Router } from "express";

export abstract class Controller {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  protected initializeRoutes() {
    this.router.get("/", this.sendResponse.bind(this));
    this.router.post("/", this.sendResponse.bind(this));
    this.router.put("/:id", this.sendResponse.bind(this));
    this.router.patch("/:id", this.sendResponse.bind(this));
    this.router.delete("/:id", this.sendResponse.bind(this));
  }

  protected async sendResponse<T>(req: Request, res: Response) {
    try {
      if (req.method === "GET") {
        const result = await this.get(req, res);
        if (res.headersSent) return;
        return res.status(200).json(result);
      }
      if (req.method === "POST") {
        const result = await this.post(req, res);
        if (res.headersSent) return;
        return res.status(200).json(result);
      }
      if (req.method === "PUT") {
        const result = await this.put(req, res);
        if (res.headersSent) return;
        return res.status(200).json(result);
      }
      if (req.method === "PATCH") {
        const result = await this.patch(req, res);
        if (res.headersSent) return;
        return res.status(200).json(result);
      }
      if (req.method === "DELETE") {
        const result = await this.delete(req, res);
        if (res.headersSent) return;
        return res.status(200).json(result);
      }
      return res.status(404).json({ message: "Not found" });
    } catch (error) {
      console.log("[error]:", error);
      if (error instanceof AppError) {
        res.status(error.status).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  }

  abstract get(req: Request, res: Response): Promise<any>;
  abstract post(req: Request, res: Response): Promise<any>;
  abstract put(req: Request, res: Response): Promise<any>;
  abstract patch(req: Request, res: Response): Promise<any>;
  abstract delete(req: Request, res: Response): Promise<any>;
}
