const MscController = require(__controllers + "/msc/MscController")
const Sequelize = require("sequelize")

class MscProductController extends MscController {
	constructor() {
		super()
		this._seqconfig = null
	}

	init(config) {
		this._seqconfig = config
	}

	get productSeq() {
		return this._seqconfig.productSequelize
	}

	readProductItem(id) {
		let self = this
		return new Promise(function(resolve, reject) {
			var Product_tbl = self.productSeq.define(
				"product_tbl",
				{
					productId: {
						type: Sequelize.INTEGER,
						autoIncrement: true,
						primaryKey: true
					},
					title: {
						type: Sequelize.STRING,
						allowNull: false,
						primaryKey: false
					},
					price: {
						type: Sequelize.INTEGER,
						allowNull: false,
						primaryKey: false
					},
					c_productTypeId: {
						type: Sequelize.INTEGER,
						allowNull: false,
						primaryKey: false
					}
				},
				{
					freezeTableName: true,
					timestamps: false
				}
			)

			var FashionProduct_tbl = self.productSeq.define(
				"fashion_product_tbl",
				{
					productId_fkl: {
						type: Sequelize.INTEGER,
						primaryKey: true
					},
					color: {
						type: Sequelize.STRING,
						allowNull: false,
						primaryKey: false
					},
					colortones: {
						type: Sequelize.STRING,
						allowNull: false,
						primaryKey: false
					},
					fabrics: {
						type: Sequelize.STRING,
						allowNull: false,
						primaryKey: false
					},
					sizeKind: {
						type: Sequelize.STRING,
						allowNull: false,
						primaryKey: false
					}
				},
				{
					freezeTableName: true,
					timestamps: false
				},
				{
					classMethods: {
						associate: function(models) {
							// associations can be defined here
							console.log("associate", models)
							models.customer.hasMany(models.order)
						}
					}
				}
			)
			//FashionProduct_tbl.belongsTo(Product_tbl, { foreignKey: "productId_fkl" })
			//insert
			// Product_tbl.sync().then(function() {
			// 	return Product_tbl.create({
			// 		title: "userName",
			// 		price: "2",
			// 		c_productTypeId: "1"
			// 	})
			// })

			//select
			// Product_tbl.findAll({}).then(function(data) {
			// 	console.log("find")
			// 	console.log(data)
			// })

			FashionProduct_tbl.belongsTo(Product_tbl, { foreignKey: "productId_fkl" })
			//Product_tbl.belongsTo(FashionProduct_tbl, { foreignKey: "productId" })

			FashionProduct_tbl.findAll({
				include: [
					{
						model: Product_tbl,
						where: {
							productId: "2"
						}
					}
				]
			}).then(function(data) {
				console.log("FsProductModel find")
				console.log(data)
			})
		})
	}
}

module.exports = MscProductController
