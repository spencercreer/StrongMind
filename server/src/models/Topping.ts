import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ToppingSchema = new Schema(
  {
    name: { type: Schema.Types.String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Topping = model("Topping", ToppingSchema);
export default Topping;
