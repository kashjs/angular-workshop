var nStore = require('nstore');
// Create a store
var wines = nStore.new('data/wines.db', function () {
    // It's loaded now
    initWines();
});
var apiDelay = 300;

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    wines.get("wines", function (err, wines, key) {
        if (err) { throw err; }
        var foundWine;
        wines.list.forEach(function (wine) {
           if (wine._id == id) {
               foundWine = wine;
           }
        });
        setTimeout(function () {
            if (foundWine) {
                res.send(foundWine);
            } else {
                res.send({'error':'Not Found'});
            }
        }, apiDelay)
    });
};

exports.findAll = function(req, res) {
    wines.get("wines", function (err, wines, key) {
        if (err) { throw err; }
        setTimeout(function () {
            res.send(wines.list);
        }, apiDelay)
    });
};

exports.addWine = function(req, res) {
    var newWine = req.body;
    wines.get("wines", function (err, nWines, key) {
        if (err) { throw err; }
        if(!newWine._id) {
            newWine._id = nWines.list.length;
            nWines.list.push(newWine);
            wines.save("wines", { list: nWines.list}, function (err) {
                if (err) { throw err; }
                setTimeout(function () {
                    res.send(newWine);
                }, apiDelay);
            });
        } else {
            res.send({'error':'Error Adding'});
        }
    });
}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var newWine = req.body;
    console.log('Updating wine: ' + id);
    wines.get("wines", function (err, nWines, key) {
        if (err) { throw err; }

        if (newWine._id) {
            for (var i = 0; i < nWines.list.length; i++) {
                if(nWines.list[i]._id == newWine._id) {
                    nWines.list[i] = newWine;
                }
            }
            setTimeout(function () {
                wines.save("wines", { list: nWines.list}, function (err) {
                    if (err) { throw err; }
                    setTimeout(function () {
                        res.send(req.body);
                    }, apiDelay);
                });
            }, apiDelay);
        } else {
            res.send({'error':'Error Updating Wine'});
        }

    });
}

exports.deleteWine = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving wine: ' + id);
    wines.get("wines", function (err, nWines, key) {
        if (err) { throw err; }
        for (var i = nWines.list.length - 1; i > -1; i--) {
            if (nWines.list[i]._id == id) {
                nWines.list.splice(i, 1);
            }
        }
        setTimeout(function () {
            wines.save("wines", { list: nWines.list}, function (err) {
                if (err) { throw err; }
                setTimeout(function () {
                    res.send(req.body);
                }, apiDelay);
            });
        }, apiDelay);
    });
}

// ========== wines initialization ========== //
function initWines() {
    var winesData = [
        {
            name: "CHATEAU DE SAINT COSME",
            year: "2009",
            grapes: "Grenache / Syrah",
            country: "France",
            region: "Southern Rhone",
            description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely wine, which makes an excellent complement to fish dishes.",
            picture: "saint_cosme.jpg",
            likes: 44
        },
        {
            name: "LAN RIOJA CRIANZA",
            year: "2006",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "A resurgence of interest in boutique vineyards has opened the door for this excellent foray into the dessert wine market. Light and bouncy, with a hint of black truffle, this wine will not fail to tickle the taste buds.",
            picture: "lan_rioja.jpg",
            likes: 50
        },
        {
            name: "MARGERUM SYBARITE",
            year: "2010",
            grapes: "Sauvignon Blanc",
            country: "USA",
            region: "California Central Cosat",
            description: "The cache of a fine Cabernet in ones wine cellar can now be replaced with a childishly playful wine bubbling over with tempting tastes of black cherry and licorice. This is a taste sure to transport you back in time.",
            picture: "margerum.jpg",
            likes: 49
        },
        {
            name: "OWEN ROE \"EX UMBRIS\"",
            year: "2009",
            grapes: "Syrah",
            country: "USA",
            region: "Washington",
            description: "A one-two punch of black pepper and jalapeno will send your senses reeling, as the orange essence snaps you back to reality. Don't miss this award-winning taste sensation.",
            picture: "ex_umbris.jpg",
            likes: 21
        },
        {
            name: "REX HILL",
            year: "2009",
            grapes: "Pinot Noir",
            country: "USA",
            region: "Oregon",
            description: "One cannot doubt that this will be the wine served at the Hollywood award shows, because it has undeniable star power. Be the first to catch the debut that everyone will be talking about tomorrow.",
            picture: "rex_hill.jpg",
            likes: 78
        },
        {
            name: "VITICCIO CLASSICO RISERVA",
            year: "2007",
            grapes: "Sangiovese Merlot",
            country: "Italy",
            region: "Tuscany",
            description: "Though soft and rounded in texture, the body of this wine is full and rich and oh-so-appealing. This delivery is even more impressive when one takes note of the tender tannins that leave the taste buds wholly satisfied.",
            picture: "viticcio.jpg",
            likes: 78
        },
        {
            name: "CHATEAU LE DOYENNE",
            year: "2005",
            grapes: "Merlot",
            country: "France",
            region: "Bordeaux",
            description: "Though dense and chewy, this wine does not overpower with its finely balanced depth and structure. It is a truly luxurious experience for the senses.",
            picture: "le_doyenne.jpg",
            likes: 103
        },
        {
            name: "DOMAINE DU BOUSCAT",
            year: "2009",
            grapes: "Merlot",
            country: "France",
            region: "Bordeaux",
            description: "The light golden color of this wine belies the bright flavor it holds. A true summer wine, it begs for a picnic lunch in a sun-soaked vineyard.",
            picture: "bouscat.jpg",
            likes: 59
        },
        {
            name: "BLOCK NINE",
            year: "2009",
            grapes: "Pinot Noir",
            country: "USA",
            region: "California",
            description: "With hints of ginger and spice, this wine makes an excellent complement to light appetizer and dessert fare for a holiday gathering.",
            picture: "block_nine.jpg",
            likes: 180
        },
        {
            name: "DOMAINE SERENE",
            year: "2007",
            grapes: "Pinot Noir",
            country: "USA",
            region: "Oregon",
            description: "Though subtle in its complexities, this wine is sure to please a wide range of enthusiasts. Notes of pomegranate will delight as the nutty finish completes the picture of a fine sipping experience.",
            picture: "domaine_serene.jpg",
            likes: 146
        },
        {
            name: "BODEGA LURTON",
            year: "2011",
            grapes: "Pinot Gris",
            country: "Argentina",
            region: "Mendoza",
            description: "Solid notes of black currant blended with a light citrus make this wine an easy pour for varied palates.",
            picture: "bodega_lurton.jpg",
            likes: 302
        },
        {
            name: "LES MORIZOTTES",
            year: "2009",
            grapes: "Chardonnay",
            country: "France",
            region: "Burgundy",
            description: "Breaking the mold of the classics, this offering will surprise and undoubtedly get tongues wagging with the hints of coffee and tobacco in perfect alignment with more traditional notes. Sure to please the late-night crowd with the slight jolt of adrenaline it brings.",
            picture: "morizottes.jpg",
            likes: 138

        },
        {
            name: "ARGIANO NON CONFUNDITUR",
            year: "2009",
            grapes: "Cabernet Sauvignon",
            country: "Italy",
            region: "Tuscany",
            description: "Like a symphony, this cabernet has a wide range of notes that will delight the taste buds and linger in the mind.",
            picture: "argiano.jpg",
            likes: 147
        },
        {
            name: "DINASTIA VIVANCO ",
            year: "2008",
            grapes: "Tempranillo",
            country: "Spain",
            region: "Rioja",
            description: "Whether enjoying a fine cigar or a nicotine patch, don't pass up a taste of this hearty Rioja, both smooth and robust.",
            picture: "dinastia.jpg",
            likes: 49
        },
        {
            name: "PETALOS BIERZO",
            year: "2009",
            grapes: "Mencia",
            country: "Spain",
            region: "Castilla y Leon",
            description: "For the first time, a blend of grapes from two different regions have been combined in an outrageous explosion of flavor that cannot be missed.",
            picture: "petalos.jpg",
            likes: 43
        },
        {
            name: "SHAFER RED SHOULDER RANCH",
            year: "2009",
            grapes: "Chardonnay",
            country: "USA",
            region: "California",
            description: "Keep an eye out for this winery in coming years, as their chardonnays have reached the peak of perfection.",
            picture: "shafer.jpg",
            likes: 49
        },
        {
            name: "PONZI",
            year: "2010",
            grapes: "Pinot Gris",
            country: "USA",
            region: "Oregon",
            description: "For those who appreciate the simpler pleasures in life, this light pinot grigio will blend perfectly with a light meal or as an after dinner drink.",
            picture: "ponzi.jpg",
            likes: 58
        },
        {
            name: "HUGEL",
            year: "2010",
            grapes: "Pinot Gris",
            country: "France",
            region: "Alsace",
            description: "Fresh as new buds on a spring vine, this dewy offering is the finest of the new generation of pinot grigios.  Enjoy it with a friend and a crown of flowers for the ultimate wine tasting experience.",
            picture: "hugel.jpg",
            likes: 49
        }];

    winesData.forEach(function (wine, id) {
        wine._id = id + 1;
    });

    wines.save("wines", { list: winesData}, function (err) {
        if (err) { throw err; }
        // The save is finished and written to disk safely
    });
}