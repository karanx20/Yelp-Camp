const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb+srv://karanx20:4dl6jhTZX8m9g3Bg@cluster0.tmeg7dc.mongodb.net/yelp-camp?retryWrites=true&w=majority')

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //MY USER ID
            author: '6499aa24604c1210a500786e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: 'Point',
              coordinates: [
                 cities[random1000].longitude,
                 cities[random1000].latitude, 
               ]
          },
            images:  [
                {
                  url: 'https://res.cloudinary.com/deoxyygcr/image/upload/v1688124169/YelpCamp/kdx5kls83af2onm8fpvm.jpg',
                  filename: 'YelpCamp/kdx5kls83af2onm8fpvm'
                },
                {
                  url: 'https://res.cloudinary.com/deoxyygcr/image/upload/v1688124169/YelpCamp/o66epfpmfyxgvmk1rcv7.jpg',
                  filename: 'YelpCamp/o66epfpmfyxgvmk1rcv7'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})