import express from "express";

import contactsController from "../../controllers/contacts/index.js";
import { isValidId, authentication } from "../../middlewars/index.js";

const contactsRouter = express.Router();

contactsRouter.use(authentication);

contactsRouter.get("/", contactsController.getAll);

contactsRouter.get("/:contactId", isValidId, contactsController.getById);

contactsRouter.post("/", contactsController.addNew);

contactsRouter.delete("/:contactId", isValidId,  contactsController.deleteById);

contactsRouter.put("/:contactId", isValidId, contactsController.updateById);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  contactsController.updateStatusContact
);

export default contactsRouter;
