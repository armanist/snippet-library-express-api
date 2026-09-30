import { Router } from "express";
import { SnippetsController } from "./snippets.controller.js";

export function createSnippetsRouter(snippetsController: SnippetsController) {
    const router = Router();

    router.get('/', snippetsController.getAll)
    router.get('/:id', snippetsController.getOne)
    router.post('/', snippetsController.create)

    return router
}