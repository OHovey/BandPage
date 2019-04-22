
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tickets').del()
    .then(function () {
      // Inserts seed entries
      return knex('tickets').insert([
        {price: 14.50, purchased: false, buyer_name: '', gig_id: Math.floor(Math.random() * (0 - 2)) + 1},
        {price: 14.50, purchased: false, buyer_name: '', gig_id: Math.floor(Math.random() * (0 - 2)) + 1},
        {price: 14.50, purchased: false, buyer_name: '', gig_id: Math.floor(Math.random() * (0 - 2)) + 1},
        {price: 14.50, purchased: false, buyer_name: '', gig_id: Math.floor(Math.random() * (0 - 2)) + 1},
        {price: 14.50, purchased: false, buyer_name: '', gig_id: Math.floor(Math.random() * (0 - 2)) + 1},
        {price: 14.50, purchased: false, buyer_name: '', gig_id: Math.floor(Math.random() * (0 - 2)) + 1},
      ]);
    });
};
