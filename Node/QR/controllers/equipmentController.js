const Equipment = require("../model/Equipment");

const QRCode = require("qrcode");

// Function Definitons

// New Equipment Definitons
const createNewEquipment = async (req, res) => {
  if (
    !req?.body?.equipmentCode ||
    !req?.body?.equipmentName ||
    !req?.body?.equipmentLocation ||
    !req?.body?.equipmentClass ||
    !req?.body?.equipmentSerieNo
  ) {
    return res
      .status(400)
      .json({ message: "Equipment informations are required" });
  }

  try {
    const qrCodeData = `http://localhost:5000/api/equipment/${req.body.equipmentCode}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    const result = await Equipment.create({
      equipmentCode: req.body.equipmentCode,
      equipmentName: req.body.equipmentName,
      equipmentLocation: req.body.equipmentLocation,
      equipmentClass: req.body.equipmentClass,
      equipmentSerieNo: req.body.equipmentSerieNo,
      equipmentCapacity: req.body.equipmentCapacity,
      equipmentActive: req.body.equipmentActive,
      equipmentTMSActive: req.body.equipmentTMSActive,
      periodicControlLastDate: req.body.periodicControlLastDate,
      periodicControlFutureDate: req.body.periodicControlFutureDate,
      periodicControlCompany: req.body.periodicControlCompany,
      remainDay: req.body.remainDay,
      fault: req.body.fault,
      periodicMaintenanceLastDate: req.body.periodicMaintenanceLastDate,
      periodicMaintenanceFutureDate: req.body.periodicMaintenanceFutureDate,
      qrCode: qrCode,
      qrCodeData: qrCodeData,
    });

    console.log(`Equipment ${result} Created Successfully`);
    res.status(201).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Get All Equipments
const allEquipments = async (req, res) => {
  try {
    const equipments = await Equipment.find();

    if (!equipments || equipments.length === 0) {
      return res.status(204).json({ message: "No equipment found." });
    }

    const productCount = equipments.length;
    return res.status(200).json({ equipments, productCount });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Get Equipment By Equipment Code
const equipmentByCode = async (req, res) => {
  const { equipmentCode } = req.params;

  if (!equipmentCode) {
    return res.status(400).json({ message: "Equipment Code is required" });
  }

  try {
    const equipment = await Equipment.findOne({ equipmentCode }).exec();

    if (!equipment) {
      return res
        .status(404)
        .json({ message: `No equipment matches code ${equipmentCode}` });
    }

    console.log(`Equipment ${equipment} is found.`);
    res.status(200).json(equipment);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Update Equipment Information
const updateEquipment = async (req, res) => {
  const { equipmentCode } = req.params;

  if (!equipmentCode) {
    return res.status(400).json({ message: "Equipment Code is required" });
  }

  const updateEquipment = {};

  if (req.body.equipmentName)
    updateEquipment.equipmentName = req.body.equipmentName;
  if (req.body.equipmentLocation)
    updateEquipment.equipmentLocation = req.body.equipmentLocation;
  if (req.body.equipmentClass)
    updateEquipment.equipmentClass = req.body.equipmentClass;
  if (req.body.equipmentSerieNo)
    updateEquipment.equipmentSerieNo = req.body.equipmentSerieNo;
  if (req.body.equipmentCapacity)
    updateEquipment.equipmentCapacity = req.body.equipmentCapacity;
  if (req.body.equipmentActive)
    updateEquipment.equipmentActive = req.body.equipmentActive;
  if (req.body.equipmentTMSActive)
    updateEquipment.equipmentTMSActive = req.body.equipmentTMSActive;
  if (req.body.periodicControlLastDate)
    updateEquipment.periodicControlLastDate = req.body.periodicControlLastDate;
  if (req.body.periodicControlFutureDate)
    updateEquipment.periodicControlFutureDate =
      req.body.periodicControlFutureDate;
  if (req.body.periodicControlCompany)
    updateEquipment.periodicControlCompany = req.body.periodicControlCompany;
  if (req.body.remainDay) updateEquipment.remainDay = req.body.remainDay;
  if (req.body.fault) updateEquipment.fault = req.body.fault;
  if (req.body.periodicMaintenanceLastDate)
    updateEquipment.periodicMaintenanceLastDate =
      req.body.periodicMaintenanceLastDate;
  if (req.body.periodicMaintenanceFutureDate)
    updateEquipment.periodicMaintenanceFutureDate =
      req.body.periodicMaintenanceFutureDate;

  try {
    const result = await Equipment.findOneAndUpdate(
      { equipmentCode: equipmentCode },
      updateEquipment,
      { new: true }
    );

    if (!result) {
      return res
        .status(404)
        .json({ message: `No equipment matches code ${equipmentCode}.` });
    }

    res.status(200).json(result);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

// Delete Equipment Information
const deleteEquipment = async (req, res) => {
  const { equipmentCode } = req.params;

  if (!equipmentCode) {
    return res.status(400).json({ message: "Equipment Code is required" });
  }

  try {
    const equipment = await Equipment.findOne({
      equipmentCode: equipmentCode,
    }).exec();
    if (!equipment) {
      return res
        .status(404)
        .json({ message: `No equipment information matches ${equipmentCode}` });
    }

    const result = await equipment.deleteOne();
    res.status(200).json({
      message: `Equipment ${equipmentCode} is successfully deleted.`,
      result,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createNewEquipment,
  equipmentByCode,
  allEquipments,
  updateEquipment,
  deleteEquipment,
};
