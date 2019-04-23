
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gigs').del()
    .then(function () {
      // Inserts seed entries
      return knex('gigs').insert([
        {title: 'somgGig', venue: 'the gigitty inn', link: 'http://somelink.com'},
        {title: 'NextGig', venue: 'the swan pile', link: 'http://www.theswanpile.com'},
        {title: 'greatGig', venue: 'the jiver', link: 'http://thejiver.com'}
      ]);
    });
};
