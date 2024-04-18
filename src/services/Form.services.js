const Form = require("../models/Form.model");
const { v4: uuidv4 } = require("uuid");

async function createForm(formData) {
  // Generate a unique formId using uuid
  const formId = generateUniqueID();

  console.log({
    formId: formId,
    ...formData,
  });
  // Create a new form instance
  const newForm = new Form({
    ...formData,
    formId: formId,
  });

  // Save the new form to the database
  const createdForm = await newForm.save();

  return createdForm.formId;
}

async function getAllForms() {
  return await Form.find();
}

async function getFormById(formId) {
  return await Form.findById(formId);
}

async function getAllFormsByUserId(userId) {
  return await Form.find({ userId });
}

async function updateFormById(formId, updateData) {
  return await Form.findByIdAndUpdate(formId, updateData, {
    new: true,
    runValidators: true,
  });
}

async function deleteFormById(formId) {
  return await Form.findByIdAndDelete(formId);
}

module.exports = {
  createForm,
  getAllForms,
  getFormById,
  getAllFormsByUserId,
  updateFormById,
  deleteFormById,
};

// Function to generate random 6-character unique ID
function generateUniqueID() {
  // Generate UUID
  const uuid = uuidv4();

  // Extract the first 6 characters of the UUID
  const shortUUID = uuid.replace(/-/g, "").substring(0, 6);

  return shortUUID;
}
