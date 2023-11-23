class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    console.log(this.queryString);
    const queryObject = { ...this.queryString };
    const excludedField = ['page', 'sort', 'limit', 'fields']; //ignore these 4 keyword
    excludedField.forEach((el) => delete queryObject[el]);
    // 1.B) ADVANCE Filtering
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    console.log(this);
    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryString.sort) {
      //THe url can't be having space so we user ",". then replace it with space
      //and use in sort function
      const sortBy = this.queryString.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      //if user doesn't query with sort, the result will be sorted by createdAt itself
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }
  limitFields() {
    //Field limiting
    console.log('limiting');
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v'); //excluding __v from query result
      // query = query.select('-__v -createdAt'); //Another way of excluding
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = APIFeatures;
