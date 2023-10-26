import { Router } from "express";
import {
  test,
  updateUser,
  deleteUser,
  getListing,
  getUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyUser.js";

const router = Router();

router.get("/test", test);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getListing);
router.get("/:id", verifyToken, getUser);

export default router;
