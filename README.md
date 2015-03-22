inWordsJS - A jQuery Plugin
=====================================


inWordsJS is a jquery plugin to convert numerals to words. Basically , it picks up text from different types of html tags, convert the value into words.



Motivation
----------

Sometimes you just want to convert numbers to words for better readability of figures ,for example preparing invoices, price listing etc.



Usage
------------

Simply download & include jQuery and inWordsJS in your project :

```bash
 <script src="jquery-1.9.1.min.js"></script>
 <script src="jquery.inWords-1.0.min.js"></script>
```

Add your desired tag :

```bash
  <p id="convertThis" >1234.5789</p>
```

Call function on required tag :

```bash
    $('#convertThis').inWords({
        format		: 'roundedTo2Decimal', // Eg. rounded,roundedTo2Decimal
        INRCaption	: 'true',              // by default true
        prefix 	    : 'Awesome ! You won ' ,
        suffix      : ' only.'
    });
```

Output :

```bash
  Awesome ! You won one thousand two hundred thirty four rupees and fifty eight paise only.
```