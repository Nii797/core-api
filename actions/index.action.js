class API {
  constructor(model) {
    this.model = model;
  }

  async list(q) {
    try {
      let params = {};
      if (q) {
        params = q;
      }

      let data = await this.model.find(params).exec();

      return data;
    } catch (err) {
      throw err;
    }
  }

  async show(q, population) {
    try {
        let populate_params = []

        if(population){
            populate_params = population    
        }

        let data =  await this.model.findOne(q).populate(populate_params).lean().exec()

        return data
    } catch(err) {
        throw err
    }
  }

  async create(input) {
    try {
      let data = new this.model(input);
      await data.save();

      return data;
    } catch (err) {
      throw err;
    }
  }

  async update(q, input, opts) {
    try {
      let data = await this.model.findOneAndUpdate(q, input, opts).exec();

      return data;
    } catch (err) {
      throw err;
    }
  }

  async delete(q) {
    try {
      let data = await this.model.findOneAndDelete(q).exec();

      return data;
    } catch (err) {
      throw err;
    }
  }

  async softDelete(q) {
    try {
      let data = await this.model
        .findOneAndUpdate(q, {
          deleted_at: Date.now
        })
        .exec();

      return data;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = API;
