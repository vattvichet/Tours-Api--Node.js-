const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a name'],
      unique: true,
      maxLength: [40, "A Tour's name length must be Less or Equal to 40!"],
      minLength: [10, "A Tour's name length must be More than 10!"],
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
      enum: {
        values: ['easy', 'medium', 'hard'],
        message: 'Difficulty status should only be [easy],[medium] or [hard]',
      },
    },
    ratingAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be More or Equal to 1'],
      max: [5, 'Rating must be Less or Equal to 5'],
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
      validate: {
        validator: function (val) {
          // This only point to the current doc on new Document created
          return val < this.price;
        },
        message: 'Price Discount must be less than the Original Price.',
      },
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
  this.find({ secreteTour: { $ne: true } });

  //Only show IF ratingAverage != 4.5
  // this.find({ ratingAverage: { $ne: 4.5 } });
  next();
});

// tourSchema.post(/^find/, function (docs, next) {
//   console.log(docs);
//   next();
// });

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  //HIDE the tour IF secreteTour != TRUE
  this.pipeline().unshift({ $match: { secreteTour: { $ne: true } } });
  console.log(this);
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
