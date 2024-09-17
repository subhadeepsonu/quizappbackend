import express from 'express';
import { usermiddleware } from '../middlewares/user.middleware';
import { adminmiddleware } from '../middlewares/admin.middleware';
import { CreateFlashCard, deleteFlashCard, editFlashCard, getFlashCardBycategory, getFlashcards } from '../controllers/flashcard.controller';
export const flashcardRouter = express.Router();
flashcardRouter.get("/",usermiddleware,getFlashcards)
flashcardRouter.post("/create",adminmiddleware,CreateFlashCard)
flashcardRouter.put("/edit/:id",adminmiddleware,editFlashCard)
flashcardRouter.delete("/delete/:id",adminmiddleware,deleteFlashCard)
flashcardRouter.post("/filter",usermiddleware,getFlashCardBycategory)