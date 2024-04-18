const express = require("express");
const formService = require("../services/Form.services");
const router = express.Router();

router.post("/create", createForm);
router.get("/", getAllForms);
router.get("/:formId", getFormById);
router.get("/user/:userId", getAllFormsByUserId);
router.put("/:formId", updateFormById);
router.delete("/:formId", deleteFormById);

async function createForm(req, res, next) {
  try {
    const formData = req.body;
    const newFormId = await formService.createForm(formData);
    res.status(201).json({
      message: "SUCCESS!",
      newFormId: newFormId,
    });
  } catch (error) {
    console.log("Error in creating form:", error);
    next(error);
  }
}

async function getAllForms(req, res, next) {
  try {
    const forms = await formService.getAllForms();
    res.json(forms);
  } catch (error) {
    console.log("Error in fetching forms:", error);
    next(error);
  }
}

async function getFormById(req, res, next) {
  try {
    const formId = req.params.formId;
    const form = await formService.getFormById(formId);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(form);
  } catch (error) {
    console.log("Error in fetching form by ID:", error);
    next(error);
  }
}

async function getAllFormsByUserId(req, res, next) {
  try {
    const userId = req.params.userId;
    const forms = await formService.getAllFormsByUserId(userId);
    res.json(forms);
  } catch (error) {
    console.log("Error in fetching forms by user ID:", error);
    next(error);
  }
}

async function updateFormById(req, res, next) {
  try {
    const formId = req.params.formId;
    const updateData = req.body;
    const updatedForm = await formService.updateFormById(formId, updateData);
    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json(updatedForm);
  } catch (error) {
    console.log("Error in updating form by ID:", error);
    next(error);
  }
}

async function deleteFormById(req, res, next) {
  try {
    const formId = req.params.formId;
    const deletedForm = await formService.deleteFormById(formId);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.json({ message: "Form deleted successfully" });
  } catch (error) {
    console.log("Error in deleting form by ID:", error);
    next(error);
  }
}

module.exports = router;
