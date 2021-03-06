'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bizSchema = Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  created: { type: Date, default: Date.now },
  name: { type: String, required: true },
  EIN: { type: String, required: true, unique: true,
    validate: {
      validator: function(v) {
        return /\d{2}-\d{7}/.test(v);
      },
      message: 'Not a valid EIN'
    }
  },
  loc: {
    lng: { type: Number, min: -180, max: 180 },
    lat: { type: Number, min: -90, max: 90 }
  },
  address: { Type: String }, //TODO: Breakdown address into address object
  //TODO: Consider allowing more than one menu per biz.
  menu: { Type: Schema.Types.ObjectId },
  url: { Type: String },
  email: { Type: String },
  phone: { Type: String }
});

bizSchema.index({ 'loc': '2d' });

module.exports = mongoose.model('biz', bizSchema);
