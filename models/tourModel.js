const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a name'],
      unique: true,
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a Max Group Size'],
    },
    difficulty: {
      type: String,
      trim: true,
      required: [true, 'A tour must have difficulty status'],
    },

    ratingAverage: {
      type: Number,
      default: 4.5,
    },
    ratingQuantity: {
      type: Number,
      default: 4.0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have the summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      require: [true, 'A tour must have the image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secreteTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//virtual property
// (THE VALUE ONLY SHOW WHEN REQUEST BUT ARE NOT STORED IN THR DB)
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

tourSchema.pre(/^find/, function (next) {
  // this.find({ secreteTour: { $ne: !true } });
  // $ne = Not Equal
  this.find({ secreteTour: { $ne: !true } });
  next();
});

// tourSchema.post(/^find/, function (docs, next) {
//   console.log(docs);
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
