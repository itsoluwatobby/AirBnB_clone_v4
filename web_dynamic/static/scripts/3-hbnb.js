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

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      $('HEADER#api-status').addClass('available');
    },
    error: function (xhr, status, error) {
      $('HEADER#api-status').removeClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: (data) => {
      $('.places').empty();
      $.each(data, (i, place) => {
        const sectionPlace = `
        <article>
        <div class="title_box">
          <h2>${place.name}</h2>
          <div class="price_by_night">$${place.price_by_night}</div>
        </div>
        <div class="information">
          <div class="max_guest">${place.max_guest} Guests</div>
          <div class="number_rooms">${place.number_rooms} Bedrooms</div>
          <div class="number_bathrooms">${place.number_bathrooms} Bathrooms</div>
        </div>
        <div class="description">
          ${place.description}
        </div>
        </article>
        `;
        $('.places').append(sectionPlace);
      });
    }
  });
});
