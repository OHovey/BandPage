
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gigs').del()
    .then(function () {
      // Inserts seed entries
      return knex('gigs').insert([
        {title: 'the big gig', venue: 'the gigitty inn', link: 'http://somelink.com'},
        {title: 'the elephant band', venue: 'the swan pile', link: 'http://www.theswanpile.com'},
        {title: 'anothere gig from hign up', venue: 'the jiver', link: 'http://thejiver.com'}
      ]);
    });
};
