const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const equipmentSchema = new Schema({
  equipmentCode: {
    type: String,
    required: true,
  },
  equipmentName: {
    type: String,
    required: true,
  },
  equipmentLocation: {
    type: String,
    required: true,
  },
  equipmentClass: {
    type: String,
    required: true,
  },
  equipmentSerieNo: {
    type: String,
    required: true,
  },
  equipmentCapacity: {
    type: String,
  },
  equipmentActive: {
    type: String,
  },
  equipmentTMSActive: {
    type: String,
  },
  periodicControlLastDate: {
    type: Schema.Types.Mixed,
  },
  periodicControlFutureDate: {
    type: Schema.Types.Mixed,
  },
  periodicControlCompany: {
    type: String,
  },
  remainDay: {
    type: Schema.Types.Mixed,
  },
  fault: {
    type: String,
  },
  periodicMaintenanceLastDate: {
    type: Schema.Types.Mixed,
  },
  periodicMaintenanceFutureDate: {
    type: Schema.Types.Mixed,
  },
  qrCode: { type: String },
  qrCodeData: { type: String },
});

module.exports = mongoose.model("Equipment", equipmentSchema);
