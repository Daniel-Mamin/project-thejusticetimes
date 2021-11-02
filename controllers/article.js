const Article = require("../models/Article");
const User = require("../models/User");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  try {
    const articles = await Article.aggregate([ 
      {$match: {}},
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      }
    ]).sort({date: -1});

    const popularArticle = await Article.aggregate([ 
      {$match: {}},
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user"
        }
      }
    ]).sort({count: -1});

   
    res.status(200).json({articles, popularArticle: popularArticle[0]});
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findById(id);
    const user = await User.findById(article.user);

    if (JSON.stringify(article.user) !== JSON.stringify(req.user.userId)) {
      article.count++;
      await article.save()
    }

    res.status(200).json({article, user});
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getAllByUserId = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.articles = user.articles.sort((a, b) => a.date < b.date ? 1 : -1)
     
    res.status(200).json(user);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const article = new Article({
      title: req.body.title,
      category: req.body.category,
      tag: `#${req.body.category}`,
      description: req.body.description,
      image: req.file.path,
      user: {...user}
    });

    user.articles.push(article);

    await article.save();
    await user.save();

    res.status(201).json({ message: "Article created!"});
  } catch (e) {
    errorHandler(res, e);
  }
};
