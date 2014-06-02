var fs = require('fs')
  , _ = require('underscore')
  , crypto = require('crypto')
  , passport = require('passport')
  , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

  , config = require('../lib/config')
  , env = require('../lib/templateenv')
  , util =  require('../lib/util.js')
  , model = require('../lib/model').OpenDataCensus
  ;

exports.submit = function(req, res) {
  if (requireLoggedIn(req, res)) return;

  var datasets = [];
  var ynquestions = model.data.questions.slice(0,9);
  var prefill = req.query;
  var year = prefill.year || config.get('submit_year');

  function render(prefill_) {
    res.render('submission/create.html', {
      canReview: true, // flag always on for submission
      submitInstructions: config.get('submit_page', req.locale),
      places: util.translateRows(model.data.places, req.locale),
      ynquestions: util.translateRows(ynquestions, req.locale),
      questions: util.translateRows(model.data.questions, req.locale),
      questionsById: util.translateObject(model.data.questionsById, req.locale),
      datasets: util.translateRows(model.data.datasets, req.locale),
      year: year,
      prefill: prefill_,
      currrecord: prefill_
    });
  }

  // look up if there is an entry and if so we use it to prepopulate the form
  if (prefill.dataset && prefill.place) {
    model.backend.getEntry({
      place: prefill.place,
      dataset: prefill.dataset,
      year: year,
    }, function(err, entry) {
      // we allow query args to override entry values
      // might be useful (e.g. if we started having form errors and
      // redirecting here ...)
      if (entry) { // we might have a got a 404 etc
        prefill = _.extend(entry, prefill);
      }
      render(prefill);
    });
  } else {
    render(prefill);
  }
};

exports.submitPost = function(req, res) {
  if (requireLoggedIn(req, res)) return;

  var submissionData = req.body;
  model.backend.insertSubmission(submissionData, req.user, function(err, data) {
    var msg;
    // TODO: Do flash messages properly
    if (err) {
      console.log(err);
      msg = 'There was an error! ' + err;
      req.flash('error', msg);
    } else {
      msg = 'Thank-you for your submission which has been received.';
      if (!data.reviewed) {
        msg += ' It will now be reviewed before being published.';
      }
      req.flash('info', msg);
    }
    res.redirect('/place/' + submissionData.place);
  });
};

//app.get('/country/submission/:id.json', function(req, res) {
//  model.backend.getSubmission({submissionid: req.params.id}, function(err, obj) {
//    if (err) {
//      res.json(500, { error: { message: 'There was an error: ' + err } });
//    }
//    res.json(obj);
//  });
//});

// Compare & update page
exports.submission = function(req, res) {
  var ynquestions = model.data.questions.slice(0,9);

  model.backend.getSubmission({submissionid: req.params.submissionid}, function(err, obj) {
    if (err) {
      res.send(500, 'There was an error ' + err);
    } else if (!obj) {
      res.send(404, 'There is no submission with id ' + req.params.submissionid);
    } else {
      // let's see if there was an entry
      model.backend.getEntry(obj, function(err, entry) {
        if (!entry) {
          entry = {};
        }
        var dataset = _.findWhere(model.data.datasets, {
          id: obj.dataset
        });

        res.render('submission/review.html', {
          canReview: exports.canReview(req.user, obj.place),
          reviewInstructions: config.get('review_page', req.locale),
          ynquestions: util.translateRows(ynquestions, req.locale),
          questions: util.translateRows(model.data.questions, req.locale),
          questionsById: util.translateObject(model.data.questionsById, req.locale),
          prefill: obj,
          currrecord: entry,
          dataset: util.translate(dataset, req.locale),
          place: util.translate(model.data.placesById[obj.place], req.locale),
          disqus_shortname: config.get('disqus_shortname')
        });
      });
    }
  });
};

exports.reviewPost = function(req, res) {
  if (requireLoggedIn(req, res)) return;
  // Get the submission's place, so we can find the local reviewers
  model.backend.getSubmission({submissionid: req.params.submissionid}, function(err, obj) {
    if (!exports.canReview(req.user, obj.place)) {
      res.send(401, 'Sorry, you are not an authorized reviewer');
      return;
    }
  });

  var acceptSubmission = req.body['submit'] === 'Publish';
  model.backend.processSubmission(req.user, acceptSubmission, req.params.submissionid, req.body, function(err) {
    if (err) {
      if (err.code) {
        res.send(err.code, err.message);
      } else {
        res.send(500, err);
      }
    } else {
      if (acceptSubmission) {
        var msg = "Submission processed and entered into the census.";
        req.flash('info', msg);
      } else {
        var msg = "Submission marked as rejected.";
        req.flash('info', msg);
      }
      // TODO: find a better way to update cached data
      // model.load(function() {
        res.redirect('/');
      // });
    }
  });
};

exports.anonLogin = function(req, res) {
  if (config.get('anonymous_submissions') !== 'TRUE') {
    return res.send(405);
  }

  var name = req.body.displayName || 'Anonymous';
  var user = util.makeUserObject({
    id: 'anonymous',
    provider: 'okfn',
    username: 'anonymous',
    displayName: name
  });

  req.session.nextUrl = req.query.next;

  req.login(user, function(err) {
    if (err) {
      return res.send(err.code || 500, err.message || err);
    }

    exports.loggedin(req, res);
  });
};

exports.login = function(req, res) {
  // TODO: use this stored next url properly ...
  req.session.nextUrl = req.query.next;
  res.render('login.html', {
    anonymous_submissions: config.get('anonymous_submissions') === 'TRUE'
  });
};

exports.logout = function(req, res){
  req.logout();
  res.redirect('/');
};

exports.loggedin = function(req, res) {
  if (req.session.nextUrl) {
    res.redirect(req.session.nextUrl);
  } else {
    res.redirect('/');
  }
};

// ========================================================
// Admin
// ========================================================

exports.reload = function(req, res) {
  model.load(function(err) {
    msg = 'Reloaded OK &ndash; <a href="/">Back to home page</a>';
    if (err) {
      console.error('Failed to reload config info');
      msg = 'Failed to reload config etc. ' + err;
    }
    res.send(msg);
  });
}

// ========================================================
// Local Functions
// ========================================================

exports.setupAuth = function() {
  passport.use(
    new GoogleStrategy({
        clientID: config.get('google:app_id'),
        clientSecret: config.get('google:app_secret'),
        callbackURL: config.get('site_url').replace(/\/$/, '') + '/auth/google/callback',
        profileFields: ['id', 'displayName', 'name', 'username', 'emails', 'photos']
      },
      function(accessToken, refreshToken, profile, done) {
        var userobj = util.makeUserObject(profile);
        if (config.get('user_database_key')) {
          model.backendUser.createUserIfNotExists(userobj, function(err) {
            if (err) console.error(err);
            done(null, userobj);
          });
        } else {
          done(null, userobj);
        }
      }
    )
  );

  // At the moment we get all user info on auth and store to cookie so these are both no-ops ...
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(profile, done) {
    var err = null;
    done(err, profile);
  });
}

function requireLoggedIn(req, res) {
  if (!req.user) {
    res.redirect('/login/?next=' + encodeURIComponent(req.url));
    return true;
  }
}

function getLocalReviewers (user, currentPlaceName) {
  // Get the local reviewers of a specific place.
  var places = model.data.places;
  for (i in places) {
    if (places[i].id == currentPlaceName) {
      // Not all places have a reviewers column
      if (places[i].hasOwnProperty('reviewers')){
        return places[i].reviewers.split(",");
      } else {
        return []
      }
    }
  }
}

exports.canReview = function(user, currentPlaceName) {
  // Get both the main reviewers list and the local place reviewers
  var mainReviewers = config.get('reviewers');
  var localReviewers = getLocalReviewers(user, currentPlaceName)
  var allReviewers = mainReviewers.concat(localReviewers);

  if (!user) {
    return false;
  }

  return !!(~allReviewers.indexOf(user.userid) || ~allReviewers.indexOf(user.email));
}

function isAdmin(user) {
  return (config.get('admins').indexOf(user.userid) !== -1);
}
