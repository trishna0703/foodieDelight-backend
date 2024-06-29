const Restaurant = require("../../model/Restaurants");
const fs = require('fs');

async function getRestaurantList(req, res) {
  try {
    const list = await Restaurant.find();
    res.json({ message: "Restaurant list.", status: 200, data: list });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching restaurant list",
      status: 500,
      data: [],
    });
  }
}

async function addOrUpdateRestaurant(req, res) {
  try {
    const featuredImage = req.file;
    const {
      _id: id,
      name,
      location,
      description,
      openingTime,
      closingTime,
      phoneNumber,
      email,
    } = req.body;
    let restaurantData = {
      name,
      location,
      description,
      openingTime,
      closingTime,
      phoneNumber,
      email,
    };

    console.log("step form body => ", restaurantData, featuredImage);

    if (featuredImage) {
      restaurantData.featuredImage = {
        data: featuredImage.buffer.toString('base64'),
        contentType: featuredImage.mimetype,
      };
    }

    let responseMessage;
    let status;
    let data;
    console.log("step line 49 => ", featuredImage);

    if (id) {
      const updatedRestaurant = await Restaurant.findByIdAndUpdate(
        id,
        restaurantData,
        { new: true }
      );

      if (updatedRestaurant) {
        responseMessage = "Restaurant updated successfully.";
        status = 200;
        data = updatedRestaurant;
      } else {
        responseMessage = "Restaurant not found.";
        status = 404;
        data = [];
      }
    } else {
      console.log("form creation entered ", restaurantData);
      const newRestaurant = await Restaurant.create(restaurantData);
      console.log("form completed ", newRestaurant);
      responseMessage = "Restaurant added to the list.";
      status = 201;
      data = newRestaurant;
    }

    res.json({
      message: responseMessage,
      status,
      data,
    });
  } catch (error) {
    console.log({ error });
    res.json({
      message: "Error adding restaurant",
      status: 500,
      data: [],
    });
  }
}

async function deleteRestaurant(req, res) {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Restaurant ID is required",
        status: 400,
        data: [],
      });
    }

    const result = await Restaurant.findByIdAndDelete(id);

    if (result) {
      res.json({ message: "Restaurant deleted", status: 200, data: result });
    } else {
      res
        .status(404)
        .json({ message: "Restaurant not found", status: 404, data: [] });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error Deleting Restaurant",
      status: 500,
      data: [],
    });
  }
}

module.exports = {
  getRestaurantList,
  addOrUpdateRestaurant,
  deleteRestaurant,
};
