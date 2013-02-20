var OpenDataCensus = OpenDataCensus || {};

OpenDataCensus.censusUrl = 'https://docs.google.com/spreadsheet/ccc?key=0Aon3JiuouxLUdEVnbG5pUFlyUzBpVkFXbXJ2WWpGTUE#gid=0';

OpenDataCensus.countryCodes={"Canada": "CA", "Guinea-Bissau": "GW", "Congo, The Democratic Republic Of The": "CD", "Iran, Islamic Republic Of": "IR", "Cambodia": "KH", "Switzerland": "CH", "Ethiopia": "ET", "Aruba": "AW", "Swaziland": "SZ", "Argentina": "AR", "Cameroon": "CM", "Burkina Faso": "BF", "Turkmenistan": "TM", "Ghana": "GH", "Saudi Arabia": "SA", "Rwanda": "RW", "Martinique": "MQ", "Togo": "TG", "Bolivia, Plurinational State Of": "BO", "Venezuela, Bolivarian Republic Of": "VE", "Japan": "JP", "American Samoa": "AS", "United States Minor Outlying Islands": "UM", "Cocos (Keeling) Islands": "CC", "Pitcairn": "PN", "Guatemala": "GT", "Kuwait": "KW", "Russia": "RU", "Jordan": "JO", "Virgin Islands, British": "VG", "Dominica": "DM", "Liberia": "LR", "Maldives": "MV", "Jamaica": "JM", "Lithuania": "LT", "Korea, Democratic People'S Republic Of": "KP", "Saint Kitts And Nevis": "KN", "Svalbard And Jan Mayen": "SJ", "Christmas Island": "CX", "French Guiana": "GF", "Niue": "NU", "Monaco": "MC", "Samoa": "WS", "New Zealand": "NZ", "Saint Helena, Ascension And Tristan Da Cunha": "SH", "Jersey": "JE", "Andorra": "AD", "Yemen": "YE", "Albania": "AL", "Lao People'S Democratic Republic": "LA", "Norfolk Island": "NF", "United Arab Emirates": "AE", "Guam": "GU", "India": "IN", "Azerbaijan": "AZ", "Lesotho": "LS", "Saint Vincent And The Grenadines": "VC", "Kenya": "KE", "Macao": "MO", "Greenland": "GL", "Turkey": "TR", "Afghanistan": "AF", "South Georgia And The South Sandwich Islands": "GS", "Bangladesh": "BD", "Mauritania": "MR", "Solomon Islands": "SB", "Viet Nam": "VN", "Saint Lucia": "LC", "San Marino": "SM", "French Polynesia": "PF", "France": "FR", "Western Sahara": "EH", "Syrian Arab Republic": "SY", "Bermuda": "BM", "Slovakia": "SK", "Somalia": "SO", "Peru": "PE", "Vanuatu": "VU", "Nauru": "NR", "Seychelles": "SC", "Norway": "NO", "Malawi": "MW", "Cook Islands": "CK", "Benin": "BJ", "Wallis And Futuna": "WF", "Cuba": "CU", "Cura\u00c7Ao": "CW", "Montenegro": "ME", "Falkland Islands (Malvinas)": "FK", "Mayotte": "YT", "Holy See (Vatican City State)": "VA", "China": "CN", "Armenia": "AM", "Dominican Republic": "DO", "Moldova, Republic Of": "MD", "Ukraine": "UA", "Bahrain": "BH", "Tonga": "TO", "Finland": "FI", "Libya": "LY", "Cayman Islands": "KY", "Central African Republic": "CF", "New Caledonia": "NC", "Mauritius": "MU", "Tajikistan": "TJ", "Liechtenstein": "LI", "Belarus": "BY", "Antigua And Barbuda": "AG", "\u00c5Land Islands": "AX", "Sweden": "SE", "Bulgaria": "BG", "Virgin Islands, U.S.": "VI", "United States": "US", "Romania": "RO", "Angola": "AO", "French Southern Territories": "TF", "Chad": "TD", "South Africa": "ZA", "Tokelau": "TK", "Cyprus": "CY", "Brunei Darussalam": "BN", "Qatar": "QA", "Malaysia": "MY", "Austria": "AT", "Mozambique": "MZ", "Uganda": "UG", "Hungary": "HU", "Niger": "NE", "South Sudan": "SS", "Brazil": "BR", "Turks And Caicos Islands": "TC", "Tanzania, United Republic Of": "TZ", "Faroe Islands": "FO", "Guinea": "GN", "Panama": "PA", "Mali": "ML", "Zambia": "ZM", "Costa Rica": "CR", "Luxembourg": "LU", "Cape Verde": "CV", "Bahamas": "BS", "Gibraltar": "GI", "Ireland": "IE", "Pakistan": "PK", "Palau": "PW", "Nigeria": "NG", "Bonaire, Sint Eustatius And Saba": "BQ", "Ecuador": "EC", "Czech Republic": "CZ", "Australia": "AU", "Algeria": "DZ", "Slovenia": "SI", "El Salvador": "SV", "Tuvalu": "TV", "Heard Island And Mcdonald Islands": "HM", "Marshall Islands": "MH", "Chile": "CL", "Puerto Rico": "PR", "Belgium": "BE", "Kiribati": "KI", "Haiti": "HT", "Belize": "BZ", "Hong Kong": "HK", "Sierra Leone": "SL", "Georgia": "GE", "Oman": "OM", "Gambia": "GM", "Philippines": "PH", "Sao Tome And Principe": "ST", "Morocco": "MA", "Croatia": "HR", "Mongolia": "MN", "Guernsey": "GG", "Thailand": "TH", "Namibia": "NA", "Grenada": "GD", "Iraq": "IQ", "Portugal": "PT", "Estonia": "EE", "Uruguay": "UY", "Saint Pierre And Miquelon": "PM", "Equatorial Guinea": "GQ", "Lebanon": "LB", "Uzbekistan": "UZ", "Tunisia": "TN", "Djibouti": "DJ", "Country Name": "ISO 3166-1-alpha-2 code", "Timor-Leste": "TL", "Spain": "ES", "Colombia": "CO", "Burundi": "BI", "Fiji": "FJ", "Northern Mariana Islands": "MP", "Barbados": "BB", "Madagascar": "MG", "Isle Of Man": "IM", "Italy": "IT", "Bhutan": "BT", "Sudan": "SD", "C\u00d4Te D'Ivoire": "CI", "Nepal": "NP", "Malta": "MT", "Netherlands": "NL", "Bosnia And Herzegovina": "BA", "Suriname": "SR", "Anguilla": "AI", "United Kingdom": "GB", "Israel": "IL", "Indonesia": "ID", "Iceland": "IS", "Saint Barth\u00c9Lemy": "BL", "Korea, Republic Of": "KR", "Senegal": "SN", "Papua New Guinea": "PG",
"Taiwan R.O.C.": "TW", "Zimbabwe": "ZW", "Germany": "DE", "Denmark": "DK", "Kazakhstan": "KZ", "Poland": "PL", "Eritrea": "ER", "Kyrgyzstan": "KG", "British Indian Ocean Territory": "IO", "Montserrat": "MS", "Mexico": "MX", "Sri Lanka": "LK", "Latvia": "LV", "Sint Maarten (Dutch Part)": "SX", "Guyana": "GY", "Guadeloupe": "GP", "Micronesia, Federated States Of": "FM", "Saint Martin (French Part)": "MF", "R\u00c9Union": "RE", "Honduras": "HN", "Myanmar": "MM", "Bouvet Island": "BV", "Egypt": "EG", "Nicaragua": "NI", "Singapore": "SG", "Serbia": "RS", "Botswana": "BW", "Macedonia, The Former Yugoslav Republic Of": "MK", "Trinidad And Tobago": "TT", "Antarctica": "AQ", "Congo": "CG", "Greece": "GR", "Paraguay": "PY", "Gabon": "GA", "Palestinian Territory, Occupied": "PS", "Comoros": "KM"};

OpenDataCensus.dataCatalogsUrl = "https://docs.google.com/spreadsheet/ccc?key=0Aon3JiuouxLUdE9POFhudGd6NFk0THpxR0NicFViRUE#gid=1";


OpenDataCensus.censusDatasets = [
  'Election Results (national)',
  'Company Register',
  'National Map (Low resolution: 1:250,000 or better)',
  'Government Budget (National, high level, not detailed)',
  'Government Spending (National, transactional level data)',
  'Legislation (laws and statutes) - National',
  'National Statistical Data (economic and demographic information)',
  'National Postcode/ZIP database',
  'Public Transport Timetables',
  'Environmental Data on major sources of pollutants (e.g. location, emissions)'
];

OpenDataCensus.censusDatasetTitles = {
  'Election Results (national)': 'Election Results',
  'Company Register': 'Company Register',
  'National Map (Low resolution: 1:250,000 or better)': 'National Map',
  'Government Budget (National, high level, not detailed)': 'Government Budget',
  'Government Spending (National, transactional level data)': 'Government Spending',
  'Legislation (laws and statutes) - National': 'Legislation',
  'National Statistical Data (economic and demographic information)': 'National Statistics',
  'National Postcode/ZIP database': 'Postcode/ZIP database',
  'Public Transport Timetables': 'Public Transport',
  'Environmental Data on major sources of pollutants (e.g. location, emissions)': 'Environmental pollutants'
};

OpenDataCensus.censusKeys = [
  'Timestamp',
  'Census Country',
  'Dataset',
  'Data Availability [Does the data exist?]',
  'Data Availability [Is it in digital form?]',
  'Data Availability [Is it machine readable? (E.g. spreadsheet not PDF)]',
  'Data Availability [Available in bulk?  (Can you get the whole dataset easily)]',
  'Data Availability [Is it publicly available, free of charge?]',
  'Data Availability [Is it openly licensed? (as per the http://OpenDefinition.org/)]',
  'Data Availability [Is it up to date?]',
  'Location of Data Online',
  'Date it became available',
  'Details and comments',
  'Your name (optional)',
  'Link for you (optional)'
];

OpenDataCensus.makeDatasetTitle = function(name) {
  return OpenDataCensus.censusDatasetTitles[name];
};

function gdocsMunge(str) {
  return str.replace(/[^a-zA-Z0-9_.]/g, '').toLowerCase();
}


function barplots(el,series,options) {
  // barplots the series. where series is [{label: "foo",value: 30},]
  function get_max(s) {
    var r=0;
    _.each(s, function(v) {
      if (v.value>r) {
        r=v.value;
        }
      });
    return r;
    }

  options = options || {};
  options.width = options.width || el.width();
  options.log = options.log || false;
  options.min = options.min || 0;
  if (options.log) {
    options.max = options.max || Math.log(get_max(series));
    }
  else {
    options.max = options.max || get_max(series);
    }
  options.colorscale = options.colorscale || new chroma.ColorScale ({colors:
    chroma.brewer.Blues,
    limits: [options.min,options.max]
    });
  options.barwidth = options.barwidth || options.width/2;
  options.labelwidth = options.labelwidth || options.width/2;
  var html=["<table><tbody>"];
  _.each(series, function(record) {
    if (options.log) {
      var width=Math.log(record.value)/options.max*100;
      }
    else {
      var width=(record.value-options.min)/(options.max-options.min)*100;
      }
    width = width>=0? width:0;

    html.push("<tr id='bp-",idfy(record.label)
    ,"'><td width='"+options.labelwidth+
    "px' class='bplabel'>",record.label,"</td><td width='"+
    options.barwidth+"px' class='bpvalue'><div style='width: "+width+
    "%; background: "+options.colorscale.getColor(options.log?Math.log(record.value):record.value)+
    "'>",record.value,"</div></td></tr>")
    });
  html.push("</tbody></table>");
  el.html(html.join(""));
  }

function idfy(str) {
  return str.replace(/ /g,"-");
  }

function getSummaryData(data) {
  var datasets = {};
  var countryNames = _.uniq(_.map(data, function(r) {
    return r['censuscountry'];
  }));
  function makeCountryDict () {
    var _out = {};
    _.each(countryNames, function(ds) {
      _out[ds] = {
        count: 0,
        responses: [],
        isopen: false
      };
    });
    return _out;
  }
  _.each(data, function(row) {
      datasets[row['dataset']] = makeCountryDict();
  });
  _.each(data, function(row) {
    var c = row['censuscountry'];
    var d = row['dataset'];
    count = datasets[d][c].count || 0;
    datasets[d][c]['count'] = count + 1;
    datasets[d][c].responses.push(row);
  });

  var out = {
      'datasets': datasets,
      'countries': countryNames,
      'total': data.length
      };
  return out;
}

function summaryTop(summary) {
  var nd=0;
  _.each(_.keys(summary.datasets), function (key) {
    var ds = summary.datasets[key];
    _.each(_.keys(ds), function(country) {
      if (ds[country].count>0) {
        nd++;
        }
        });
    });
  var free=0;
  _.each(_.keys(summary.datasets), function (key) {
    var ds = summary.datasets[key];
    _.each(_.keys(ds), function(country) {
      if (ds[country].count>0) {
        var r = getLatestReponse(ds[country].responses);
        if (scoreOpenness(r)==6) {
          free++;
          }
          }

        });
    });
  return {
    nc: summary.countries.length,
    nr: summary.total,
    nd: nd,
    free: free
  };
}

function scoreOpenness(response) {
  var score=0;
  _.each(OpenDataCensus.censusKeys.slice(3,9), function(key) {
    if (response[gdocsMunge(key)]=='Yes') {
      score++;
  }});
  return score;
}

function getLatestReponse(responses) {
  var ret = responses[0];
  _.each(responses, function(response) {
    if (ret.timestamp < response.timestamp) {
      ret = response;
    }
  });
  return ret;
}