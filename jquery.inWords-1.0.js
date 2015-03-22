/**

Author : Deepak Modak
Description : jQuery plugin to convert numerals to words.
Date : 22 March 2015

**/
(function($) {
	var originalNumber, inWords, i, j;
	var unitsPlace = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
	var tensPlace = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
	var tenthPlace = ['', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

	function tensfactor() {
		if (originalNumber[i] === 0) {
			inWords[j] = '';
		} else if (originalNumber[i] === 1) {
			inWords[j] = tensPlace[originalNumber[i - 1]];
		} else {
			inWords[j] = tenthPlace[originalNumber[i]];
		}
	}

	function convertToWordsUtil(amount) {
		var unitsPlaceLength, convertedValue = '';
		inWords = [];
		j = 0;
		var amountStr = amount.toString();
		var reveresedNumber = amountStr.split('');
		originalNumber = reveresedNumber.reverse();
		unitsPlaceLength = reveresedNumber.length;
		if (Number(amount) === 0) {
			return 'zero';
		}
		if (originalNumber.length > 9) {
			return "number exceeds the convertible limit!";
		}
		if (Number(amount) < 0) {
			return "can't covert negative values!";
		}
		for (i = 0; i < unitsPlaceLength; i++) {
			switch (i) {
				case 0:
					if (originalNumber[i] === '0' || originalNumber[i + 1] === '1') {
						inWords[j] = ' ';
					} else {
						inWords[j] = unitsPlace[originalNumber[i]];
					}
					inWords[j] = ' ' + inWords[j];
					break;
				case 1:
					tensfactor();
					break;
				case 2:
					if (originalNumber[i] === '0') {
						inWords[j] = ' ';
					} else if (originalNumber[i - 1] !== '0' && originalNumber[i - 2] !== '0') {
						inWords[j] = ' ' + unitsPlace[originalNumber[i]] + ' hundred and ';
					} else {
						inWords[j] = ' ' + unitsPlace[originalNumber[i]] + ' hundred ';
					}
					break;
				case 3:
					if (originalNumber[i] === '0' || originalNumber[i + 1] === '1') {
						inWords[j] = ' ';
					} else {
						inWords[j] = ' ' + unitsPlace[originalNumber[i]];
					}
					if (originalNumber[i + 1] !== '0' || originalNumber[i] > '0') {
						inWords[j] = ' ' + inWords[j] + ' thousand ';
					}
					break;
				case 4:
					tensfactor();
					break;
				case 5:
					if (originalNumber[i] === '0' || originalNumber[i + 1] === '1') {
						inWords[j] = ' ';
					} else {
						inWords[j] = ' ' + unitsPlace[originalNumber[i]];
					}
					if (originalNumber[i + 1] !== '0' || originalNumber[i] > '0') {
						inWords[j] = ' ' + inWords[j] + ' lakh ';
					}
					break;
				case 6:
					tensfactor();
					break;
				case 7:
					if (originalNumber[i] === '0' || originalNumber[i + 1] === '1') {
						inWords[j] = ' ';
					} else {
						inWords[j] = ' ' + unitsPlace[originalNumber[i]];
					}
					inWords[j] = ' ' + inWords[j] + ' crore ';
					break;
				case 8:
					tensfactor();
					break;
				default:
					break;
			}
			j++;
		}
		inWords.reverse();
		for (var x in inWords)
		convertedValue += inWords[x];

		return convertedValue;
	}
	String.prototype.capitalizeFirstLetter = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}

	function convertToWords(amount) {
		var roundedValue = Math.round(amount);
		var convertedAmount = convertToWordsUtil(roundedValue).trim();
		return convertedAmount.replace(/\s{2,}/g, ' ');
	}

	$.fn.inWords = function(options) {

		var settings = $.extend({
			format: 'roundedTo2Decimal', //rounded   //roundedTo2Decimal
			INRCaption: 'true',
			prefix: null,
			suffix: null
		}, options);

		return this.each(function() {
			var sourceText = $(this).text();
			var convertedText;

			if (settings.format) {
				if (settings.format == 'roundedTo2Decimal') {
					var num = Number(sourceText);
					var rounded2Decimal = Math.round(num * 100) / 100;
					var amts = rounded2Decimal.toString().split('.');
					if (amts[1] == null) {
						convertedText = convertToWords(sourceText);
					} else {
						var firstpart = convertToWords(amts[0]).replace(/ and/gi, '') + " rupees ";
						var lastpart = convertToWords(amts[1]) + " paise";
						convertedText = firstpart + 'and ' + lastpart;
					}
				} else {
					convertedText = convertToWords(sourceText);
				}
			} else {
				convertedText = convertToWords(sourceText);
			}
			if (settings.INRCaption && settings.INRCaption == "false") {
				convertedText = convertedText.replace(/ rupees/gi, '').replace(/ paise/gi, '')
			}
			if (settings.prefix) {
				convertedText = settings.prefix + convertedText;
			} else {
				convertedText = convertedText.capitalizeFirstLetter();
			}

			if (settings.suffix) {
				convertedText += settings.suffix;
			}

			$(this).text(convertedText);
		});

	};

}(jQuery));