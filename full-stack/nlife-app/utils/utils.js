module.exports.handleBusiness = function (query) {

  let newArray = [];

  query.businesses.forEach(function (element) {
    var obj = {};
    obj.name = element.name;
    obj.rating = element.rating;
    obj.location = element.location.city;
    obj.text = element.snippet_text;
    obj.id = element.id;
    obj.img = element['image_url'];
    obj.att = element.guestListLength;
    newArray.push(obj);
  })
    return newArray;
}
