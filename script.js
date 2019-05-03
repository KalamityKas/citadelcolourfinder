$(document).ready(function() {

	var paints = {};

	$.getJSON("paints.json", function(data) {
		paints = data.paints;
	});


	$("#search").click(function() {
		$("#results").html("Searching...").show('fast');

		var search = $("#colour").val();

		// Check if there's a # and remove it
		if(search.indexOf('#') !== -1) {
			var restring = search.split('#');
			search = restring[1];
		}

		// Create the results array with the colour comparisson

		var results = [];
		$.each(paints, function(key, content) {
			results.push({
				"key": key,
				"likeness": compareColour(search, content.value)
			});
		});

		// Sort by Likeness

		var sorted = results.slice(0);
		sorted.sort(function(a, b) {
			return a.likeness - b.likeness;
		});

		$("#results").html("");

		for(i = 0; i < 5; i++) {
			var innerHtml = '<p>' + paints[sorted[i].key].name + '</p>';

			innerHtml += '<div class="show" style="background:#' + paints[sorted[i].key].value + '" />'

			if(paints[sorted[i].key].metal) {
				innerHtml += '<div class="metal">M</div>';
			}

			$("<div />", {
				"class": "paint",
				html: innerHtml
			}).appendTo("#results");
		}
	});

	// Prevent Enter key strings from reloading page

	$("#searchForm").submit(function() {
		$("#search").click();
		return false;
	});

});

// Compare the colours

function compareColour(index, target) {
	if(target.length == 6) {
		var red = Math.abs(parseInt(index.substr(0,2), 16) - parseInt(target.substr(0,2), 16));
		var green = Math.abs(parseInt(index.substr(2,2), 16) - parseInt(target.substr(2,2), 16));
		var blue = Math.abs(parseInt(index.substr(4,2), 16) - parseInt(target.substr(4,2), 16));
		return red + green + blue;
	} else {
		return 9999;
	}
}