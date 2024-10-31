import mongoose from "mongoose";
import _ from "lodash";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    photoURL: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.displayName = _.startCase(this.displayName);
  next();
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.$set && update.$set.displayName) {
    update.$set.displayName = _.startCase(update.$set.displayName);
  }

  next();
});

userSchema.virtual("id").get(function (next) {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
