// models/helpCenterModel.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const HelpCenterSchema = new Schema(
  {
    helpcenter_ticket_id: { type: String, required: true },
    helpcenter_employee_id: { type: String, required: true},
    helpcenter_employee_code: { type: String, required: true},
    helpcenter_ticket_description: { type: String, required: true },
    helpcenter_ticket_priority: { type: String },
    helpcenter_ticket_department: { type: String },
    helpcenter_ticket_created_date: { type: Date, default: Date.now },
    helpcenter_ticket_status: { type: String },
    helpcenter_ticket_solved_date: { type: Date, default: Date.now },
    helpcenter_ticket_solved_by: { type: String },
    helpcenter_ticket_managed_by: { type: String },
    helpcenter_solve_duration: { type: String },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const HelpCenter = mongoose.model("HelpCenter", HelpCenterSchema);

module.exports = HelpCenter;
