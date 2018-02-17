const ProductSchema = require(__schema + "/smcSchema/product")
const Serializer = require("sequelize-to-json")
let mainSchema = ProductSchema.mainProduct()
let fashionSchema = ProductSchema.fashionProduct()

class MscProductModule {
	constructor() {}
	readProductItem(id) {
		let self = this
		return new Promise(function(resolve, reject) {
			const scheme = {
				include: ["@all", "meta"],
				exclude: ["@fk"],
				assoc: {
					// scheme to be used for the associated `User` instance
					meta: {
						exclude: ["@pk", "@fk"]
					}
				}
			}
			mainSchema
				.find({
					include: [
						{
							model: fashionSchema,
							as: "meta"
						}
					],
					where: {
						productId: id
					}
				})
				.then(function(data) {
					console.log("raw data", data)
					let serializer = new Serializer(mainSchema, scheme)
					let postAsJSON = serializer.serialize(data)
					resolve(postAsJSON)
				})
		})
	}

	readFasionProductList() {
		let self = this
		const scheme = {
			include: ["@all", "primary"],
			exclude: ["@pk", "@fk"]
		}
		return new Promise(function(resolve, reject) {
			fashionSchema
				.findAll({
					include: [
						{
							model: mainSchema,
							as: "primary"
						}
					]
				})
				.then(function(data) {
					let serializer = Serializer.serializeMany(data, fashionSchema, scheme)
					resolve(serializer)
				})
		})
	}
}

module.exports = MscProductModule
