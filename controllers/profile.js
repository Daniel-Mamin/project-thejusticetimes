const User = require("../models/User");
const Article = require("../models/Article");
const errorHandler = require("../utils/errorHandler");

module.exports.getInfo = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId)

		res.status(200).json(user);
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.update = async (req, res) => {
	try {
		const user = await User.findById(req.user.userId);

		const userUpdate = await User.findOneAndUpdate(
			{ _id: req.user.userId },
			{
				f_name: req.body.f_name,
				l_name: req.body.l_name,
				description: req.body.description,
				avatar: req.file ? req.file.path : user.avatar
			},
			{ new: true }
		);

		res.status(200).json(userUpdate);
	} catch (e) {
		errorHandler(res, e);
	}
};

module.exports.delete = async (req, res) => {
	try {
		await User.findOneAndUpdate(
			{ _id: req.user.userId },
			{ avatar: "" },
			{ new: true }
		);

		res.status(200).json({message: "Delete photo!"});
	} catch (e) {
		errorHandler(res, e);
	}
}