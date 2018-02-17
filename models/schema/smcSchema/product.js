const Sequelize = require("sequelize")
const sequelize = require(__base + "/SeqDbConn")

var product_tbl = sequelize.define(
	"product_tbl",
	{
		primaryKey: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			field: "productId"
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
		productType: {
			type: Sequelize.INTEGER,
			allowNull: false,
			primaryKey: false,
			field: "c_productTypeId"
		},
		offerkey: {
			type: Sequelize.STRING,
			allowNull: true,
			primaryKey: false
		}
	},
	{
		freezeTableName: true,
		timestamps: false
	}
)

var fashionProduct_tbl = sequelize.define(
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
	}
)

fashionProduct_tbl.belongsTo(product_tbl, {
	as: "primary",
	foreignKey: "productId_fkl"
})
product_tbl.belongsTo(fashionProduct_tbl, {
	foreignKey: "productId",
	as: "meta"
})

class ProductSchema {
	constructor() {}
	static mainProduct() {
		return product_tbl
	}
	static fashionProduct() {
		return fashionProduct_tbl
	}
}

module.exports = ProductSchema
