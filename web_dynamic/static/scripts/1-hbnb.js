$(document).ready(function () {
  let amenitiesList = {};
  $('INPUT#amenity_checker').change(function (event) {
    if ($(this).is(':checked')) {
      amenitiesList[$(this).data('name')] = $(this).data('id');
    } else {
      const others = Object.entries(amenitiesList).map(([key, value]) => {
        return value !== $(this).data('id') ? [key, value] : null;
      }).filter(real => real !== null);
      amenitiesList = Object.fromEntries(others);
    }
    const textVal = (Object.keys(amenitiesList)).join(', ');
    $('#text')
      .text(textVal.length > 15 ? `${textVal.substring(0, 15)}...` : textVal);
  });
});
