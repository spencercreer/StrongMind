import mongoose from "mongoose";
const { Schema, model } = mongoose;

const PizzaSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Pizza = model("Pizza", PizzaSchema);
export default Pizza;
